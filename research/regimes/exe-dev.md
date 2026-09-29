# exe.dev — pricing regimes (as of 2026-09-28)
## Which price source is current?
exe.dev currently shows three price surfaces that disagree:
| Surface | What it says | Status (2026-09-28) |
|---|---|---|
| `exe.dev/pricing` and `exe.dev/docs/pricing` (both now serve the same page) | **Personal $15/mo** (2 vCPU / 4 GB pool, selector 2/4/8/16 vCPU), **Work $0.21/h** per 4 vCPU / 8 GB pool (selector 4..512, min spend $150/mo), Enterprise custom; **standalone VMs $0.105 per 2 vCPU per hour** | **CURRENT.** Live fetch on 2026-09-28 of `/pricing` returned this page. The earlier raw dump of `/pricing` (in ) still showed the $20/$25 tiers, so the switch happened recently. |
| , `/sandbox` pool box, Flavio Copes deep dive (2026-09-09), boxd comparison (May 2026) | Small/Medium/Large/XLarge pools: $20/$40/$80/$160 individual, $25/$50/$100/$200 per Team user; Enterprise "from $35.84/hr" (512 vCPU / 2048 GB) | **LEGACY.** It was still documented on 2026-09-09 and the billing docs have not been updated. Existing subscribers are probably grandfathered (unverified). Before that, from launch (Dec 2025) to about April 2026, the offer was "$20/month, 2 CPU / 8 GB / 25 GB disk, 25 VMs". |
| `/sandbox` "Usage" box | CPU $0.05/core-h, active memory $0.016/GiB-h, disk $0.08/GiB-mo; CPU and active memory billed on **peak hourly usage**, metered per second; idle VMs pay no CPU and memory at the disk rate | **Sales-only** ("Contact us about usage pricing"). This is the "Cloud Pool" plan in the billing docs ("100% usage based"). It is not self-serve. |
No blog post, changelog entry or dated announcement covers the switch. The blog index (through 2026-09-23) has only one billing post, about Shelley token auto-purchase on 2026-08-05. The CLI reference already matches the new model:
- `billing capacity --cpu=2|4|8|16` is the Personal selector.
- `pool new --cpus` takes an even number from 4 to 512, with "memory is 2 GiB per vCPU". These are Work pools.
- `new --standalone` / `--sandbox` gives "its own reserved capacity" and needs a plan with standalone VMs plus team approval.
- `team settings vm-placement poolless` is marked "(legacy)".
## Regimes
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | **Personal pool** (current) | Solo account | Flat monthly pool of vCPU and RAM shared by up to 50 VMs. Idle or stopped VMs free up pool capacity. No per-VM charge. | $15/mo for 2 vCPU / 4 GB; min spend $15. Selector 4/8 GB $35, 8/16 GB $75, 16/32 GB $155 (embedded pricing-scale JSON `personal:monthly:20260914` in the /pricing HTML; verified 2026-09-28 — corrected from "not published"). 100 GB disk (100 GB per 2 vCPU in the comparison table), 200 GB bandwidth, 1 pool, pool placed in the user's region. | exe.dev/pricing |
| 2 | **Work pool** (current) | Teams, any region | Reserved pool billed **per hour while it exists**, whatever the utilisation. Pools can be resized (`pool resize`) and there is no limit on the number of pools. | $0.21/h per 4 vCPU / 8 GB, i.e. $0.0525/vCPU-h with 2 GiB/vCPU included. That is $153.30/mo for a 4-vCPU pool left on 24/7. Min spend $150/mo. Up to 512 vCPU / 1,024 GB per pool. VMs per pool scale with size (embedded pricing JSON `work:monthly:20260901`): 4 vCPU = 100, 8 = 200, 16 = 400, 32 = 800, 64+ = 1,000 (the table's "1000 per pool" is the cap; `--max-vms` defaults to 100). Disk and bandwidth: 50 GB per vCPU (200 GB at 4 vCPU), capped at 800 GB — the "200 GB" bullets are the 4-vCPU values, not a conflict. Unlimited users and SSO. | exe.dev/pricing, docs/cli-pool.md |
| 2b | **Work pool resized to follow load** | You shrink the pool off-hours with `pool resize` | Same hourly rate on the current size. Hourly proration after a resize is **assumed**, not documented. | 4 vCPU floor | exe.dev/docs/cli-pool.md |
| 3 | **Standalone ("sandbox") VMs** (current) | `new --standalone` on Personal or Work. Needs team approval. Personal allows 50, Work 100. | Per VM on its own reserved capacity, priced **per vCPU only**. RAM is bundled: default 2 vCPU / 8 GB, max 16/32 on Personal and 32/64 on Work. Granularity and billing while stopped are **not documented** (the tagline says "by the second"). | $0.105 per 2 vCPU per hour = $0.0525/vCPU-h. That is $0.21/h at 4 vCPU. | exe.dev/pricing |
| 4 | **Legacy Individual pool tiers** | Subscribers from before about Sep 2026 (grandfathering unverified). Still in docs/billing. | Flat monthly pool, paid in advance, prorated on change. Overages billed at cycle end. | Small 2/8 $20 · Medium 4/16 $40 · Large 8/32 $80 · XLarge 16/64 $160. 50 VMs, 100 GB pooled disk, 200 GB transfer, $20/mo Shelley LLM credit. | docs/billing/overview.md |
| 5 | **Legacy Team per-user pools** | Legacy team subscriptions | Per seat. Each user has their own pool and can **burst into teammates' idle capacity**. | $25/$50/$100/$200 per user per month (Small..XLarge). 50 VMs per user, 100 GB disk, 250 GB transfer per user, SSO. | docs/billing/overview.md, /sandbox |
| 6 | **Legacy Enterprise / Reserved Cloud Pool** | Large fleets | Hourly reserved pool | "from $35.84/hr" for 512 vCPU / 2,048 GB ($0.07/vCPU-h with 4 GiB/vCPU). That is $26,163.20/mo if left on 24/7. "Thousands of VMs", AWS VPC. The current page says Enterprise is "Custom". | old /pricing, /sandbox |
| 7 | **Usage / Cloud Pool (sales)** | Negotiated with support@exe.dev | Per second. CPU on **peak CPU usage within each hour**, memory on **active** memory (peak hourly). Idle VMs pay no CPU and memory at the disk rate. | CPU $0.05/core-h, active RAM $0.016/GiB-h, disk $0.08/GiB-mo. Idle memory is $0.08/GiB-mo, about $0.00011/GiB-h. Included egress and any plan minimum are unknown. The rate may be negotiable. | exe.dev/sandbox, docs/billing/cloud-pool.md |
| 8 | **Hybrid** | "Pool your steady-state workers, burst overflow onto usage" | Sum of regimes 2 and 7 | n/a | exe.dev/sandbox |
| 9 | **Disk overage** | All plans | Time-averaged ext4 **filesystem usage** (not provisioned size) above the pooled allowance, in GiB-months. Stopped VMs keep paying disk. | $0.08/GB-month. Default VM disk is 25 GB and can only grow. | docs/billing/usage.md, faq/disk-usage |
| 10 | **Egress overage** | All plans | Running total of outbound traffic per cycle (per member on Team). Ingress is free. Billed at cycle end. | $0.05/GiB above the allowance | docs/billing/usage.md |
| 11 | **Shelley LLM credit** | Legacy plans (the current page lists "Shelley access") | Included LLM token credit at provider list price, no markup. Auto-purchase launched 2026-08-05. | $20/mo per user. It does **not** offset compute. | docs/billing/overview.md |
| 12 | **Trial / invite rewards** | New signups through an invite | 30-day trial. After the invitee upgrades, both sides get a reward (credits, extra memory or extra disk). | Amounts are not published | docs invites |
| 13 | **Cancellation** | After you cancel | Plan stays active to the end of the cycle, then drops to a free plan that can connect to existing VMs but not create new ones | $0 | docs/billing/subscriptions.md |
| 14 | **Marketplace billing** | AWS or Azure Marketplace subscription (`billing provider link --size=small..xlarge`) | Legacy sizes billed through the marketplace | Marketplace prices not retrieved (null) | CLI reference, AWS Marketplace listing |
Other facts:
- No region multipliers. The account is bound to one region, and PDX is closed to new accounts.
- No creation fee.
- No snapshots: `cp` is a copy-on-write disk clone, and retained state is simply disk.
- No dedicated IPv4: VMs share an IPv4 pool per owner, with HTTPS proxy and SSH only.
- No GPU.
- Nested virtualisation is Enterprise-only.
## Gotchas
- **The pool is flat. Your utilisation does not matter.** On a pool, 30% CPU utilisation saves you nothing, but idle or stopped VMs cost nothing extra, so 1,000 short sandboxes fit in one pool. You size the pool for **peak concurrent vCPU**. The legacy docs imply the sum of VM sizes is bounded by the pool ("run one VM at the full 16 vCPU, or split … 2×8 or 4×4"). Memory is soft-limited: exe.dev contacts you if active memory stays over the plan for a long time.
- **The current Personal plan is half the RAM of the legacy one**: 2 vCPU / 4 GB for $15, against 2 vCPU / 8 GB for $20.
- **Work costs ~5x Personal per vCPU at entry size**: $153.30 for 4 vCPU ($38.33/vCPU) vs $15 for 2 vCPU ($7.50/vCPU); at 16 vCPU it is $613.20 vs $155 (~4x). (Corrected: earlier text said "7.7x per vCPU", which compared a 4-vCPU pool to a 2-vCPU pool.) Personal cannot exceed 16 vCPU and 1 pool, which pushes fleets to Work or standalone VMs.
- **Standalone VMs cost the same per vCPU as Work pools** ($0.0525/vCPU-h). The difference is that they bill only while they exist (assumed), not 24/7, and they bundle up to 4 GiB/vCPU by default where a pool gives 2 GiB/vCPU.
- **Usage pricing bills CPU on the peak within each hour.** A sandbox that spikes to 100% for one minute in an hour pays a full core-hour for every core it used. The "30% util" saving is only real for flat loads.
- **Disk is billed on filesystem usage, time-averaged.** Short-lived sandboxes that write big temp data cost little. The allowance is pooled per account (per user on Team; per 2 vCPU on the new page), **not per VM**.
- **Apparent conflicts on the page mostly resolve via the embedded pricing JSON**: Work VMs per pool scale 100→1,000 with pool size; Work bandwidth/disk are 50 GB per vCPU (200 GB at 4 vCPU, cap 800 GB). Personal disk stays 100 GB at every size in the JSON, although the comparison table says "100 GB per 2 vCPU" (still a conflict).
- **Pools and standalone VMs need approval** ("reach out to support to ask for access" / "team approval").
- **Subscriptions are paid in advance and prorated**. Overages are billed in arrears on the renewal invoice.
- **There is no free compute tier.** The legacy $20 Shelley credit is for LLM tokens only.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent sandboxes, 8 h/day, 22 days/month, 30% CPU utilisation, 50 GiB snapshots retained, 100 GiB egress.
That is 50 × 176 h = **8,800 sandbox-hours**. Peak demand is 200 vCPU / 400 GiB.
Storage and egress under the allowances:
- **Storage:** the 50 GiB "snapshot" is retained disk. It falls inside the 100 GB pooled allowance in every self-serve regime, so it costs $0. Under usage pricing it is 50 × $0.08 = $4.
- **Egress:** 100 GiB is inside the 200 GB-plus allowance in every self-serve regime, so it costs $0. Under usage pricing the allowance is unknown: $0 to $5.
| Regime | Calculation | Monthly total |
|---|---|---|
| 1 Personal pool | Maximum is 16 vCPU / 32 GB ($155) and 1 pool, so 200 vCPU / 400 GiB concurrent is **infeasible**. | n/a (infeasible) |
| 2 Work pool, 200 vCPU left on 24/7 | 50 × $0.21 × 730 h | **$7,665.00** |
| 2b Work pool resized to follow load | 50 × $0.21 × 176 h + 4-vCPU floor × $0.21 × 554 h = $1,848.00 + $116.34 (assumes hourly proration after `pool resize`) | **$1,964.34** |
| 3 Standalone VMs on Work (100-VM limit, fits) | 8,800 h × $0.21; exceeds the $150 minimum | **$1,848.00** (assumes deleted VMs stop billing and standalone usage counts toward the minimum) |
| 3 Standalone VMs on Personal (50-VM limit, just fits) | $15 pool + 8,800 × $0.21 | **$1,863.00** ($1,848 if the $15 is only a minimum spend) |
| 4 Legacy Individual pool | Maximum is XLarge 16/64, so this is **infeasible** | n/a |
| 5 Legacy Team per-user pools | 200 vCPU from 25 users × Large 8/32 at $100 = $2,500. The alternatives also come to $2,500 or more (50 × Medium $50, 100 × Small $25) or $2,600 (13 × XLarge $200). Workable only if sandboxes are spread over per-user pools or by bursting into teammates' capacity. | **$2,500.00** (requires 25 seats) |
| 6 Legacy Enterprise reserved pool | 512 vCPU at $35.84 × 730 h | $26,163.20 (oversized; it is "from", so smaller custom pools probably exist, price null) |
| 7 Usage pricing, CPU at a flat 30% | (4 × 0.3 × $0.05 + 8 × $0.016) = $0.188/h × 8,800 = $1,654.40, + $4 disk + $0–5 egress | **$1,658.40 – $1,663.40** (assumes all 8 GiB is "active" memory; plus any negotiated minimum, unknown) |
| 7 Usage pricing, bursty CPU (peak hour = 100%) | $0.328/h × 8,800 = $2,886.40, + $4 + $0–5 | **$2,890.40 – $2,895.40** |
The cheapest self-serve option is standalone VMs, at about $1,848. The sales-only usage plan is cheaper only if CPU is flat at about 30% within each hour.
Sources:
- https://exe.dev/pricing
- https://exe.dev/docs/pricing
- https://exe.dev/sandbox
- https://exe.dev/docs/billing/overview.md
- https://exe.dev/docs/billing/usage.md
- https://exe.dev/docs/billing/subscriptions.md
- https://exe.dev/docs/billing/cloud-pool.md
- https://exe.dev/docs/cli-pool.md
- https://exe.dev/llms-full.txt
- https://flaviocopes.com/exe-dev/
- https://boxd.sh/blog/boxd-vs-exe-dev/
- https://blog.exe.dev/