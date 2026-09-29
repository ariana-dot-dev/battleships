# Ona (formerly Gitpod): pricing regimes (as of 2026-09-28)
Ona (now part of OpenAI) sells cloud dev environments plus background agents. It has two regimes. **Core**
runs on Ona Cloud (multi-tenant, AWS eu-central-1 / us-east-1) and is billed in prepaid **Ona Compute Units
(OCUs)**. The same OCUs pay for environment runtime and for Ona-agent LLM tokens. **Enterprise** is
contract-priced and runs Ona-managed runners inside the customer's own AWS/GCP VPC, so the customer pays the
cloud bill for the VMs directly.
OCU price: **$0.25/OCU** on the $20–$200 tiers and for top-ups, **$0.2273/OCU** on the $500 tier.
Standard env 4 vCPU / 16 GB = **1 OCU/h = $0.25/h** ($0.227/h at the $500 tier). GPU VM 16 vCPU / 64 GB = **7 OCU/h = $1.75/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Core $20 / $50 / $100 / $200 | Default self-serve (new orgs start on Core) | Monthly subscription converted to OCUs. Monthly OCUs expire at the end of the billing month (no rollover). The variant can't be changed without cancel + resubscribe | $20/80, $50/200, $100/400, $200/800 OCU ($0.25/OCU). Up to 100 members, no per-seat fee. Unlimited parallel envs. 50 automations / 10 parallel actions | https://ona.com/pricing, https://ona.com/docs/ona/billing/overview |
| Core $500 | Heavy teams | Same, with 10% bonus OCUs | $500 / 2,200 OCU = $0.2273/OCU | https://ona.com/pricing |
| Top-up (manual) | Monthly OCUs exhausted | One-time prepaid purchase. Top-ups are used after subscription OCUs, valid up to 1 year, and expire if the subscription ends | from $10 / 40 OCU ($0.25/OCU) | https://ona.com/pricing, https://ona.com/docs/ona/billing/usage |
| Auto top-up | Core, opt-in | Card charged when the balance drops below 20 OCU. The amount is chosen by the user, with a cooldown between charges | $0.25/OCU (amount options not published) | https://ona.com/docs/ona/billing/overview |
| Bonus / gift / coupon credits | Promotions, coupon at signup | Consumed last, usually a longer expiry | Amounts not published. A third party reports "$100 extra credit for signing up in September [2025]" | https://ona.com/docs/ona/billing/usage, third-party: thefridaydeploy.substack.com |
| Standard environment (Ona Cloud) | Running env, 4 vCPU / 16 GB | OCUs per running hour by class. Granularity/minimum not published | 1 OCU/h = $0.25/h | https://ona.com/docs/ona/billing/usage |
| GPU-accelerated environment (Ona Cloud) | Running GPU VM, 16 vCPU / 64 GB / 300 GB | Same | 7 OCU/h = $1.75/h. GPU model not stated (the AWS-runner equivalent g5.4xlarge = 1× A10G) | https://ona.com/docs/ona/billing/usage, https://ona.com/pricing |
| Other Core classes (up to 32 vCPU / 128 GB / 200 GB) | Larger/smaller envs | OCUs per hour | **Not published** (null) | https://ona.com/pricing |
| Agent usage (Ona agent) | Prompting Ona agents / automations | OCUs from the same pool | ~1 OCU (explain small codebase), 3 (large), 4 (new web app), 5 (bug fix, large codebase), 8 (feature, medium codebase) | https://ona.com/pricing, https://ona.com/docs/ona/billing/usage |
| Bring your own agent | Connected Codex/ChatGPT plan, or Claude Code installed in the env | No OCUs for model usage. The env still burns OCUs while running | $0 Ona model charge | https://ona.com/docs/ona/billing/usage, https://ona.com/pricing |
| Stopped env | After auto-stop / manual stop | Pricing FAQ: inactive envs "generate storage costs based on VM disk size". No storage OCU rate is published. Core archives after 3 days and deletes 4 days later | null | https://ona.com/pricing, https://ona.com/docs/ona/environments/archive-auto-delete |
| Auto-stop | All envs | Env keeps billing until the timeout fires | Default 30 min. Options 30 min / 1 h / 3 h / 8 h / Never. Orgs can cap the max | https://ona.com/docs/ona/organizations/policies/environment-timeout |
| Enterprise (contract) | Security/VPC, SSO, API/SDK, warm pools | Annual contract with "custom credits" (Enterprise uses credits, not OCUs) | AWS Marketplace: 12 months, **$60,000 TCV** per unit (unit undefined), non-refundable. Private offers available. ona.com says "Custom pricing" | https://aws.amazon.com/marketplace/pp/prodview-752jqvg74yo7k, https://aws.amazon.com/marketplace/pp/prodview-vn4wpn7u4afrq |
| Enterprise self-hosted runner compute (AWS) | Enterprise only | Customer's AWS bill: EC2 per environment + EBS + base-snapshot builds. Runner baseline < $8/month | Default classes: Small m6i.large 2/8/45 GB $0.096/h, Regular m6i.xlarge 4/16/80 GB $0.192/h, Large m6i.2xlarge 8/32/100 GB $0.384/h, Extra Large m6i.8xlarge 32/128/200 GB $1.536/h, GPU Large g5.4xlarge 16/64/300 GB $1.624/h (AWS us-east-1 list, **third-party mirror** instances.vantage.sh) | https://ona.com/docs/ona/runners/aws/environment-classes, https://ona.com/docs/ona/runners/aws/aws-runner-costs |
| Enterprise spot classes | Enterprise AWS runner | AWS spot price (variable). On reclamation the env is re-provisioned and EBS reattached (data kept) | Extra Large Spot m7i.8xlarge, GPU Large Spot g5.4xlarge. Price varies | https://ona.com/docs/ona/runners/aws/environment-classes |
| Enterprise GCP runner | Enterprise | Customer's GCP bill | not encoded | https://ona.com/docs/ona/runners/ona-cloud |
| Free (legacy) | 2025 only | No fee | Up to 3 parallel envs, ≤ 4 vCPU/16 GB (Ona migration story). "$10 free credit" is third-party only. **Not on the current pricing page** | https://ona.com/stories/migrating-from-classic-to-ona |
| Failed payment | Card fails | 7-day grace, then the account is locked and remaining Core credits are forfeited | — | https://ona.com/docs/ona/billing/overview |
Dated changes: Gitpod Classic sunset 2025-10-15 (Classic PAYG was $0.36/h for 4 cores/8 GB). Ona's 2025 launch pricing
quoted 2 vCPU/8 GB $0.11/h and 4/16 $0.23/h (superseded by OCUs). Ona joined OpenAI (2026).
## Gotchas
1. **One pool for compute and AI.** Agent conversations draw from the same OCUs as env-hours. A single "add a feature"
   prompt (~8 OCU) costs as much as 8 hours of a Standard env. Using your own agent (Claude Code, or a connected Codex plan) avoids this.
2. **Only two classes have published rates.** Core advertises up to 32 vCPU / 128 GB, but only 4/16 (1 OCU/h) and the 16/64
   GPU VM (7 OCU/h) have public OCU rates. Budgeting for other sizes is guesswork.
3. **No 4/8 shape.** The smallest priced class is 4 vCPU / **16 GB**, so a 4/8 workload pays for 16 GB.
4. **Prepaid, expiring credits.** Monthly OCUs vanish at month end. Buying a bigger tier "to be safe" wastes money, and the
   tier can't be changed without cancelling. Top-ups die with the subscription.
5. **Idle tail is billed.** Auto-stop defaults to 30 min but can be set to Never. Background processes (builds, servers) don't keep an
   env alive unless you use the CLI keep-alive. An open SSH/IDE session or a running agent session does keep it alive and billing.
6. **Aggressive deletion on Core.** Stopped envs are archived after 3 days and deleted 4 days later (7 days total). Anything
   uncommitted is lost, so long-lived paused state is not possible on Core.
7. **API/SDK is Enterprise-only.** Core is a human/agent IDE product, not a programmable sandbox API.
8. **Enterprise means two bills.** You pay Ona's contract (the Marketplace listing shows a $60k/yr unit) plus your own AWS/GCP compute
   and EBS. Compute is **not** included.
9. **Granularity unknown.** Ona doesn't publish per-second vs per-minute OCU metering or a minimum.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 env-hours**, 30% CPU, 50 GiB snapshots,
100 GiB egress. The smallest priced class is Standard 4 vCPU/16 GB = 1 OCU/h, so it needs **8,800 OCU**. CPU utilisation doesn't matter (billed while running).
Snapshots: no published storage rate, and Core deletes stopped envs after 7 days, so this is treated as $0 but unknown. Egress: unpublished (unknown).
No Ona-agent tokens are assumed (own agent).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Core $20 + top-ups | Yes (unlimited parallel envs) | $20 + 8,720 × $0.25 = **$2,200** |
| Core $50–$200 + top-ups | Yes | **$2,200** (all at $0.25/OCU) |
| Core $500 + top-ups | Yes | $500 + 6,600 × $0.25 = **$2,150** (cheapest) |
| Core $500, default 30-min auto-stop tail each session | Yes | +550 OCU → **$2,287.50** |
| Core $500, plus Ona-agent use equal to runtime (×2 OCU) | Yes | $500 + 15,400 × $0.25 = **$4,350** |
| Anti-pattern: timeout "Never", envs left running 24 h × 22 d | Yes | 26,400 OCU → $500 + 24,200 × $0.25 = **$6,550** |
| Enterprise self-hosted AWS (Regular m6i.xlarge 4/16) | Contract | $5,000 (Marketplace $60k/yr ÷ 12) + 8,800 × $0.192 = $1,689.60 AWS EC2 → **≈ $6,690** + EBS (50 × 80 GB) + snapshots + egress at AWS rates |
| Free (legacy) | No: max 3 parallel envs, and discontinued | n/a |