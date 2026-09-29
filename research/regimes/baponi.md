# Baponi — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public credit-metered execution, not per-second CPU/RAM product. One credit covers 60s at 1 CPU+1 GiB; larger matched CPU/RAM sizes scale credits linearly (2 CPU/2 GiB is 2 credits/minute). Separate CPU×RAM multiplication would be wrong.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Free | 1CPU/1GiB; max60sec; C5 | 1,000 credits/month. | https://baponi.ai/pricing/ |
| Pro | Max4CPU/4GiB; max1h; C100 | $97/mo includes10,000 credits, then $1/1,000. | https://baponi.ai/pricing/ |
| Enterprise | Own VPC/unlimited configured resources | Annual negotiated pricing. | https://baponi.ai/pricing/ |
## Gotchas
- Public credit-metered execution, not per-second CPU/RAM product. One credit covers 60s at 1 CPU+1 GiB; larger matched CPU/RAM sizes scale credits linearly (2 CPU/2 GiB is 2 credits/minute). Separate CPU×RAM multiplication would be wrong.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Requested 4/8 exceeds Pro maximum RAM4GiB and 8h exceeds 1h execution maximum. Enterprise quote required. Credit arithmetic for an unsupported 4/8 shape is deliberately not invented.
## Sources
- https://baponi.ai/pricing/
- https://baponi.ai/docs/guides/deep-agents