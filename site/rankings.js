// The ranking the page shows when it opens on each use-case preset, as static JSON (/data/rankings/<preset>.json).
// It runs the page's own script (template.html) against a minimal fake DOM and calls its rankPreset hook: same presets,
// usage profiles, default options, sizing, access, shop filters, required features and match rules as the page.
// usage: node site/rankings.js <outDir>   (builds site/dist/index.html first, for the data the page ships)
const fs = require('fs'), path = require('path');
const out = process.argv[2];
if (!out) { console.error('usage: node site/rankings.js <outDir>'); process.exit(2); }

// the data the page ships: built by build.js, read back from the built page
const log = console.log; console.log = () => {}; try { require('./build.js'); } finally { console.log = log; }
const dist = fs.readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf8');
const pmdata = (dist.match(/id="pmdata">([^<]*)</) || [])[1];
if (!pmdata) throw new Error('no data in site/dist/index.html');
require('./engine.js'); const PM = globalThis.PM;

// ---- the page's own script and controls, from the template
const tpl = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
const a = tpl.indexOf('(async function(){'), b = tpl.lastIndexOf('})();');
if (a < 0 || b < a) throw new Error('page script not found in template.html');
const script = tpl.slice(a, b) + '})()';
const html = tpl.slice(0, tpl.indexOf('<script>\n(async function(){'));

// ---- a fake DOM: form controls keep real values (parsed from the HTML); everything else is an inert stub
const stub = new Proxy(function () {}, {
  get: (t, k) => k === Symbol.toPrimitive ? () => '' : k === Symbol.iterator ? function* () {} : k === 'then' ? undefined : k === 'length' ? 0 : stub,
  set: () => true, apply: () => stub, construct: () => stub, has: () => true,
});
const parseOptions = s => [...s.matchAll(/<option([^>]*)>([\s\S]*?)<\/option>/g)].map(m => {
  const v = m[1].match(/value="([^"]*)"/), text = m[2].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
  return { value: v ? v[1] : text, text, selected: /\bselected\b/.test(m[1]) };
});
const els = new Map();
function element(tag, attrs, inner) {
  const o = { tagName: tag.toUpperCase(), id: (attrs.match(/\bid="([^"]+)"/) || [])[1], type: (attrs.match(/\btype="([^"]+)"/) || [])[1] || (tag === 'select' ? 'select-one' : 'text'),
    value: (attrs.match(/\bvalue="([^"]*)"/) || [])[1] || '', checked: /\schecked\b/.test(attrs), hidden: /\shidden\b/.test(attrs), open: false, disabled: false,
    dataset: {}, options: [], textContent: '', _html: '' };
  const setOptions = s => { o.options = parseOptions(s); const sel = o.options.find(x => x.selected) || o.options[0]; o.value = sel ? sel.value : ''; };
  if (tag === 'select') setOptions(inner || '');
  return new Proxy(o, {
    get: (t, k) => k === 'innerHTML' ? t._html : k === 'selectedOptions' ? t.options.filter(x => x.value === t.value)
      : k === 'selectedIndex' ? t.options.findIndex(x => x.value === t.value) : k in t ? t[k] : stub,
    set: (t, k, v) => { if (k === 'innerHTML') { t._html = String(v); if (tag === 'select') setOptions(t._html); }
      else if (k === 'value') t.value = String(v); else t[k] = v; return true; },
  });
}
for (const m of html.matchAll(/<(\w+)((?:\s[^>]*?)?\sid="[^"]+"[^>]*)>/g)) {
  const tag = m[1].toLowerCase(), attrs = m[2];
  const inner = tag === 'select' ? html.slice(m.index + m[0].length, html.indexOf('</select>', m.index)) : '';
  const e = element(tag, attrs, inner); els.set(e.id, e);
}
els.set('pmdata', Object.assign(element('script', ' id="pmdata"', ''), { textContent: pmdata }));
const byId = id => els.get(id) || stub;
const document = {
  querySelector: s => /^#[\w-]+$/.test(s) ? byId(s.slice(1)) : stub, querySelectorAll: () => [], getElementById: byId,
  createElement: () => stub, addEventListener() {}, body: stub, documentElement: stub, readyState: 'loading', fonts: undefined, activeElement: null,
};
const mem = new Map();
const localStorage = { getItem: k => mem.has(k) ? mem.get(k) : null, setItem: (k, v) => mem.set(k, String(v)) };
const window = { document, localStorage, PM: globalThis.PM };
const globals = { window, document, localStorage, location: { search: '', hash: '', protocol: 'https:', hostname: 'battleships.dev', href: 'https://battleships.dev/' },
  navigator: stub, matchMedia: () => stub, getComputedStyle: () => stub, getSelection: () => stub, innerWidth: 1280, innerHeight: 900, scrollY: 0,
  addEventListener() {}, requestAnimationFrame() {}, requestIdleCallback() {}, setTimeout: () => 0, clearTimeout() {}, queueMicrotask() {},
  IntersectionObserver: stub, ResizeObserver: stub, scheduler: undefined, PM: globalThis.PM, PMDATA: undefined };
const page = new Function(...Object.keys(globals), 'return ' + script);

(async () => {
  await page(...Object.values(globals));
  const pm = window.__pm;
  if (!pm || !pm.rankPreset) throw new Error('page hook window.__pm.rankPreset missing');
  const H = pm.helpers();
  const money = x => x >= 10 ? Math.round(x) : +x.toFixed(2);
  const fmtH = x => x == null ? null : '$' + (x < 1 ? x.toFixed(3) : x.toFixed(2)) + '/h';
  fs.mkdirSync(out, { recursive: true });
  const md = ['# Rankings by use case', '', 'As https://battleships.dev computes them when it opens on each preset (default options).', ''];
  for (const p of H.PRESETS) {
    const R = pm.rankPreset(p.k);
    const fits = new Set(R.strictOk.map(r => r.card.id)).size;
    const row = (r, i, match) => ({ rank: i + 1, id: r.card.id, name: r.card.name, regime: r.regime && H.multiRegime(r.card) ? r.regime.label || r.regime.key : null,
      monthly_usd: money(r.total), per_hour: fmtH(r.perHour), match, compromises: match === 'full' ? [] : r.compromises || [], unconfirmed: H.unsure(r),
      // fairness model (FAIRNESS.md): what you set up yourself, start caps, how fresh the card is
      own_setup: (r.diy || []).length ? r.diy.map(k => Object.assign({ feature: k, label: PM.FEATURE_LABELS[k] || k }, (r.card.diy_how || {})[k] || {})) : undefined,
      start_limits: r.startLimits || undefined,
      checked: r.card.checked || null, stale: r.card.checked ? r.card.stale || false : undefined });
    const rows = R.strictOk.map((r, i) => row(r, i, 'full')).concat(R.softOk.map((r, i) => row(r, R.strictOk.length + i, 'compromise')));
    const W = Object.assign({}, R.W); delete W.clampShape;
    const doc = { preset: p.k, name: p.n, summary: R.strictOk.length ? `${fits} of ${H.CARDS.length} providers fit` : 'None fit as-is. Closest options below.',
      workload: W, options: { required: R.O.required, sizing: R.O.sizing, maxAccess: R.O.maxAccess }, rows };
    fs.writeFileSync(path.join(out, p.k + '.json'), JSON.stringify(doc, null, 1));
    md.push(`## ${p.n} (\`${p.k}\`)`, '', doc.summary, '', '| # | Provider | Regime | $/month | Match |', '|---|---|---|---|---|',
      ...rows.slice(0, 20).map(r => `| ${r.rank} | ${r.name} | ${r.regime || ''} | ${r.monthly_usd} | ${r.match}${r.own_setup ? ' (with your own setup)' : ''} |`), '');
  }
  fs.writeFileSync(path.join(out, 'rankings.md'), md.join('\n'));
  console.log(`rankings: ${H.PRESETS.length} presets -> ${out}`);
})().catch(e => { console.error(e); process.exit(1); });
