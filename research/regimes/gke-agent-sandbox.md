# GKE Agent Sandbox — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Harbor GKE backend and ADK GKE codeexecutor use customer GKE infrastructure. Agent Sandbox orchestration is not a separate all-inclusive VM rate. Price depends on Autopilot/Standard, location, machine, warm pool and storage.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Autopilot | Pod-driven compute | GKE pod resource and management charges plus disk/network; region unspecified. | https://cloud.google.com/kubernetes-engine/docs/concepts/agent-sandbox |
| Standard | Provisioned nodes | NodeVM rates plus cluster management; warm pool bills whileidle. | https://cloud.google.com/kubernetes-engine/docs/concepts/agent-sandbox |
## Gotchas
- Harbor GKE backend and ADK GKE codeexecutor use customer GKE infrastructure. Agent Sandbox orchestration is not a separate all-inclusive VM rate. Price depends on Autopilot/Standard, location, machine, warm pool and storage.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Requires200vCPU/400GiB concurrent capacity before node packing/overhead;8,800 sandbox-hours do not uniquely determine node-hours. Select cluster/node/storage/network region and account discounts; totalnull.
## Sources
- https://github.com/laude-institute/harbor/blob/main/src/harbor/environments/gke.py