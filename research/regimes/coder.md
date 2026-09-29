# Coder — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Self-hosted cloud-development workspace product. Coder provisions customer-selected infrastructure; licence is not a compute price. Free open-source and commercial Premium options exist.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Community | Self-managed | Software available open-source; cloud/VM cost additional. | https://coder.com/pricing |
| Premium | Enterprise controls | Commercial pricing/contract plus cloud cost. | https://coder.com/pricing |
## Gotchas
- Self-hosted cloud-development workspace product. Coder provisions customer-selected infrastructure; licence is not a compute price. Free open-source and commercial Premium options exist.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Need actual provisioned VM SKU and50-workspace capacity plus any licence quote. Open-source licence$0 must never become free8,800h compute.
## Sources
- https://coder.com/pricing
- https://github.com/coder/ai-sdk