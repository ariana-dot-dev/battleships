# AgentComputer — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public PAYG pricing says actual resource usage and CPU Time: $0.07/CPU-hour, RAM $0.04375/GB-hour; hot running storage $0.000683/GB-hour, cold stopped storage $0.000027/GB-hour. Exact observed-versus-reserved RAM and CPU minimums unverified.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Running compute | Actual resource usage | CPU$0.07/CPU-h + RAM$0.04375/GB-h. | https://agentcomputer.ai/pricing |
| Hot storage | Running | $0.000683/GB-h. | https://agentcomputer.ai/pricing |
| Cold storage | Stopped | $0.000027/GB-h, equivalent$0.01971/GB/730h. | https://agentcomputer.ai/pricing |
| Enterprise | Custom capacity/private infrastructure | Quote. | https://agentcomputer.ai/pricing |
## Gotchas
- Public PAYG pricing says actual resource usage and CPU Time: $0.07/CPU-hour, RAM $0.04375/GB-hour; hot running storage $0.000683/GB-hour, cold stopped storage $0.000027/GB-hour. Exact observed-versus-reserved RAM and CPU minimums unverified.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Assuming actual CPU-time and reserved8GB RAM:8,800×(4×.30×.07+8×.04375)=$3,819.20. Storage state meters are additional and cannot be conflated with50GiB snapshots. C50/8h, egress and snapshot retention unknown; no all-in total.
## Sources
- https://agentcomputer.ai
- https://github.com/rivet-dev/sandbox-agent/blob/bbc195cc3fb5a1dd9cb05d8437442768c511e17e/sdks/typescript/src/providers/agentcomputer.ts
- https://agentcomputer.ai/pricing
- https://agentcomputer.ai/