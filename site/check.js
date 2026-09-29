// Sanity check: price every card under the page's presets and print a ranking. usage: node site/check.js [preset]
const fs = require('fs'), path = require('path');
require('./engine.js');
const PM = globalThis.PM;
const dir = path.join(__dirname, '..', 'research', 'cards');
const cards = fs.readdirSync(dir).filter(f => f.endsWith('.json')).map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
const base = { disk: 20, os: 'linux', arch: 'any', gpu: 'none', gpuCount: 1, ipv4: 0, seats: 1, persistentDisk: false, snapshotGiB: 0, egress: 0, alwaysOn: 0 };
const P = {
  agents: { vcpu: 4, ram: 8, sessions: 1100, sessionMin: 480, concurrency: 50, cpuUtil: .3, ramUtil: .6, snapshotGiB: 250, egress: 100, seats: 3, persistentDisk: true },
  interp: { vcpu: 1, ram: 2, disk: 5, sessions: 200000, sessionMin: 1, concurrency: 100, cpuUtil: .2, ramUtil: .3, egress: 20 },
  devbox: { vcpu: 4, ram: 8, disk: 50, sessions: 0, sessionMin: 0, concurrency: 0, alwaysOn: 1, cpuUtil: .1, ramUtil: .5, egress: 50, ipv4: 0, persistentDisk: true },
  gpu: { vcpu: 8, ram: 32, disk: 100, sessions: 500, sessionMin: 30, concurrency: 10, cpuUtil: .5, ramUtil: .6, gpu: 'H100' },
};
for (const k of process.argv[2] ? [process.argv[2]] : Object.keys(P)) {
  const W = Object.assign({}, base, P[k]);
  console.log(`\n== ${k}`);
  const rs = cards.map(c => { try { return PM.priceCard(c, W, { credits: true }); } catch (e) { return { card: c, eligible: false, reasons: ['CRASH ' + e.stack.split('\n').slice(0, 2).join(' ')] }; } });
  rs.filter(r => r.eligible).sort((a, b) => a.total - b.total).forEach(r =>
    console.log(`${r.card.id.padEnd(24)} $${r.total.toFixed(2).padStart(10)}  ${r.modeLabel} | ${r.plan} | ${JSON.stringify(Object.fromEntries(Object.entries(r.breakdown).map(([a, b]) => [a, +b.toFixed(2)])))}${r.caveats.length ? ' | ' + r.caveats.join('; ') : ''}`));
  rs.filter(r => !r.eligible).forEach(r => console.log(`  x ${r.card.id}: ${r.reasons.join('; ')}`));
}
