// Benchmark tables for the public Benchmarks tab, generated from research/benchmarks.json (ComputeSDK + HPC suites).
// usage: require('./gen-bench.js')(benchmarksJson, nameOf) -> markdown
module.exports = function genBench(B, nameOf) {
  const P = B.providers, out = [];
  const num = (x, d = 0) => x == null || !isFinite(x) ? '–' : Number(x).toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: d });
  const ms = x => x == null || !isFinite(x) ? '–' : x < 1000 ? `${Math.round(x)} ms` : `${(x / 1000).toFixed(1)} s`;
  const pct = x => x == null ? '–' : `${Math.round(x * 100)}%`;
  // ids in benchmarks.json that are not a sandbox product or not the provider's normal machine
  const SKIP = new Set(['just-bash']);
  // ComputeSDK and HPC ids don't always match our card ids; ComputeSDK's Daytona is the default container
  // sandbox, HPC's is the VM sandbox
  const LABEL = { 'boat-bare-metal': 'boat.dev', 'modal-vm': 'Modal (VM runtime, beta)', modal: 'Modal (default runtime)',
    vercel: 'Vercel Sandbox', upstash: 'Upstash Box', cloudflare: 'Cloudflare Sandbox', codesandbox: 'CodeSandbox',
    createos: 'CreateOS', 'createos-sandbox': 'CreateOS Sandbox', 'google-cloud-run': 'Google Cloud Run', sfcompute: 'SF Compute',
    northflank: 'Northflank', sail: 'Sail', tenki: 'Tenki', tensorlake: 'Tensorlake', novita: 'Novita', 'run-cloud': 'Run Cloud', microsandbox: 'microsandbox' };
  const name = id => LABEL[id] || nameOf(id) || id;
  const hpcName = id => id === 'daytona' ? 'Daytona (VM sandbox)' : name(id);

  // ---- starting sandboxes
  const cs = Object.entries(P).filter(([id, p]) => !SKIP.has(id) && p.computesdk && ((p.computesdk.cold_start_tti || {}).median_ms > 0 || (p.computesdk.burst_tti || {}).median_ms > 0));
  cs.sort((a, b) => ((a[1].computesdk.cold_start_tti || {}).median_ms ?? 1e9) - ((b[1].computesdk.cold_start_tti || {}).median_ms ?? 1e9));
  out.push('## Starting sandboxes', '',
    'Time until a new sandbox runs a command. "100 at once" starts 100 together: the typical one, and the time until all 100 are ready.', '',
    '| Provider | One sandbox | 100 at once: typical | 100 at once: all ready | Succeeded |', '|---|---:|---:|---:|---:|');
  for (const [id, p] of cs) { const c = p.computesdk.cold_start_tti || {}, u = p.computesdk.burst_tti || {};
    out.push(`| ${name(id)} | ${ms(c.median_ms)} | ${ms(u.median_ms)} | ${ms(u.wall_clock_ms)} | ${pct(u.success_rate ?? c.success_rate)} |`); }
  out.push('', 'Source: [ComputeSDK benchmarks](https://github.com/computesdk/computesdk), latest runs to 2026-09-25. boat.dev is not in ComputeSDK yet, so it has no row here.', '');

  // ---- real repositories end to end (StarSling run, all providers on the same 4 vCPU / 8 GB target)
  const S = Object.entries(P).filter(([, p]) => p.starsling).map(([id, p]) => ({ id, s: p.starsling }));
  if (S.length) {
    const sv = (s, k) => (s[k] || {}).value;
    S.sort((a, b) => (sv(a.s, 'realworld.better_auth_total') ?? 1e9) - (sv(b.s, 'realworld.better_auth_total') ?? 1e9));
    const best = k => Math.min(...S.map(x => sv(x.s, k)).filter(x => x != null));
    const rel = (x, k, lower) => x == null ? '–' : (lower ? x / best(k) : Math.max(...S.map(y => sv(y.s, k)).filter(v => v != null)) / x);
    const cell = (x, k, lower, d) => x == null ? '–' : `${num(x, d)}${lower ? ' s' : ''}${(lower ? x === best(k) : x === Math.max(...S.map(y => sv(y.s, k)).filter(v => v != null))) ? ' (fastest)' : ` (×${rel(x, k, lower).toFixed(2)})`}`;
    out.push('## Real repositories, end to end', '',
      'Three real open-source repos run through their own CI (clone, install, lint, typecheck, build, test) on 12 fresh sandboxes per provider, all at 4 vCPU / 8 GB. Lower is better; ×N is how many times slower than the fastest.', '',
      '| Provider | Better Auth | Mastra | OpenClaw | CPU (Node.js, runs/s) |', '|---|---:|---:|---:|---:|');
    for (const { id, s } of S) out.push(`| ${s.label === 'boat' ? 'boat.dev' : s.label} | ${cell(sv(s, 'realworld.better_auth_total'), 'realworld.better_auth_total', true, 1)} | ${cell(sv(s, 'realworld.mastra_total'), 'realworld.mastra_total', true, 0)} | ${cell(sv(s, 'realworld.openclaw_total'), 'realworld.openclaw_total', true, 0)} | ${cell(sv(s, 'cpu.node_js_web_tooling'), 'cpu.node_js_web_tooling', false, 2)} |`);
    out.push('', 'Source: [StarSling hpc-sandbox-benchmarks](https://starsling.dev/hpc-sandbox-benchmarks), run of 2026-09-29 ([raw data](https://github.com/starslingdev/hpc-sandbox-benchmarks)). tama had provisioning failures and did not finish OpenClaw.', '');
  }

  // ---- real work on the same machine
  const H =['boat-bare-metal', 'blaxel', 'daytona', 'novita', 'e2b', 'modal-vm', 'modal'].filter(id => P[id] && P[id].hpc);
  const v = (id, k) => (P[id].hpc[k] || {}).value;
  const cols = [
    ['realworld.better_auth_git_clone', 'Clone a repo', x => `${num(x, 1)} s`],
    ['realworld.better_auth_cold_install', 'Install dependencies', x => `${num(x, 0)} s`],
    ['realworld.better_auth_typecheck', 'Typecheck', x => `${num(x, 0)} s`],
    ['system.pgbench_rw_s100_50c', 'Postgres writes / s', x => num(x, 0)],
    ['disk.fio_rand_read_4kb_o_direct_iops', 'Disk random reads / s', x => num(x / 1000, 0) + 'k'],
    ['memory.stream_triad', 'Memory bandwidth', x => `${num(x / 1000, 0)} GB/s`],
    ['network.iperf3_wan_download', 'Internet download', x => `${num(x / 1000, 1)} Gbit/s`],
  ];
  out.push('## Real work on a 4 vCPU / 8 GB machine', '',
    'The same steps on each provider: clone, install and typecheck a real TypeScript repo (Better-Auth), then database, disk, memory and network tests. Lower seconds and higher everything else is better.', '',
    `| Provider | ${cols.map(c => c[1]).join(' | ')} |`, `|---|${cols.map(() => '---:').join('|')}|`);
  for (const id of H) out.push(`| ${hpcName(id)} | ${cols.map(([k, , f]) => v(id, k) == null ? '–' : f(v(id, k))).join(' | ')} |`);
  out.push('', 'Source: [hpc-sandbox-benchmarks](https://github.com/AnicetNgrt/hpc-sandbox-benchmarks), published by the boat.dev team; medians, boat.dev on 2026-08-24, the others in July. boat.dev is its standard machine.', '');
  return out.join('\n');
};
