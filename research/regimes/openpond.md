# OpenPond Cloud Sandboxes — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Hosted sandbox plans with monthly shared usage credits. CPU/RAM unit rates not found. Team subscription is not an unlimited compute pool.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Free | 1 concurrent | Limited included monthly usage; top-ups available. | https://openpond.ai/pricing |
| Starter | $10/month | $10 usage;10 concurrent;3 members included, extra$8/member. | https://openpond.ai/pricing |
| Pro | $20/month | $20 usage;10 concurrent;3 members included, extra$8/member. | https://openpond.ai/pricing |
| Enterprise | C50 workload | Custom dedicated capacity and usage policy. | https://openpond.ai/pricing |
## Gotchas
- Hosted sandbox plans with monthly shared usage credits. CPU/RAM unit rates not found. Team subscription is not an unlimited compute pool.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Self-serve concurrency10 cannot serve50. Need Enterprise quote and resource-hour rates; cannot divide plan fees by8,800h to invent a rate.
## Sources
- https://openpond.ai/pricing
- https://github.com/openpond/openpond