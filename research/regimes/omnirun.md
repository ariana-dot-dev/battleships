# OmniRun — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public prices in EUR; USD unknown. Base sandbox-hour means up to 4 vCPU/2 GB; larger shapes consume proportionally more but exact scaling rule is not defined. Do not infer price for 4/8 by multiplying without a published formula.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Free | 4vCPU/2GB; C1 | 25 standard sandbox-hours/month; hard stop/queue, no overage. | https://omnirun.io/pricing |
| Launch | C3 | €19/mo (or €180/year); 100 hours included, €0.19/h overage. | https://omnirun.io/pricing |
| Scale | C10 | €79/mo (or €756/year); 600 hours included, €0.15/h overage. | https://omnirun.io/pricing |
| Enterprise | C50+ | Negotiated included hours/fee; advertised overage €0.10/h. | https://omnirun.io/pricing |
## Gotchas
- Public prices in EUR; USD unknown. Base sandbox-hour means up to 4 vCPU/2 GB; larger shapes consume proportionally more but exact scaling rule is not defined. Do not infer price for 4/8 by multiplying without a published formula.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
50 concurrent 8h sessions requires Enterprise. Need the size multiplier for 4/8, committed allowance, quote and EUR→USD rate. 8,800 standard-hours would cost €880 before enterprise fees/allowances only if multiplier=1, which is not established; no normalized USD figure.
## Sources
- https://omnirun.io/pricing