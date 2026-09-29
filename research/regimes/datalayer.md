# Datalayer Runtimes — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Rendered official pricing exposes one available CPU sandbox:1vCPU/1GiB at$0.30/h. Listed7CPU, T4 andA100 environments markedUnavailable. Wallet-credit plans, agentrun caps andorganization seats are separate.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| CPU runtime | 1vCPU/1GiB | $0.30/hour while running. | https://datalayer.io/pricing |
| Free | Personal | 50walletcredits and500agent runs/month. | https://datalayer.io/pricing |
| Team | $49/month base | 500credits/5,000runs; organization adds$15/active seat. | https://datalayer.io/pricing |
| Larger CPU/GPU | Unavailable on pricingpage | Do not infer rates. | https://datalayer.io/pricing |
## Gotchas
- Rendered official pricing exposes one available CPU sandbox:1vCPU/1GiB at$0.30/h. Listed7CPU, T4 andA100 environments markedUnavailable. Wallet-credit plans, agentrun caps andorganization seats are separate.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
The available1CPU/1GiB environment fails4vCPU/8GiB.7CPU/30GB is listed unavailable with no rate. Fiftyconcurrentmachines andretainedsnapshot fees require a quote; multiplying the1CPUrate byfour would invent unsupportedcapacity.
## Sources
- https://datalayer.io/pricing
- https://github.com/datalayer/code-sandboxes/blob/d9c39925d87447dab5f3f7f1bdf9451ec4ebca2a/code_sandboxes/providers.py