# CodeSandbox SDK: pricing regimes (as of 2026-09-28)
CodeSandbox (a Together AI company) bills SDK sandboxes in **VM credits**. Each fixed VM size burns a set number of credits per hour, metered **per started minute**, on top of a per-workspace plan. The docs say billing has only two components: VM credits (runtime) and VM concurrency (set by the plan).
- One credit costs **$0.01486** (docs, FAQ). The marketing page rounds this to $0.015.
- Every plan pays the same credit price. On-demand credits are "not subject to discount".
- The only published discounts are bulk packs: Pro add-on packs ("savings included", amounts unpublished) and Enterprise packs ("up to 50% off").
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | VM size table (all plans) | Every running SDK sandbox (Firecracker VM) | Credits/h by fixed size on **allocated** size, wall-clock while running. CPU utilisation is not considered. Price is linear from Nano up (10 credits per 2 cores + 4 GB) | Pico 5 cr/h $0.0743, Nano 10 $0.1486, **Micro (4c/8GB) 20 $0.2972**, Small 40 $0.5944, Medium 80 $1.1888, Large 160 $2.3776, XLarge (64c/128GB) 320 $4.7552 | https://codesandbox.io/docs/sdk/pricing, https://codesandbox.io/docs/learn/credit-usage/credits |
| 2 | Per-started-minute rounding | Every run period | The smallest unit is 1 minute, rounded **up**. The docs' example is 3m25s billed as 4 min. So there is a 60 s minimum per run, and each resume starts a new run | Up to +59 s per run | /docs/sdk/pricing |
| 3 | Credit price conflict | Any | The docs and FAQ say $0.01486/credit. The pricing page says "$0.015 each", lists sizes at $0.075/$0.15/$0.30/…/$4.80, and describes Scale on-demand as "$0.15 per hour" (a Nano-hour) | 0.94% gap | https://codesandbox.io/pricing, /docs/learn/plans/pricing-faq |
| 4 | **Build (free)** | Default workspace | $0 fee. **400 credits/month** (= $5.94, 40 Nano-h), which don't roll over. **No on-demand credits**: when the 400 are gone, all VMs go **frozen** until the next cycle. 10 concurrent VMs, 20 new sandboxes/h, 1,000 SDK req/h, max 4 vCPU/8 GiB (Micro), 5 members | $0 fee, $5.94 included (hard cap) | /pricing, /docs/learn/plans/subscriptions |
| 5 | **Scale** | Paid self-serve SDK plan | **$170/month per workspace**. The fee is a platform fee, not credit. It bundles a small credit allotment, and on-demand credits at $0.01486 are billed at month end. 250 concurrent VMs, 1,000 new sandboxes/h, 10,000 req/h, max 16 vCPU/32 GiB, 20 members | Included credits conflict: pricing page says "**160 hours** of monthly VM credits" (= 1,600 credits = $23.78 if Nano-hours). The SDK docs' worked example says "**1,100** free VM credits" ($16.35) and "up to 100 concurrent VMs" (stale: concurrency was raised 2.5x from 100 to 250) | /pricing, /docs/sdk/pricing |
| 6 | Pro (legacy editor plan; also the legacy per-user Pro) | Existing Pro workspaces | 1,000 base credits/month. Add-on credit packs with bulk savings. On-demand credits at the standard rate. A **spending limit is mandatory**. Pro-column limits: 10 concurrent VMs, 20 new sandboxes/h, 16 vCPU/32 GiB. **Fee not shown** on the current page. Legacy per-user Pro can be kept "until further notice" (2 months' notice before changes) | fee null, 1,000 credits ($14.86) | /docs/learn/credit-usage/credits, /docs/learn/plans/pricing-faq, /pricing |
| 7 | Pro add-on credit packs | Pro workspaces | Prepaid packs "with savings included for bulk purchases" | **Unpublished** | /docs/learn/plans/subscriptions |
| 8 | **Enterprise** bulk credit packs | Contact Together sales | "**Up to 50% off** bulk VM credit packs". Custom concurrency and request limits, VMs up to 64 vCPU/128 GiB, unlimited members, dedicated support | Best case $0.00743/credit (Micro $0.1486/h). Fee unpublished | /pricing, /docs/sdk/pricing |
| 9 | Enterprise optional extras | Enterprise | SSO. **Your own dedicated cluster** | Unpublished | /pricing |
| 10 | Hibernated (memory + disk snapshot) | `hibernate()`, or idle `hibernationTimeoutSeconds` | **No credits**. The documented billing has no storage component. On disk for about 7 days, then archived (still resumable, 20-60 s) | $0 (no storage fee published) | /docs/sdk/hibernate, /docs/sdk/create, /docs/sdk/resume |
| 11 | Idle-but-running tail | Until the hibernation timeout fires. Automatic wake-up on HTTP/WebSocket re-starts billing | Full credit rate. The docs example uses `hibernationTimeoutSeconds: 300`. Best practice is 86400 plus manual hibernate | 5 min idle on Micro = $0.0248 | /docs/sdk/create, /docs/sdk/lifecycle |
| 12 | Shutdown / delete | `shutdown()` keeps /project/workspace without a memory snapshot. Delete removes it | No credits. No storage fee published | $0 | /docs/sdk/restart-shutdown |
| 13 | Live tier change | `updateTier()` while running (upgrade only recommended) | Billed at the new tier's credits/h from the change (per-minute accounting presumed) | Size table | /docs/sdk/specs |
| 14 | SDK tier cap | `vmTier` parameter | Only up to Small (8c/16GB) unless you build a custom template. Above that, "only the core count will increase" | — | /docs/sdk/specs |
| 15 | Templates / public template runtime | Editor VM Sandboxes set as templates | "VM runtime for templates is covered by CodeSandbox" (editor context; SDK template builds presumably included) | $0 | /docs/learn/credit-usage/controlling-usage |
| 16 | Browser Sandboxes | Non-VM editor sandboxes | Run in the browser. **No credits**. Not SDK | $0 | /pricing-faq |
| 17 | Storage | Per VM | 20 GB disk per VM on Build/Pro/Scale ("more on demand" on paid plans, price unpublished). Enterprise custom | Extra disk price null | /pricing, /docs/learn/plans/usage-based-billing |
| 18 | Spending-limit freeze | Pro/Scale on-demand spend hits the limit | VMs **frozen** until credits are added or the cycle resets. Never billed above the limit | — | /docs/learn/credit-usage/controlling-usage |
| 19 | Egress / IPv4 | Any | Not metered in the documented billing model and not published. Preview hosts are `*.csb.app` HTTPS only. No public IPv4 | null | /docs/sdk/pricing |
| 20 | Education / OSS / non-profit | Application | "free or low-cost access" | Unpublished | /pricing |
| 21 | Regions | Clusters chosen by CodeSandbox. No region selection | No regional pricing | multiplier 1 | features/codesandbox-sdk.json |
## Gotchas
1. **The per-started-minute rounding bites short agent runs.** A 10 s code execution bills a full minute. A pattern of 5,000 tiny resume→exec→hibernate cycles a day bills about 83 VM-hours a day regardless of the real work.
2. **The Scale fee is not credit.** $170 buys concurrency (250) and rate limits, plus only about $16-24 of credits. Two official pages disagree on the credits (1,600 vs 1,100), and the docs example is visibly stale.
3. **The free plan has a hard wall.** Build cannot buy on-demand credits. At 400 credits (40 Nano-hours, or just **20 Micro-hours**) every VM freezes for the rest of the month.
4. **4 vCPU/8 GiB is the ceiling on Build.** Medium and larger need Scale, and above Small needs a custom template even on Scale.
5. **Pico spec conflict:** the SDK docs say 2 cores/1 GB, the pricing page says 1 core/2 GB.
6. **Automatic wake-up** (HTTP/WebSocket to a preview URL) silently restarts billing. Bots crawling a public preview URL can keep VMs awake. The docs recommend disabling it.
7. **Utilisation is irrelevant.** You pay the full tier while running, and fixed 2 GB/core bundles (from Nano up) mean no custom ratios.
8. **Hibernation is free, but archival costs latency.** After about 7 days a hibernated sandbox is archived: resume becomes 20-60 s and forks from an archived parent are slow. Live forks of a running parent are capped at 5.
9. **Legacy Pro**'s fee isn't shown on the current pricing page. Pro's concurrency is only 10, the same as Build.
## Worked example
Workload: 4 vCPU / 8 GiB = **Micro** (exact fit), 50 concurrent × 8 h/day × 22 days = **8,800 VM-hours** = **176,000 credits**. Also 30% CPU util, 50 GiB snapshots retained, 100 GiB egress.
Assumptions:
- Continuous 8 h sessions, so there is no per-minute rounding loss.
- Hibernated overnight at $0.
- Build and Pro are excluded because both have 10-VM concurrency, and Build has no on-demand credits.
| Regime | Plan fee | Credits billed | Compute $ | Snapshots (hibernated, 50 GiB) | Egress 100 GiB | **Monthly total** |
|---|---|---|---|---|---|---|
| Scale, 1,600 included (pricing page, $0.01486) | $170 | 174,400 | $2,591.58 | $0 (unmetered) | null (unpublished) | **$2,761.58** |
| Scale, 1,100 included (docs example) | $170 | 174,900 | $2,599.01 | $0 | null | **$2,769.01** |
| Scale at marketing $0.015/credit, 1,600 included | $170 | 174,400 | $2,616.00 | $0 | null | **$2,786.00** |
| Enterprise, best-case 50% off bulk packs | unpublished | 176,000 | $1,307.68 | $0 | null | **$1,307.68 + Enterprise fee (unknown)** |
| Build / Pro | — | — | — | — | — | **Not possible** (10 concurrent VMs max) |
Other effects on the total:
- **30% CPU utilisation** saves nothing.
- **Idle tail:** leaving each VM to a 300 s hibernation timeout adds 5 min × 50 × 22 = 91.7 h, or **+$27.24**. A 24 h timeout without manual hibernation would bill the whole night: 16 h × 50 × 22 × $0.2972 = **+$5,230.72**.
- **Rounding sensitivity:** splitting the same 8,800 h into 30 s runs would bill double (each 30 s run bills 60 s).
Sources: https://codesandbox.io/pricing · https://codesandbox.io/docs/sdk/pricing · https://codesandbox.io/docs/learn/credit-usage/credits · https://codesandbox.io/docs/learn/credit-usage/controlling-usage · https://codesandbox.io/docs/learn/plans/subscriptions · https://codesandbox.io/docs/learn/plans/usage-based-billing · https://codesandbox.io/docs/learn/plans/pricing-faq · https://codesandbox.io/docs/sdk/faq · https://codesandbox.io/docs/sdk/create · https://codesandbox.io/docs/sdk/resume · https://codesandbox.io/docs/sdk/lifecycle · https://codesandbox.io/docs/sdk/specs · https://codesandbox.io/docs/sdk/hibernate · https://www.codesandbox.community/c/api-billing-updates/upcoming-pricing-billing-changes