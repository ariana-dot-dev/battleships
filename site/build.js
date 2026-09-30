// Build a single self-contained HTML page from research/cards, regimes, verify, benchmarks and usage profiles.
// usage: node site/build.js  ->  site/dist/index.html
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..', 'research');
const readDir = (d, ext) => fs.existsSync(d) ? fs.readdirSync(d).filter(f => f.endsWith(ext)) : [];
const readMdDir = sub => Object.fromEntries(readDir(path.join(R, sub), '.md').map(f => [f.replace(/\.md$/, ''), fs.readFileSync(path.join(R, sub, f), 'utf8')]));
const readIf = p => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;

const cards = [], problems = [];
// numbers for the methodology section, counted from the data itself
const stats = { providers: 0, tiers: 0, quoted: 0, sources: new Set() };
for (const f of readDir(path.join(R, 'cards'), '.json')) {
  try {
    const c = JSON.parse(fs.readFileSync(path.join(R, 'cards', f), 'utf8'));
    if (!c.id || !Array.isArray(c.modes)) { problems.push(`${f}: missing id or modes`); continue; }
    stats.providers++; stats.tiers += c.modes.filter(m => m && !(m.flags || []).includes('legacy')).length;
    for (const e of Object.values(c.feature_evidence || {})) if (e && e.quote && e.source) { stats.quoted++; try { stats.sources.add(new URL(e.source).href.split('#')[0]); } catch {} }
    // quoted evidence per feature stays in the cards (and the public repo); the page doesn't show it, so it doesn't ship
    delete c.feature_evidence;
    // who is behind it: ownership, stage, accelerators, money raised, revenue (research/funding/<id>.json), compacted
    const fu = readIf(path.join(R, 'funding', c.id + '.json'));
    if (fu) { const f = JSON.parse(fu), num = x => typeof x === 'number' && isFinite(x) ? x : null;
      const amt = o => o && num(o.value ?? o.value_usd) != null && o.status !== 'unknown' ? { v: num(o.value ?? o.value_usd), s: o.status, src: o.source || null, basis: o.basis || null } : null;
      const st = (f.stage || {}).value || 'unknown';
      // "Alibaba Group Holding Limited (NYSE: BABA; HKEX: 9988), a publicly traded company" -> "Alibaba"
      const BRANDS = [[/International Business Machines|\bIBM\b/, 'IBM'], [/Alphabet|Google/, 'Google'], [/Huawei/, 'Huawei'], [/Samsung/, 'Samsung'], [/Iliad/, 'Iliad'], [/Schwarz/, 'Schwarz Group'],
        [/Tencent/, 'Tencent'], [/Alibaba/, 'Alibaba'], [/Kakao/, 'Kakao'], [/NAVER/i, 'Naver'], [/Deutsche Telekom|T-Systems/, 'Deutsche Telekom'], [/A1 (Digital|Telekom)/, 'A1 Telekom Austria'], [/Fair Isaac|FICO/, 'FICO'], [/Amazon/, 'Amazon'], [/Microsoft/, 'Microsoft']];
      const brand = s => !s ? null : (BRANDS.find(([re]) => re.test(s)) || [])[1] || String(s).replace(/\s*\(.*?\)/g, '').split(/[,;]| - | — /)[0]
        .replace(/\b(Group Holdings?|Holdings?|Group|Limited|Ltd\.?|Inc\.?|Incorporated|Corporation|Corp\.?|Co\.|LLC|L\.L\.C\.|PLC|S\.A\.|SE|AG|GmbH|N\.V\.|B\.V\.)\b/g, '').replace(/\.com\b/, '').replace(/\s(N\.V\.|B\.V\.|S\.A\.|\.)(?=\s|$)/g, '').replace(/\s+/g, ' ').trim() || s;
      c.co = { own: st === 'acquired' ? 'acquired' : (f.ownership || {}).value || null, parent: brand((f.ownership || {}).parent), stage: st === 'acquired' ? 'unknown' : st, stageSrc: (f.stage || {}).source || null,
        acc: (f.accelerators || []).filter(a => a.confidence !== 'low').map(a => ({ n: a.name, b: a.batch || null, src: a.source || null })),
        raised: amt(f.total_funding_usd),
        last: f.last_round && f.last_round.type ? { t: f.last_round.type, a: num(f.last_round.amount_usd), d: f.last_round.date || null, leads: (f.last_round.leads || []).slice(0, 3), s: f.last_round.status, src: f.last_round.source || null } : null,
        inv: (f.investors || []).slice(0, 6),
        rev: amt(f.revenue) && Object.assign(amt(f.revenue), { k: f.revenue.kind || null, at: f.revenue.as_of || null }) };
    }
    cards.push(c);
  } catch (e) { problems.push(`${f}: ${e.message}`); }
}
// reference CPU speed = median of measured providers (neutral baseline for the CPU-bound toggle)
const speeds = cards.flatMap(c => [c.perf && c.perf.cpu_runs_s].concat((c.modes || []).map(m => m.perf && m.perf.cpu_runs_s)))
  .filter(x => typeof x === 'number').sort((a, b) => a - b);
const perfRef = speeds.length ? speeds[Math.floor(speeds.length / 2)] : null;
// reference fleet size = median of the most machines each provider lets you run at once self-serve, among those that
// publish a limit. Up to this many at once, an unpublished limit is "probably fine", not a mismatch.
const caps = cards.map(c => {
  const plans = (c.plans || []).filter(p => !(p.flags || []).includes('sales') && !/sales|enterprise|contact/i.test(`${p.name} ${p.note || ''}`));
  const all = plans.map(p => p.concurrency).concat([(c.fleet || {}).default_max_instances]).filter(x => typeof x === 'number' && x > 0);
  return all.length ? Math.max(...all) : null;
}).filter(x => x != null).sort((a, b) => a - b);
const concRef = caps.length ? caps[Math.floor(caps.length / 2)] : null;

// Research notes are written for us; the page is written for readers. Drop sentences that point at our files,
// scripts, engine fields or internal process, and inline file references in tables.
const INTERNAL = /user's own product|held to the same standard|scratchpad|\bengine\b|fee_is_credit|\bcard(s)?\b[^.]*\.json|research\/|raw\/|\.json\b|\.jsonl?\b|\bperfmap\.js\b|\bPR #\d+|\bnot modell?ed\b|per_seat|ipv4_available|egress_free_gib|auto_stop_idle=|trial_only/i;
function clean(md) {
  if (!md) return md;
  // raw data dumps (JSON blocks) are for us, not for readers
  md = md.replace(/```(json|jsonc)?\s*\n\s*[{[][\s\S]*?```/g, '');
  return md.split('\n').map(line => {
    if (/^\s*\|/.test(line)) return line.replace(/\s*\(raw:[^)]*\)/g, '').replace(/`[^`]*\.(json|md|txt|js)`/g, '');
    if (/^\s*(#|```)/.test(line)) return line;
    const lead = (line.match(/^\s*([-*]|\d+\.)?\s*/) || [''])[0], body = line.slice(lead.length);
    const kept = body.split(/(?<=[.!?])\s+(?=[A-Z(`"])/).filter(s => !INTERNAL.test(s)).join(' ')
      .replace(/\s*\(raw:[^)]*\)/g, '').replace(/\s*\(script:[^)]*\)/g, '');
    return kept.trim() ? lead + kept : null;
  }).filter(l => l !== null).join('\n').replace(/\n{3,}/g, '\n\n');
}
const cleanDir = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, clean(v)]));
const cardIds = new Set(cards.map(c => c.id));
const data = {
  asOf: '2026-09-28', cards, perfRef, concRef,
  stats: { providers: stats.providers, tiers: stats.tiers, quoted: stats.quoted, pages: stats.sources.size },
  regimes: cleanDir(readMdDir('regimes')),
  // only the per-provider verification write-ups (not our fix logs or engine notes)
  verify: cleanDir(Object.fromEntries(Object.entries(readMdDir('verify')).filter(([k]) => cardIds.has(k)))),
  // the public page is a short summary; benchmarks.md / perf-costs.md stay as our research notes
  bench: clean(readIf(path.join(R, 'benchmarks-public.md'))) + '\n' + require('./gen-bench.js')(JSON.parse(readIf(path.join(R, 'benchmarks.json'))), id => (cards.find(c => c.id === id) || {}).name),
  perfCosts: null,
  usage: JSON.parse(readIf(path.join(__dirname, 'usage-profiles.json')) || 'null'),
  ...require('./atlas.js'),
};
let html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
html = html.replace('/*__ENGINE__*/', () => fs.readFileSync(path.join(__dirname, 'engine.js'), 'utf8'));
// boat.dev scenery: the docs videos' 3D boat renders (assets/ships) + the landing page's sea mask, inlined (site/assets)
const ASSETS = { ships: Object.fromEntries(fs.readdirSync(path.join(__dirname, 'assets', 'ships')).filter(f => f.endsWith('.png')).map(f => [f.slice(0, -4), 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'assets', 'ships', f)).toString('base64')])), mask: fs.readFileSync(path.join(__dirname, 'assets', 'seamask.txt'), 'utf8').trim() };
// The hero and footer scenery are rendered here, into the HTML, so they are in the very first paint instead of
// waiting for the page's scripts. The page itself only needs the rowboat (slider handle) at runtime.
globalThis.BOAT_ASSETS = ASSETS; require('./theme.js');
html = html.replace('<div id="heroSea"></div>', () => `<div id="heroSea">${globalThis.BoatTheme.hero('Battleships')}</div>`);
html = html.replace('<div class="bfoot-sea" id="footSea"></div>', () => `<div class="bfoot-sea" id="footSea">${globalThis.BoatTheme.footer()}</div>`);
// the boat images, once, as symbols both scenes <use> (placed first in the hero so they exist before the scenes paint)
html = html.replace('<div id="heroSea">', () => `${globalThis.BoatTheme.sprites()}<div id="heroSea">`);
html = html.replace('/*__ASSETS__*/', () => 'window.BOAT_ASSETS=' + JSON.stringify({ ships: { 'rowboat-l': ASSETS.ships['rowboat-l'] } }) + ';');
html = html.replace('/*__THEME__*/', () => '');
// the data ships gzipped + base64 (5.6 MB of JSON -> ~1 MB): link-preview and OG crawlers refuse pages over 5 MB
html = html.replace('/*__DATA__*/', () => require('zlib').gzipSync(JSON.stringify(data), { level: 9 }).toString('base64'));
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
// favicon inlined, so the page shows it wherever it's opened (site, embeds, a saved file)
html = html.replace('%FAVICON%', () => 'data:image/svg+xml,' + encodeURIComponent(fs.readFileSync(path.join(__dirname, 'assets', 'favicon.svg'), 'utf8').trim()));
fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html);
console.log(`cards=${cards.length} regimes=${Object.keys(data.regimes).length} verify=${Object.keys(data.verify).length} perfRef=${perfRef} concRef=${concRef} usage=${!!data.usage} bytes=${html.length}`);
if (problems.length) console.log('PROBLEMS:\n' + problems.join('\n'));
