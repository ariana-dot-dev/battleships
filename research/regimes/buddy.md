# Buddy Sandboxes — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Rendered list prices are EUR, not USD; no FX guess. Pro €29/month, Hyper €99/month. Both include 300 sandbox CPU-min/month; RAM pools differ. Sandbox billing must not be confused with pipeline GB-minutes or pipeline concurrency.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Free | 1 seat | €0; 300 sandbox CPU-min and 730 GB-hours/month. | https://buddy.works/pricing |
| Pro | 2 seats included | €29/month; 300 CPU-min and 7,300 GB-hours; CPU overage €0.00024/min, RAM €0.00011/GB-h. | https://buddy.works/pricing |
| Hyper | 5 seats included | €99/month; 300 CPU-min and 14,600 GB-hours; same sandbox overage rates. | https://buddy.works/pricing |
| Seat / pipeline add-ons | Not sandbox counts | Pro extra seat €9; Hyper €29; pipeline concurrent €50/mo; do not treat as sandbox concurrent quota. | https://buddy.works/pricing |
## Gotchas
- Rendered list prices are EUR, not USD; no FX guess. Pro €29/month, Hyper €99/month. Both include 300 sandbox CPU-min/month; RAM pools differ. Sandbox billing must not be confused with pipeline GB-minutes or pipeline concurrency.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
No USD total without a dated exchange rate and CPU-basis confirmation. At allocation basis, 4/8 workload is 2,112,000 CPU-min and 70,400 GB-h. Pro sandbox overage = (2,112,000−300)×€0.00024+(70,400−7,300)×€0.00011 = €513.749, plus €29 fee. If CPU meter is actual CPU time, use 633,600 CPU-min instead. Snapshot and 50-way quota unknown.
## Sources
- https://buddy.works/pricing
- https://buddy.works/docs/sandboxes
- https://buddy.works/docs/sandboxes/configuration
- https://buddy.works/docs/sandboxes/lifecycle
- https://buddy.works/docs/sandboxes/snapshots