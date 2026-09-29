# Archil — pricing regimes (as of 2026-09-28)
Archil is mainly a **serverless file system**: an S3-backed "disk" whose hot data sits in a durable cache. Storage bills on
time-weighted **active (cached) data**; cold data stays in your own bucket at your bucket's prices. Compute comes in two
products that are billed separately from storage: **persistent sandboxes** (Linux microVMs, in preview) and **serverless execution**
(`disk.exec`, per-ms). The two self-serve plans each bundle a storage allowance with a sandbox-minute allowance, and the sandbox hourly
rate depends on the plan. Only one sandbox size is priced publicly: **2 vCPU / 4 GB**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Developer plan | Default, no card | Free allowances each month, then usage | $0/mo; 10 GB performance storage then $0.30/GB-mo; 30 sandbox-min then **$0.27/h**; ≤5 file systems; **sandbox internet egress denied** | https://archil.com/pricing, docs /compute/sandboxes/introduction |
| Team plan | Production, need sandbox egress, orgs, BAA/DPA | **$500/mo pure fee** buying allowances (not usage credit) + usage | 1 TB storage then $0.20/GB-mo; 1,000 sandbox-min then **$0.18/h** (−33%); unlimited FS | https://archil.com/pricing |
| Enterprise | >50 TB, BYOC / on-prem, SSO/SCIM, SLA | Custom, committed spend, net-30 | Volume discounts >50 TB; unpublished | https://archil.com/pricing, docs /administration/billing |
| Sandbox running | Sandbox running (incl. idle) | Per sandbox-hour for the fixed 2 vCPU / 4 GB size; granularity unpublished (allowance given in minutes) | $0.27/h Dev, $0.18/h Team | https://archil.com/pricing |
| Other sandbox sizes | API allows 1–32 vCPU, 0.25–64 GiB | **Price unpublished** | null | docs /compute/sandboxes/introduction |
| Sandbox paused (memory + disk) | `pause()`, hard TTL (default and max 24 h), optional idle TTL | "Stop the sandbox from incurring charges"; storage of the snapshot not priced | $0 compute; snapshot storage null | docs /compute/sandboxes/introduction |
| Sandbox stopped | `stop()` | VM shut down, disk kept; compute stops; disk storage price unpublished | $0 compute | same |
| Forks | Fork running/paused/stopped sandbox | Each fork is a new sandbox billed per hour; a running source is briefly paused | per-hour rate | same |
| Storage-bundled compute | Every 1 TB of active data | Grants 1,000 free sandbox-min (and 1,000 free serverless-exec min) per month | Matches Team's 1 TB + 1,000 min; stacking beyond that unverified | docs overview "Pricing", /compute/serverless-execution |
| Performance storage (disk active data) | Data read/written in the last hour, prefetch, metadata writes (32 KiB each) | Metered every minute; time-weighted average; branches/checkpoints are CoW, billed only for unique data | $0.30/GB-mo Dev, $0.20/GB-mo Team (docs still say flat $0.20/GiB-mo) | https://archil.com/pricing, docs /concepts/metering |
| Archive storage | File systems not syncing to a customer bucket | Per GB-month | $0.025/GB-mo | https://archil.com/pricing |
| Out-of-region FS egress | Accessing a file system from another region | Per GB | $0.05/GB (docs billing page still says "no egress fees") | https://archil.com/pricing |
| Serverless execution | `disk.exec` / `disk.grep` without a VM | `execute_ms` in 1 ms increments, 100 ms minimum per call, queue time free | 1,000 free min/mo per TB active data; rate beyond that unpublished | docs /compute/serverless-execution |
| Regions | AWS us-east-1 priced | "Other regions vary" (sandboxes: AWS us-east-1, us-west-2, eu-west-1) | multiplier unpublished | https://archil.com/pricing |
| No-charge items | — | No IOPS, per-volume, API-call or minimum-commitment fees | $0 | https://archil.com/pricing |
Dated changes: Sept 2026 changelog. Sandbox timeouts now **pause** instead of shutting down; the hard TTL defaults to 24 h and cannot exceed 24 h (it can be reset);
there is an optional idle TTL. Persistent sandboxes launched as a preview (changelog). No rate changes found.
## Gotchas
1. **The Developer plan can't reach the internet.** All sandbox egress is denied, and sandboxes created on Developer keep denying
   egress after an upgrade until you replace their policy. Most agent workloads therefore need Team at $500/mo.
2. **Team's $500 is a pure fee.** It buys 1 TB of storage (≈$200 at list) and 1,000 sandbox-min (≈$3). Sandbox time beyond that is billed on top.
3. **Only 2 vCPU / 4 GB is priced.** The API accepts up to 32 vCPU / 64 GiB, but those sizes have no published price.
4. **The sandboxes are a preview.** They may be pre-empted, and a host failure loses memory state.
5. **Idle sandboxes bill until paused.** The idle TTL is off by default. The hard TTL pauses at ≤24 h, which caps an accidental idle run at 24 h.
6. **The pricing page and docs conflict.** The docs billing page still says a flat $0.20/GiB-mo with "no egress fees". The pricing page
   says $0.30 (Dev) / $0.20 (Team) and $0.05/GB out-of-region egress. The pricing page is used here.
7. **"Active data" isn't what you store.** Prefetch and rapid overwrites inflate it, each metadata write counts 32 KiB, and data stays
   active for up to 1 h after last access.
8. **Storage for sandbox snapshots and root disks is unpriced.**
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots,
100 GiB egress. **No 4/8 size is priced**, so two readings are shown:
(a) downsize to the priced 2 vCPU / 4 GB box; (b) *assume* linear scaling (4/8 = 2 × the 2/4 price, unverified).
Snapshots are kept on an Archil disk as performance storage. 30% CPU changes nothing (per-hour billing).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Team, (a) 2/4 box | Yes (preview) | (8,800 − 16.67 h) × $0.18 = $1,581.00 + $500 = **$2,081.00**; snapshots $0 (within 1 TB); egress: sandbox internet egress price unpublished |
| Team, (b) linear-scaled 4/8 (assumption) | Size unpublished | (17,600 − 16.67) × $0.18 = $3,165.00 + $500 = **$3,665.00** |
| Developer, (a) 2/4 box | Only if the workload needs no internet egress | (8,800 − 0.5) × $0.27 = $2,375.87 + 40 GB × $0.30 = $12 → **$2,387.87** |
| Developer, (b) linear-scaled | Same egress blocker | $4,751.87 + $12 = **$4,763.87** |
| Enterprise | Yes | unknown |
| Anti-pattern: Team 2/4 left running 24 h/day (hard TTL reset daily) | Yes | (26,400 − 16.67) × $0.18 + $500 = **$5,249.00** |
The $0.05/GB egress only applies to out-of-region file-system access. If the 100 GiB were that kind of traffic, add $5.00.