# Tenki: pricing regimes (as of 2026-09-28)
Tenki (owned by Luxor Technology) sells three products from one per-workspace credit pool:
- **Tenki Sandbox**: full Linux VMs, billed per second at E2B-identical allocation rates.
- **Tenki Runners**: GitHub Actions CI minutes on x64 and macOS, a different product (flagged `alt`).
- **Code Reviewer**: $1.00 per review.
Plans set limits and included credits, and the concurrency limit is shared between runner jobs and sandbox sessions.
Base sandbox rates: vCPU $0.000014/s = **$0.0504/h**; RAM $0.0000045/GiB-s = **$0.0162/GiB-h**; sandbox disk
$0.00000003/GiB-s ($0.000108/GiB-h) beyond **5 GiB free**; storage pool **$0.20/GiB-month** from the first byte
($0.000000076/GiB-s) for snapshots, volumes, runner caches and paused-session state. 4 vCPU / 8 GiB = **$0.3312/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Starter | Default for every workspace | $0 fee. **$100 one-time sign-up credit** (first workspace only), then PAYG from prepaid balance (top-up min $20, purchased credits never expire) | 5 concurrent, 5 members, 100 GiB storage, sandbox max 4 cores / 8 GB | https://tenki.cloud/docs/pricing.md, https://tenki.cloud/docs/account/billing |
| Team, monthly | Need >5 concurrent / bigger VMs | $250/mo **fee + separate** $100/mo credits (no rollover). Upgrading **drains** remaining Starter credit | 100 concurrent, 50 members, 1,000 GiB storage, 16 cores / 64 GB | docs pricing table; pricing FAQ |
| Team, annual | Same, billed yearly (12-month commitment; card flags it `sales` so it is opt-in in the estimator) | $200/mo ($2,400/yr), "20% saved" | as Team | https://tenki.cloud/pricing, https://tenki.cloud/docs/pricing.md |
| Enterprise | Beyond Team | Discounted rates, larger machines, unlimited concurrency on request, on-demand dedicated servers (custom), SLA | unpublished | docs pricing; billing docs |
| Sandbox running | Session `RUNNING` (also CREATING→RUNNING after a timed-out wait) | Allocated vCPU + RAM per second; "no minimums or per-seat fees" | $0.0504 / $0.0162 | pricing page |
| Sandbox disk | Root disk size (default 5 GiB; 20 GiB recommended for coding agents) | Per GiB-second beyond 5 GiB free | $0.000108/GiB-h | pricing page; sessions docs |
| Paused | `pause`, or reaching max duration (since 2026-09-11) | No compute; not counted toward concurrency; preserved memory+disk counts against the **storage pool** | $0.20/GiB-mo | concepts docs; changelog |
| Sticky session | `sticky: true` | Runs, and bills, until terminated. Ignores max duration | allocation rate | sessions docs |
| Idle | — | **No idle auto-pause**: `--idle-timeout` was removed 2026-09-18 because it "never had any effect" | — | changelog 2026-09-18 |
| Snapshots / volumes | Named memory+disk snapshots; volumes | Workspace storage pool | $0.20/GiB-mo; pool cap 100 / 1,000 GiB | docs pricing |
| x64 runners (alt) | GitHub Actions `tenki-standard-*` | Per second of job runtime (started second rounded up); queue free; RAM+disk bundled | $0.002/core-min = $0.12/core-h: 2c $0.24/h, 4c $0.48/h, 8c $0.96/h, 16c $1.92/h | https://tenki.cloud/docs/runners/sizes.md |
| macOS runners (alt) | `tenki-macos-*` (M4 Pro) | Same | $0.020/core-min = $1.20/core-h: 2c $2.40/h … 8c $9.60/h | pricing page |
| Runner cache | Beyond included | Same storage pool | $0.20/GB-mo | pricing page |
| Code reviews | Per review | — | $1.00 | pricing page |
| Other credits | Startup program; social-share reward | One-time | up to $50K; $10 (one per user) | pricing page; docs |
| Egress / IPv4 | — | Not published; no public IPv4 (HTTPS preview URLs, SSH) | null | — |
Dated changes: new pricing model (PAYG + Team) 2026-05-01. Sign-up credit replaced the legacy $10/month Starter credit
(date not stated). Sessions pause at max duration from 2026-09-11. Idle-timeout option removed 2026-09-18.
## Gotchas
1. **Pricing-page FAQ is stale.** It says "Starter's $10/month goes to your oldest workspace". The docs say the $10 monthly credit is discontinued and replaced by a $100 one-time sign-up credit.
2. **Team fee is not credit.** $250 buys limits plus a *separate* $100 credit, so Team costs $150/mo net of credit at zero usage. Upgrading forfeits leftover Starter credit.
3. **Concurrency is shared with CI.** 100 concurrent on Team covers runner jobs *and* sandboxes. A busy CI day can starve agents (jobs queue, they don't fail).
4. **The storage pool is capped.** Paused sessions keep memory+disk in the pool. 50 paused 8 GiB VMs with 20 GiB disks (~1,400 GiB) exceed Team's 1,000 GiB cap.
5. **No idle detection.** A non-sticky session runs until its max duration (default unpublished), then pauses. A sticky one bills until you terminate it. A create call that times out can still reach RUNNING and bill.
6. **Two disk meters**: per-session "Sandbox Disk" (5 GiB free) plus the pooled $0.20/GiB-month "Storage". Whether sandbox disk keeps billing while paused is undocumented.
7. **Runners cost more per hour than sandboxes** for the same shape (4c/8g: $0.48 vs $0.3312), because RAM and disk are bundled per core.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots,
100 GiB egress; paused between shifts.
Compute: 8,800 × 0.3312 = **$2,914.56** (30% CPU changes nothing). Snapshots: 50 × $0.20 = **$10**. Default 5 GiB
root disk is free (a 20 GiB disk adds 15 × 0.000108 × 8,800 = $14.26). Paused-state storage (≈ 50 × 13 GiB = 650 GiB for
~554 paused h): ≈ **$98.5**. Egress: unpublished.
| Regime | Feasible? | Monthly total |
|---|---|---|
| Starter | No: 5 concurrent (sessions above the limit queue) | n/a |
| Team monthly | Yes | **$3,074.56** = 250 − 100 + 2,914.56 + 10 (≈ $3,173 with paused state in the pool) |
| Team annual | Yes | **$3,024.56** (≈ $3,123 with paused state); $2,400/yr prepaid |
| Enterprise | Yes | discounted, unpublished |
| Runners (alt): same hours on `tenki-standard-medium-4c-8g` | Only for CI jobs, not interactive | 8,800 × 0.48 = $4,224 + Team fee |
| Anti-pattern: sticky sessions left running 24 h/day | Yes | 150 + 50 × 24 × 22 × 0.3312 = **$8,893.68** |