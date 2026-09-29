# Runta — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public list rates. Prepaid billing with $5 minimum manual top-up, no subscription. Paused/suspended/shut-down runtime retains billed disk. Memory auto scaling can change the billed allocation; do not confuse that with active CPU billing.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Running | Until pause/stop/delete | CPU $0.0504/vCPU-h + RAM $0.0162/GiB-h + disk $0.000108/GiB-h. | https://runta.com/pricing/ |
| Paused/suspended/shut down | Retained runtime | Disk only at same rate. | https://runta.com/pricing/ |
| Deleted | After deletion | No runtime charges. | https://runta.com/pricing/ |
## Gotchas
- Public list rates. Prepaid billing with $5 minimum manual top-up, no subscription. Paused/suspended/shut-down runtime retains billed disk. Memory auto scaling can change the billed allocation; do not confuse that with active CPU billing.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Allocated compute = 8,800×(4×0.0504+8×0.0162) = $2,914.56. CPU utilization alone does not lower this. Disk is additional: D GiB retained for 730h costs D×$0.07884; do not assume checkpoint bytes use the runtime disk rate. 50 GiB snapshots and 100 GiB egress cannot be fully priced; 50-way quota requires paid capacity approval beyond trial aggregate 32 vCPU / 64 GiB.
## Sources
- https://runta.com/pricing/
- https://runta.com/docs/overview/
- https://runta.com/docs/runtime/checkpoints/
- https://runta.com/docs/runtime/memory-auto-scaling/
- https://runta.com/docs/runtime/auto-suspend-and-wake-up/
- https://runta.com/docs/runtime/egress/