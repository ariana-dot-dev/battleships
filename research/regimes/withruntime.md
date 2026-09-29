# Runtime — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public list pricing. Active CPU has absolute 0.05-vCPU floor per sandbox, not a fixed utilization percentage. Memory is reserved, not utilization. Decimal GB is explicit for snapshots and egress; rates converted to GiB with 1.073741824.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Active CPU | Default | max(0.05, provisioned vCPU×CPU util)×$0.025/h; allocated RAM $0.0075/GiB-h. | https://withruntime.com/pricing |
| Reserved CPU | Full-core workloads | $0.025/provisioned vCPU-h + same RAM. | https://withruntime.com/pricing |
| Retained state | Paused VM, snapshot or custom image | $0.08/decimal GB/30-day month; unique blocks. | https://withruntime.com/pricing |
| Volumes | Allocated capacity | About $0.11/GiB/30-day month; backups $0.012/decimal GB. | https://withruntime.com/pricing |
## Gotchas
- Public list pricing. Active CPU has absolute 0.05-vCPU floor per sandbox, not a fixed utilization percentage. Memory is reserved, not utilization. Decimal GB is explicit for snapshots and egress; rates converted to GiB with 1.073741824.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
At 30% CPU: 8,800×(max(0.05,4×0.30)×0.025+8×0.0075) = $792. 50 GiB snapshots = 50×1.073741824×0.08 = $4.294967296 per 30-day month. 100 GiB egress is within free quota. Subtotal $796.294967296, excluding runtime disk/volumes, IPv4 and any extra state. C=50 consumes exactly 200 vCPU/400 GiB; quota check required.
## Sources
- https://withruntime.com/pricing
- https://withruntime.com/llms-full.txt