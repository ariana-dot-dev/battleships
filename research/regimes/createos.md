# CreateOS Sandbox (NodeOps) — pricing regimes (as of 2026-09-28)
CreateOS Sandbox is a Firecracker microVM sandbox sold on a credit-based plan system shared with the NodeOps CreateOS
app platform. One per-second rate card (allocated vCPU + allocated RAM + storage) is paid from monthly plan credits
or topped-up credits. Top-ups earn bonus credits (1.2x / 1.5x / 5x), so the effective rate depends on plan.
Plans also gate **shape size, concurrency and daily creations**. The biggest trap: **paused sandboxes keep billing RAM**.
Base rates (product page + docs): vCPU $0.0000100455/s = **$0.03616363/vCPU-h**; RAM $0.0000032195/GB-s =
**$0.01159025/GiB-h**; storage $0.000000044/GB-s = **$0.0001584/GB-h** (~$0.1156/GB-month); egress **$0**.
4 vCPU / 8 GiB shape (`s-4vcpu-8gb`) = 0.14465 + 0.09272 = **$0.2374/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free | New accounts | One-time credits; top-ups allowed | 500 credits (~$5 at $0.01/credit); 1 concurrent; 10 sandboxes/day; largest shape 1 vCPU / 1 GB; 10 GiB disk; no disks/templates | https://createos.sh/docs/Sandbox/Limits, https://createos.sh/docs/Account-Billing/Pricing/ |
| Beginner | Need up to 4 vCPU / 4 GB or 5 concurrent | Monthly fee converted to credits (fee = credit) | $10–$50/mo slider = 1,000–5,000 credits; 5 concurrent; 50/day; 30 GiB disk; **largest shape 4/4** | same |
| Pro | Need 8 vCPU / 8 GB, 4/8 shape, or 20 concurrent | Fee = credit | $75–$200/mo = 7,500–20,000 credits; 20 concurrent; 200/day; 50 GiB disk; largest 8/8 | same |
| Enterprise | 8/16 shape, 30 concurrent, self-hosting | Contact sales; docs say "$200+" | 20,000+ credits; 30 concurrent; 300/day; 60 GiB disk; largest 8/16; self-hosted option | https://createos.sh/docs/Account-Billing/Pricing/, https://createos.sh/products/sandbox |
| Annual billing | (removed on verify 2026-09-28) | The "20% off annual" line is on the Deploy-platform page (Plus $49 / Pro $149), not Sandbox; the Sandbox pricing page says "no annual lock-in" | no Sandbox annual plan published | https://createos.nodeops.network/pricing, https://createos.sh/pricing/sandbox |
| Credit top-ups (bonus multiplier) | Usage beyond plan credits, or top-up-only use with no subscription | Buy credits; plan multiplies credits per $ | Free/Beginner 1.2x (≈ list/1.2), Pro 1.5x (≈ list/1.5), Enterprise **5x** (≈ list/5) | https://createos.sh/docs/Account-Billing/Pricing/ |
| Running | Sandbox state `running` | Per second on the **allocated shape** (vCPU + RAM), independent of utilisation, plus storage | $0.03616363/vCPU-h + $0.01159025/GiB-h + $0.0001584/GB-h | https://createos.sh/products/sandbox |
| Paused (memory + disk snapshot) | `pause()` or auto-pause (`auto_pause_after_seconds` 60–86,400 s; **off by default**) | vCPU stops; **RAM and storage keep billing**; retained indefinitely | Paused 4/8 = 8 × $0.01159 = $0.0927/h ≈ **$67.7/month** | https://createos.sh/docs/Sandbox/Limits |
| Destroyed | `destroy()` | Nothing | $0 | SDK docs |
| Fork | `fork()` of a paused sandbox | Child is a new sandbox billed separately | full rate per child | SDK llms-full.txt |
| Storage | Overlay disk (shape default or `disk_mib`) | Per GB-hour while it exists | $0.0001584/GB-h (~$0.1156/GB-mo) | product page |
| Disks (volumes) | BYO S3/R2/MinIO buckets mounted | Paid to your own object store | $0 from CreateOS | SDK docs |
| Egress / bandwidth | All traffic | Unmetered, but a **50 GiB per-sandbox bandwidth quota** (rechargeable; recharge price unpublished) | $0 | https://createos.sh/docs/Sandbox/Limits |
| Session length | Any | No max; runs until destroyed or paused | — | Limits doc |
| Deploy-platform plans (NOT sandbox) | createos.nodeops.network/pricing | Different product (app deploys) | Free / Plus $49 / Pro $149 / Enterprise; the ~10x cheaper per-second table seen earlier is no longer shown (2026-09-28) | https://createos.nodeops.network/pricing |
Dated changes: none found. The SDK repository and docs carry no changelog entries on pricing.
## Gotchas
1. **Paused sandboxes still pay RAM.** Unlike E2B, Daytona or Mosaic, pausing only removes the vCPU charge. An 8 GiB sandbox parked all month costs ~$68. Destroy it, or snapshot to a template, if you don't need warm memory. The SDK docs say "compute billing stopped ... only storage" but the Limits doc and product page say RAM keeps billing.
2. **Auto-pause is off by default and there is no max session length**, so a forgotten sandbox runs (and bills) forever.
3. **Shape caps per plan are much lower than the headline "Up to 48 / 1,000 cores"** on the pricing page. Those caps belong to the Deploy platform. For Sandbox, Beginner tops out at **4 vCPU / 4 GB** and a 4/8 box needs Pro.
4. **Hard concurrency ceiling of 30** even on Enterprise per the docs, plus daily creation caps (10/50/200/300). Burst-heavy agent fleets hit these first.
5. **Credits, not dollars.** 1 credit = $0.01 comes from the NodeOps Skills page, not the Sandbox docs. Top-up multipliers mean the same usage costs 17% (Beginner), 33% (Pro) or 80% (Enterprise 5x) less when paid by top-up. That makes the effective rate plan-dependent and hard to compare.
6. **Tier conflict**: the new Sandbox pricing page (createos.sh/pricing/sandbox) says "No tiers, no plan gate, no minimums", yet the Limits doc, Pricing doc and product-page FAQ still publish Free/Beginner/Pro/Enterprise with concurrency caps 1/5/20/30. The card keeps the documented caps. The Deploy-platform rate table (~10x cheaper) that used to appear on createos.nodeops.network/pricing is gone.
7. Bandwidth is "unmetered" but capped at 50 GiB per sandbox by default. Recharges are an API call, and their cost is unpublished.
Storage note (pricing page, 2026-09-28): default disk is 10 GB per sandbox (up to 60 GB) and "bills for the full month whether the sandbox runs or is paused"; the page examples ($2.33 / $172.05 / $116.37) reproduce exactly with 10 GB x 720 h x $0.0001584 = $1.14 per sandbox-month.
## Worked example
Workload: 4 vCPU / 8 GiB (`s-4vcpu-8gb`), 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU,
50 GiB snapshots retained, 100 GiB egress.
Usage at list: 8,800 × $0.237377 = **$2,088.91** (CPU util irrelevant: allocated billing). Snapshots/disk: 50 × $0.115632 =
**$5.78**. Egress: $0 (2 GiB per sandbox, under the 50 GiB quota).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Free / Beginner | No: shape 4/8 not allowed (max 1/1, 4/4) | n/a |
| Pro, list rates, destroy between shifts | **No**: 50 concurrent > 20 | would be $2,094.69 ($75 fee is credit) |
| Pro + top-ups at 1.5x | No (concurrency) | would be $75 + ($2,094.69 − $75)/1.5 = $1,421.46 |
| Enterprise, list rates | **No per published cap** (30 concurrent); custom limits via sales | ≥ $2,094.69 (fee "$200+" as credit) |
| Enterprise + 5x top-ups | Only if sales lifts concurrency | ≈ $200 + ($2,094.69 − $200)/5 = **$578.94** (if 5x = bonus credits) |
| Anti-pattern: pause instead of destroy between shifts | — | + 50 × 554 h × 8 GiB × $0.01159 = **+$2,568.40** (paused RAM) → $4,663.09 at list |
| Scaled down to 20 concurrent on Pro (same per-sandbox hours) | Yes | 3,520 h × $0.237377 + $5.78 = $841.35 (fee credited) |