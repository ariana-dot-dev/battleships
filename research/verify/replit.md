# Verify: replit (2026-09-28, independent verifier)
Sources re-fetched live: docs.replit.com/billing/deployment-pricing.md, billing/aug-cloud-billing-updates.md,
billing/plans/replit-pro.md, billing/plans/replit-core.md, replit.com/pricing (static HTML).
| Item | Result | Note |
|---|---|---|
| Aug-2026 cut effective at the first billing cycle on/after 2026-08-01, all plans | confirmed | aug update page |
| CU $3.20 -> $0.60/1M; requests $1.20 -> $0.40/1M; outbound $0.10 -> $0.05/GiB | confirmed | aug table |
| App Storage $0.03 -> $0.015/GiB-mo; ops $0.0004 / $0.005 per 1k | confirmed | aug table |
| DB compute $0.16/h unchanged; DB storage $1.50 -> $0.35/GiB-mo | confirmed | aug table |
| Reserved VM hourly: 0.5/2 $0.0208, dedicated 1/4 $0.0486, 2/8 $0.0694, 4/16 $0.1806, 8/32 $0.3611, 16/64 $0.7222; legacy 1/4 rose $0.042 -> $0.0486 | confirmed | aug table (also legacy 0.25/1 $0.0104, not in card) |
| Reserved VM monthly $15 / $35 / $50 / $130 | confirmed | deployment-pricing constants |
| 1 CPU-s = 18 CU, 1 GB-s = 2 CU -> $0.03888/vCPU-h, $0.00432/GiB-h | confirmed | deployment-pricing; arithmetic checked |
| Autoscale base fee: $2 (deployment-pricing, AutoscaleBaseFee '$2') vs $1/mo (aug table, current and new) | confirmed conflict | still unresolved on both live pages |
| Scheduled $2/mo + $0.60/1M CU, scheduler $0 | confirmed | deployment-pricing |
| Autoscale idles after 15 min; concurrent requests share an instance | confirmed | deployment-pricing |
| Starter: 1 free published app, expires after 30 days | confirmed | deployment-pricing |
| Core $20 ($18 annual), $20 credits ("$20 towards most powerful models") | confirmed | replit.com/pricing |
| Pro $100 ($90 annual), $100 credits, 15 collaborators, 50 viewers, 10 parallel agents, 28-day rollback | confirmed | replit.com/pricing |
| Pro credits roll over for two months; tiered credits; up to 15 builders | confirmed | replit-pro doc |
| Core 5 builders | confirmed | replit-core doc |
| Pro tiers $250/$500/$1,000/$2,500 and annual prices | unverifiable | tier selector rendered client-side |
| Core/Pro outbound allowances (100 / 1,000 GiB), storage per app | not re-verified | not in the static text fetched |
Corrections:
- reserved-vm: requires_always_on false -> true. Docs describe Reserved VMs as "Guaranteed compute resources that run
  continuously", and stopping per shift is undocumented (the regime file marks it "Unverified").
  billed the VM per session hour ($1,589 for the reference workload) instead of the documented always-on price. Now:
  always-on 50 x 4/16 = $6,591.90 at 730 h (the regime's $6,500 at 720 h). Session workloads fall through to Autoscale (alt).
- Caveats updated (base-fee conflict re-confirmed with exact page strings; Pro tiers above $100 unverifiable).