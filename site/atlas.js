// Parameter atlas + pricing flowchart. Examples cite research/providers/*.json and research/regimes/*.md.
module.exports.atlas = [
  { title: 'Machine shape', items: [
    { p: 'vCPU count and what a "vCPU" is', d: 'Most bill per hyperthread. Modal and Beam bill per physical core (1 core = 2 vCPU), which halves the headline rate.', e: 'Modal, Beam' },
    { p: 'RAM, and RAM-per-vCPU rules', d: 'Some force a ratio: Vercel gives exactly 2 GiB per vCPU; Cloudflare needs at least 3 GiB per vCPU; SF Compute bills a 4 GiB-per-core minimum.', e: 'Vercel, Cloudflare, SF Compute' },
    { p: 'Presets vs free sizing', d: 'Fixed presets round you up to the next size (boat, Fly, CodeSandbox, Koyeb). Per-resource pricing bills exactly what you ask for.', e: 'boat, Fly, Koyeb' },
    { p: 'Size gates per plan', d: 'Bigger sizes unlock only on higher plans: boat xlarge needs the $100 plan, Miosa above 2 vCPU needs Business ($500), Daytona caps at 4 vCPU / 8 GiB on low tiers.', e: 'boat, Miosa, Daytona' },
    { p: 'Shared/burstable vs dedicated CPU', d: 'Fly shared CPUs cost a fraction of performance CPUs but get throttled. Hetzner CX/CPX vs CCX. Koyeb eco vs standard.', e: 'Fly, Hetzner, Koyeb' },
    { p: 'GPU type, count and fraction', d: 'Priced per GPU-hour and usually dominates the bill. Spot/evictable GPUs are cheaper (Daytona).', e: 'Modal, Daytona, Northflank, Beam' },
    { p: 'Operating system', d: 'Windows adds a licence fee per vCPU-hour. macOS must run on Apple hardware, and Apple\'s licence imposes a 24-hour minimum lease per host.', e: 'Daytona Windows, AWS EC2 Mac' },
    { p: 'CPU architecture', d: 'arm64 is often 10–20% cheaper where it exists (Fargate Graviton, Runloop arm64).', e: 'AWS, Runloop' },
  ]},
  { title: 'What the meter counts', items: [
    { p: 'CPU on allocation vs active use', d: 'Active-CPU billing charges only busy cycles: Vercel, Cloudflare, Sprites, Tensorlake, Upstash, Railway containers, AWS AgentCore, Deno. Idle agent sandboxes become far cheaper.', e: 'Vercel, Cloudflare, Sprites' },
    { p: 'RAM on allocation vs resident', d: 'Most bill allocated RAM even when CPU is active-billed. boxd, Sprites and Railway bill RAM actually used; Railway VMs count page cache.', e: 'boxd, Sprites, Railway' },
    { p: 'max(requested, used)', d: 'Modal bills whichever is higher, so bursting above a request costs extra.', e: 'Modal' },
    { p: 'One-dimension pricing', d: 'Blaxel and Sandbox0 bill RAM only with CPU bundled. Morph bills compute units = max(vCPU, RAM/4, disk/16).', e: 'Blaxel, Sandbox0, Morph' },
    { p: 'Credits per size', d: 'CodeSandbox sells credits consumed per started minute at a per-size rate; the $/credit changes by plan.', e: 'CodeSandbox' },
    { p: 'Flat pool', d: 'exe.dev sells a monthly vCPU/RAM pool shared by up to 50 VMs: cheapest when full, wasteful when idle.', e: 'exe.dev' },
    { p: 'Per execution or session', d: 'Some charge per run instead of per second: Together Code Interpreter per 60-minute session, Riza per request, Lambda per request plus GB-seconds.', e: 'Together, Riza, Lambda' },
    { p: 'Disk provisioned vs bytes written', d: 'boxd and Sprites bill written bytes; Sprites splits hot storage (awake) from cold storage (kept).', e: 'boxd, Sprites' },
  ]},
  { title: 'Time and lifecycle', items: [
    { p: 'Billing granularity', d: 'Per millisecond (Beam), 10 ms (Cloudflare), per second (most), per started minute (CodeSandbox), 1-minute minimums (Vercel).', e: 'Beam, Vercel, CodeSandbox' },
    { p: 'Minimum per start', d: 'Short sessions get rounded up to the minimum. This matters most for code-interpreter bursts.', e: 'Vercel, EC2 Mac (24 h)' },
    { p: 'Boot and teardown billed', d: 'Daytona bills reserved resources while starting and stopping; cold-start seconds are paid time everywhere.', e: 'Daytona' },
    { p: 'Idle behaviour', d: 'Auto-standby after seconds (Blaxel ~15 s, Mosaic 3 s) vs timers you set vs nothing (boat and exe.dev keep billing until stopped or TTL). The idle signal can be network traffic (boxd) or CPU.', e: 'Blaxel, Mosaic, boxd' },
    { p: 'Lifecycle state price list', d: 'running → idle-running → standby (RAM kept; boxd bills RAM) → paused (memory snapshot; storage only) → hibernated → stopped (disk still billed at Daytona and Fly) → archived (free at Daytona).', e: 'boxd, Daytona, Fly' },
    { p: 'Session and lifetime caps', d: 'Caps force restarts and rebuy boot time: E2B Hobby 1 h, Pro 24 h; Modal 24 h; Runloop 48 h; Novita 1–24 h depending on the page.', e: 'E2B, Modal, Runloop' },
  ]},
  { title: 'Storage', items: [
    { p: 'Included disk', d: 'Free disk per sandbox varies from 5 GiB (Daytona) to 20 GiB (Novita) to 50 GiB (boat default size).', e: 'Daytona, Novita, boat' },
    { p: 'Disk beyond included', d: 'Per GiB-month; some bill it while stopped, others only while running.', e: 'Daytona, Freestyle, Runloop' },
    { p: 'Snapshots', d: 'Free (boat, E2B pause), $0.08/GiB-month (Vercel auto-snapshots on every stop), $0.20/GiB-month (Blaxel standby). Memory snapshots are larger than filesystem ones.', e: 'Vercel, Blaxel, E2B' },
    { p: 'Free storage pools', d: 'Novita: 60 GB free per account then per GB-hour. Beam: free up to 1 TB.', e: 'Novita, Beam' },
    { p: 'Retention limits', d: 'Paused state may expire: Cloudflare backups after 3 days by default, Blaxel 7/30/unlimited days by tier, Modal memory snapshots after 7 days.', e: 'Cloudflare, Blaxel, Modal' },
  ]},
  { title: 'Network', items: [
    { p: 'Egress per GiB and free allowance', d: 'Ranges from free (Blaxel, Beam, Tensorlake) through $0.02–0.05 to region-dependent (Fly $0.02–0.12). Many providers do not publish it at all.', e: 'Fly, Railway, Freestyle' },
    { p: 'Ingress to exposed ports', d: 'Vercel bills traffic to exposed ports in both directions.', e: 'Vercel' },
    { p: 'Dated changes', d: 'Modal starts charging egress on 2026-10-01 ($0.04/GiB after 1 TiB Starter, 10 TiB Team).', e: 'Modal' },
    { p: 'Dedicated IPv4', d: 'Fly $2/month; Hetzner charges for primary IPv4; boat includes an address; most sandboxes have none.', e: 'Fly, Hetzner, boat' },
    { p: 'Static egress IP / gateways', d: 'Often an add-on or enterprise feature (Blaxel dedicated egress gateways).', e: 'Blaxel' },
  ]},
  { title: 'Account and plan', items: [
    { p: 'Plan fee: pure fee, credit, or minimum spend', d: 'boat, Freestyle, Railway and Tensorlake Pro turn the fee into usage. E2B Pro ($150) and Runloop Pro ($250) are pure fees. Modal Team charges $250 but includes only $100 of credit.', e: 'E2B, Modal, boat' },
    { p: 'Concurrency caps', d: 'Often the real reason you pay for a plan: E2B 20 → 100 → 1,100; boat 100 → 2,000; CodeSandbox 10 → 250.', e: 'E2B, boat, CodeSandbox' },
    { p: 'Start-rate caps', d: 'Sandboxes per minute/hour/day (boat 12/min on $20). This limits RL and interpreter workloads.', e: 'boat' },
    { p: 'Prepaid tiers that unlock limits', d: 'Daytona tiers require cumulative top-ups (Tier 4 = $2,000 per 30 days); Blaxel concurrency rises with monthly top-ups.', e: 'Daytona, Blaxel' },
    { p: 'Included resource allowances', d: 'Freestyle gives every plan 200 vCPU-h, 400 GiB-h RAM and 60k GiB-h disk per month before billing.', e: 'Freestyle' },
    { p: 'Seats', d: 'Per extra member: Vercel $20, Beam $25, exe.dev team tiers per user. Some multiply limits by seats (boat orgs).', e: 'Vercel, Beam, boat' },
    { p: 'Free tiers and credits', d: 'One-time sign-up credit (E2B $100, Daytona $200, Hopx $200) vs recurring monthly credit (Modal $30, CodeSandbox 400 credits).', e: 'E2B, Modal' },
    { p: 'Credit expiry and overage', d: 'Plan time expires monthly while packs persist (boat); balance hitting zero stops sandboxes after a grace period, or deletes data (Novita).', e: 'boat, Novita' },
    { p: 'Feature gates', d: 'Pause/suspend only on paid plans (Runloop Pro), egress allowlist forced on low tiers (Daytona Tier 1–2).', e: 'Runloop, Daytona' },
  ]},
  { title: 'Commitment and discounts', items: [
    { p: 'Always-on flat price', d: 'Upstash Box: $16/month for a box that never stops vs per active-CPU-hour on demand.', e: 'Upstash' },
    { p: 'Monthly caps', d: 'Hourly billing stops at a monthly ceiling (Hetzner-style), so always-on costs the cap.', e: 'Hetzner' },
    { p: 'Reservations and savings plans', d: 'Fly reserved blocks about 40% off; AWS savings plans / reserved instances; Arker commitment formulas.', e: 'Fly, AWS, Arker' },
    { p: 'Spot / evictable', d: 'Large discounts in exchange for interruption: Fargate Spot, Daytona spot GPUs.', e: 'AWS, Daytona' },
    { p: 'Prepaid vs Pro rates', d: 'Tensorlake bills less per hour on Pro than on prepaid credits ($0.24 vs $0.40 for 4/8).', e: 'Tensorlake' },
  ]},
  { title: 'Placement and platform', items: [
    { p: 'Region multipliers', d: 'Modal ×1.15 broad region / ×1.75 narrow; Fly up to ×1.6 by region; Vercel rates differ per region.', e: 'Modal, Fly, Vercel' },
    { p: 'Non-preemptible premium', d: 'Modal sandboxes are priced at 3× its preemptible functions rate, already included in the rate.', e: 'Modal' },
    { p: 'Required platform fees', d: 'Cloudflare needs Workers Paid ($5/month) plus Durable Object and Worker usage for every sandbox.', e: 'Cloudflare' },
    { p: 'Per-creation fee', d: 'Vercel charges per million sandbox creations; Sail charges a small per-sandbox fee.', e: 'Vercel, Sail' },
    { p: 'BYOC and self-host', d: 'Northflank BYOC adds no Northflank charge; E2B, Runloop and boxd can deploy into your cloud or be self-hosted.', e: 'Northflank, E2B, boxd' },
    { p: 'Currency and tax', d: 'boxd prices natively in EUR; EU VAT applies to EU entities.', e: 'boxd' },
  ]},
  { title: 'Performance: price per unit of work', items: [
    { p: 'CPU speed per vCPU', d: 'Same-size sandboxes differ about 3× in measured throughput (Node.js tooling runs/s), so $/hour is not $/job. Turn on "CPU-bound" to scale session time.', e: 'HPC sandbox benchmarks' },
    { p: 'Cold start', d: 'Paid boot time, and for bursts it can exceed the work itself (13 ms to 2+ s median cold start).', e: 'ComputeSDK' },
    { p: 'Noisy neighbours and throttling', d: 'Shared/burstable CPUs and gVisor syscall overhead stretch wall-clock time you pay for.', e: 'Fly shared, Modal gVisor' },
  ]},
];

module.exports.flow = `flowchart TD
  W([Workload: shape, sessions, duration, concurrency, utilisation, state, egress]) --> OS{Operating system}
  OS -->|macOS| MAC[Apple hardware only<br/>24 h minimum lease per host]
  OS -->|Windows| WIN[+ licence per vCPU-hour]
  OS -->|Linux| MET
  MAC --> MET
  WIN --> MET
  MET{How is compute metered?}
  MET -->|Presets| P1[Round up to the next size]
  MET -->|Per resource| P2{CPU basis}
  MET -->|Flat pool| P3[Monthly tier shared by N VMs]
  MET -->|Units or credits| P4[units = max of vCPU, RAM/4, disk/16<br/>or credits × $/credit]
  MET -->|Per execution| P5[$ per run or per session]
  P2 -->|allocated| R1{RAM basis}
  P2 -->|active use| P2a[vCPU × busy % × rate]
  P2 -->|max requested, used| P2b[bursting above request costs extra]
  P2a --> R1
  P2b --> R1
  R1 -->|allocated| T
  R1 -->|resident / peak| R1a[GiB actually used × rate]
  R1a --> T
  P1 --> T
  P3 --> PLAN
  P4 --> T
  P5 --> T
  T{Commitment regime} -->|on-demand| TM[Hours × rate<br/>rounded to granularity, min per start]
  T -->|always-on commit| TC[Flat $ per instance-month]
  T -->|monthly cap| TK[min of hours × rate, cap]
  T -->|spot or reserved| TS[discounted rate, interruptible or prepaid]
  TM --> MULT[× region multiplier · + GPU per GPU-hour · + creation fees]
  TC --> MULT
  TK --> MULT
  TS --> MULT
  MULT --> LIFE{When the sandbox is not working}
  LIFE -->|keeps running| L1[still billed at full rate]
  LIFE -->|standby| L2[RAM and/or disk billed]
  LIFE -->|paused or snapshot| L3[snapshot GiB-month]
  LIFE -->|stopped| L4[disk GiB-month at some providers]
  LIFE -->|archived or deleted| L5[free]
  L1 --> ST
  L2 --> ST
  L3 --> ST
  L4 --> ST
  L5 --> ST
  ST[+ disk beyond included · + volumes] --> NET[+ egress beyond free allowance · + ingress to ports · + IPv4]
  NET --> PLAN{Plan that fits concurrency, session cap, size gate, start rate}
  PLAN -->|fee is credit or minimum spend| PL1[pay max of fee, usage]
  PLAN -->|fee is a pure fee| PL2[fee + usage − included]
  PLAN -->|prepaid tier| PL3[top-up unlocks limits]
  PL1 --> SEAT
  PL2 --> SEAT
  PL3 --> SEAT
  SEAT[+ seats · + platform fees · − monthly free credit] --> BILL([Monthly bill])`;
