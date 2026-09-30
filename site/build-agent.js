// Agent-readable static layer for Battleships: llms.txt, llms-full.txt, JSON/Markdown per provider, feature definitions,
// presets, the pricing engine. All static (no query endpoint to abuse); rankings per preset are added by rankings.mjs.
// usage: node build-agent.js   ->   dist/agent/**
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..', 'research'), OUT = path.join(__dirname, 'dist', 'agent'), SITE = 'https://pricemogged.com';
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(path.join(OUT, 'data', 'providers'), { recursive: true });
require('./engine.js'); const PM = globalThis.PM;
const tpl = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
const grab = (start, end) => { const a = tpl.indexOf(start); if (a < 0) throw new Error('missing ' + start); const b = tpl.indexOf(end, a); return tpl.slice(a + start.length - 1, b + end.length - 1); }; // keeps the closing bracket, drops ';'
// presets reference the page's measured session stats (S); without them each preset uses its own default
const PRESETS = Function('S', 'return (' + grab('const PRESETS=[', '\n];') + ')')(null);
const FEAT_WHY = eval('(' + grab('const FEAT_WHY={', '\n};') + ')');
const cards = fs.readdirSync(path.join(R, 'cards')).filter(f => f.endsWith('.json')).map(f => JSON.parse(fs.readFileSync(path.join(R, 'cards', f), 'utf8')))
  .filter(c => c.id && Array.isArray(c.modes)).sort((a, b) => a.name.localeCompare(b.name));
const regime = id => { const f = path.join(R, 'regimes', id + '.md'); return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null; };
const FKEYS = Object.keys(PM.FEATURE_LABELS);
const feats = c => { const o = {}; for (const k of FKEYS) { const v = PM.testFeature(c.features || {}, k); o[k] = v; } return o; };
const priceHint = c => { const ms = c.modes.filter(m => m && !(m.flags || []).includes('legacy'));
  const out = ms.slice(0, 8).map(m => ({ key: m.key, label: m.label, pricing: m.pricing, vcpu_h: m.vcpu_h ?? null, ram_gib_h: m.ram_gib_h ?? null,
    sizes: Array.isArray(m.sizes) ? m.sizes.slice(0, 6).map(s => ({ name: s.name, vcpu: s.vcpu, ram_gib: s.ram_gib, hour: s.hour })) : undefined,
    cpu_basis: m.cpu_basis, ram_basis: m.ram_basis, flags: m.flags && m.flags.length ? m.flags : undefined })); return out; };
const legacy = c => c.modes.length && c.modes.every(m => m && (m.flags || []).includes('legacy'));

// ---- per provider: full card JSON (+ evidence) and a readable Markdown page
const index = [];
for (const c of cards) {
  const f = feats(c), yes = FKEYS.filter(k => f[k] === true), no = FKEYS.filter(k => f[k] === false);
  const entry = { id: c.id, name: c.name, url: c.url, category: c.category, isolation: c.isolation || (c.features || {}).isolation || null, discontinued: legacy(c) || undefined,
    json: `${SITE}/data/providers/${c.id}.json`, markdown: `${SITE}/data/providers/${c.id}.md`, features_yes: yes };
  index.push(entry);
  fs.writeFileSync(path.join(OUT, 'data', 'providers', c.id + '.json'), JSON.stringify(Object.assign({ features_resolved: f }, c), null, 1));
  const md = [`# ${c.name}`, '', `Official pricing: ${c.url}  `, `Category: ${c.category || 'n/a'} · Isolation: ${entry.isolation || 'not published'}${entry.discontinued ? ' · DISCONTINUED' : ''}`, '',
    '## Pricing regimes (raw)', '', ...priceHint(c).map(m => `- **${m.label || m.key}** (${m.pricing})${m.vcpu_h != null ? `: $${m.vcpu_h}/vCPU-h` : ''}${m.ram_gib_h != null ? `, $${m.ram_gib_h}/GiB-h` : ''}${m.sizes ? ': ' + m.sizes.map(s => `${s.name} ${s.vcpu ?? '?'} vCPU/${s.ram_gib ?? '?'} GiB $${s.hour}/h`).join('; ') : ''}${m.flags ? ` [${m.flags.join(', ')}]` : ''}`),
    '', '## Features', '', `Yes: ${yes.map(k => PM.FEATURE_LABELS[k]).join(', ') || 'none recorded'}`, '', `No: ${no.map(k => PM.FEATURE_LABELS[k]).join(', ') || 'none recorded'}`, '',
    `Unknown: everything else. Evidence (source + quote) per feature: ${SITE}/data/providers/${c.id}.json → feature_evidence`, '',
    ...(c.caveats && c.caveats.length ? ['## Caveats', '', ...c.caveats.map(x => '- ' + x), ''] : []),
    ...(regime(c.id) ? ['## How this provider charges', '', regime(c.id).replace(/^# .*\n/, '')] : [])].join('\n');
  fs.writeFileSync(path.join(OUT, 'data', 'providers', c.id + '.md'), md);
}
fs.writeFileSync(path.join(OUT, 'data', 'index.json'), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), count: index.length, providers: index }, null, 1));
// ---- features, presets, engine
fs.writeFileSync(path.join(OUT, 'data', 'features.json'), JSON.stringify(Object.fromEntries(FKEYS.map(k => [k, { label: PM.FEATURE_LABELS[k], why: FEAT_WHY[k] || null }])), null, 1));
fs.writeFileSync(path.join(OUT, 'data', 'presets.json'), JSON.stringify(PRESETS.map(p => ({ id: p.k, name: p.n, description: p.why, required: p.req || [], workload: p.w, ranking: `${SITE}/data/rankings/${p.k}.json` })), null, 1));
fs.copyFileSync(path.join(__dirname, 'engine.js'), path.join(OUT, 'engine.js'));
// ---- llms.txt (short map) and llms-full.txt (every provider in a paragraph)
const llms = `# Battleships

> Monthly cost of ${cards.length} cloud sandbox, VM and agent-runtime providers for a given AI-agent workload, from each provider's public pricing, with features checked against their docs (quoted sources). Built by the boat.dev team; boat.dev is held to the same rules as everyone.

The human page (${SITE}/) is an interactive estimator. Agents: use these static files instead of the HTML. Everything below is plain static files, cached; please don't crawl the HTML page.

## Data
- [Provider index](${SITE}/data/index.json): every provider with category, isolation, features it has, links to its files
- Per provider: \`${SITE}/data/providers/<id>.json\` (full pricing card, features, quoted evidence) and \`${SITE}/data/providers/<id>.md\` (readable summary + how it charges)
- [Feature definitions](${SITE}/data/features.json): what each feature means and why it matters
- [Use-case presets](${SITE}/data/presets.json): the workloads behind each ranking
- Rankings per preset, as the page computes them: \`${SITE}/data/rankings/<preset>.json\` and [all rankings in one page](${SITE}/data/rankings.md)
- [Everything in one text file](${SITE}/llms-full.txt)

## Price your own workload
Download [engine.js](${SITE}/engine.js) and a provider card, then in Node:
\`\`\`js
require('./engine.js'); const card = require('./e2b.json');
const W = { vcpu: 2, ram: 4, disk: 10, os: 'linux', arch: 'any', gpu: 'none', gpuCount: 1, sessions: 1000, sessionMin: 10, concurrency: 20, alwaysOn: 0,
  cpuUtil: 0.3, ramUtil: 0.5, idleShare: 0.2, cpuPeakUtil: 0.6, ramPeakUtil: 0.7, snapshotGiB: 0, egress: 10, ipv4: 0, seats: 1, persistentDisk: false, pooled: false, classes: null, showZero: false, internet: 'open' };
const r = PM.priceSoft(card, W, { required: ['docker_inside'], maxAccess: 3, region: 'any', idleSuspend: true, idleCapture: 1, overrides: {}, sizing: 'min' });
console.log(r.total, r.breakdown, r.compromises);
\`\`\`
Fields: sessions a month, minutes per session, machines at once, machines on 24/7, CPU/RAM busy share (0-1), GiB kept, GiB egress.
internet: what sandboxes must reach: 'open' (any site or API), 'pkg' (package registries, git hosting, LLM APIs) or 'none'. Some providers only reach an allowlist on cheap tiers (card.network.internet, plan.internet); the engine then prices the tier that opens the network and reports the prepay or plan it takes (r.access).

## Notes
- Prices are list prices from public pages, re-checked 2026-09-28..30; unknown = not published (never assumed free or unlimited).
- Source code and data: https://github.com/ariana-dot-dev/pricemogged
`;
fs.writeFileSync(path.join(OUT, 'llms.txt'), llms);
const full = [llms, '', '# All providers', '', ...cards.map(c => { const f = feats(c); const yes = FKEYS.filter(k => f[k] === true).map(k => PM.FEATURE_LABELS[k]);
  return `## ${c.name} (${c.id})\n${c.url} · ${c.category || ''} · isolation: ${c.isolation || (c.features || {}).isolation || 'not published'}${legacy(c) ? ' · discontinued' : ''}\n` +
    priceHint(c).slice(0, 4).map(m => `- ${m.label || m.key}${m.vcpu_h != null ? `: $${m.vcpu_h}/vCPU-h` : ''}${m.ram_gib_h != null ? `, $${m.ram_gib_h}/GiB-h` : ''}${m.sizes ? ': ' + m.sizes.slice(0, 3).map(s => `${s.name} $${s.hour}/h`).join('; ') : ''}`).join('\n') +
    `\nFeatures: ${yes.join(', ') || 'none recorded'}\n`; })].join('\n');
fs.writeFileSync(path.join(OUT, 'llms-full.txt'), full);
console.log(`agent layer: ${cards.length} providers, llms.txt ${llms.length} B, llms-full.txt ${(full.length / 1024).toFixed(0)} KB`);
