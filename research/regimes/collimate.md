# Collimate — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public list pricing. Demo is free; Pro pays allocated live resources per second. Live fork and spawn are free. Suspend retains full memory and filesystem state.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Demo | Evaluation; 2 concurrent, 1h sessions | Free demo, not an 8h/50-concurrent production tier. | https://collimate.ai/pricing |
| Pro | No commitment | CPU $0.04/vCPU-h + RAM $0.012/GB-h; suspended storage $0.10/GB-month; create/fork $0. | https://collimate.ai/pricing |
| Enterprise | Dedicated/BYOC/SSO negotiated | Unpublished quote. | https://collimate.ai/pricing |
## Gotchas
- Public list pricing. Demo is free; Pro pays allocated live resources per second. Live fork and spawn are free. Suspend retains full memory and filesystem state.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Compute = 8,800 × (4×0.04 + 8×0.012) = $2,252.80. 50 GiB suspended storage adds $5.00. Subtotal $2,257.80 plus unknown egress. Pro permits 50 concurrent 8h sessions. 30% CPU does not reduce allocated-resource billing.
## Sources
- https://collimate.ai/pricing
- https://docs.collimate.ai/llms.txt
- https://docs.collimate.ai/core/lifecycle/
- https://docs.collimate.ai/core/egress/
- https://docs.collimate.ai/self-hosting/helm/