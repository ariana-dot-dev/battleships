# YepCode Run — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public list prices rendered in EUR; Yeps are rounded-up seconds of process execution. General JS/Python execution service; self-serve memory only300MB/600MB, not arbitrary8GiB machines.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Developer | 300 runs/day max30s | 50k Yeps/month;C1. | https://yepcode.io/pricing/ |
| Starter | C10,300MB,max1h | €119/mo;15M Yeps;€0.00001/extra Yep. | https://yepcode.io/pricing/ |
| Growth | C50,600MB,max12h | €599/mo;150M Yeps;€0.000005/extra Yep. | https://yepcode.io/pricing/ |
| Enterprise | Custom CPU/RAM/on-prem | From€1,800/mo. | https://yepcode.io/pricing/ |
## Gotchas
- Public list prices rendered in EUR; Yeps are rounded-up seconds of process execution. General JS/Python execution service; self-serve memory only300MB/600MB, not arbitrary8GiB machines.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Workload8,800h=31.68M seconds. Growth time pool150M covers that runtime but600MB memory fails8GiB. Enterprise needs custom resources/quote; USD conversion not supplied.
## Sources
- https://yepcode.io/pricing/