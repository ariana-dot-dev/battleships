// Benchmark tables for the public Benchmarks tab, generated from research/benchmarks.json (ComputeSDK + StarSling suites).
// usage: require('./gen-bench.js')(benchmarksJson, nameOf) -> markdown
module.exports = function genBench(B, nameOf) {
  const P = B.providers, out = [];
  const src = id => (B.sources || []).find(s => s.id === id) || {};
  const num = (x, d = 0) => x == null || !isFinite(x) ? '–' : Number(x).toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: d });
  const ms = x => x == null || !isFinite(x) ? '–' : x < 1000 ? `${Math.round(x)} ms` : `${(x / 1000).toFixed(1)} s`;
  const pct = x => x == null ? '–' : `${Math.round(x * 100)}%`;
  // ids in benchmarks.json that are not a sandbox product
  const SKIP = new Set(['just-bash']);
  // ComputeSDK runs each provider's default runtime: Modal = gVisor, Daytona = container class
  const LABEL = { boat: 'boat.dev', 'modal-vm': 'Modal (VM runtime)', modal: 'Modal (gVisor, default runtime)', daytona: 'Daytona (container, default)',
    vercel: 'Vercel Sandbox', 'vercel-sandbox': 'Vercel Sandbox', upstash: 'Upstash Box', cloudflare: 'Cloudflare Sandbox', codesandbox: 'CodeSandbox',
    createos: 'CreateOS', 'createos-sandbox': 'CreateOS Sandbox', 'google-cloud-run': 'Google Cloud Run', sfcompute: 'SF Compute',
    northflank: 'Northflank', sail: 'Sail', tenki: 'Tenki', tensorlake: 'Tensorlake', novita: 'Novita', 'run-cloud': 'run.cloud', microsandbox: 'microsandbox',
    brezel: 'Brezel', 'agent-37': 'Agent37', gravixlayer: 'GravixLayer', promigence: 'Promigence', sprites: 'Sprites' };
  const name = id => LABEL[id] || nameOf(id) || id;
  // StarSling measured Daytona's VM class (its container class reported no data)
  const ssName = id => id === 'daytona' ? 'Daytona (VM class)' : name(id);

  // ---- starting sandboxes (ComputeSDK)
  const C = src('computesdk'), runs = C.runs || {};
  const burst = p => { const u = p.computesdk.burst_tti; return u && u.date === runs.burst_tti ? u : null; };
  const seq = p => { const c = p.computesdk.cold_start_tti; return c && c.date === '2026-08-07' && c.median_ms > 0 ? c : null; };
  const cs = Object.entries(P).filter(([id, p]) => !SKIP.has(id) && p.computesdk && (burst(p) || seq(p)));
  const key = p => { const u = burst(p); return u && u.median_ms != null ? u.median_ms : u ? 3e9 : 2e9 + ((seq(p) || {}).median_ms || 0); };
  cs.sort((a, b) => key(a[1]) - key(b[1]));
  out.push('## Starting sandboxes', '',
    'Time until a new sandbox runs its first command. "100 at once" starts 100 together: the median one, and the time until all 100 are ready. "One at a time" is an older run. Lower is better.', '',
    '| Provider | 100 at once: median | 100 at once: all ready | Succeeded | One at a time |', '|---|---:|---:|---:|---:|');
  for (const [id, p] of cs) {
    const c = seq(p) || {}, u = burst(p);
    out.push(`| ${name(id)} | ${u ? (u.median_ms != null ? ms(u.median_ms) : 'failed') : '–'} | ${u ? ms(u.wall_clock_ms) : '–'} | ${u ? pct(u.success_rate) : '–'} | ${ms(c.median_ms)} |`);
  }
  out.push('', `Source: [ComputeSDK benchmarks](${C.url || 'https://www.computesdk.com/benchmarks/sandboxes/'}) ([raw results](${C.raw || 'https://github.com/computesdk/benchmarks/tree/main/results'})). "100 at once" is the run of ${runs.burst_tti || '–'}. "One at a time" is the run of 2026-08-07, the latest one ComputeSDK published. Each provider runs at its own default size and runtime: for Modal that is gVisor, for Daytona the container class. "–" means not in that run. boat.dev is not in ComputeSDK, so it has no row here.`, '');

  // ---- ComputeSDK DAX: clone + install + typecheck, one job per provider, at each provider's own size
  const dx = cs.filter(([, p]) => p.computesdk.dax && p.computesdk.dax.date === runs.sandbox_dax && p.computesdk.dax.total_s != null)
    .sort((a, b) => a[1].computesdk.dax.total_s - b[1].computesdk.dax.total_s);
  if (dx.length) {
    out.push('## Clone, install and typecheck a repo', '',
      'One job per provider: clone a TypeScript repo, install its packages and typecheck it. Lower is better. Machine sizes differ: each provider runs at the size ComputeSDK picked for it, shown as the CPUs and memory the sandbox saw. Each value is a single run, so read small gaps as noise.', '',
      '| Provider | Seconds | CPUs seen | Memory seen | CPU type |', '|---|---:|---:|---:|---|');
    for (const [id, p] of dx) { const d = p.computesdk.dax, e = d.env || {};
      out.push(`| ${name(id)} | ${num(d.total_s, 0)} | ${e.logical_cpus ?? '–'} | ${e.memory_gib != null ? num(e.memory_gib, 0) + ' GiB' : '–'} | ${e.arch === 'aarch64' ? 'Arm' : e.arch === 'x86_64' ? 'x86' : '–'} |`); }
    out.push('', `Source: [ComputeSDK benchmarks](${C.url || 'https://www.computesdk.com/benchmarks/sandboxes/'}), run of ${runs.sandbox_dax}. A sandbox can see more CPUs or memory than it is billed for (host cores shown through the sandbox). Providers that failed this job in that run have no row.`, '');
  }

  // ---- StarSling: CPU + real repositories, one run, one 4 vCPU / 8 GB target
  const S = src('starsling');
  const SS = Object.entries(P).filter(([, p]) => p.starsling).map(([id, p]) => ({ id, s: p.starsling }));
  if (SS.length) {
    const sv = (s, k) => (s[k] || {}).value;
    SS.sort((a, b) => (sv(b.s, 'cpu.node_js_web_tooling') ?? -1) - (sv(a.s, 'cpu.node_js_web_tooling') ?? -1));
    const cpu = s => { const m = s['cpu.node_js_web_tooling']; if (!m) return '–';
      const tied = SS.filter(x => (x.s['cpu.node_js_web_tooling'] || {}).rank === m.rank).length > 1;
      return `${num(m.value, 2)} (rank ${m.rank}${tied ? ', shared' : ''})`; };
    const tot = (s, k, d) => { const m = s[k]; return m && m.value != null ? `${num(m.value, d)} s` : 'did not finish'; };
    out.push('## CPU speed and real repositories', '',
      'One run, every provider asked for the same 4 vCPU / 8 GB machine. The CPU column is the V8 Web Tooling Benchmark (JavaScript tools such as Babel, TypeScript and Prettier running in Node.js), in runs per second: higher is better. A rank is shared when the benchmark cannot tell the providers apart. The repo columns run three real open-source repos through their own CI steps (clone, install, lint, typecheck, build, test) on 12 fresh sandboxes each: total seconds, lower is better.', '',
      '| Provider (runtime) | CPU, runs/s | Better-Auth | Mastra | OpenClaw |', '|---|---:|---:|---:|---:|');
    for (const { id, s } of SS) out.push(`| ${ssName(id)} | ${cpu(s)} | ${tot(s, 'realworld.better_auth_total', 1)} | ${tot(s, 'realworld.mastra_total', 0)} | ${tot(s, 'realworld.openclaw_total', 0)} |`);
    out.push('', `Source: [StarSling hpc-sandbox-benchmarks, run ${S.run_id}](${S.url}) of ${S.run_date} ([CI run](${S.run})). StarSling marks this run partial (800 of 840 cells done). Values are medians across sandboxes; repo totals add up the median of each step. Providers ran on different hardware in different regions, so a gap can come from the host as well as the product. tama did not get the requested size and many of its sandboxes failed to start, so its row is not like-for-like.`, '');

    // ---- real work, same run
    const cols = [
      ['realworld.better_auth_git_clone', 'Clone a repo', x => `${num(x, 1)} s`],
      ['realworld.better_auth_cold_install', 'Install dependencies', x => `${num(x, 1)} s`],
      ['realworld.better_auth_typecheck', 'Typecheck', x => `${num(x, 0)} s`],
      ['system.pgbench_rw_s100_50c', 'Postgres writes / s', x => num(x, 0)],
      ['disk.fio_rand_read_4kb_o_direct_iops', 'Disk random reads / s', x => num(x / 1000, 0) + 'k'],
      ['memory.stream_triad', 'Memory bandwidth', x => `${num(x / 1000, 0)} GB/s`],
      ['network.iperf3_wan_download', 'Internet download', x => `${num(x / 1000, 1)} Gbit/s`],
    ];
    out.push('## Real work on a 4 vCPU / 8 GB machine', '',
      'The same run, step by step: clone, install and typecheck the Better-Auth repo, then database, disk, memory and network tests. Lower seconds and higher everything else is better. "–" means the run has no verified result for that provider.', '',
      `| Provider (runtime) | ${cols.map(c => c[1]).join(' | ')} |`, `|---|${cols.map(() => '---:').join('|')}|`);
    for (const { id, s } of SS) out.push(`| ${ssName(id)} | ${cols.map(([k, , f]) => sv(s, k) == null ? '–' : f(sv(s, k))).join(' | ')} |`);
    out.push('', `Source: [StarSling hpc-sandbox-benchmarks, run ${S.run_id}](${S.url}), ${S.run_date}, medians. boat.dev has no verified network result in this run.`, '');
    const h = P.boat && P.boat.hpc && P.boat.hpc['cpu.node_js_web_tooling'];
    if (h) out.push(`**boat.dev host classes.** Every boat sandbox in this run ran on an AMD Ryzen 9 9950X host. boat also runs some sandboxes on other hosts that this run did not measure. In the boat team's own run of 2026-08-24, a boat sandbox on a Hetzner cloud host did ${num(h.value, 2)} runs/s on the same CPU test ([results](${src('hpc').url})).`, '');
  }
  return out.join('\n');
};
