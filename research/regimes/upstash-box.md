# Upstash Box: pricing regimes (as of 2026-09-28)
Upstash Box is a Docker container per box (AWS us-east-1 only) with a built-in coding agent. There are three fixed sizes: Small 2 vCPU/4 GB/5 GB, Medium 4/8/10 and Large 8/16/20. RAM is never billed. The same box can be paid for in two very different ways:
- **Pay as You Go (PAYG):** you pay for CPU core-hours actually consumed, plus $0.10/GB-month storage.
- **Keep-Alive ("Fixed"):** a flat $8/$16/$32 per box per month covers CPU at any utilisation and the box's storage.
There was no price change.
## Resolving "active CPU hour" (three readings)
The per-size table lists Small $0.10, Medium $0.20 and Large $0.40 "per active CPU hour". There are three ways to read that for a 4 vCPU Medium box at 100% CPU:
| Reading | Meaning | Medium at 100% | Evidence |
|---|---|---|---|
| **A (adopted)** | Per **core-hour** consumed, at a rate set by box size | 4 × $0.20 = **$0.80/h** | FAQ: "measured in core-hours… 100% of 2 cores for one hour costs $0.2, 10% of a single core for one hour costs $0.01". Upstash's comparison blog says "Active core-hours only… $0.10/$0.20/$0.40 per active CPU-hour for small (2 vCPU), medium (4), large (8)" and works an example as "0.167 core-h × $0.10 = ~$0.017" on a 2 vCPU box. The site source (`box.ts`) stores `cpuHourPrice` per size |
| B | Uniform $0.10 per core-hour. The table is just "4 cores × …" marketing | $0.40/h | Consistent with the FAQ numbers but contradicts the table's per-size rates |
| C | Per **box-hour** at full load, so the price scales with cores (= $0.05/core-h) | $0.20/h | Contradicted by the FAQ: 2 cores at 100% would be $0.10, not $0.20 |
Reading A is the only one consistent with both the table and the FAQ/blog arithmetic. The only doubt left is that every official worked example uses the Small rate. The card uses A. B and C appear only in the worked example.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | PAYG Small | Default box, size `small` | Core-hours of actual CPU use. RAM free | $0.10/core-h. Full load $0.20/h | https://upstash.com/pricing/box, /pricing/box.md |
| 2 | PAYG Medium | `size: "medium"` | Same, at a higher per-core rate | $0.20/core-h. Full load **$0.80/h**. At 30%: $0.24/h | same |
| 3 | PAYG Large | `size: "large"` | Same | $0.40/core-h. Full load **$3.20/h** (the per-core rate is 4× Small's) | same |
| 4 | Running but idle | Box up, no CPU use | **$0 compute**. Storage still accrues | $0 | FAQ "When a standard box is idle with no CPU usage, no charges apply" |
| 5 | Frozen / paused (auto) | After 6 h idle on PAYG (1 h on Free). Processes stopped, filesystem kept, auto-wakes on the next request | Storage only | $0.10/GB-month. Retention limit unpublished | /pricing/box, https://upstash.com/docs/box/overall/how-it-works |
| 6 | Keep-Alive Small / Medium / Large | `keepAlive: true`. Never pauses. `initCommand` on start | **Flat per box per month.** "This is the only charge for that Keep Alive box": CPU (any utilisation) and storage included | **$8 / $16 / $32** per month (= $0.011 / $0.022 / $0.044 per hour at 730 h) | /pricing/box, https://upstash.com/docs/box/overall/keep-alive |
| 7 | Keep-Alive fleet used part-time | Keep C persistent keep-alive boxes and reuse them for your sessions | C × flat price, whatever the hours used | Medium beats PAYG above 20 h/month at 100% CPU, or 67 h at 30% | derived from #2 and #6 |
| 8 | Storage (PAYG) | "All data on disk, including snapshots", for live and paused boxes | Per GB-month (presumably on data used, not the size cap) | $0.10/GB-month. Disk caps 5/10/20 GB | /pricing/box FAQ |
| 9 | Snapshots | Filesystem + agent config. They survive box deletion and can be restored into a different size | Counted in storage | $0.10/GB-month. No retention limit published | /pricing/box, https://upstash.com/docs/box/overall/snapshots |
| 10 | EphemeralBox | `EphemeralBox.create()`: exec + files only, TTL ≤ 3 days then auto-deleted. No agent, git, public URLs or pause | No separate price published. Presumably the same active-CPU rates | null | https://upstash.com/docs/box/overall/ephemeral-box |
| 11 | Free plan | No card | **Hard cap** of 5 active CPU-hours/month (≈ $0.50 at the Small rate). Small only, 10 concurrent, 1 h idle freeze, storage free. $1 LLM budget, then the API returns 400 | $0 | /pricing/box |
| 12 | Pay as You Go plan | Card on file | No fee. 1,000 concurrent boxes (soft limit, raised on request). $100/month LLM budget | $0 fee | /pricing/box |
| 13 | Enterprise | Contact sales | Custom sizes, limits, regions, prices. Dedicated support | null | /pricing/box |
| 14 | Built-in agent LLM tokens | Agent runs using Upstash's key | Included up to $1 (Free) or $100 (PAYG/Fixed) per month, then BYOK or contact sales | — | /pricing/box FAQ |
| 15 | Egress / ingress / IPv4 | Any | **Not published.** No public IPv4 (HTTPS preview URLs + SSH gateway). 22.5 Gbps per host | null | /docs/box/overall/how-it-works |
| 16 | Regions | us-east-1 only | No multipliers | 1× | /pricing/box FAQ |
## Gotchas
1. **The per-core rate rises with box size.** A Large box costs 4× Small per core-hour, so run a workload on the smallest box that fits. The same 1 core-hour of work costs $0.10 on Small and $0.40 on Large.
2. **Keep-Alive is massively cheaper than PAYG for anything busy.** A Medium at 100% for a month costs $584 on PAYG against $16 on Keep-Alive (36×). Even part-time fleets usually win: Keep-Alive beats PAYG once a Medium box is active more than about 67 h/month at 30% CPU. The catch is that the box never resets, so state and processes carry over between sessions.
3. **RAM is free on every plan,** and an idle-but-running PAYG box costs $0. The 6 h idle freeze is a latency matter, not a cost matter. Paused boxes pay storage only.
4. **Storage is billed on everything,** including snapshots that outlive their box and frozen boxes you forgot about. It is included only in Keep-Alive. Whether snapshots *taken from* a Keep-Alive box are also included is unclear.
5. **The Free plan is a hard wall.** It is 5 CPU-h, Small boxes only. After the $1 LLM budget the agent API returns 400. It is not a credit against paid usage.
6. **Unpublished:** billing granularity, minimum billed time, Keep-Alive proration for mid-month create/delete, fair-use limits on 100%-CPU Keep-Alive boxes, and egress.
7. **Custom Docker images are "coming soon".** Environments are templated through filesystem snapshots instead.
8. **The benchmark host is aarch64.** Inside the box it reports 48 logical CPUs and 185 GiB, so the container sees host resources. Research notes say x86_64.
## Worked example
Workload: 4 vCPU / 8 GiB → **Medium**. 50 concurrent × 8 h/day × 22 days = **8,800 box-hours**. At 30% CPU that is 8,800 × 4 × 0.3 = **10,560 core-hours**. Also: 50 GiB of retained snapshots and 100 GiB egress.
Assumptions:
- 50 persistent boxes, each with its full 10 GB disk: 50 × 10 × $0.10 = $50/month (an upper bound, since storage is on data used).
- Snapshots: 50 × $0.10 = $5.
- Egress unpublished ($0 assumed).
- PAYG plan: no fee, and 50 concurrent is within the 1,000 limit.
| Regime | Compute | Box storage | Snapshots | Egress | Fee | **Monthly total** |
|---|---|---|---|---|---|---|
| PAYG Medium, reading A ($0.20/core-h), **adopted** | 10,560 × 0.20 = $2,112.00 | $50.00 | $5.00 | null ($0) | $0 | **$2,167.00** |
| PAYG Medium, reading B ($0.10/core-h) | $1,056.00 | $50.00 | $5.00 | null | $0 | **$1,111.00** |
| PAYG Medium, reading C ($0.05/core-h) | $528.00 | $50.00 | $5.00 | null | $0 | **$583.00** |
| PAYG, boxes deleted daily (no idle disk), reading A | $2,112.00 | 10 GB × 176/730 × 50 × $0.10 = $12.05 | $5.00 | null | $0 | **$2,129.05** |
| **Keep-Alive fleet: 50 Medium boxes reused daily** | included | included | $5.00 (if billed) | null | 50 × $16 = $800 | **$805.00** |
| Keep-Alive, always-on 730 h (same 50 boxes) | included | included | $5.00 | null | $800 | **$805.00** |
| Free plan | n/a (Small only, 10 boxes, 5 CPU-h cap) | | | | | not viable |
Sensitivity:
- At 100% CPU, PAYG reading A would be 35,200 core-h × $0.20 = $7,040 + $55, while Keep-Alive stays at $805.
- Under reading A, the Keep-Alive fleet is cheapest for this workload at any CPU utilisation above about 11%: $800 / (8,800 box-h × 4 × $0.20).
Sources: https://upstash.com/pricing/box · https://upstash.com/pricing/box.md · https://upstash.com/docs/box/overall/how-it-works · https://upstash.com/docs/box/overall/keep-alive · https://upstash.com/docs/box/overall/ephemeral-box · https://upstash.com/docs/box/overall/snapshots · https://upstash.com/blog/upstash-box · https://upstash.com/blog/ai-agent-sandbox-providers-compared-2026 · https://upstash.com/blog/running-claude-code-in-a-remote-sandbox-with-upstash-box · https://github.com/upstash/upstash-web/pull/662 · https://github.com/upstash/upstash-web/blob/master/src/data/pricing/box.ts