# Fly.io Machines: pricing regimes (as of 2026-09-28)
Fly Machines are general-purpose Firecracker microVMs, billed **per second while `started`** on the preset (CPU class × count, with base RAM) plus extra RAM. There is **no platform fee** for new orgs (pay-as-you-go since 2024-10-07). What changes the bill for the same workload:
- the CPU class (shared = 6.25% baseline + burst credits, performance = dedicated),
- the **region** (per-region multiplier on compute, 1.0x to 1.6154x),
- the lifecycle state (started vs stopped vs suspended vs destroyed),
- 1-year **reservation blocks** (40% off CPU + extra RAM, region- and class-specific),
- egress region, dedicated IPv4, volumes and snapshots,
- legacy plans (Hobby/Launch/Scale) that some old orgs still carry.
Base rates (docs): shared vCPU $0.00000075/s ($0.0027/h, incl. 256 MB), performance vCPU $0.00001196/s ($0.043056/h, incl. 2 GB), extra RAM $0.00000193/GB-s ($0.006948/GB-h = $5/GB-month), up to 128 GB.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Performance CPU, base region | `performance-Nx` in iad (Ashburn) or ewr (Secaucus) | Per second while started, on allocation (utilisation ignored). Preset includes 2 GB/vCPU; extra RAM up to 8 GB/vCPU (max 128 GB) | performance-4x (4 vCPU/8 GB) = **$0.1722/h** ($124/720-h month). 1x $0.0431 … 16x $0.6889 | https://fly.io/pricing, https://docs.fly.io/about/pricing/ |
| 2 | Shared CPU (burstable) | `shared-cpu-Nx` | Same per-second allocation billing, but each shared vCPU is guaranteed only **5 ms per 80 ms (6.25%)**; burst balance starts at 5 s, max 500 s; beyond that the VM is throttled. RAM 256 MB/vCPU included, up to 2 GB/vCPU | shared-cpu-4x (1 GB) $0.0108/h; + 7 GB extra RAM = **$0.0594/h** for 4 vCPU/8 GB. Cannot sustain 30% of 4 vCPU | https://docs.fly.io/about/pricing/, https://docs.fly.io/machines/cpu-performance/ |
| 3 | Region multipliers | Machine region | Multiplier on CPU + RAM (compute) prices | iad/ewr 1.0; ams/arn 1.0385; yyz 1.1154; lhr/cdg 1.1346; fra 1.1538; sjc 1.1923; lax 1.1995; ord/dfw 1.25; sin/syd 1.2692; jnb 1.3029; nrt 1.3077; **gru 1.6154** | https://docs.fly.io/about/pricing/ |
| 4 | Reservation blocks (performance) | Buy upfront per region + CPU class; 12 monthly credits, **no rollover**, apply to CPU + extra RAM only (not storage/egress), backdated to 1st of purchase month | Prepaid annual, 40% discount | $144/yr -> $20/mo; $1,440/yr -> $200/mo; $14,400/yr -> $2,000/mo | https://docs.fly.io/about/pricing/, https://community.fly.io/t/reservation-blocks-40-discount-on-machines-when-youre-ready-to-commit/20858 |
| 5 | Reservation blocks (shared) | Same, shared class | 40% discount | $36/yr -> $5/mo; $360/yr -> $50/mo; $3,600/yr -> $500/mo | same |
| 6 | Stopped Machine | `stopped` state (manual, autostop, or exit) | No CPU/RAM. **Rootfs billed** per second | $0.15/GB per 30 days (≈$0.000208/GB-h). Rootfs is reset from image on restart unless `persist_rootfs` | https://docs.fly.io/about/billing/ |
| 7 | Suspended Machine | `suspended` (Firecracker memory snapshot; `auto_stop_machines="suspend"`) | "Same as stopped: storage only" (rootfs). Memory snapshot not billed separately. Limited to machines with **≤2 GB RAM**, no swap/schedule; snapshot discarded on deploy/migration/maintenance | $0.15/GB-month rootfs | https://docs.fly.io/reference/suspend-resume/ |
| 8 | Destroyed Machine | Machine destroyed | $0 (only volumes/snapshots remain) | 0 | https://docs.fly.io/about/billing/ |
| 9 | Created-not-started (`skip_launch`) | Pre-created warm-pool Machine | Not `started`, so presumably billed like stopped (rootfs); not explicitly documented | null | https://docs.fly.io/machines/api/machines-resource |
| 10 | Volumes | Persistent NVMe volume attached to one Machine | **Provisioned** capacity, billed hourly **whether or not the Machine runs** | $0.15/GB-month, max 500 GB, extend-only | https://fly.io/pricing, https://docs.fly.io/about/cost-management/ |
| 11 | Volume snapshots | Daily automatic (retained 1-60 d, default 5) + on-demand | Pro-rated hourly, free allowance subtracted first. Became billable Jan 2026 | $0.08/GB-month, first 10 GB free each month (per org) | https://fly.io/pricing, https://docs.fly.io/about/billing/ |
| 12 | Egress (internet) | Outbound data, by source region | Per GB, no free allowance for new orgs | NA/EU $0.02; APAC/Oceania/SA $0.04; Africa/India $0.12 | https://docs.fly.io/about/pricing/ |
| 13 | Private-network cross-region | 6PN traffic between regions | Per GB | NA/EU $0.006; APAC/Oceania/SA $0.015; Africa/India $0.05 | same |
| 14 | IP addresses | Per app | Shared IPv4 + Anycast IPv6 free; dedicated IPv4 (needed for raw UDP) monthly; static egress IP hourly | Dedicated IPv4 **$2/mo**; static egress IP $0.005/h (~$3.60/mo, up to 64 Machines each) | same |
| 15 | TLS certificates | Custom domains | Monthly | $0.10/mo per hostname (first 10 free per org), $1/mo wildcard | same |
| 16 | Legacy Hobby plan | Orgs that signed up before 2024-10-07 and kept it | $5/mo fee converted into $5 of usage; plus legacy free allowances | Allowances: 3 shared-cpu-1x 256 MB VMs, 3 GB volumes, egress 100 GB NA/EU + 30 GB APAC/SA + 30 GB Africa/India | https://docs.fly.io/about/discontinued-plans/ |
| 17 | Legacy Scale / Launch plans | Same (grandfathered) | Fee pro-rated and returned as included usage | Scale $29/mo (example on docs); Launch fee not shown | same |
| 18 | Free trial | New org without card | 2 VM-hours total or 7 days (first reached); max 10 machines, 2 vCPU/4 GB each, 20 GB volumes, no performance CPUs, no dedicated IPv4; auto-stop 5 min. Adding a card ends it | no $ credit | https://docs.fly.io/about/free-trial/ |
| 19 | Prepaid credits (no card) | Buy credits in dashboard | Consumed by usage | min purchase $25 | https://docs.fly.io/about/billing/ |
| 20 | Support / compliance add-ons | Optional | Flat monthly, not usage credit | Standard $29, Premium $199, Enterprise from $2,500 (99.9% SLA); HIPAA package $99/mo | https://fly.io/pricing |
| 21 | Custom plan | Contact sales | Committed spend, volume discounts, invoicing, dedicated capacity | unpublished | https://fly.io/pricing |
| 22 | Startup program | Application | Credit | up to $15,000 | https://fly.io/pricing |
| 23 | GPU Machines | — | **Discontinued** (A10/L40S/A100 deprecated 2026-07-31, unavailable from 2026-08-01) | n/a | https://community.fly.io/t/gpu-migration-fly-io-gpus-will-be-deprecated-as-of-july-31-2026/27110 |
| 24 | Fly Kubernetes | FKS cluster | Per cluster + underlying Machines | $75/mo per cluster | https://docs.fly.io/about/pricing/ |
## Gotchas
1. **Shared CPUs are a trap for real load.** They are 36% the price of performance CPUs but guarantee only 6.25% of each vCPU; a 500 s burst bank then throttling. A sandbox at 30% average CPU will be throttled; you need performance CPUs.
2. **Region matters up to 1.6154x.** The pricing page shows the Ashburn/Secaucus base price. São Paulo is +61.5%; Chicago/Dallas +25%; even EU Frankfurt +15%. Egress also triples/sextuples outside NA/EU.
3. **Stopping is not free.** Stopped and suspended Machines bill rootfs at $0.15/GB-month until destroyed. Volumes bill on provisioned size even when nothing runs.
4. **Suspend (memory snapshot) is effectively limited to ≤2 GB RAM Machines**, and the snapshot is thrown away on every deploy or host migration (cold boot fallback). A 4 vCPU/8 GB sandbox can only stop, not suspend.
5. **Reservations are region- and class-locked monthly credits with no rollover.** They pay off only for steady monthly usage in one region; unused credit is lost each month. Annual prepaid, so they are a commitment.
6. Rootfs is **ephemeral** (reset to image on restart) unless `persist_rootfs` is set; real persistence needs a Volume (one Machine per volume, local to one host).
7. Utilisation never reduces the bill: billing is per second on allocation while `started`. Fly Proxy autostop/autosuspend helps only for request-driven apps.
8. No free allowance for new orgs (only the 2 VM-hour trial). Legacy orgs keep 3 free shared VMs + 160 GB egress.
9. Pricing page per-month figures assume a 720 h month; stopped rootfs is "per 30 days".
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 Machine-hours**, 30% CPU util, 50 GiB snapshots retained, 100 GiB egress.
Assumptions: performance-4x (exact fit; $0.172224/h per second-exact). Rootfs 10 GB when kept stopped overnight (27,700 stopped Machine-hours). Snapshots = volume snapshots: (50 − 10 free) × $0.08 = **$3.20**. Egress in NA/EU = **$2.00** (APAC/SA $4, Africa/India $12). Shared IPv4 is free (dedicated IPv4 would add $2/app).
| Regime | Compute (8,800 h) | Idle state | Snapshots | Egress | **Monthly total** |
|---|---|---|---|---|---|
| Performance-4x, iad/ewr, destroyed each night | $1,515.57 | $0 | $3.20 | $2.00 | **$1,520.77** |
| Same, stopped overnight (10 GB rootfs) | $1,515.57 | $57.71 | $3.20 | $2.00 | **$1,578.48** |
| Same, destroyed nightly but 10 GB Volume each kept | $1,515.57 | $75.00 (volumes, 24/7) | $3.20 | $2.00 | **$1,595.77** |
| Performance-4x, Amsterdam (1.0385) | $1,573.92 | $0 | $3.20 | $2.00 | **$1,579.12** |
| Performance-4x, Frankfurt (1.1538) | $1,748.67 | $0 | $3.20 | $2.00 | **$1,753.87** |
| Performance-4x, Singapore/Sydney (1.2692) | $1,923.56 | $0 | $3.20 | $4.00 | **$1,930.76** |
| Performance-4x, São Paulo (1.6154) | $2,448.25 | $0 | $3.20 | $4.00 | **$2,455.45** |
| Performance-4x, iad + reservation blocks (7 × $1,440/yr + 6 × $144/yr = $1,520/mo credit) | $912.00 (= $10,944/yr ÷ 12; credit covers $1,515.57) | $0 | $3.20 | $2.00 | **$917.20** (1-year commit) |
| shared-cpu-4x + 7 GB RAM, iad (**invalid: throttled at 6.25%/vCPU**) | $523.04 | $0 | $3.20 | $2.00 | $528.24 (only if avg CPU ≤ ~6% per vCPU) |
| Suspend instead of stop | not allowed at 8 GB RAM (≤2 GB only) | | | | n/a |
Other effects: 30% utilisation saves nothing (allocation billing). Support plans ($29/$199/$2,500+) and HIPAA ($99) are optional add-ons. The reserved row assumes the same usage every month; unused block credit is forfeited monthly.
Sources: https://fly.io/pricing · https://docs.fly.io/about/pricing/ · https://docs.fly.io/about/billing/ · https://docs.fly.io/about/discontinued-plans/ · https://docs.fly.io/about/free-trial/ · https://docs.fly.io/about/cost-management/ · https://docs.fly.io/reference/suspend-resume/ · https://docs.fly.io/machines/cpu-performance/ · https://community.fly.io/t/reservation-blocks-40-discount-on-machines-when-youre-ready-to-commit/20858 · https://community.fly.io/t/gpu-migration-fly-io-gpus-will-be-deprecated-as-of-july-31-2026/27110