# Replit — pricing regimes (as of 2026-09-28)
Replit is an AI app builder + cloud IDE + hosting platform. Everything is paid from one pool of **credits**: the plan fee
converts into monthly credits (Core $20, Pro $100-$2,500), which pay for Agent work, deployments, databases, storage
and transfer; beyond that, pay-as-you-go up to a budget. Development workspace time is "Unlimited" and not metered.
Compute you can size and price is **deployments**: Reserved VM (always-on, hourly), Autoscale and Scheduled (compute
units), Static (transfer only). A large price cut took effect with the first billing cycle on/after 2026-08-01.
Verified live 2026-09-28: replit.com/pricing (HTML), docs.replit.com billing pages listed below.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Starter (free) | Default | $0; daily Agent credits (monthly cap) + small monthly cloud credits (amounts unpublished) | 1 published app, expires after 30 days; North America only; no full build mode | https://docs.replit.com/billing/plans/starter-plan, https://docs.replit.com/features/publishing/project-geography.md |
| Core | Personal builders | $20/mo ($18 annual); fee = $20 monthly credits, reset monthly | 5 collaborators; 100 GiB dev + 100 GiB deploy outbound; 50 GiB storage/app; Free Mode chat up to 30 h / 60 projects | https://replit.com/pricing |
| Pro tiers | Teams up to 15 builders | Monthly $100 / $250 / $500 / $1,000 / $2,500 (annual $90 / $215 / $425 / $825 / $2,000); credits = tier; **roll over 2 months** | 10 parallel agents; 1,000 GiB dev outbound; 100 GiB deploy outbound; 256 GiB storage/app; 28-day DB rollback; 50 viewers | https://replit.com/pricing, https://docs.replit.com/billing/plans/replit-pro |
| Enterprise | SSO, single tenant, static outbound IPs | Custom (sales) | custom limits | https://replit.com/pricing |
| Pay-as-you-go overage | Credits exhausted | Same unit rates; stops at budget (hard cap suspends usage-based services) | — | https://replit.com/pricing (FAQ), https://docs.replit.com/billing/managing-spend.md |
| Credit packs | Prepay | $100-$1,000 packs, up to $50 off; expire 6 months; optional auto-reload | — | https://docs.replit.com/billing/managing-spend.md |
| Reserved VM | Always-on app (bots, APIs, workers) | Hourly while deployed (~720 h = listed month) | shared 0.5/2 GiB $0.0208/h ($15/mo); dedicated 1/4 $0.0486 ($35); 2/8 $0.0694 ($50); 4/16 $0.1806 ($130); 8/32 $0.3611; 16/64 $0.7222 | https://docs.replit.com/billing/aug-cloud-billing-updates.md, https://docs.replit.com/billing/deployment-pricing |
| Autoscale | Variable-traffic web apps | Base fee/deployment + CU while serving requests + per request; scale to zero, idle after 15 min | $0.60/1M CU; 1 CPU-s = 18 CU ($0.03888/vCPU-h), 1 GB-s = 2 CU ($0.00432/GiB-h); $0.40/1M requests; base **$2/mo** (pricing page) vs **$1/mo** (Aug table) — conflict | same |
| Scheduled | Cron/background jobs | Base fee + CU during runs; scheduler free | $2/mo + $0.60/1M CU | https://docs.replit.com/billing/deployment-pricing |
| Static | Static sites | Hosting free; transfer only | $0.05/GB | same |
| Outbound transfer | Beyond included allowance | Per GiB egress; ingress free | $0.05/GiB (was $0.10 before Aug 2026) | https://docs.replit.com/billing/aug-cloud-billing-updates.md |
| PostgreSQL (prod) | Production DB | Compute hours (suspend after 5 min idle) + max monthly storage | $0.16/compute-h; $0.35/GiB-mo (10 GiB cap); dev DB free (20 GiB/app) | same, https://docs.replit.com/billing/about-usage-based-billing.md |
| App Storage | Object storage | GiB-month + operations | $0.015/GiB-mo; $0.0004/1k basic, $0.005/1k advanced ops | https://docs.replit.com/billing/aug-cloud-billing-updates.md |
| Agent (effort-based) | Using Replit Agent | Per checkpoint, scaled by task effort, at model-provider API rates, from credits; daily Free Mode allowance on Core/Pro | no fixed $/h | https://docs.replit.com/billing/ai-billing.md, https://replit.com/pricing |
| Dev workspace | Building in the IDE | Not metered ("Development Time: Unlimited"); resources per plan unpublished officially | **Third-party only**: Core 4 vCPU / 8 GiB, Starter 2 GiB RAM | https://replit.com/pricing, https://www.nocode.mba/articles/replit-pricing |
| Pre-Aug-2026 prices (historical) | Billing cycles before 2026-08-01 | Old rates | CU $3.20/1M, req $1.20/1M, egress $0.10/GiB, dedicated 4/16 $0.22/h, 2/8 $0.11/h | https://docs.replit.com/billing/aug-cloud-billing-updates.md |
Regions: North America, Europe, Asia, South America, Australia (Core/Pro/Enterprise; permanent per published project;
no regional price difference published).
## Gotchas
1. **Not a sandbox API**: one Reserved VM = one published app. Running 50 parallel agent machines means 50 deployments;
   the account hard limit is 20 concurrent Replit Apps (workspace side), and there is no SDK to spawn VMs.
2. **Fee = credits, but credits are shared with Agent**: heavy Agent use can drain the credit before hosting does.
   Core credits reset monthly; Pro credits roll over two months; packs expire after 6 months.
3. **Reserved VMs are always-on**: listed per month; stopping between shifts to save money is not documented.
4. **Autoscale is cheap per vCPU-hour but request-bound**: billed only while serving HTTP requests; no background work
   between requests, and the machine size menu is unpublished.
5. **Autoscale base fee inconsistency** ($2 vs $1) and "legacy" shared 1 vCPU/4 GiB Reserved VM *rose* in Aug 2026.
6. **Budgets are hard stops**: hitting the budget suspends all usage-based services (your deployments go down).
7. **Geography is permanent** per published project; Starter is North America only.
8. Workspace vCPU/RAM per plan only appear on third-party sites now.
## Worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = 8,800 machine-hours, 30% CPU, 50 GiB snapshots, 100 GiB egress.
| Regime | Feasible? | Monthly total |
|---|---|---|
| Reserved VM 4/16 (smallest ≥ 4 vCPU & ≥ 8 GiB), 50 always-on, Core | Yes (50 deployments) | 50 × $130 = **$6,500** (credit $20 absorbed; engine at 730 h: $6,591.90). Egress 100 GiB within the 100 GiB included → $0. No snapshot product; 50 GiB in App Storage would add $0.75 |
| Same on Pro $100 | Yes | $6,500 (fee fully consumed as credit; buys rollover, 15 builders) |
| Reserved VM only during shifts (if unpublishing daily worked; undocumented) | Unverified | 8,800 × $0.1806 = $1,589.28 |
| Autoscale 4 vCPU / 8 GiB, busy 100% of shift (alt) | Only for request-driven apps | 8,800 × $0.19008 = $1,672.70 + 50 × $2 base = **$1,772.70** + requests (30% CPU util saves nothing: billed on allocation while serving) |
| Autoscale, busy 30% of the shift | Request-driven | 2,640 h × $0.19008 = $501.81 + $100 base = $601.81 |
| Starter | No (1 app, expires in 30 days) | n/a |