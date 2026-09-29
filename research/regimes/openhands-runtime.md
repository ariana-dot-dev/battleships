# OpenHands Remote Sandbox / Cloud — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
OpenHands remote is a configurable backend/protocol, not always one vendor. Managed OpenHands Cloud is a public product; legacy remote runtime API pricing should not be assumed current.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Managed Cloud | OpenHands agent sessions | No verified standalone sandbox resource rate from reviewed remote-runtime docs. | https://docs.openhands.dev/openhands/usage/sandboxes/remote |
| Self-host remote | Configured APIURL/key | Own compute bill, not free hardware. | https://docs.openhands.dev/openhands/usage/sandboxes/remote |
## Gotchas
- OpenHands remote is a configurable backend/protocol, not always one vendor. Managed OpenHands Cloud is a public product; legacy remote runtime API pricing should not be assumed current.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
A numerical total is not defensible from the public evidence. Need an eligible4/8 machine rate, C50 and8h limits, snapshot retention/price and network tariff. Resource template:35,200×CPU_rate×(0.30 if active else1)+70,400×RAM_rate+plan+50×snapshot_rate+max(0,100−free_egress)×egress_rate. Unknown inputs stay unknown, not zero.
## Sources
- https://docs.openhands.dev/openhands/usage/runtimes/remote
- https://github.com/OpenHands/software-agent-sdk/tree/main/openhands-workspace