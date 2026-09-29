# StateSet Sandbox — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public homepage lists compute/network/create meters. gVisor Kubernetes pods, non-root. Free CPU-hours cannot be applied to RAM or network. Runtime price shown as CPU-hour; allocated versus observed CPU metering is not fully specified.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Compute | Runtime | $0.128/CPU-hour + $0.011/GB-hour. | https://sandbox.stateset.app/ |
| Network | Metered transfer | $0.15/GB. | https://sandbox.stateset.app/ |
| Creates | Per create | $0.60/million = $0.0000006 each. | https://sandbox.stateset.app/ |
## Gotchas
- Public homepage lists compute/network/create meters. gVisor Kubernetes pods, non-root. Free CPU-hours cannot be applied to RAM or network. Runtime price shown as CPU-hour; allocated versus observed CPU metering is not fully specified.
- ENGINE_CARD cannot apply all independent free CPU/RAM/storage/request allowances exactly. Do not subtract them twice.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Under allocatedCPU assumption: compute$5,280 minus5×.128−420×.011=$5,274.74. Network(100−20)×.15=$12;1,100creates fit5,000free. Subtotal$5,286.74 before snapshots/storage and unknown plan/limit effects. Basis/concurrency/duration need confirmation.
## Sources
- https://sandbox.stateset.app/