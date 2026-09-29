# Clusy — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Agent-native data science notebook, not a documented generic sandbox lifecycle API. Plans combine model usage and sandbox hardware allowances; absolute compute-hour allowance is unpublished. Higher usage multiples are not resource-hours.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Free | 8vCPU/8GB CPU sandbox | $0;5GB checkpoint storage; released after3days. | https://www.clusy.io/pricing |
| Plus | $12/mo | T4;30GB checkpoints;indefinite retention. | https://www.clusy.io/pricing |
| Pro | $30/mo | T4/L4/A10,32GB RAM;100GB checkpoints. | https://www.clusy.io/pricing |
| Max | 10x or30x Plus usage | $90/$200;512GB/2TB checkpoints;larger GPUs. | https://www.clusy.io/pricing |
## Gotchas
- Agent-native data science notebook, not a documented generic sandbox lifecycle API. Plans combine model usage and sandbox hardware allowances; absolute compute-hour allowance is unpublished. Higher usage multiples are not resource-hours.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
No 50-way8h allowance published. Free preset happens to have adequate CPU/RAM but one concurrent sandbox and3-day retention fail requirements. Paid usage multiples do not yield a defensible runtime total.
## Sources
- https://www.clusy.io/pricing