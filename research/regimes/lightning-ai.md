# Lightning AI — pricing regimes (as of 2026-09-28)
Lightning AI sells persistent **Studios** (cloud dev workspaces that can also run agent code) plus a newer
**Sandbox API** (`cpu-1` … `cpu-16`). Everything is billed per second from a **credit pool (1 credit = $1)**.
There is no per-vCPU/per-GiB rate: CPU machines are fixed shapes with a bundled hourly price, and GPU machines
are priced per GPU. The Sandbox API has **no published price**. The rates below were re-verified on
2026-09-28 by rendering https://lightning.ai/pricing in headless Chrome on every tab
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free CPU Studio | The one active Default CPU Studio every account gets | $0. On the Free plan it must restart every 4 h; on Pro and above it has no restarts. You can create unlimited Studios, but only one runs for free at a time | Default (CPU) 4 cores / 16 GB = **Free** | https://lightning.ai/pricing (CPU tab + FAQ) |
| On-demand CPU Studio | Any extra running CPU Studio or a larger shape | Per second while running, bundled CPU + RAM | Large 8/32 GB **$0.51/h**; X-Large 16/64 **$0.99**; Data prep 32/128 **$1.48**; Data prep max 64/256 **$2.69**; Data prep ultra 96/384 **$4.79**. The on-demand price of a *second* Default 4/16 Studio is not published | https://lightning.ai/pricing (CPU tab) |
| Interruptible (spot) CPU | You opt in to interruptible machines | Per second; can be reclaimed | Default 4/16 **$0.22/h**; Large **$0.33**; X-Large **$0.54**; Data prep ultra **$4.51**; Data prep and Data prep max have no spot price | https://lightning.ai/pricing (CPU tab) |
| On-demand GPU Studio, 1 GPU | GPU workload | Per GPU-hour, per second. What CPU/RAM comes with each GPU machine is not stated | T4 $0.55, L4 $0.79, L40S $2.14, RTX PRO 6000 $2.89, A100 40GB $2.19, A100 80GB $2.71, **H100 $4.68**, H200 $4.50 | https://lightning.ai/pricing (1 GPU tab) |
| Multi-GPU (2/4/8-GPU) Studios | Multi-GPU shapes | The per-GPU rate depends on the shape and on which cloud serves it | 8-GPU: L4 $1.25, L40S $4.21, RTX PRO 6000 $2.78, A100 40GB $3.87, **A100 80GB $1.55**, H100 $4.68, H200 $4.50, B200 $9.86 per GPU | https://lightning.ai/pricing (8 GPU tab) |
| Interruptible GPU | Opt-in spot GPU | A live price band that moves during the day | T4 $0.58–0.69, L4 $0.73–0.87, RTX PRO 6000 $3.38–4.06, A100 80GB $3.66–4.39, H200 $3.82–4.58. For T4, RTX PRO 6000 and A100 80GB the **whole band is above on-demand**, even though the Free card says "80% off" | https://lightning.ai/pricing |
| TPU Studios | GCP TPUs | Per TPU-hour | 1 TPU $3.05, 4/8 TPU $3.03, 8 TPU 95 GB $4.72; spot $1.73–2.21 | https://lightning.ai/pricing (TPU tab) |
| Reserved clusters | Guaranteed capacity (A100/H100/H200/B200, 8 GPUs per machine, date range) | Quote only. Docs describe it as "reduced rates" | null | https://lightning.ai/pricing (Clusters tab), GPU marketplace docs |
| Sandbox API (`cpu-1` 1/1 GB, `cpu-2` 2/8, `cpu-4` 4/16, `cpu-8` 8/32, `cpu-16` 16/64) | Programmatic agent sandboxes | Price **not published**. The shapes cpu-4/8/16 match the Default/Large/X-Large Studios, so the Studio rates probably apply, but this is unverified | null | https://lightning.ai/docs/platform/build/sandbox.md |
| Free plan | Default plan | $0 fee. One-time credit of up to **30 credits** (5 at signup + 25 after adding a card), which expires after 12 months. When credits run low, Lightning warns you and then **gracefully shuts down all workloads**; there is no overage billing. The CPU table lists paid CPU/GPU usage as "Pay-as-you-go" | 32-core max CPU per Studio; 1 GPU per Studio; 2 concurrent GPUs; A100/H100/H200 sessions limited to 4 h; Drive limit 50 GB | https://lightning.ai/pricing, https://lightning.ai/docs/overview/faq/billing |
| Pro, monthly | Self-serve | $50/mo buys **40 credits/mo**, so $10/mo is a pure fee | 64-core CPU; 4 GPUs per Studio; 6 concurrent GPUs; 200 GB Drive; no Free-Studio restarts | pricing page, Monthly toggle |
| Pro, annual | 1-year prepay | $20/mo ($240/yr) buys **240 credits/yr**, so the fee is fully converted to credit | same limits as Pro monthly | pricing page, Annual toggle |
| Pro, academic | Academic toggle (eligibility required) | $10/mo billed annually buys 100 credits/yr (about $8.33/mo) | same limits as Pro | pricing page, Academic toggle |
| Teams, monthly | Per user | $140/user/mo buys 50 credits/user/mo | 96-core CPU on the plan card (the comparison table says 192); 8 GPUs per Studio; 12 concurrent GPUs; 2 TB Drive; spending limits; AWS Marketplace billing | pricing page |
| Teams, annual | Per user, 1-year | $119/user/mo buys 600 credits/user/yr (= 50/mo) | same limits as Teams monthly | pricing page |
| Enterprise | Sales | Custom credits at bulk pricing; use your own AWS/GCP credits; VPC/BYOC; on-prem; B200 nodes; 99.95% SLA; SAML/SSO; bring your own images | null | pricing page |
| Credits expiry | All purchased and plan credits | Credits expire 12 months after purchase, so **monthly plan credits roll over for up to a year** | — | https://lightning.ai/docs/overview/faq/billing |
| Drive storage | Data above 10 GB (account Drive) | $0.10/GB-month, billed daily; data connections (S3/GCS/R2) are not billed | Drive caps: Free 50 GB, Pro 200 GB, Teams 2 TB, Enterprise unlimited | billing FAQ |
| Sleeping Studio | 10 min idle leads to auto-sleep (customisable on paid tiers) | Compute $0 while asleep; "sleeping Studios don't cost anything" (Drive storage above 10 GB still bills) | 10 min idle tail billed | https://lightning.ai/docs/platform/build/ai-studio.md |
| Egress / IPv4 | — | Not published. Lightning Storage cloud folders are marketed as having no ingress/egress fees | null | features research |
Dated changes: on 2026-09-21 Lightning repriced its GPU rate card (third-party usagepricing.com: T4 $0.19 to $0.55, H200
$6.53 to $4.50) and **turned the Free tier's monthly 15 credits into a one-time grant of up to 30**. Plan prices did
not change. The usagepricing.com capture lists H100 at $4.50, but the live official page on 2026-09-28 shows **$4.68**
on both the 1-GPU and 8-GPU tabs. We recorded the official figure.
## Gotchas
1. **No 4 vCPU / 8 GiB on-demand shape.** The only 4-core shape (Default 4/16) is free for one Studio. The on-demand price of
   a second one is not published, so the smallest *priced* on-demand shape is Large 8/32 at $0.51/h, which is 2x the cores you asked for.
   Interruptible Default 4/16 at $0.22/h is the cheap route, but it can be interrupted.
2. **The monthly Pro fee is not all credit.** Monthly Pro costs $50 and returns 40 credits, so $10 is a pure fee. Annual Pro ($20/mo) is 100% credit.
   Teams monthly returns $50 of $140 per seat, so $90/seat is a pure fee.
3. **Spot can cost more than on-demand.** On T4, RTX PRO 6000 and A100 80GB, the interruptible band sits above the on-demand rate.
4. **The per-GPU price depends on the node shape.** An A100 80GB costs $2.71 on a 1-GPU Studio but $1.55/GPU on an 8-GPU node. An A100 40GB costs $2.19
   on a 1-GPU Studio but $3.87 on an 8-GPU node.
5. **Running out of credits means shutdown, not overage.** Lightning gracefully shuts down all Studios, which can kill a long agent session.
   Auto-reload is offered on Teams and above.
6. **The idle tail is billed.** Auto-sleep starts only after 10 min idle, and a sleeping Studio is free.
7. **The Sandbox API has no rate card**, so every number here is Studio pricing.
8. **The 10 GB free storage is account-wide** (the Drive), not per sandbox.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU,
50 GiB snapshots retained, 100 GiB egress.
- The 30% CPU utilisation does not matter, because billing is wall-clock on a fixed shape.
- One of the 50 runs on the free Default Studio (176 h, $0). The other 49 need a priced shape:
  - on-demand Large 8/32: 8,624 h × $0.51 = **$4,398.24**
  - interruptible Default 4/16: 8,624 h × $0.22 = **$1,897.28**
- Storage: (50 − 10) GiB × $0.10 = **$4.00**
- Egress: not published (null)
| Regime | Monthly total |
|---|---|
| Free plan, pay-as-you-go credits, on-demand Large | **$4,402.24**. Feasible only if Free allows 49 concurrent paid CPU Studios (no cap is published). 8 h sessions are fine because the 4 h limit applies only to the free Studio and to A100/H100/H200. |
| Pro monthly | $4,402.24 + $50 − $40 credit = **$4,412.24** |
| Pro annual | **$4,402.24**, because the $20/mo fee is fully credit (1-year prepay) |
| Teams monthly (1 seat) | $4,402.24 + $140 − $50 = **$4,492.24** |
| Interruptible Default 4/16 (any plan) | $1,897.28 + $4 = **$1,901.28**. Interruptions are possible, and 8 h sessions may be cut short. |
| Sandbox API `cpu-4` | unknown (no published rate) |