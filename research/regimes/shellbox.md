# shellbox — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public list price per x1 slot. Running and parked are mutually exclusive time states. SSH key identifies account; prepaid $10 minimum top-up. Sizes scale linearly x1 to x8.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Running | x1 slot = 2 vCPU / 4 GB / 50 GB | $0.02/slot-hour, by the minute; x1–x8. | https://shellbox.dev/ |
| Parked | Stopped box retains disk | $0.50/slot-month. | https://shellbox.dev/ |
| Always-on | keepalive enabled | Running metering continues; no published monthly compute cap. | https://shellbox.dev/ |
## Gotchas
- Public list price per x1 slot. Running and parked are mutually exclusive time states. SSH key identifies account; prepaid $10 minimum top-up. Sizes scale linearly x1 to x8.
- 16 running slots and64 total slots per account. 4/8 box=x2, so at most8 concurrently under default quota.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Choose x2 (4 vCPU/8 GB/100 GB): 8,800×$0.04 = $352 running compute. Each of 50 instances runs 176h. If $1/x2-month parked price prorates across remaining 554/730 month, parked cost is $37.95; proration must be verified, so do not treat this as a firm total. Snapshot/extra egress charges and 50-way account capacity are unverified. Official full FAQ resolves capacity: C=50 x2 boxes require100running slots, exceeding16running and64total slot caps. Workload infeasible on default account.
## Sources
- https://shellbox.dev/