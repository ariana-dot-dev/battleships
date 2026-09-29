# Brimble Sandboxes — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public paid-plan sandbox quotas. PaaS bandwidth/object storage rates are not automatically sandbox snapshot/egress rates; no sandbox overage CPU/RAM unit price established.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Hacker | $3/month | 3concurrent,max2vCPU/4GB,2h;5CPU-h+10GB-h included. | https://brimble.io/pricing |
| Developer | $11/month | 15concurrent,max4vCPU/8GB,6h;20CPU-h+40GB-h included. | https://brimble.io/pricing |
| Enterprise | C50/8h requirement | Custom quote; published self-serve plans fail both limits. | https://brimble.io/pricing |
## Gotchas
- Public paid-plan sandbox quotas. PaaS bandwidth/object storage rates are not automatically sandbox snapshot/egress rates; no sandbox overage CPU/RAM unit price established.
- ENGINE_CARD cannot apply all independent free CPU/RAM/storage/request allowances exactly. Do not subtract them twice.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
8,800h needs35,200CPU-h/70,400GB-h. Developer included20CPU-h/40GB-h does not cover this, andC15/max6h fail theworkload. Need Enterprise quote, overage tariff andsnapshot/network rates.
## Sources
- https://brimble.io/pricing
- https://pypi.org/project/brimble-sandbox/