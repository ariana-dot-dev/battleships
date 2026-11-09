// Run with node --test site/engine.test.js. Rates are from Tangle's public pricing JSON.
const assert = require('node:assert/strict');
const { test } = require('node:test');
require('./engine.js');
const { priceCard } = globalThis.PM;

const workload = { vcpu: 1, ram: 1, disk: 10, os: 'linux', arch: 'any', gpu: 'none', gpuCount: 1,
  sessions: 1, sessionMin: 60, concurrency: 1, alwaysOn: 0, cpuUtil: 1, ramUtil: 1,
  idleShare: 0, snapshotGiB: 0, egress: 0, ipv4: 0, seats: 1, persistentDisk: false };
const options = { credits: false, idleSuspend: false, perf: false };
const card = () => ({ id: 'hourly-minimum', name: 'Hourly minimum', category: 'agent-sandbox',
  modes: [{ key: 'general', pricing: 'resource', cpu_basis: 'alloc', ram_basis: 'alloc',
    vcpu_h: 0.010445613415710504, ram_gib_h: 0.007050789055604591,
    min_charge_hour_usd: 0.04, granularity_s: 1 }],
  storage: { included_disk_gib: 0, disk_gib_month: 0.5361537511032656 },
  plans: [{ name: 'Pay as you go', fee: 0, concurrency: 1 }], features: {} });
const price = (c = card(), w = {}, opts = {}) => {
  const result = priceCard(c, { ...workload, ...w }, { ...options, ...opts });
  assert.equal(result.eligible, true, JSON.stringify(result.reasons));
  return result;
};
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-12,
  `expected $${expected}, received $${actual}`);

test('a small allocation pays the combined CPU, memory and running disk hourly minimum', () => {
  near(price().total, 0.04);
});

test('the hourly minimum is prorated per second rather than charged per session', () => {
  near(price(undefined, { sessionMin: 1 }).total, 0.04 / 60);
  near(price(undefined, { sessionMin: 1 / 60 }).total, 0.04 / 3600);
  near(price(undefined, { sessions: 2, sessionMin: 30 }).total, 0.04);
});

test('a larger allocation keeps its published CPU, memory and disk charges', () => {
  near(price(undefined, { vcpu: 4, ram: 8, disk: 40 }).total, 0.12756705383936454);
});

test('zero running time incurs no allocation minimum', () => {
  near(price(undefined, { sessionMin: 0 }).total, 0);
  near(price(undefined, { sessions: 0, sessionMin: 0, concurrency: 0 }).total, 0);
});

test('an always-on allocation pays the hourly minimum for 730 hours', () => {
  near(price(undefined, { sessions: 0, sessionMin: 0, concurrency: 0, alwaysOn: 1 }).total, 29.2);
});

test('the floor is applied before choosing between resource modes', () => {
  const c = card();
  c.modes.push({ key: 'lower-total', pricing: 'resource', cpu_basis: 'alloc', ram_basis: 'alloc',
    vcpu_h: 0.025, ram_gib_h: 0.005, granularity_s: 1 });
  const r = price(c);
  assert.deepEqual(r.modeKeys, ['lower-total']);
  near(r.total, 0.03734457193292145);
});

test('omitting the optional minimum preserves resource pricing', () => {
  const c = card();
  delete c.modes[0].min_charge_hour_usd;
  near(price(c).total, 0.024840974404236542);
});

test('idle suspension reduces running time charged at the hourly minimum', () => {
  const c = card();
  c.features.auto_stop_idle = true;
  near(price(c, { idleShare: 0.5 }, { idleSuspend: true, idleCapture: 1 }).total, 0.02);
});

// ---- fairness model (FAIRNESS.md)
const { priceSoft, testFeature, rankRows, cardChecked, isStale, diyHow, DIY } = globalThis.PM;
test('a required "diy" feature is a match with your own setup, not a missing feature', () => {
  const c = card(); c.features.desktop = 'diy';
  c.feature_evidence = { desktop: { value: 'diy', source: 'https://example.com/vnc', quote: 'q', how: 'install Xvfb + noVNC', effort: 'medium', checked: '2026-11-08' } };
  assert.equal(testFeature(c.features, 'desktop'), DIY);
  const r = priceSoft(c, workload, { ...options, required: ['desktop'] });
  assert.equal(r.eligible, true); assert.ok(!r.soft, JSON.stringify(r.compromises)); assert.deepEqual(r.diy, ['desktop']);
  assert.equal(diyHow(c).desktop.how, 'install Xvfb + noVNC');
});
test('a "diy" row is a full match, ranked after the full matches that include the feature', () => {
  const cheap = card(); cheap.id = 'cheap'; cheap.features.desktop = 'diy';
  const dear = card(); dear.id = 'dear'; dear.features.desktop = true; dear.modes[0].vcpu_h *= 3;
  const o = { ...options, required: ['desktop'] };
  const R = rankRows([priceSoft(cheap, workload, o), priceSoft(dear, workload, o)], workload);
  assert.deepEqual(R.meets.map(r => r.card.id), ['dear', 'cheap']); assert.equal(R.soft.length, 0);
});
test('a snapshot you restore yourself counts as persistence; a false feature stays missing', () => {
  assert.equal(testFeature({ persist_scope: 'snapshot' }, 'persistent_disk'), DIY);
  assert.equal(testFeature({ persist_scope: 'snapshot' }, 'whole_disk'), DIY);
  assert.equal(testFeature({ persist_scope: 'snapshot', persist_path: '/workspace' }, 'whole_disk'), false);
  const c = card(); c.features.persist_scope = 'snapshot'; c.features.snapshot = 'fs';
  const r = priceSoft(c, { ...workload, persistentDisk: true }, options);
  assert.ok(!r.soft, JSON.stringify(r.compromises)); assert.deepEqual(r.diy, ['persistent_disk']);
  const d = card(); d.features.desktop = false;
  assert.equal(priceSoft(d, workload, { ...options, required: ['desktop'] }).soft, true);
});
test('start caps of the chosen plan are reported; checked date and staleness come from the card', () => {
  const c = card(); c.plans = [{ name: 'Pro', fee: 0, concurrency: 10, max_starts_per_min: 12, max_starts_per_day: 200 }];
  assert.deepEqual(price(c).startLimits, { plan: 'Pro', per_min: 12, per_hour: null, per_day: 200 });
  c.feature_evidence = { a: { checked: '2026-09-01' }, b: { checked: '2026-10-14' } }; c.audit_2026_09_29 = {};
  assert.equal(cardChecked(c), '2026-10-14');
  assert.equal(isStale('2026-10-14', '2026-11-08'), false); assert.equal(isStale('2026-09-29', '2026-11-08'), true);
});

test('plan credits apply after the allocation minimum', () => {
  const c = card();
  c.plans = [{ name: 'Credit plan', fee: 0.02, included_usd: 0.01, concurrency: 1 }];
  const r = price(c);
  near(r.total, 0.05);
  near(r.breakdown.included, -0.01);
});
