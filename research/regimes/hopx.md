# Hopx: pricing regimes (as of 2026-09-28)
Hopx (by Bunnyshell, Firecracker microVMs) has **one public price sheet** and no subscription: $0.000014/vCPU-s, $0.0000045/GiB-s RAM, $0.00000003/GiB-s disk, per second. The rates are byte-for-byte identical to E2B's. A 4 vCPU / 8 GiB sandbox costs **$0.3312/h** plus disk. Beyond that, what changes the bill is the lifecycle state (running / paused / stopped / timed-out), the wall-clock timeout, and the unpriced Pro/Enterprise tiers.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Pay-per-use (default, "Free tier") | Every account. No subscription, no minimum | Per second on **allocated** vCPU + RAM + disk while running. The page labels memory "RAM allocation". The "100 × 30 s × 1 vCPU = $0.04" example also only works as allocated wall-clock (3,000 s × $0.000014 = $0.042) | $0.0504/vCPU-h, $0.0162/GiB-h, $0.000108/GiB-h disk ($0.0788/GiB-month). 4/8 = $0.3312/h + $0.00108/h per 10 GiB disk | https://hopx.ai/pricing |
| 2 | "Pay only when your code runs" marketing reading | If CPU were metered on utilisation | **Not supported by the rate labels.** The page's own examples compute on allocation. Kept only as a sensitivity row | would be 4 × util × 0.0504 + 8 × 0.0162 | https://hopx.ai/pricing |
| 3 | Custom sizes (template-fixed) | Resources are set per **template** at build time, not at sandbox create | Same linear rates at any size | 1-64 vCPU, 512 MB-64,000 MB RAM, 1-250 GB disk. Limits "depend on your plan" (per-plan values unpublished) | https://docs.hopx.ai/core-concepts/templates/configuration |
| 4 | Desktop / computer-use templates | VNC desktop, screen recording, mouse/keyboard API | No separate desktop surcharge published. Same resource rates | = regime 1 | https://docs.hopx.ai/core-concepts/desktop/index |
| 5 | Running but idle | Between calls, until the timeout fires | Full allocated rate. There is **no idle auto-stop**: `timeout_seconds` is a wall-clock auto-**delete** timer | Default timeout 3,600 s (CLI config). Extendable via PUT /timeout | https://docs.hopx.ai/core-concepts/sandboxes/timeout |
| 6 | Paused | `POST /v1/sandboxes/:id/pause` (memory + processes preserved) | Compute stops ("No idle charges", "Pause to free resources"). **Storage/snapshot charge while paused not published** | compute $0; storage null | https://hopx.ai/pricing, https://docs.hopx.ai/api/control-plane/pause-sandbox |
| 7 | Stopped | `stop` (filesystem kept, full restart on start) | Compute stops. Whether disk ($0.0788/GiB-month) keeps billing is **not documented** | null | https://docs.hopx.ai/core-concepts/sandboxes/managing-state |
| 8 | Timed out | Timeout expires | Sandbox is **deleted**, all data lost, billing ends | $0 | https://docs.hopx.ai/core-concepts/sandboxes/timeout |
| 9 | Snapshots | `hopx system snapshot` CLI id; template snapshots | No published price. The provider record notes a 30-days-after-last-use expiry (configurable). No documented restore/fork flow | null | https://docs.hopx.ai/llms-full.txt |
| 10 | Regions | `region` = `us-east` or `eu-west` at create | **No regional price difference published** | multiplier 1 | https://docs.hopx.ai/api/control-plane/create-sandbox |
| 11 | Egress / public URLs | Every port auto-exposed at `https://<port>-<id>.hopx.dev` | Egress **not priced on the page** (neither free nor metered). No public IPv4 | null | https://hopx.ai/pricing |
| 12 | Free credit | Sign-up, no card | $200 one-time. "Enough for ~4,000 hours of basic usage". Expiry not stated | $200 | https://hopx.ai/pricing |
| 13 | Prepaid balance + auto-recharge | Dashboard/CLI `hopx billing auto-recharge` | Usage deducts from a balance. Recharge amounts are not documented | null | https://docs.hopx.ai/cli/commands/billing |
| 14 | Pro tier | Referenced in rate-limit docs ("2x default limits") | **Price not on the pricing page.** The only figure is an illustrative CLI `hopx usage plans` output: "Free $0 10 sandboxes / Pro $29/mo 100 sandboxes / Enterprise Custom". Treated as unverified (fee null) | 2× rate limits; $29/mo and 100 sandboxes only in sample output | https://docs.hopx.ai/api/concepts/rate-limits, https://docs.hopx.ai/cli/commands/usage |
| 15 | Enterprise | Contact sales | Custom SLAs, dedicated support, **volume discounts**. Unpublished | null | https://hopx.ai/pricing |
| 16 | Rate limits (all plans) | Default | 20 sandbox creates/min, 100 control-plane req/min, 300 VM-agent req/min, 10 template builds/h | Pro 2×, Enterprise custom | https://docs.hopx.ai/api/concepts/rate-limits |
## Gotchas
1. **Same list rates as E2B, but less clarity.** Hopx does not publish plan concurrency caps, paused/stopped storage charges, snapshot prices or egress prices.
2. **The pricing page's own example is wrong.** "1 vCPU, 1 GB, 10 GB storage, 1 hour = $0.05" computes to $0.0504 + $0.0162 + $0.00108 = **$0.0677**. "8 h, 2 vCPU, 4 GB ≈ $1.50" computes to $1.32 plus disk.
3. **The timeout is a delete, not a pause.** `timeout_seconds` is wall-clock. When it fires the sandbox is destroyed with its data. Nothing auto-pauses on idle, so an idle sandbox bills the full allocation until you pause/kill it or the timer deletes it.
4. **"No idle charges" means paused, not idle-running.** A running sandbox that is doing nothing still pays 100% of allocated vCPU/RAM.
5. **Sizes live in the template.** You can't request 4/8 at create. Build a template with those resources. Per-plan max vCPU is "from your plan", which is unpublished.
6. **Pro plan is a ghost.** It appears in the rate-limit docs and a CLI sample ($29/mo), but you can't buy it from the pricing page.
7. **Reliability.** ComputeSDK benchmarks: cold-start success rate 62%, burst (100 concurrent) success 6%, DAX never succeeded. The last recorded runs (Aug/Sep 2026) had a 0% success rate. Budget for retries, and any retries bill.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU util, 50 GiB snapshots retained, 100 GiB egress.
Assumptions:
- The template disk is 10 GiB, billed while running: 8,800 h × 10 × $0.000108 = **$9.50**.
- The 50 concurrent sandboxes are within the 20 creates/min rate limit (3 min to spin up the fleet).
- The plan's concurrency cap is unknown.
| Regime | Compute | Disk running | Paused/stopped storage | Snapshots 50 GiB | Egress 100 GiB | Plan fee | **Monthly total** |
|---|---|---|---|---|---|---|---|
| Pay-per-use, sandboxes killed after each day | 8,800 × 0.3312 = $2,914.56 | $9.50 | $0 | null (unpublished) | null (unpublished) | $0 | **$2,924.06** + snapshots + egress |
| Pay-per-use, paused overnight (554 h × 50) | $2,914.56 | $9.50 | null (unpublished) | null | null | $0 | **$2,924.06** + paused storage + snapshots + egress |
| Idle until the default 1 h timeout instead of explicit kill | +1,100 h × 0.3312 = +$364.32 | +$1.19 | | | | | **$3,289.57** + unknowns |
| Hypothetical active-CPU reading (not supported by the rates) | 8,800 × (4 × 0.3 × 0.0504 + 8 × 0.0162) = $1,672.70 | $9.50 | | | | | **$1,682.20** (illustrative only) |
| Pro (unpriced) / Enterprise (volume discounts) | unpublished | | | | | null | null |
- **30% CPU utilisation does not reduce the bill.** Billing is on allocation.
- The $200 one-time credit covers month 1 only (≈ $16.67/month over 12 months).
- If snapshots/paused state were billed at the disk rate ($0.0788/GiB-month), 50 GiB would cost $3.94. That rate is illustrative only.
Sources: https://hopx.ai/pricing · https://docs.hopx.ai/llms-full.txt · https://docs.hopx.ai/api/concepts/rate-limits · https://docs.hopx.ai/cli/commands/billing · https://docs.hopx.ai/cli/commands/usage · https://docs.hopx.ai/core-concepts/templates/configuration · https://docs.hopx.ai/core-concepts/sandboxes/timeout · https://docs.hopx.ai/core-concepts/sandboxes/managing-state · https://docs.hopx.ai/api/control-plane/pause-sandbox · https://www.computesdk.com/benchmarks/sandboxes/