# MIOSA: pricing regimes (as of 2026-11-08)
MIOSA publishes one price per machine size (1 credit = $0.01) for sandboxes, desktop "Computers", apps and databases.
Plans do not change the price. A paid plan fee is counted as usage. Plans set the concurrency, the largest machine and always-on.
Source: https://miosa.ai/pricing (2026-11-08). The page no longer publishes a per-vCPU or per-GB-RAM rate.

Sandbox medium 4 vCPU / 8 GB = **$0.1785/h**, plus its 20 GB disk at $0.09/GB-month while running ($0.0025/h) = **$0.180966/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free | Default | $0 fee. $1 of usage every month. Machines pause at a $0 balance, no overage | 5 sandboxes / 1 computer at once. Largest 4 vCPU / 8 GB. No always-on ("sleeps when idle") | https://miosa.ai/pricing |
| Developer | Self-serve | $20/mo counted as usage, then pay as you go at the same rates | 50 sandboxes / 5 computers at once. Largest 4 vCPU / 8 GB. Always-on | https://miosa.ai/pricing |
| Business | Self-serve | $500/mo counted as usage | 250 / 50 at once. Largest 8 vCPU / 16 GB. Always-on | https://miosa.ai/pricing |
| Enterprise | Self-serve ("Choose Enterprise") | $2,000/mo counted as usage | 1,000 / 200 at once. Largest 16 vCPU / 32 GB. Always-on. BAAs | https://miosa.ai/pricing |
| API reference caps | /docs/api-reference/sandboxes | Lower than the pricing page | 10 (Developer), 250 (Business), 500 (Enterprise) sandboxes | https://miosa.ai/docs/api-reference/sandboxes |
| Sandbox sizes (running) | Sandbox API | Per second while running | micro 1/0.5 $0.0316, tiny 1/1 $0.0359, xs 1/2 $0.0446, small 2/4 $0.0893, quad 4/4 $0.1437, medium 4/8 $0.1785, large 8/16 $0.357, xl 16/32 $0.7141 per h | https://miosa.ai/pricing |
| Sandbox disk | Fixed per size | $0.09/GB-month while the machine runs | xs 10, small 10, medium 20, large 40, xl 80 GB. micro, tiny, quad: not published | https://miosa.ai/docs/develop/sandboxes/sizing.md |
| Computer sizes (running) | Desktop Computers | Same hour price as the sandbox size, bigger disks | xs 10, small 20, medium 50, large 100, xl 200 GB | https://miosa.ai/docs/computers/lifecycle/ |
| Paused / stopped | Pause, idle timeout, stopped Computer | No compute. Disk at the snapshot rate | $0.018/GB-month | https://miosa.ai/pricing |
| Named snapshots | On request | Stored GB + count | $0.018/GB-month. First 10 per organization included, then $1.70/month each | https://miosa.ai/pricing |
| Timeout | `timeout_sec` 1-86,400 (default 3,600) | `always_on: true` disables timeout and idle-timeout enforcement, subject to tenant policy (paid plans) | Free: 24 h max per session | https://miosa.ai/docs/develop/sandboxes/long-running-tasks.md |
| Idle pause | Accounts opened on or after 2026-10-11 | `idle_timeout_sec` default 1,800 | 30 min | https://miosa.ai/docs/api-reference/sandboxes |
| Egress | All outbound | Per GB from the first GB | $0.054/GB | https://miosa.ai/pricing |
| BYOC | Your AWS account or Google Cloud project | Your cloud bills the compute. MIOSA reports its usage separately. No rate published | Each region is accepted with MIOSA before production work | https://miosa.ai/docs/infrastructure/byoc/overview.md |
| GPU | Not a product | No GPU rate on the pricing page | n/a | https://miosa.ai/docs/known-limitations |
| Builds / tokens | Template builds, agent runs | Builds free (one FAQ line still says per minute). Tokens priced per model | Kimi K2.6 $1.90 / $8.00 per 1M in / out | https://miosa.ai/pricing |
| Regions | us-west, us-east, us-mia | No multiplier | 1 | https://miosa.ai/docs/api-reference/regions |
## Gotchas
1. **A paid plan fee is usage credit.** Business at $500 costs max($500, usage).
2. **The largest machine depends on the plan.** 16 vCPU / 32 GB needs Enterprise ($2,000).
3. **Disk comes with the size.** A bigger disk means a bigger size or a Computer.
4. **Paused state is cheap but not free**: $0.018/GB-month on the kept disk.
5. **Concurrency differs between the pricing page and the API reference.** The pricing page is newer.
6. **Session length**: without `always_on` a sandbox times out after 1 h by default and 24 h at most.
## Worked example
Workload: 4 vCPU / 8 GB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 50 GB snapshots kept, 100 GB egress.
Medium sandboxes (4/8/20 GB) pause between shifts.
- Compute + running disk: 8,800 × $0.180966 = **$1,592.50**.
- Paused state: 50 GB × $0.018 = **$0.90**.
- Egress: 100 × $0.054 = **$5.40**.
- Usage total: **$1,598.80**.

| Regime | Feasible? | Monthly total |
|---|---|---|
| Free | No: 5 at once | n/a |
| Developer ($20 credited) | Yes, 50 at once on the pricing page (API reference says 10) | **$1,598.80** |
| Business ($500 credited) | Yes | $1,598.80 |
| Anti-pattern: left running 24 h/day | Yes (always_on) | 26,400 × 0.180966 + 5.40 = **$4,782.90** |
