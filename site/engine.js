// Pricemogged estimator engine. Pure functions; consumes engine cards (research/ENGINE_CARD.md).
(function (root) {
  const HOURS_MONTH = 730;
  const num = (x, d = 0) => (typeof x === 'number' && isFinite(x) ? x : d);
  const known = x => typeof x === 'number' && isFinite(x);

  const FEATURE_LABELS = {
    snapshot_any: 'snapshots', snapshot_mem: 'memory snapshots', fork: 'fork/clone', pause_resume: 'pause/resume',
    persistent_disk: 'persistent disk', volumes: 'volumes', auto_stop_idle: 'idle auto-stop', long_sessions: '≥24 h sessions',
    custom_image: 'custom image (Docker or snapshot)', image_snapshot: 'start from your own snapshot', image_oci: 'your own Docker/OCI image',
    vm_isolation: 'full VM (own kernel)', docker_inside: 'Docker inside', nested_virt: 'nested virtualization', root: 'root', systemd: 'systemd',
    browser: 'browser', desktop: 'desktop GUI', computer_use: 'computer-use API', code_interpreter: 'code interpreter',
    browser_control: 'browser automation API', desktop_control: 'desktop control API', browser_and_desktop: 'browser + desktop control',
    anti_bot: 'anti-bot stealth', captcha_solving: 'CAPTCHA solving', residential_ip: 'residential IPs',
    agent_harnesses: 'preinstalled agents', ssh: 'SSH', public_ipv4: 'public IPv4', inbound_https: 'HTTPS preview URLs',
    custom_domain: 'custom domains', raw_tcp_inbound: 'raw TCP inbound', egress_allowlist: 'egress allowlist', open_internet: 'open internet',
    static_egress_ip: 'static egress IP', private_network: 'private networking', self_host: 'self-hosting', byoc: 'BYOC',
    open_source: 'open source', soc2: 'SOC 2', hipaa: 'HIPAA', sso: 'SSO', gpu: 'GPU', arm64: 'arm64',
    windows: 'Windows', macos: 'macOS',
    lang_python: 'Python', lang_node: 'Node.js', lang_go: 'Go', lang_rust: 'Rust', lang_java: 'Java',
    gpu_desktop: 'GPU desktop', credential_injection: 'credential injection', egress_http_rules: 'HTTP method/path egress rules',
    wake_on_request: 'wake on request', live_resize: 'live resize', fork_running: 'live fork (no pause)',
    memory_snapshot_fork: 'memory fork', webhooks: 'webhooks', scheduled_wakeups: 'scheduled runs (cron)',
    audit_logs: 'audit logs', eu_data_residency: 'EU data residency', zero_data_retention: 'zero data retention',
    scoped_api_keys: 'scoped API keys', spend_limits: 'spend limits', mcp_server: 'MCP server',
    // agent infrastructure (feature pass 2026-09-29): see FEAT_WHY in the page for what each one means
    snapshot_auto: 'automatic snapshots', snapshot_on_demand: 'snapshots on demand', harness_api: 'agent harness API',
    own_agent_api: 'hosted agent API (their own agent)', fast_boot: 'fast boot (benchmarked)', strong_isolation: 'gVisor or VM (no shared kernel)',
    ingress_rules: 'inbound access rules', guest_firewall: 'firewall inside (nftables)', secret_proxy: 'secret proxy',
    secret_proxy_any: 'secret proxy for any API', volume_attach: 'extra volumes', volume_shared: 'shared volumes',
  };

  // ---- features -------------------------------------------------------------
  const FEATURE_TESTS = {
    // a custom starting image is either a Docker/OCI image or a saved machine you start new ones from (snapshot):
    // a provider without Docker images but with snapshots (boat.dev, Hetzner) still gives you your own image
    image_oci: f => f.image_oci != null ? f.image_oci === true : (['dockerfile', 'oci-image'].includes(f.custom_image) ? true : null),
    // a real VM boundary (own kernel): microVMs and VMs yes; containers, gVisor, isolates no
    vm_isolation: f => { const i = String(f.isolation || ''); if (!i) return null;
      return /firecracker|cloud-hypervisor|qemu|kata|hyper-v|microvm|bare-metal|apple-vm|dedicated|\bvm\b/.test(i) ? true : /container|gvisor|isolate|wasm/.test(i) ? false : null; },
    custom_image: f => { const ci = f.custom_image, img = ci === true || f.image_oci === true || (typeof ci === 'string' && ci !== 'none'), snap = f.snapshot != null && f.snapshot !== 'none';
      return img || snap ? true : (ci === false || ci === 'none') && f.snapshot === 'none' ? false : null; },
    image_snapshot: f => f.snapshot == null ? null : f.snapshot !== 'none',
    // agents can drive both a browser and a whole desktop (not just one of them)
    browser_and_desktop: f => { const b = f.browser_control ?? f.browser, d = f.desktop_control ?? f.computer_use; return b === true && d === true ? true : (b === false || d === false) ? false : null; },
    residential_ip: f => f.egress_ip_type == null ? null : /residential|mobile/.test(String(f.egress_ip_type)),
    snapshot_any: f => f.snapshot == null ? null : f.snapshot !== 'none',
    // "mem" = memory snapshots; an explicit snapshot_mem wins; a bare `true` says snapshots exist but not which kind
    snapshot_mem: f => typeof f.snapshot_mem === 'boolean' ? f.snapshot_mem : f.snapshot == null || f.snapshot === true ? null : f.snapshot === 'mem',
    long_sessions: f => f.max_session_h === undefined ? null : (f.max_session_h === null || f.max_session_h >= 24),
    // not a plain shared-kernel container: a VM/microVM (own kernel), gVisor (user-space kernel in front of the host's) or a
    // language isolate. A container escape only needs one host-kernel bug; these need a hypervisor or sandbox-kernel bug first.
    strong_isolation: f => { const i = String(f.isolation || ''); if (!i) return null; if (FEATURE_TESTS.vm_isolation(f) === true || /gvisor|kata|isolate|wasm/.test(i)) return true;
      return /container/.test(i) ? false : null; },
    // a proxy that adds your credentials to outbound requests, so the secret never enters the machine:
    // "any-http" covers any API you register, "ai-only" just model-provider keys
    secret_proxy: f => f.secret_proxy == null ? null : f.secret_proxy === 'any-http' || f.secret_proxy === 'ai-only' || f.secret_proxy === true,
    secret_proxy_any: f => f.secret_proxy == null ? null : f.secret_proxy === 'any-http',
    // nftables inside needs root and a kernel of its own; documented or not, every VM/microVM with root has it
    guest_firewall: f => f.guest_firewall != null ? f.guest_firewall === true
      : (FEATURE_TESTS.vm_isolation(f) === true && f.root === true ? true : null),
    volumes: f => f.volume_attach === true || f.volume_shared === true ? true : f.volumes == null ? (f.volume_attach === false && f.volume_shared === false ? false : null) : !!f.volumes,
  };
  function testFeature(features, key) {
    const f = features || {};
    if (FEATURE_TESTS[key]) return FEATURE_TESTS[key](f);
    const v = f[key];
    if (v === undefined || v === null) return null;
    if (Array.isArray(v)) return v.length > 0;
    return !!v;
  }
  // A full virtual machine (plain VM / dedicated server, or a microVM with its own kernel and root) runs Docker and has
  // root + SSH-able userland by construction: don't call those "unverified" just because a docs page never says so.
  const VM_ISOLATION = /firecracker|cloud-hypervisor|qemu|bare-metal|kvm|microvm|\bvm\b/i;
  // merged card + mode features; depends only on card data, so it is cached per (card, mode) object and returned frozen
  const featCache = new WeakMap();
  const modeFeatures = (card, m) => {
    const key = m || card, hit = featCache.get(key);
    if (hit && hit.card === card && hit.cf === card.features && hit.mf === (m && m.features)) return hit.f;
    const f = Object.assign({}, card.features || {}, (m && m.features) || {});
    const cls = productClass(card, m);
    const isVM = ['vm', 'dedicated'].includes(cls) || (f.root === true && VM_ISOLATION.test(String(f.isolation || card.isolation || '')));
    if (isVM) for (const k of ['docker_inside', 'root']) if (f[k] === null || f[k] === undefined) f[k] = true;
    Object.freeze(f);
    featCache.set(key, { card, cf: card.features, mf: m && m.features, f });
    return f;
  };

  // ---- regime flags ------------------------------------------------------------
  // spot (interruptible), sales (negotiated / contact-sales / annual commit), alt (adjacent product: DIY containers,
  // batch jobs), beta, legacy (superseded, never priced), addon (not a plan). Explicit `flags` win; else inferred.
  function flagsOf(x) {
    // anything labelled legacy / retired is never priced, whatever flags a card set
    const lbl = `${x.key || ''} ${x.label || ''} ${x.name || ''}`;
    if (/\blegacy\b|deprecated|retired|grandfathered/i.test(lbl)) return [...new Set([...(x.flags || []), 'legacy'])];
    if (Array.isArray(x.flags)) return x.flags;
    const t = `${x.key || ''} ${x.label || ''} ${x.name || ''}`.toLowerCase();
    const f = [];
    if (/\bspot\b|preempt|evict|interruptible/.test(t)) f.push('spot');
    if (/enterprise|sales|contact|negotiat|annual commit|custom contract|^custom$/.test(t)) f.push('sales');
    if (/\bbatch\b|\bjobs?\b|non-interactive|diy|services \(|container rates/.test(t)) f.push('alt');
    if (/legacy|deprecated|retired/.test(t)) f.push('legacy');
    if (/add-on|addon/.test(t)) f.push('addon');
    return f;
  }
  function allowed(x, opts) {
    const f = flagsOf(x);
    if (f.includes('legacy') || f.includes('addon')) return false;
    if (f.includes('spot') && !opts.allowSpot) return false;
    if (f.includes('sales') && !opts.allowSales) return false;
    if (f.includes('alt') && !opts.allowAlt) return false;
    if (f.includes('promo') && !opts.allowPromo) return false;
    return true;
  }
  function modeOS(card, m) {
    // an empty os list means "OS doesn't apply" (browser sessions run server-side on Linux)
    if (Array.isArray(m.os) && m.os.length) return m.os;
    if (card.category === 'macos') return ['macos'];
    if (card.category === 'windows') return ['windows'];
    return ['linux'];
  }
  // What a regime IS (not whether it's "adjacent" — that depends on the question being asked).
  function productClass(card, m) {
    if (m && m.product_class) return m.product_class;
    if (card.product_class) return card.product_class;
    const t = `${(m && m.key) || ''} ${(m && m.label) || ''}`.toLowerCase(), cat = card.category;
    if (cat === 'browser') return 'browser';
    if (/\brunner|\bci\b|actions|pipelines|codebuild|cloud build|build minutes/.test(t)) return 'ci-runner';
    if (/interpreter|code.?exec/.test(t)) return 'code-interpreter';
    if (/byoc|bring your own|self-hosted (compute|runner)/.test(t)) return 'byoc';
    if (/\bdiy\b|container rates|\bservices?\b \(|web service|background worker|deploy(ed|ment)s?\b/.test(t)) return 'paas';
    if (/\bbatch\b|\bjobs?\b|serverless function/.test(t) && cat !== 'agent-sandbox') return 'paas-job';
    if (cat === 'self-host') return 'reference';
    if (cat === 'macos' || cat === 'windows') return 'desktop-vm';
    if (cat === 'agent-sandbox') return 'sandbox-api';
    if (cat === 'dev-env') return 'dev-env';
    if (cat === 'gpu-cloud') return m && num(m.gpu_min_count, 1) > 1 ? 'gpu-node' : (m && m.gpu && Object.values(m.gpu).some(known) ? 'gpu-instance' : 'vm');
    if (cat === 'paas') return /batch|\bjobs?\b|worker|function|lambda|task/.test(t) ? 'paas-job' : 'paas';
    if (cat === 'hyperscaler') return /dedicated|metal|bare/.test(t) ? 'dedicated' : 'vm';
    return 'other';
  }
  const CLASS_LABEL = { 'sandbox-api': 'sandbox API', 'code-interpreter': 'code interpreter', 'ci-runner': 'CI runner', vm: 'VM', dedicated: 'dedicated server',
    'dev-env': 'dev environment', browser: 'browser session', 'desktop-vm': 'desktop VM', 'gpu-instance': 'GPU instance', 'gpu-node': 'multi-GPU node',
    paas: 'app platform', 'paas-job': 'batch / job platform', byoc: 'bring-your-own-cloud fee', reference: 'self-host reference', other: 'other product' };
  // alt means "different product" — unless this workload's question is exactly that product class
  const altIgnored = (card, m, W) => Array.isArray(W && W.classes) && W.classes.includes(productClass(card, m));

  const isGpuOnly = m => m.gpu_only === true || (m.gpu_only === undefined && /gpu/i.test(`${m.key} ${m.label}`));

  // ---- shape a machine for a resource-priced mode --------------------------
  function shapeResource(m, W) {
    let v = Math.max(W.vcpu, num(m.min_vcpu, 0));
    let ram = W.ram;
    const fixed = m.ram_fixed_per_vcpu;
    const [rmin, rmax] = Array.isArray(m.ram_per_vcpu) ? m.ram_per_vcpu : [null, null];
    const snapV = x => {
      if (Array.isArray(m.vcpu_options) && m.vcpu_options.length) {
        const o = m.vcpu_options.filter(n => n >= x).sort((a, b) => a - b)[0];
        return o === undefined ? null : o;
      }
      return x;
    };
    for (let i = 0; i < 4; i++) {
      v = snapV(v);
      if (v == null && W.clampShape) { v = Math.max(...m.vcpu_options); ram = Math.min(ram, known(fixed) ? v * fixed : ram); var clampedV = true; }
      if (v == null) return { error: `needs ${W.vcpu} vCPU, largest option is ${Math.max(...m.vcpu_options)}` };
      if (known(fixed)) { if (v * fixed < ram) { v = Math.ceil(ram / fixed); continue; } ram = v * fixed; }
      if (known(rmin) && ram < v * rmin) ram = v * rmin;
      if (known(rmax) && ram > v * rmax) { v = Math.ceil(ram / rmax); continue; }
      break;
    }
    let clamped = typeof clampedV !== 'undefined' && !!clampedV;
    if (known(m.max_vcpu) && v > m.max_vcpu) { if (!W.clampShape) return { error: `max ${m.max_vcpu} vCPU per sandbox` }; v = m.max_vcpu; clamped = true; }
    if (known(m.max_ram_gib) && ram > m.max_ram_gib) { if (!W.clampShape) return { error: `max ${m.max_ram_gib} GiB RAM per sandbox` }; ram = m.max_ram_gib; clamped = true; }
    return { vcpu: v, ram, clamped, label: `${v} vCPU / ${+ram.toFixed(2)} GiB` };
  }
  // ---- GPUs: exact aliases (same chip, naming differs) and a rough performance ladder for fallbacks
  const GPU_ALIAS = { 'H100': ['H100', 'H100-SXM', 'H100-PCIe', 'H100-NVL'], 'A100-80GB': ['A100-80GB', 'A100-SXM-80GB', 'A100-80GB-SXM'],
    'A10': ['A10', 'A10G'], 'RTX-6000-Ada': ['RTX-6000-Ada', 'L40'] };
  const GPU_TIER = ['T4', '16GB-class', 'L4', 'A10', 'A10G', 'RTX-A5000', 'RTX-3090', 'RTX-4000-SFF-ADA', 'A40', 'RTX-A6000', 'RTX-PRO-6000-MIG-24GB',
    'L40', 'RTX-6000-Ada', 'L40S', 'RTX-4090', 'RTX-PRO-4500', 'RTX-5090', 'A100-40GB', 'RTX-PRO-6000-MIG-48GB', 'A100-80GB', 'A100-SXM-80GB', 'A100-80GB-SXM',
    'RTX-PRO-6000', 'H100-PCIe', 'H100-NVL', 'H100', 'H200', 'MI355X', 'B200', 'B300'];
  function gpuLookup(m, want, fallback) {
    const g = m.gpu || {};
    if (known(g[want])) return { type: want, price: g[want] };
    const al = Object.entries(GPU_ALIAS).find(([k, v]) => k === want || v.includes(want));
    if (al) for (const n of al[1]) if (known(g[n])) return { type: n, price: g[n] };
    if (!fallback) return null;
    const have = Object.keys(g).filter(n => known(g[n]));
    if (!have.length) return null;
    const ti = n => GPU_TIER.indexOf(n);
    const t = ti(want);
    if (t < 0) return null;
    // only a close substitute: a GPU at least as capable, or at most 4 rungs below (never a T4 for an H100)
    const near = have.filter(n => ti(n) >= 0 && ti(n) >= t - 4);
    if (!near.length) return null;
    const best = near.sort((a, b) => (Math.abs(ti(a) - t) - Math.abs(ti(b) - t)) || (ti(b) - ti(a)))[0];
    return { type: best, price: g[best], fallback: true };
  }

  // alloc = what you reserve; active = average actually used; peak = highest usage in the billing window
  // (e.g. AgentCore memory, exe.dev hourly CPU peak); max = max(requested, used) with request = size → 1.
  const basisFactor = (basis, util, floor, peak) =>
    basis === 'active' ? Math.max(util, num(floor, 0))
    : basis === 'peak' ? Math.max(known(peak) ? peak : 1, util, num(floor, 0))
    : 1;

  // Hourly running cost of one instance in a mode, split by component.
  function hourly(m, W, card) {
    const parts = { compute: 0, memory: 0, gpu: 0, licence: 0 };
    let shape, diskIncluded = num(card.storage && card.storage.included_disk_gib, 0), monthCap = null;
    if (m.pricing === 'sizes') {
      if (!Array.isArray(m.sizes)) return { error: 'size list not published' };
      let fits = (m.sizes || []).filter(s => s.vcpu >= W.vcpu && s.ram_gib >= W.ram && known(s.hour)), clamped = false;
      // sessions sold without a published machine size (browser-hours, agent sessions): usable, flagged
      if (!fits.length) {
        const un = (m.sizes || []).filter(s => known(s.hour) && (s.vcpu == null || s.ram_gib == null));
        // a published half of the shape still has to fit (e.g. memory tiers sold without a vCPU count)
        const half = un.filter(s => (s.vcpu == null || s.vcpu >= W.vcpu) && (s.ram_gib == null || s.ram_gib >= W.ram));
        fits = half.length ? half : un;
      }
      if (!fits.length && W.clampShape) { // compromise: the biggest preset on offer
        const all = (m.sizes || []).filter(s => known(s.hour)).sort((a, b) => (b.vcpu * 4 + b.ram_gib) - (a.vcpu * 4 + a.ram_gib));
        if (all.length) { fits = [all[0]]; clamped = true; }
      }
      if (!fits.length) return { error: `no preset with ≥${W.vcpu} vCPU and ≥${W.ram} GiB` };
      // a size may add a per-vCPU rate billed on usage (Upstash PAYG: $/active core-h depends on the box size)
      const sizeH = s => s.hour + (known(s.vcpu_h) && known(s.vcpu) ? s.vcpu * s.vcpu_h * basisFactor(m.cpu_basis, W.cpuUtil, m.active_floor, W.cpuPeakUtil) : 0);
      const s = fits.sort((a, b) => sizeH(a) - sizeH(b))[0];
      parts.compute = sizeH(s); monthCap = known(s.month_cap) ? s.month_cap : null;
      if (known(s.disk_gib)) diskIncluded = s.disk_gib;
      const unsized = s.vcpu == null || s.ram_gib == null;
      shape = { vcpu: s.vcpu, ram: s.ram_gib, name: s.name, clamped, unsized,
        label: unsized ? `${s.name} (size not published)` : `${s.name} (${s.vcpu} vCPU / ${s.ram_gib} GiB)` };
    } else {
      shape = shapeResource(m, W);
      if (shape.error) return shape;
      if (!known(m.vcpu_h) && !known(m.ram_gib_h) && !known(m.instance_h)) return { error: 'no published per-resource rate' };
      // instance_h: flat $ per running machine-hour on top of the resource rates (smol-machines)
      parts.compute = shape.vcpu * num(m.vcpu_h) * basisFactor(m.cpu_basis, W.cpuUtil, m.active_floor, W.cpuPeakUtil) + num(m.instance_h);
      parts.memory = shape.ram * num(m.ram_gib_h) * basisFactor(m.ram_basis, W.ramUtil, m.active_floor, W.ramPeakUtil);
    }
    let gpuNote = null;
    if (W.gpu && W.gpu !== 'none') {
      const g = gpuLookup(m, W.gpu, W.gpuFallback);
      if (!g) return { error: `no ${W.gpu} GPU` };
      // some offers only come as whole nodes (e.g. 8 GPUs): you pay for the node
      const nGpu = Math.max(W.gpuCount, num(m.gpu_min_count, 1));
      parts.gpu = g.price * nGpu;
      if (nGpu > W.gpuCount) gpuNote = `sold as ${nGpu}-GPU nodes only`;
      if (g.type !== W.gpu) gpuNote = (gpuNote ? gpuNote + '; ' : '') + (g.fallback ? `no ${W.gpu}: priced with ${g.type}` : `${W.gpu} sold as ${g.type}`);
    }
    if (W.os === 'windows' && known(m.windows_vcpu_h)) parts.licence = shape.vcpu * m.windows_vcpu_h;
    // asked for more than the largest machine: price enough of the largest machines to hold that capacity, so a capped
    // (flagged) row never looks cheaper than an honest bigger machine elsewhere, or than this provider's own bigger size
    if (shape && shape.clamped && known(shape.vcpu) && known(shape.ram) && shape.vcpu > 0 && shape.ram > 0) {
      const k = Math.max(1, W.vcpu / shape.vcpu, W.ram / shape.ram);
      if (k > 1) { for (const key in parts) parts[key] *= k; shape = Object.assign({}, shape, { capacityFactor: k }); }
    }
    const mult = num(m.multiplier, 1);
    for (const k in parts) parts[k] *= mult;
    const total = parts.compute + parts.memory + parts.gpu + parts.licence;
    return { parts, total, shape, diskIncluded, monthCap, gpuNote };
  }

  const addInto = (a, b, f = 1) => { for (const k in b) a[k] = (a[k] || 0) + b[k] * f; return a; };
  function sumB(b) { let s = 0; for (const k in b) s += b[k]; return s; }

  // Price the sessions part and the always-on part for one mode.
  function priceMode(card, m, W, opts, perfFactor) {
    const h = hourly(m, W, card);
    if (h.error) return { error: h.error };
    const out = { mode: m, shape: h.shape, notes: [], diskIncluded: h.diskIncluded };
    if (h.gpuNote) out.notes.push(h.gpuNote);
    if (h.shape && h.shape.clamped) out.notes.push(`largest size is ${h.shape.label}`);
    if (h.shape && h.shape.unsized) out.notes.push('machine size per session not published');
    if (W.sessions > 0) {
      if (m.requires_always_on) out.burstError = 'commit regime only covers always-on instances';
      else {
        const minMin = num(m.min_billed_seconds) / 60;
        const gran = Math.max(1, num(m.granularity_s, 1)) / 60;
        const workMin = W.sessionMin * (opts.perf ? perfFactor : 1);
        let hours, starts;
        if (W.pooled && W.concurrency > 0) {
          // worker pool: the machines running at once stay up and take task after task, restarted once a day.
          // Per-start minimums, rounding and boot time apply to those worker starts, not to every task.
          starts = Math.max(1, W.concurrency) * 30;
          const workH = W.sessions * workMin / 60, perStartH = workH / starts;
          const billedPerStart = Math.ceil(Math.max(perStartH * 60, minMin) / gran - 1e-9) * gran + num(m.boot_overhead_s) / 60;
          hours = starts * billedPerStart / 60;
          out.notes.push(`priced as a pool of ${Math.max(1, W.concurrency)} machine${W.concurrency > 1 ? 's' : ''} reused across tasks`);
          out.reused = Math.max(1, W.concurrency);
        } else {
          let minutes = Math.max(workMin, minMin);
          minutes = Math.ceil(minutes / gran - 1e-9) * gran + num(m.boot_overhead_s) / 60;
          hours = W.sessions * minutes / 60; starts = W.sessions;
        }
        const b = addInto({}, h.parts, hours);
        if (h.monthCap != null) {
          const capTotal = Math.max(1, W.concurrency) * h.monthCap, raw = h.total * hours;
          if (raw > capTotal) { const s = capTotal / raw; for (const k in b) b[k] *= s; out.notes.push('monthly cap reached'); }
        }
        b.fees = starts * num(m.start_fee);
        // Reuse: if minimums / rounding make one-machine-per-session dearer than keeping the peak number of
        // machines on all month and running sessions back-to-back on them, a real user would do the latter.
        const warmN = Math.max(1, W.concurrency);
        const perMachineMonth = h.monthCap != null ? Math.min(h.total * HOURS_MONTH, h.monthCap) : h.total * HOURS_MONTH;
        const warm = warmN * perMachineMonth;
        // if a plan waives start fees (Sail Pro), plan choice removes them later: don't let them force machines kept on 24/7
        const feeWaivable = (card.plans || []).some(p => p && p.waives_start_fee && !p.trial_only);
        const sessionTotal = feeWaivable ? sumB(Object.assign({}, b, { fees: 0 })) : sumB(b);
        if (!m.no_reuse && warm > 0 && warm < sessionTotal * 0.98 && warmN * HOURS_MONTH >= W.sessions * W.sessionMin / 60) {
          const s = warm / sumB(Object.assign({}, b, { fees: 0 }));
          for (const k in b) if (k !== 'fees') b[k] *= s;
          out.notes.push(`priced as ${warmN} machine${warmN > 1 ? 's' : ''} kept on and reused (cheaper than one per session)`);
          out.reused = warmN;
        }
        out.burst = { hours, b };
      }
    }
    // billed per build / per start only (no hourly rate): can't be priced as a machine kept on
    if (W.alwaysOn > 0 && h.total === 0 && num(m.start_fee) > 0 && !m.requires_always_on) out.alwaysError = 'priced per build / start, not per hour';
    else if (W.alwaysOn > 0) {
      let b;
      if (m.requires_always_on && known(m.always_on_month_per_instance)) b = { compute: m.always_on_month_per_instance * W.alwaysOn };
      else {
        const full = h.total * HOURS_MONTH;
        const per = h.monthCap != null ? Math.min(full, h.monthCap) : full;
        b = addInto({}, h.parts, HOURS_MONTH * W.alwaysOn * (full ? per / full : 1));
      }
      out.always = { hours: HOURS_MONTH * W.alwaysOn, b };
    }
    return out;
  }

  function pricePool(card, m, W) {
    if (W.gpu && W.gpu !== 'none') return { error: `no ${W.gpu} GPU` };
    if (known(m.vm_max_vcpu) && W.vcpu > m.vm_max_vcpu) return { error: `pool VMs max ${m.vm_max_vcpu} vCPU each` };
    if (known(m.vm_max_ram_gib) && W.ram > m.vm_max_ram_gib) return { error: `pool VMs max ${m.vm_max_ram_gib} GiB each` };
    const vms = Math.max(1, W.concurrency + W.alwaysOn);
    const needV = vms * W.vcpu, needR = vms * W.ram;
    const t = (m.pool_tiers || []).filter(t => known(t.month) && t.vcpu >= needV && t.ram_gib >= needR && (!known(t.max_vms) || t.max_vms >= vms))
      .sort((a, b) => a.month - b.month)[0];
    if (!t) return { error: `no pool tier with ${needV} vCPU / ${needR} GiB for ${vms} VMs` };
    const hours = W.sessions * W.sessionMin / 60 + W.alwaysOn * HOURS_MONTH;
    return { mode: m, pool: true, shape: { label: `${t.name} pool (${t.vcpu} vCPU / ${t.ram_gib} GiB shared)` }, hours,
      b: { compute: t.month }, diskIncluded: num(card.storage && card.storage.included_disk_gib), notes: ['flat pool: the tier is billed whether used or not'] };
  }

  // ---- per-provider knobs --------------------------------------------------------
  // Returns a workload copy + hourly factor for one mode after applying the provider's knobs.
  function applyKnobs(card, m, W, knobVals) {
    let W2 = W, rate = 1, hours = 1, egressRate = null, snapRate = null;
    for (const k of card.knobs || []) {
      if (Array.isArray(k.modes) && !k.modes.includes(m.key)) continue;
      let v = knobVals && knobVals[k.id] !== undefined ? knobVals[k.id] : k.default;
      if (!known(v)) continue;
      // optional linear map from the slider value to the factor: factor = offset + scale × value
      if (k.map && (known(k.map.offset) || known(k.map.scale))) v = num(k.map.offset, 0) + num(k.map.scale, 1) * v;
      if ((k.effect === 'rate_factor' || k.effect === 'hours_factor') && !(v > 0)) continue; // never zero out a bill
      if (k.effect === 'rate_factor') rate *= v;
      else if (k.effect === 'hours_factor') hours *= v;
      else if (k.effect === 'cpu_util') W2 = Object.assign({}, W2, { cpuUtil: v });
      else if (k.effect === 'ram_util') W2 = Object.assign({}, W2, { ramUtil: v });
      else if (k.effect === 'egress_gib_rate') egressRate = v;       // e.g. proxy $/GB for browser products
      else if (k.effect === 'snapshot_gib_month') snapRate = v;
      // per-session products (code-interpreter containers): v short calls share one session, so there are
      // sessions/v starts, each v× as long (session minimum and per-start fee then apply per shared session)
      else if (k.effect === 'session_pack' && v >= 1) W2 = Object.assign({}, W2, { sessions: W2.sessions / v, sessionMin: W2.sessionMin * v });
    }
    return { W: W2, rate, hours, egressRate, snapRate };
  }

  // ---- main ------------------------------------------------------------------
  function priceCard(card, W, opts) {
    opts = opts || {};
    W = consistentW(W);
    const ov = (opts.overrides && opts.overrides[card.id]) || {};
    const cardReasons = [];
    if (W.ipv4 > 0 && card.network && card.network.ipv4_available === false) cardReasons.push('no dedicated IPv4');
    if (cardReasons.length) return { card, eligible: false, reasons: cardReasons, unknowns: [] };

    const perfOf = m => {
      const p = (m && m.perf && known(m.perf.cpu_runs_s)) ? m.perf : card.perf;
      return opts.perf && opts.perfRef && p && known(p.cpu_runs_s) ? opts.perfRef / p.cpu_runs_s : 1;
    };
    const wantGpu = W.gpu && W.gpu !== 'none';
    const skipped = [], priced = [];
    for (const m of card.modes || []) {
      if (ov.mode && ov.mode !== 'auto' && m.key !== ov.mode) continue;
      if (!ov.mode || ov.mode === 'auto') if (!allowed(m, altIgnored(card, m, W) ? Object.assign({}, opts, { allowAlt: true }) : opts)) {
        const f = flagsOf(m);
        if (!f.includes('legacy')) skipped.push(`${m.label || m.key}: needs opt-in (${f.filter(x => x !== 'beta').join(', ')})`);
        continue;
      }
      if (!modeOS(card, m).includes(W.os)) { skipped.push(`no ${W.os === 'macos' ? 'macOS' : W.os === 'windows' ? 'Windows' : 'Linux'}`); continue; }
      if (!wantGpu && isGpuOnly(m)) continue;
      if (opts.region && opts.region !== 'any') {
        const rg = m.regions !== undefined ? m.regions : (card.features && card.features.regions);
        if (Array.isArray(rg) && !rg.includes(opts.region)) { skipped.push(`no ${opts.region.toUpperCase()} region`); continue; }
        if (rg === null && m.regions === null) { skipped.push(`${m.label}: region not guaranteed`); continue; }
      }
      const f = modeFeatures(card, m);
      if (W.arch === 'arm64' && !f.arm64) { skipped.push('no arm64'); continue; }
      const fails = [], unk = [];
      for (const key of opts.required || []) {
        const r = testFeature(f, key);
        if (r === false) fails.push(`no ${FEATURE_LABELS[key] || key}`);
        else if (r === null) (opts.strictUnknown ? fails : unk).push(`${FEATURE_LABELS[key] || key} unverified`);
      }
      if (fails.length) { skipped.push(...fails); continue; }
      // knobs + idle auto-suspend adjust this mode's billed hours / rate
      const kn = applyKnobs(card, m, W, ov.knobs);
      let hoursF = kn.hours;
      const idleOk = opts.idleSuspend && W.idleShare > 0 && !m.requires_always_on && m.pricing !== 'pool'
        && modeFeatures(card, m).auto_stop_idle === true;
      let idleF = 1;
      if (idleOk) { idleF = 1 - W.idleShare * num(opts.idleCapture, 0.5); hoursF *= idleF; }
      let Wm = hoursF !== 1 ? Object.assign({}, kn.W, { sessionMin: kn.W.sessionMin * hoursF }) : kn.W;
      // Average CPU utilisation already includes the idle stretches. Once suspension removes those hours,
      // the remaining (awake) hours are busier: condition utilisation on being awake so CPU is not discounted twice.
      // (RAM stays resident while idle, so ram utilisation is unchanged.)
      if (idleF < 1) Wm = Object.assign({}, Wm, { cpuUtil: Math.min(1, Wm.cpuUtil / idleF) });
      const pf = perfOf(m);
      const mm = kn.rate !== 1 ? Object.assign({}, m, { multiplier: num(m.multiplier, 1) * kn.rate }) : m;
      const r = m.pricing === 'pool' ? pricePool(card, m, Wm) : priceMode(card, mm, Wm, opts, pf);
      if (r.error) { skipped.push(r.error); continue; }
      // an always-on machine only earns the idle discount if it wakes itself on incoming traffic
      if (r.always && hoursF !== 1 && !m.requires_always_on) {
        const alwaysF = modeFeatures(card, m).wake_on_request === true ? hoursF : kn.hours;
        for (const k in r.always.b) r.always.b[k] *= alwaysF;
      }
      r.unknowns = unk;
      r.perfFactor = pf;
      r.idleOk = idleOk && !(r.always && !r.burst &&modeFeatures(card, m).wake_on_request !== true);
      if (r.idleOk) r.notes.push(`idle auto-suspend saves ~${Math.round(W.idleShare * num(opts.idleCapture, 0.5) * 100)}% of billed time`);
      priced.push(r);
    }
    // a card can say why it has no price (licence only, discontinued); a card whose every regime is retired is discontinued
    const allLegacy = (card.modes || []).length && (card.modes || []).every(m => flagsOf(m).includes('legacy'));
    const fail = rs => ({ card, eligible: false, unknowns: [], reasons: card.no_price_reason ? [card.no_price_reason]
      : allLegacy ? ['discontinued / closed to new customers'] : [...new Set(rs.length ? rs : ['no priceable regime'])] });
    if (!priced.length) return fail(skipped);

    // Candidate combinations: a pool covers everything; otherwise best sessions-mode + best always-on-mode.
    const needB = W.sessions > 0, needA = W.alwaysOn > 0;
    const cands = [];
    for (const r of priced.filter(r => r.pool)) cands.push({ b: Object.assign({}, r.b), hours: r.hours, modes: [r], shape: r.shape, diskIncluded: r.diskIncluded, notes: r.notes, unknowns: r.unknowns });
    const rs = priced.filter(r => !r.pool);
    // among modes: a real fit beats a size capped below your request; among capped ones the closest to your size wins
    // (a 16-vCPU job can't be split over 2-vCPU boxes); then the cheapest
    const capRank = r => r.shape && r.shape.clamped ? 1 : 0, capBig = r => r.shape && r.shape.clamped ? num(r.shape.vcpu) * 4 + num(r.shape.ram) : 0;
    const pick = (list, part) => list.sort((a, b) => (capRank(a) - capRank(b)) || (capBig(b) - capBig(a)) || (sumB(a[part].b) - sumB(b[part].b)))[0];
    const bB = needB ? pick(rs.filter(r => r.burst), 'burst') : null;
    const bA = needA ? pick(rs.filter(r => r.always), 'always') : null;
    if ((!needB || bB) && (!needA || bA) && (bB || bA)) {
      const b = {}; let hours = 0;
      if (bB) { addInto(b, bB.burst.b); hours += bB.burst.hours; }
      if (bA) { addInto(b, bA.always.b); hours += bA.always.hours; }
      const ms = [bB, bA].filter(Boolean);
      cands.push({ b, hours, modes: ms, shape: (bB || bA).shape, diskIncluded: (bB || bA).diskIncluded,
        notes: ms.flatMap(r => r.notes), unknowns: [...new Set(ms.flatMap(r => r.unknowns))] });
    }
    if (!needB && !needA) cands.push({ b: {}, hours: 0, modes: [rs[0] || priced[0]], shape: null, diskIncluded: 0, notes: [], unknowns: [] });
    if (!cands.length) return fail(skipped.concat(priced.flatMap(r => [r.burstError, r.alwaysError]).filter(Boolean)));

    // cheapest wins, except among sizes capped below what you asked for: then the one closest to your size wins (a 16-vCPU
    // job on Upstash is priced on its 8-vCPU box, not on its cheaper 2-vCPU one), and a real fit always beats a capped one
    const capped = c => (c.shape && c.shape.clamped) ? 1 : 0;
    const capSize = c => c.shape && c.shape.clamped ? num(c.shape.vcpu) * 4 + num(c.shape.ram) : 0;
    const best = cands.sort((a, b) => (capped(a) - capped(b)) || (capSize(b) - capSize(a)) || (sumB(a.b) - sumB(b.b)))[0];
    const b = best.b, caveats = best.notes.slice(), reasons = [];
    const kb = applyKnobs(card, best.modes[0].mode, W, ov.knobs);

    // storage
    const st = card.storage || {};
    const extraDisk = Math.max(0, W.disk - num(best.diskIncluded));
    if (extraDisk > 0) {
      if (W.persistentDisk && known(st.persistent_disk_gib_month)) {
        // persistent volumes billed all month whether running or not (withruntime)
        b.storage = (W.concurrency + W.alwaysOn || 1) * extraDisk * st.persistent_disk_gib_month;
      } else if (known(st.disk_gib_month)) {
        const persistent = W.persistentDisk && st.disk_billed_when_stopped ? W.concurrency + W.alwaysOn : 0;
        b.storage = (persistent > 0 ? persistent * extraDisk : extraDisk * best.hours / HOURS_MONTH) * st.disk_gib_month;
      } else caveats.push(`disk beyond ${num(best.diskIncluded)} GiB: price unknown`);
    }
    if (W.snapshotGiB > 0) {
      const f = modeFeatures(card, best.modes[0].mode);
      if (f.snapshot === 'none' && !(f.persistent_disk === true && W.persistentDisk)) reasons.push('cannot retain state (no snapshots)');
      else if (f.snapshot === 'none') caveats.push('state kept on the persistent disk (no snapshots)');
      else if (known(kb.snapRate) || known(st.snapshot_gib_month)) b.snapshots = Math.max(0, W.snapshotGiB - num(st.snapshot_free_gib_account)) * (known(kb.snapRate) ? kb.snapRate : st.snapshot_gib_month);
      else caveats.push('snapshot storage price unknown');
    }
    // network
    const nw = card.network || {};
    const egRate = known(kb.egressRate) ? kb.egressRate : nw.egress_gib;
    const egressFor = free => known(egRate) ? Math.max(0, W.egress - num(free)) * egRate : 0;
    if (W.egress > 0) {
      if (known(egRate)) b.egress = egressFor(nw.egress_free_gib);
      else if (!(known(nw.egress_free_gib) && W.egress <= nw.egress_free_gib)) caveats.push('egress price not published');
    }
    if (W.ipv4 > 0) {
      if (known(nw.ipv4_month)) b.ipv4 = W.ipv4 * nw.ipv4_month;
      else caveats.push('IPv4 price unknown');
    }
    // a slow pipe matters when the agent works on the open internet (browsing, scraping, big downloads)
    const bw = (nw.internet || {}).bandwidth_mbps;
    if (netNeed(W) === 2 && known(bw) && bw <= 100) caveats.push(`outbound bandwidth capped at ${bw} Mbps`);
    if (reasons.length) return fail(reasons);

    // plans
    const usage = sumB(b);
    const basePlans = (card.plans && card.plans.length) ? card.plans : [{ name: 'Pay as you go', fee: 0 }];
    // plans bought per seat whose limits scale with seats (boat.dev organisations): one seat per team member, up to W.seats
    const SCALE_KEYS = ['fee', 'included_usd', 'concurrency', 'max_starts_per_min', 'max_starts_per_hour', 'max_starts_per_day', 'max_total_vcpu', 'max_total_ram_gib', 'max_gpus'];
    // An organisation pays one seat per member (boat.dev: "bills $100 × members"), and seat-scaled limits follow the
    // same count: exactly the team size, never extra seats bought only to lift limits.
    const minSeats = Math.max(1, Math.min(32, Math.round(num(W.seats, 1))));
    const plans = basePlans.flatMap(p => !p.seat_multiplied || !known(p.fee) ? [p] : [minSeats].map(k => {
      if (k === 1) return p;
      const q = Object.assign({}, p, { name: `${p.name} × ${k} seats`, base_name: p.name, seats_bought: k });
      for (const key of SCALE_KEYS) if (known(p[key])) q[key] = p[key] * k;
      return q;
    }));
    const peak = W.concurrency + W.alwaysOn;
    const sessH = W.alwaysOn > 0 ? HOURS_MONTH : W.sessionMin / 60;
    // sandbox starts the workload needs. At peak the fleet really does turn over at full speed (C boxes every D min),
    // but it can never start more sessions than a day holds (sessions/30): 20 at once on 2-minute tasks is 600 starts
    // an hour only if there are 600 tasks to run.
    const reusedN = best.modes.map(r => r.reused).find(Boolean);
    const startsDay = reusedN ? 0 : W.sessions / 30;
    const steadyMin = reusedN || !(W.sessionMin > 0) ? 0 : Math.max(W.concurrency, 1) / W.sessionMin;
    // starts in the busiest hour: about 3x an average hour of the day, and at least one full burst at your "at once" level;
    // never more than the fleet can turn over in an hour or than a day holds (was: the whole day in one hour)
    const startsHourCap = Math.min(steadyMin * 60, startsDay, Math.max(startsDay / 24 * 3, Math.max(W.concurrency, 1)));
    // a per-minute start limit is a burst throttle: a short burst above it queues for seconds. What needs a bigger plan is
    // the SUSTAINED rate, i.e. the busiest hour's starts spread over its minutes (the old min(steady, day) assumed a whole
    // day's sessions all start in the same minute, which pushed 33 runs a day onto boat.dev's $500 plan).
    const startsMin = startsHourCap / 60;
    const burstMin = Math.min(steadyMin, startsDay);
    let bestPlan = null; const planErrs = [];
    const knownConcs = plans.filter(p => p && known(p.concurrency) && known(p.fee) && !p.trial_only).map(p => p.concurrency);
    const siblingConc = knownConcs.length ? Math.max(...knownConcs) : null;
    // a regime may only be sold on certain plans (mode.plans = [plan names])
    const allowedPlans = best.modes.map(r => r.mode.plans || (r.mode.requires_plan ? [].concat(r.mode.requires_plan) : null)).filter(Array.isArray);
    const netSkipped = [];
    for (const p of plans) {
      if (allowedPlans.some(list => !list.includes(p.base_name || p.name))) { planErrs.push(`${p.name}: regime not sold on this plan`); continue; }
      // a plan whose sandboxes can't reach what the workload needs is not a cheaper way to run it (Daytona Tiers 1-2)
      const pn = planNet(card, p);
      if (!opts.ignoreNet && pn && NET_LEVEL[pn] < netNeed(W)) { planErrs.push(`${p.name}: ${NET_SAYS[pn]}`); netSkipped.push(p.name); continue; }
      if (ov.plan && ov.plan !== 'auto' && (p.base_name || p.name) !== ov.plan) continue;
      if (p.trial_only) continue;
      if ((!ov.plan || ov.plan === 'auto') && !allowed(p, opts)) { if (!flagsOf(p).includes('addon')) planErrs.push(`${p.name}: negotiated plan`); continue; }
      if (p.fee === null) { planErrs.push(`${p.name}: price not published`); continue; }
      const exempt = best.modes.every(r => r.mode.plan_limits_exempt);
      const lim = [];
      // a plan that doesn't publish its cap is not unlimited: it most likely keeps the highest cap its sibling plans publish
      // (Railway's "$5k commit" tier is not a way around Pro's 100). Only card-level unknowns stay unknown.
      const pConc = known(p.concurrency) ? p.concurrency : (siblingConc != null ? siblingConc : null);
      if (known(pConc) && peak > pConc) lim.push(`${p.name}: max ${pConc} concurrent${known(p.concurrency) ? '' : ' (not published; assumed like its other plans)'}`);
      if (known(p.max_session_h) && sessH > p.max_session_h + 1e-9) lim.push(`${p.name}: sessions capped at ${p.max_session_h} h`);
      if (!exempt && best.shape && known(p.max_vcpu) && best.shape.vcpu > p.max_vcpu) lim.push(`${p.name}: max ${p.max_vcpu} vCPU`);
      if (!exempt && best.shape && known(p.max_ram_gib) && best.shape.ram > p.max_ram_gib) lim.push(`${p.name}: max ${p.max_ram_gib} GiB RAM`);
      if (best.shape && Array.isArray(p.sizes_allowed) && best.shape.name && !p.sizes_allowed.includes(best.shape.name)) lim.push(`${p.name}: ${best.shape.name} size not allowed`);
      // account-wide caps on what runs at once (Daytona tiers, shellbox slots, GPU quotas per plan)
      const nRun = reusedN || peak;
      const totV = best.shape && known(best.shape.vcpu) ? nRun * best.shape.vcpu : null, totR = best.shape && known(best.shape.ram) ? nRun * best.shape.ram : null;
      const totG = W.gpu && W.gpu !== 'none' ? nRun * Math.max(1, W.gpuCount) : 0;
      const capHit = [];
      if (known(p.max_total_vcpu) && totV != null && totV > p.max_total_vcpu) capHit.push([`${p.name}: max ${p.max_total_vcpu} vCPU running at once (needs ${Math.round(totV)})`, totV / Math.max(1, p.max_total_vcpu)]);
      if (known(p.max_total_ram_gib) && totR != null && totR > p.max_total_ram_gib) capHit.push([`${p.name}: max ${p.max_total_ram_gib} GiB running at once (needs ${Math.round(totR)})`, totR / Math.max(1, p.max_total_ram_gib)]);
      if (known(p.max_gpus) && totG > p.max_gpus) capHit.push([`${p.name}: max ${p.max_gpus} GPUs at once (needs ${totG})`, totG / Math.max(1, p.max_gpus)]);
      const startsHour = startsHourCap;
      if (known(p.max_starts_per_hour) && startsHour > p.max_starts_per_hour) capHit.push([`${p.name}: max ${p.max_starts_per_hour} starts/hour (needs ~${Math.round(startsHour)})`, startsHour / Math.max(1, p.max_starts_per_hour)]);
      // how far over each limit the workload is (1 = at the limit); used to pick the least-bad plan when all violate
      let severity = 0;
      if (known(pConc) && peak > pConc) severity = Math.max(severity, peak / Math.max(1, pConc));
      if (known(p.max_session_h) && sessH > p.max_session_h) severity = Math.max(severity, sessH / Math.max(0.01, p.max_session_h));
      if (known(p.max_starts_per_day) && startsDay > p.max_starts_per_day) { lim.push(`${p.name}: max ${p.max_starts_per_day} starts/day (needs ~${Math.round(startsDay)})`); severity = Math.max(severity, startsDay / Math.max(1, p.max_starts_per_day)); }
      if (known(p.max_starts_per_min) && startsMin > p.max_starts_per_min) { lim.push(`${p.name}: max ${p.max_starts_per_min} starts/min (needs ~${startsMin.toFixed(1)})`); severity = Math.max(severity, startsMin / Math.max(0.01, p.max_starts_per_min)); }
      for (const [t, sv] of capHit) { lim.push(t); severity = Math.max(severity, sv); }
      // a monthly egress cap with no overage (the plan stops or pauses the sandbox at the cap)
      if (known(p.egress_cap_gib) && W.egress > p.egress_cap_gib) { lim.push(`${p.name}: egress stops at ${p.egress_cap_gib} GiB/month`); severity = Math.max(severity, W.egress / Math.max(1, p.egress_cap_gib)); }
      if (lim.length && !opts.ignorePlanLimits) { planErrs.push(...lim); continue; }
      const burstNote = known(p.max_starts_per_min) && burstMin > p.max_starts_per_min
        ? `bursts above ${p.max_starts_per_min} starts/min are queued (a burst of ${Math.round(burstMin)} takes ~${Math.ceil(burstMin / p.max_starts_per_min)} min to start)` : null;
      const incScope = Array.isArray(p.included_applies_to_modes) ? p.included_applies_to_modes : null;
      const incOk = !incScope || best.modes.some(r => incScope.includes(r.mode.key));
      const fee = num(p.fee), inc = incOk ? num(p.included_usd) : 0, seats = num(p.per_seat) * Math.max(0, W.seats - 1);
      // plan-level included egress replaces the account default
      let pUsage = known(p.egress_free_gib) && W.egress > 0 && known(egRate) ? usage - num(b.egress) + egressFor(p.egress_free_gib) : usage;
      if (p.waives_start_fee) pUsage -= num(b.fees);
      const net = Math.max(0, pUsage - inc);
      const total = (p.fee_is_credit ? Math.max(fee, net) : fee + net) + seats;
      // prefer plans that fit; among plans that don't, the one that comes closest (not merely the cheapest)
      const better = !bestPlan
        || (!lim.length && bestPlan.lim.length)
        || (!lim.length && !bestPlan.lim.length && total < bestPlan.total)
        || (lim.length && bestPlan.lim.length && (severity < bestPlan.severity - 1e-9 || (Math.abs(severity - bestPlan.severity) < 1e-9 && total < bestPlan.total)));
      if (better) bestPlan = { plan: p, total, planCost: total - net, credit: Math.min(usage, inc), lim, severity, burstNote };
    }
    if (!bestPlan) return fail(planErrs);

    let total = bestPlan.total;
    const breakdown = Object.assign({}, b);
    if (bestPlan.plan.waives_start_fee) breakdown.fees = 0;
    // plan-level included egress was used for the total: show the same number in the breakdown
    if (known(bestPlan.plan.egress_free_gib) && W.egress > 0 && known(egRate)) breakdown.egress = egressFor(bestPlan.plan.egress_free_gib);
    breakdown.plan = bestPlan.planCost;
    if (bestPlan.credit) breakdown.included = -bestPlan.credit;
    const fr = card.free || {};
    if (opts.credits && known(fr.monthly_credit) && fr.monthly_credit > 0 && !num(bestPlan.plan.included_usd)) {
      const c = Math.min(fr.monthly_credit, total); total -= c; breakdown.credits = -c;
    }
    if (opts.amortize && known(fr.one_time_credit) && fr.one_time_credit > 0) {
      const c = Math.min(fr.one_time_credit / 12, total); total -= c; breakdown.credits = (breakdown.credits || 0) - c;
    }
    if (bestPlan.lim.length) caveats.push(...bestPlan.lim);
    if (bestPlan.burstNote) caveats.push(bestPlan.burstNote);
    // the plan was picked for its internet access: say what the cheaper ones lack
    if (netSkipped.length && !opts.ignoreNet) caveats.push(`plan "${bestPlan.plan.name}" needed for ${netNeed(W) === 2 ? 'open internet' : 'package and AI API access'}: ${netSkipped.join(', ')} ${NET_SAYS[planNet(card, plans.find(p => p.name === netSkipped[0]))] || 'restrict the network'}`);
    return {
      card, eligible: true, reasons: [], unknowns: best.unknowns, caveats, planLimits: bestPlan.lim,
      total, breakdown, hours: best.hours, modeLabel: [...new Set(best.modes.map(r => r.mode.label || r.mode.key))].join(' + '),
      // $ per hour of work actually done (not per billed hour, which rounding and reuse inflate)
      shape: best.shape, plan: bestPlan.plan.name, planObj: bestPlan.plan, perHour: (W.sessions * W.sessionMin / 60 + W.alwaysOn * HOURS_MONTH) > 0 ? total / (W.sessions * W.sessionMin / 60 + W.alwaysOn * HOURS_MONTH) : null,
      reused: reusedN || null, idleSaved: best.modes.some(x => x.idleOk),
      perfFactor: best.modes[0] && best.modes[0].perfFactor, modeKeys: best.modes.map(r => r.mode.key),
      pinned: !!((ov.mode && ov.mode !== 'auto') || (ov.plan && ov.plan !== 'auto') || (ov.knobs && Object.keys(ov.knobs).length)),
    };
  }

  // ---- never exclude: if a provider can't meet the workload strictly, relax the fewest constraints needed
  // and report each relaxation as a named compromise.
  const OS_NAME = { windows: 'Windows', macos: 'macOS', linux: 'Linux' };
  // ---- fleet feasibility --------------------------------------------------------------
  // card.fleet = { default_max_instances, default_max_vcpu, default_max_gpus, raise: "automatic"|"self-serve"|"ticket"|"sales"|"none",
  //                raise_time_days, verification, notes }. Compares the fleet this workload needs with a new account's defaults.
  const RAISE = { automatic: ['grows automatically with spend/history', 1], 'self-serve': ['self-serve quota request', 1],
    ticket: ['support ticket', 1], sales: ['only through sales', 2], none: ['hard limit, cannot be raised', 3] };
  function fleetCheck(card, r, W) {
    const f = card.fleet;
    const n = r.reused || (Math.max(0, W.concurrency) + num(W.alwaysOn)) || 1;
    const vcpu = r.shape && known(r.shape.vcpu) ? r.shape.vcpu * n : null;
    const gpus = W.gpu && W.gpu !== 'none' ? n * Math.max(1, W.gpuCount) : 0;
    if (!f) return { n, vcpu, gpus, known: false, over: false, text: n > 1 ? `fleet of ${n}: default account quota not researched` : '' };
    const lim = [];
    // a paid plan that publishes its own concurrency supersedes the new-account (often trial) default
    const planConc = r.planObj && known(r.planObj.concurrency) ? r.planObj.concurrency : null;
    if (known(f.default_max_instances) && n > f.default_max_instances && !(planConc != null && planConc >= n)) lim.push(`${f.default_max_instances} machines`);
    if (known(f.default_max_vcpu) && vcpu != null && vcpu > f.default_max_vcpu) lim.push(`${f.default_max_vcpu} vCPU`);
    if (known(f.default_max_gpus) && gpus > f.default_max_gpus) lim.push(`${f.default_max_gpus} GPUs`);
    const how = RAISE[f.raise] || ['raise process not published', 1];
    const days = known(f.raise_time_days) ? ` (~${f.raise_time_days < 1 ? 'same day' : f.raise_time_days + ' d'})` : '';
    // the provider doesn't publish a starting quota but says raising it takes a human: a big fleet likely hits it
    const noDefaults = [f.default_max_instances, f.default_max_vcpu, f.default_max_gpus].every(v => !known(v));
    if (noDefaults && n >= 10 && ['ticket', 'sales', 'none'].includes(f.raise))
      return { n, vcpu, gpus, known: true, over: true, likely: true, severity: how[1], raise: f.raise,
        text: `fleet of ${n}: new accounts start with a limited quota (size not published); raising it: ${how[0]}${days}` };
    const text = lim.length
      ? `fleet of ${n} needs a quota increase: new accounts get ${lim.join(' / ')}; ${how[0]}${days}${f.verification ? `, ${f.verification}` : ''}`
      : `fleet of ${n} fits a new account's default quota`;
    return { n, vcpu, gpus, known: true, over: lim.length > 0, severity: lim.length ? how[1] : 0, text, raise: f.raise };
  }

  // ---- access path: what a customer must do to actually get this ----------------------------------------------------
  // 0 self-serve · 1 verification (ID/KYC/business docs) · 2 money upfront (big plan, prepaid tier, commitment)
  // 3 support ticket / email (quota raise) · 4 sales
  const ACCESS_LABEL = ['self-serve', 'identity / business verification', 'a paid plan or money upfront', 'email support', 'talk to sales'];
  function accessPath(card, r, W) {
    const steps = [];
    const p = r.planObj || {};
    const pf = flagsOf(p);
    if (pf.includes('sales')) steps.push([4, `plan "${p.name}" is negotiated with sales`]);
    const prepay = known(p.prepay_usd) ? p.prepay_usd : (/top-?up|prepaid|deposit|prepay/i.test(p.name || '') ? (known(p.fee) ? p.fee : null) : null);
    if (prepay != null && prepay > 0) steps.push([2, `prepay $${Math.round(prepay).toLocaleString('en-US')} to unlock plan "${p.name}"`]);
    else if (known(p.fee) && p.fee >= 100) steps.push([2, `subscribe to the $${Math.round(p.fee).toLocaleString('en-US')}/month "${p.name}" plan first`]);
    const ms = (card.modes || []).filter(m => (r.modeKeys || []).includes(m.key));
    for (const m of ms) {
      const fl = flagsOf(m);
      const term = /(\d+)[- ]?(month|mo|year|yr)s?\b|annual|yearly|reserved|savings[- ]plan|committed use/i.test(`${m.key} ${m.label || ''}`);
      if (fl.includes('commit') || (fl.includes('sales') && term)) steps.push([2, `${m.commit_term || 'term'} commitment, paid upfront or billed for the whole term`]);
      else if (fl.includes('sales')) steps.push([4, 'regime sold through sales']);
    }
    const f = card.fleet, fc = r.fleet;
    // ID / KYC / business documents, unless the text says they're NOT required
    const ver = f && f.verification ? f.verification.split(/(?<=[.;])\s+/).find(s => /\b(id|kyc|passport|business docs?|company docs?|documents?|identity)\b/i.test(s) && !/\b(no|not|without|never)\b[^.;]*\b(id|kyc|identity)\b/i.test(s)) : null;
    if (ver) steps.push([1, `may ask for verification: ${ver.replace(/[.;]\s*$/, '')}`]);
    if (fc && fc.over) {
      // a quota we only suspect (limit not published) is worth mentioning, not a gate on who can buy it
      const lvl = fc.likely ? 0 : ({ automatic: 2, 'self-serve': 1, ticket: 3, sales: 4, none: 4 }[f && f.raise] ?? 3);
      steps.push([lvl, fc.text]);
    }
    if (known(p.concurrency) && (r.planLimits || []).some(x => /concurrent/.test(x))) steps.push(pf.includes('sales') || /contact|sales|enterprise/i.test(p.note || '')
      ? [4, `above plan "${p.name}" limits: contact sales for more`] : [3, `above plan "${p.name}" limits: ask the provider (no published way to raise them)`]);
    const level = steps.length ? Math.max(...steps.map(s => s[0])) : 0;
    return { level, label: ACCESS_LABEL[level], steps: steps.sort((a, b) => b[0] - a[0]).map(s => s[1]) };
  }

  // ---- internet access ------------------------------------------------------------------------------------------------
  // What the workload's sandboxes must reach (W.internet): 'open' = any site or API (browsing, scraping, a user's own
  // services, arbitrary downloads); 'pkg' = package registries, git hosting and LLM APIs (what a coding agent installs
  // and calls); 'none' = nothing (offline evals, untrusted code on private data). Unset = 'open', the common case.
  // card.network.internet.default: full | configurable (open, you can lock it down) | allowlist (a fixed list of package
  // registries / AI APIs) | none. A plan can differ (plan.internet): Daytona Tiers 1-2 = allowlist, Tier 3+ = full.
  // Unknown stays unknown: a provider that says nothing about network limits is not held to any.
  const NET_LEVEL = { none: 0, allowlist: 1, full: 2, configurable: 2 };
  const NET_SAYS = { none: 'no internet access', allowlist: 'reach only an allowlist (package registries, git, AI APIs)' };
  const netNeed = W => ({ none: 0, pkg: 1, open: 2 })[W.internet || 'open'] ?? 2;
  const planNet = (card, p) => { const v = (p && p.internet) || ((card.network || {}).internet || {}).default; return v in NET_LEVEL ? v : null; };
  function netCompromise(card, W) {
    const ni = (card.network || {}).internet || {}, g = ni.gate;
    if (g && g.kind === 'addon') return `no internet unless you add a paid add-on${g.plan ? ` (${g.plan})` : ''}`;
    if (g && g.plan) return `open internet only on ${g.plan}${g.kind === 'sales' ? ' (through sales)' : ''}`;
    if (ni.default === 'none') return netNeed(W) === 2 ? 'no internet access from the sandbox' : 'no network access from the sandbox';
    const list = ni.allowlist ? ni.allowlist.replace(/^essential services:\s*/i, '').replace(/\s*\(.*?\)/g, '').slice(0, 90).replace(/[,;\s]+\S*$/, '') : 'package registries, git, AI APIs';
    return `no open internet: sandboxes reach only an allowlist (${list}${ni.allowlist && ni.allowlist.length > 90 ? '…' : ''})`;
  }

  // Compromise severity: 1 = minor (you'd still shortlist it), 2 = material (works, but differently), 3 = serious.
  const SEVERITY = { plan: 1, unverified: 1, optin_sales: 1, optin_spot: 2, optin_promo: 1, optin_alt: 2, region: 1, ipv4: 1,
    always: 1, arch: 2, gpu: 2, shape: 2, unsized: 2, browser: 2, feat: 3, state: 2, net: 3 };
  const usefulHours = W => W.sessions * W.sessionMin / 60 + num(W.alwaysOn) * HOURS_MONTH;
  // A month with N sessions can never have more than N machines running at once. Without this, "150 at once, 36 sessions"
  // is priced as 150 machines turning over all month (starts per hour, seats, quotas) for a workload that is 36 sessions.
  // The other way round: N machines at once can run at most N x 730 h in a month, so long sessions cap how many fit
  // (2,200 week-long sessions on 100 machines is 369,600 h of work that 100 machines cannot do: priced as the ~434 that fit).
  const consistentW = W => {
    if (W.sessions > 0 && W.concurrency > W.sessions) return Object.assign({}, W, { concurrency: Math.ceil(W.sessions), concurrencyAsked: W.concurrency });
    const cap = W.concurrency > 0 && W.sessionMin > 0 ? W.concurrency * HOURS_MONTH * 60 / W.sessionMin : Infinity;
    if (W.sessions > cap) return Object.assign({}, W, { sessions: cap, sessionsAsked: W.sessions });
    return W;
  };
  function priceSoft(card, W, opts) {
    W = consistentW(W);
    const r0 = priceSoftInner(card, W, opts);
    // $/h is per hour of the workload the user described, even when a relaxation priced it as always-on machines
    if (r0 && r0.eligible && known(r0.total)) r0.perHour = usefulHours(W) > 0 ? r0.total / usefulHours(W) : null;
    return r0;
  }
  // A relaxation that changes nothing for this workload can't make a card fit: skip it (same results, far fewer re-pricings)
  function noopStep(s, W, opts) {
    if (s.id === 'arch') return W.arch !== 'arm64';
    const sameW = !s.w || Object.entries(s.w).every(([k, v]) => W[k] === v);
    const sameO = !s.o || Object.entries(s.o).every(([k, v]) => Array.isArray(v) ? (opts[k] || []).length === v.length
      : v === 'any' ? (opts[k] == null || opts[k] === 'any') : opts[k] === v);
    return sameW && sameO;
  }
  // How much the machine size matters (opts.sizing):
  //  'any'      don't care: the provider sizes it (browser sessions, managed agents). The nearest size it sells is used
  //             (its largest if yours is bigger) and unpublished / bigger / capped sizes are not mismatches.
  //  'min'      at least what you set (default).
  //  'reserved' at least what you set AND guaranteed cores: burstable / no-reserved-core tiers are mismatches at any load.
  const CPU_UNPUBLISHED = 'no dedicated-core tier published (like most providers: vCPUs are shared, as everywhere)';
  function priceSoftInner(card, W, opts) {
    if (opts.sizing === 'any' && !W.clampShape) W = Object.assign({}, W, { clampShape: true });
    const strict = priceCard(card, W, opts);
    const wantsBrowser = (opts.required || []).some(k => ['browser', 'desktop', 'computer_use'].includes(k));
    // things that make a strictly-priced row a compromise anyway
    const softOnly = r => {
      const c = [];
      // one unverified must-have is a detail to check; several at once usually means the product isn't built for it
      if (r.unknowns && r.unknowns.length) c.push({ t: `unverified: ${r.unknowns.map(x => x.replace(/ unverified$/, '')).join(', ')}`, s: r.unknowns.length >= 2 ? 2 : SEVERITY.unverified });
      // a browser session has no machine size to publish; that only matters when you're buying compute
      const browserRow = (card.modes || []).filter(m => (r.modeKeys || []).includes(m.key)).every(m => productClass(card, m) === 'browser');
      if (r.shape && r.shape.unsized && opts.sizing !== 'any') c.push({ t: 'machine size not published', s: browserRow && wantsBrowser ? 1 : SEVERITY.unsized });
      if (card.category === 'browser' && !wantsBrowser) c.push({ t: 'browser-session product, not a general sandbox', s: SEVERITY.browser });
      // a product class this workload's question isn't about (e.g. a browser session for CI builds)
      if (Array.isArray(W.classes)) {
        const cls = [...new Set((card.modes || []).filter(m => (r.modeKeys || []).includes(m.key)).map(m => productClass(card, m)))];
        const off = cls.filter(x => !W.classes.includes(x));
        // an app platform can run the same containers, you just orchestrate them yourself: minor. A browser session or CI job can't: material.
        // ...but only when the question is about general compute at all; asked for browser infrastructure only, a raw VM is material
        const generalAsk = W.classes.some(x => ['sandbox-api', 'vm', 'dedicated', 'dev-env', 'paas', 'paas-job'].includes(x));
        if (off.length && off.length === cls.length) c.push({ t: `different kind of product: ${off.map(x => CLASS_LABEL[x] || x).join(', ')}`, s: generalAsk && off.every(x => ['paas', 'paas-job', 'vm', 'dedicated'].includes(x)) ? 1 : 2 });
      }
      // Fleet feasibility: can a normal account actually get this many machines?
      const fl = fleetCheck(card, r, W);
      r.fleet = fl;
      r.access = accessPath(card, r, W);
      const maxA = known(opts.maxAccess) ? opts.maxAccess : 3;
      if (r.access.level > maxA) c.push({ t: `needs ${r.access.label}: ${r.access.steps[0]}`, s: r.access.level - maxA >= 2 ? 3 : 2 });
      // a quota you can raise within what you're willing to do is a step to take (shown on the row), not a compromise;
      // only a hard cap that cannot be raised is one
      else if (fl && fl.over && fl.raise === 'none') c.push({ t: fl.text, s: 2 });
      if (r.shape && known(r.shape.vcpu) && r.shape.vcpu > 2 * W.vcpu && !r.shape.clamped && opts.sizing !== 'any')
        c.push({ t: `smallest size offered is ${r.shape.vcpu} vCPU / ${+(+r.shape.ram).toFixed(1)} GiB`, s: 1 });
      const ms = (card.modes || []).filter(m => (r.modeKeys || []).includes(m.key));
      // product-level session cap: a 1-hour interpreter can't be a 24/7 dev box without constant restarts
      const needH = num(W.alwaysOn) > 0 ? HOURS_MONTH : W.sessionMin / 60;
      const capH = Math.min(...ms.map(m => { const v = modeFeatures(card, m).max_session_h; return known(v) && v > 0 ? v : Infinity; }));
      if (isFinite(capH) && needH > capH + 1e-9 && !(r.planLimits || []).some(x => /sessions capped/.test(x)))
        c.push({ t: `sessions end after ${capH < 1 ? Math.round(capH * 60) + ' min' : capH + ' h'}: needs restarts${needH >= HOURS_MONTH ? ' to run 24/7' : ''}`, s: capH < 24 ? 3 : 1 });
      const mf = ms.length ? modeFeatures(card, ms[0]) : (card.features || {});
      if (W.persistentDisk && mf.persistent_disk === false && (!mf.snapshot || mf.snapshot === 'none') && mf.pause_resume !== true) c.push({ t: 'no persistent disk: files lost when it stops or sleeps', s: 2 });
      // a concurrency cap that exists but isn't published (Codespaces)
      if ((r.planObj || {}).concurrency_unpublished && W.concurrency + num(W.alwaysOn) > 5) c.push({ t: 'has a concurrency cap, value not published', s: 1 });
      // no published limit on machines at once is unknown, not unlimited: for a fleet (20+ at once) it is a detail to confirm,
      // exactly like an unconfirmed feature, for every provider (publishing a limit must not rank worse than hiding one)
      else if (W.concurrency + num(W.alwaysOn) >= 20 && !known((r.planObj || {}).concurrency) && !(fl && fl.likely)
        && ![(card.fleet || {}).default_max_instances, (card.fleet || {}).default_max_vcpu].some(known))
        c.push({ t: 'unverified: how many machines can run at once', s: SEVERITY.unverified });
      for (const m of ms) {
        const fm = flagsOf(m);
        if (fm.includes('beta')) c.push({ t: /estimate/i.test(`${m.label} ${m.note || ''}`) ? 'preview pricing published as estimates: final price may differ' : 'beta / preview pricing: may change', s: 1 });
        if (fm.includes('peer')) c.push({ t: `peer-hosted capacity: variable reliability, no SLA${m.peer_note ? ' (' + m.peer_note + ')' : ''}`, s: 1 });
        if (m.ratio_inferred) c.push({ t: 'vCPU per GiB not published (inferred)', s: 1 });
        // every cloud VM shares hosts; this only flags a tier the provider itself sells WITHOUT a CPU guarantee,
        // next to (usually) its own dedicated-core tier, so the caveat names that tier instead of a vague "shared CPU"
        const noGuarantee = () => {
          const sib = (card.modes || []).find(x => x && x !== m && (x.cpu_class === 'dedicated' || /dedicated|performance|ccx/i.test(`${x.label || ''}`)) && !flagsOf(x).includes('legacy'));
          return sib ? `shared vCPUs on this tier (${card.name} sells dedicated cores separately as “${sib.label}”): heavy, sustained CPU use can be slowed by other tenants`
            : 'shared vCPUs (no guaranteed share of a core): heavy, sustained CPU use can be slowed by other tenants';
        };
        const reserved = opts.sizing === 'reserved';
        // every cloud oversubscribes vCPUs, so "shared" only means something when the provider draws the line itself: it
        // sells a dedicated-core tier next to this one. A plain "our vCPUs are shared" is true of everyone: no caveat.
        const hasDedicatedSibling = (card.modes || []).some(x => x && x !== m && (x.cpu_class === 'dedicated' || /dedicated|performance|ccx/i.test(`${x.label || ''}`)) && !flagsOf(x).includes('legacy'));
        const explicitShared = m.cpu_class === 'shared' && hasDedicatedSibling;
        if (explicitShared && !fm.includes('burstable') && (W.cpuUtil > 0.5 || reserved)) c.push({ t: noGuarantee(), s: reserved ? 2 : 1 });
        if (/(^|[^a-z])(cn|mainland|china)([^a-z]|$)/i.test(`${m.key} ${m.label}`) && !/intl|international|overseas/i.test(`${m.key} ${m.label}`))
          c.push({ t: 'mainland-China region (local account / ICP rules)', s: 1 });
        const fl = flagsOf(m);
        if (fl.includes('stock')) c.push({ t: `stock-limited${m.stock_note ? ': ' + m.stock_note : ' (often sold out)'}`, s: 1 });
        if (fl.includes('commit')) c.push({ t: `${m.commit_term || 'term'} commitment`, s: 1 });
        // only a mismatch when this workload actually needs more CPU than the tier guarantees: a mostly idle agent on a
        // burstable / no-reserved-cores tier runs the same (same rule as the shared-vCPU line above)
        if (fl.includes('burstable')) {
          if (m.baseline_pct) { if (W.cpuUtil > m.baseline_pct / 100 || reserved) c.push({ t: `burstable CPU: ${m.baseline_pct}% of each vCPU guaranteed, throttled above that`, s: 2 }); }
          else if (W.cpuUtil > 0.5 || reserved) c.push({ t: noGuarantee(), s: reserved ? 2 : 1 });
        }
        // reserved cores asked: only a tier KNOWN to share its vCPUs (shared / burstable) is a mismatch. Most providers reserve
        // vCPUs; an unpublished CPU class is a data gap, noted on the row (caveat) rather than held against the provider.
        else if (reserved && m.cpu_class !== 'dedicated' && !explicitShared && !(r.notes || []).includes(CPU_UNPUBLISHED)) (r.notes = r.notes || []).push(CPU_UNPUBLISHED);
        if (m.gpu_min_count > 1 && W.gpu && W.gpu !== 'none' && W.gpuCount < m.gpu_min_count) c.push({ t: `${m.gpu_min_count}-GPU nodes only`, s: 2 });
      }
      // personas who call a sandbox API (interpreters, platforms, RL, CUA) can't just use a raw VM: boot time, quotas, no API
      if (W.sandboxApi && !Array.isArray(W.classes) && ms.length && ms.every(m => ['machine', 'paas', 'paas-job', 'gpu', 'byoc', 'ci'].includes(productClass(card, m))))
        c.push({ t: 'plain VM / platform, no sandbox API (slower boot, account quotas)', s: 1 });
      return c;
    };
    if (strict.eligible) {
      const c = softOnly(strict);
      if (!c.length) return strict;
      return Object.assign(strict, { soft: true, compromises: c.map(x => x.t), severity: Math.max(...c.map(x => x.s)) });
    }
    // A different OS or no GPU at all is not a compromise, it's a different product: mark it off-topic.
    const osMismatch = (card.modes || []).length && (card.modes || []).every(m => !modeOS(card, m).includes(W.os));
    const wantGpu = W.gpu && W.gpu !== 'none';
    const noGpuAtAll = wantGpu && !(card.modes || []).some(m => m.gpu && Object.values(m.gpu).some(known));
    const gpuOnly = !wantGpu && (card.modes || []).length && (card.modes || []).every(m => m.gpu_only || (card.category === 'gpu-cloud' && m.gpu && Object.values(m.gpu).some(known)));
    if (osMismatch || noGpuAtAll || gpuOnly) return Object.assign(strict, { unpriceable: true, offTopic: osMismatch ? 'os' : noGpuAtAll ? 'gpu' : 'gpu-only',
      reasons: [osMismatch ? `doesn't offer ${OS_NAME[W.os]}` : noGpuAtAll ? `no GPUs` : 'GPU machines only'] });
    const steps = [
      { id: 'plan', o: { ignorePlanLimits: true } },
      { id: 'optin', o: { allowSpot: true, allowSales: true, allowAlt: true, allowPromo: true } },
      { id: 'net', o: { ignoreNet: true } },
      { id: 'shape', w: { clampShape: true } },
      { id: 'always', w: W.sessions > 0 ? { alwaysOn: num(W.alwaysOn) + Math.max(1, W.concurrency), sessions: 0, concurrency: 0 } : {} },
      { id: 'gpu', w: { gpuFallback: true } },
      { id: 'arch', w: { arch: 'any' } },
      { id: 'region', o: { region: 'any' } },
      { id: 'state', w: { snapshotGiB: 0 } },
      { id: 'ipv4', w: { ipv4: 0 } },
      { id: 'feat', o: { required: [] } },
    ].filter(s => !(s.id === 'gpu' && !wantGpu)).filter(s => !noopStep(s, W, opts));
    const build = ids => {
      let w = W, o = opts;
      for (const s of steps) if (ids.includes(s.id)) { if (s.w) w = Object.assign({}, w, s.w); if (s.o) o = Object.assign({}, o, s.o); }
      return priceCard(card, w, o);
    };
    let applied = [], r = null;
    for (const s of steps) { applied.push(s.id); r = build(applied); if (r.eligible) break; }
    // report why it still failed from the MOST relaxed attempt (not the strict one, which just says "needs opt-in")
    if (!r || !r.eligible) return Object.assign(strict, { unpriceable: true, reasons: (r && r.reasons && r.reasons.length ? r.reasons : strict.reasons) || ['no priceable regime'] });
    for (const id of applied.slice().reverse()) { // drop relaxations that turned out unnecessary
      const t = applied.filter(x => x !== id), rr = build(t);
      if (rr.eligible) { applied = t; r = rr; }
    }
    const f = card.features || {}, comp = [];
    const add = (t, s) => comp.push({ t, s });
    const has = id => applied.includes(id);
    if (has('plan')) for (const x of (r.planLimits || []).slice(0, 2)) add(x, SEVERITY.plan);
    if (has('optin')) { const om = (card.modes || []).filter(m => (r.modeKeys || []).includes(m.key));
      const fl = [...new Set(om.flatMap(m => m.flags || []))];
      // term prices (12/24-month, annual, reserved) are commitments anyone can buy, not sales deals
      const term = om.map(m => `${m.key} ${m.label || ''}`.match(/(\d+)[- ]?(month|mo|year|yr)s?\b|annual(ly)?|yearly|reserved|savings[- ]plan|committed use/i)).find(Boolean);
      if (fl.includes('commit') || (fl.includes('sales') && term)) { if (!fl.includes('commit')) add(`${term[1] ? `${term[1]}-${/^y/i.test(term[2]) ? 'year' : 'month'}` : term[0].toLowerCase()} commitment`, SEVERITY.optin_promo); }
      else if (fl.includes('sales')) add('negotiated / enterprise price', SEVERITY.optin_sales);
      else if (fl.includes('spot')) add('interruptible (spot)', SEVERITY.optin_spot);
      else if (fl.includes('promo')) add('promotional price', SEVERITY.optin_promo);
      else if (fl.includes('alt')) add('adjacent product, not a like-for-like sandbox', SEVERITY.optin_alt);
      else add('opt-in regime', 1); }
    // keeping the peak number of machines on all month is a legitimate way to run a bursty workload when the sessions fit
    const nAlways = num(W.alwaysOn) + Math.max(1, W.concurrency);
    if (has('always')) {
      const fits = nAlways * HOURS_MONTH >= W.sessions * W.sessionMin / 60;
      if (fits) { r.caveats = (r.caveats || []).concat(`monthly / always-on product: priced as ${nAlways} machines kept on and reused`); r.reused = nAlways; }
      else add(`monthly / always-on only: priced as ${nAlways} machines kept on 24/7`, SEVERITY.always);
    }
    if (has('shape')) add(`capped at ${r.shape && r.shape.label ? r.shape.label : 'its largest size'}`, SEVERITY.shape);
    if (has('gpu')) { const n = (r.caveats || []).find(x => /priced with|sold as/.test(x)); add(n || 'different GPU', SEVERITY.gpu); }
    if (has('arch')) add('no arm64', SEVERITY.arch);
    if (has('region')) add(`no ${String(opts.region).toUpperCase()} region`, SEVERITY.region);
    if (has('state')) add("can't keep state between sessions", SEVERITY.state);
    if (has('ipv4')) add('no dedicated IPv4', SEVERITY.ipv4);
    if (has('net')) add(netCompromise(card, W), SEVERITY.net);
    if (has('feat')) { const miss = (opts.required || []).filter(k => testFeature(f, k) === false).map(k => FEATURE_LABELS[k] || k);
      add(miss.length ? `missing ${miss.join(', ')}` : 'required features unverified', miss.length ? SEVERITY.feat : SEVERITY.unverified); }
    for (const x of softOnly(r)) comp.push(x);
    r.caveats = (r.caveats || []).filter(x => !comp.some(c => c.t === x));
    if (!comp.length) return r; // the only relaxation was a legitimate way to run it (e.g. monthly machines reused)
    return Object.assign(r, { soft: true, compromises: comp.map(c => c.t), severity: Math.max(1, ...comp.map(c => c.s)) });
  }

  // ---- one ranking: meets first (by price), then compromises by severity then price; per provider keep at most
  // `maxPerProvider` distinct regimes, drop near-duplicates (same total ±2%) and sizes > 2× the request when the
  // provider already has a row that fits. Off-topic rows (wrong OS / no GPU) are returned separately.
  function rankRows(rows, W, maxPerProvider = 3) {
    // a bill with no compute price for real running hours is a data gap, not a free provider
    for (const r of rows) if (r.eligible && r.hours > 0 && !W.showZero) { const b = r.breakdown || {};
      if ((b.compute || 0) + (b.memory || 0) + (b.gpu || 0) + (b.fees || 0) <= 0.01) { r.eligible = false; r.reasons = ['no usable compute price for this workload']; } }
    const priced = rows.filter(r => r.eligible), offTopic = rows.filter(r => !r.eligible && r.offTopic), noPrice = rows.filter(r => !r.eligible && !r.offTopic);
    const byProv = new Map();
    for (const r of priced) { const k = r.card.id; if (!byProv.has(k)) byProv.set(k, []); byProv.get(k).push(r); }
    const kept = [];
    for (const list of byProv.values()) {
      list.sort((a, b) => (a.soft ? 1 : 0) - (b.soft ? 1 : 0) || (a.severity || 0) - (b.severity || 0) || a.total - b.total);
      const fits = list.some(r => r.shape && r.shape.vcpu && r.shape.vcpu <= 2 * W.vcpu);
      // a bigger machine than needed is noise when the same provider sells a smaller one that fits for about the same price
      const fitsReq = r => r.shape && known(r.shape.vcpu) && known(r.shape.ram) && r.shape.vcpu >= W.vcpu && r.shape.ram >= W.ram - 1e-9;
      const dominated = r => fitsReq(r) && list.some(o => o !== r && fitsReq(o) && !!o.soft === !!r.soft
        && o.shape.vcpu <= r.shape.vcpu && o.shape.ram <= r.shape.ram && (o.shape.vcpu < r.shape.vcpu || o.shape.ram < r.shape.ram)
        && o.total <= r.total * 1.05);
      const out = [];
      for (const r of list) {
        if (fits && r.shape && r.shape.vcpu > 2 * W.vcpu) continue;                    // oversized sibling
        if (dominated(r)) continue;                                                    // bigger sibling of a fitting size
        if (out.some(o => Math.abs(o.total - r.total) <= 0.02 * Math.max(1, o.total) && !!o.soft === !!r.soft)) continue; // duplicate
        out.push(r); if (out.length >= maxPerProvider) break;
      }
      kept.push(...out);
      // unpriced siblings of a provider that does have a price aren't "no public price"
    }
    const pricedIds = new Set(priced.map(r => r.card.id));
    const meets = kept.filter(r => !r.soft).sort((a, b) => a.total - b.total);
    const soft = kept.filter(r => r.soft).sort((a, b) => (a.severity || 1) - (b.severity || 1) || a.total - b.total);
    const dedupe = list => [...new Map(list.filter(r => !pricedIds.has(r.card.id)).map(r => [r.card.id, r])).values()];
    return { meets, soft, noPrice: dedupe(noPrice), offTopic: dedupe(offTopic) };
  }

  root.PM = { priceCard, priceSoft, rankRows, testFeature, flagsOf, productClass, altIgnored, modeFeatures, CLASS_LABEL, FEATURE_LABELS, HOURS_MONTH, sumB };
})(typeof window !== 'undefined' ? window : globalThis);
