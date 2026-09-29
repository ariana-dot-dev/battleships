# Sandbox as a Service — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public list rates. Dedicated disposable Linux VMs, prepaid balance. Ready-to-destroy runtime only; provisioning time excluded. No rounding or minimum runtime; credits do not expire.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Prepaid running | Small/medium/large | $0.09/$0.28/$0.55 per hour respectively; provisioning free. | https://sandbox-as-a-service.com/pricing |
| Deleted/timeout | 24h maximum, disposable | No surviving disk or snapshot. | https://sandbox-as-a-service.com/pricing |
| Raised concurrency | Default C=20; ask for more | Approval required; no separate public rate. | https://sandbox-as-a-service.com/pricing |
## Gotchas
- Public list rates. Dedicated disposable Linux VMs, prepaid balance. Ready-to-destroy runtime only; provisioning time excluded. No rounding or minimum runtime; credits do not expire.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Medium 4/8/80 compute-only subtotal = 8,800×$0.28 = $2,464. Current default concurrency 20 fails requested 50; retention requirement is unsupported (ephemeral). Do not rank this as a feasible $2,464 total. Egress price unknown.
## Sources
- https://sandbox-as-a-service.com/pricing
- https://sandbox-as-a-service.com/llms.txt