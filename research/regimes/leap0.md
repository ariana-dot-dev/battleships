# Leap0 — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Free public preview as of2026-09-28. Homepage lists FUTURE rates that apply when billing goes live; do not mislabel them currently charged. Each sandbox Firecracker,1–8vCPU,512MiB–8GB,10GiB disk,1min–8h timeout.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Preview | Currently active public preview | Compute free; quota and retention conditions apply. | https://leap0.dev/ |
| Announced future billing | Only once billing goes live | CPU$0.0504/vCPU-h + RAM$0.0162/GB-h; not current list bill. | https://leap0.dev/ |
## Gotchas
- Free public preview as of2026-09-28. Homepage lists FUTURE rates that apply when billing goes live; do not mislabel them currently charged. Each sandbox Firecracker,1–8vCPU,512MiB–8GB,10GiB disk,1min–8h timeout.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Preview compute is$0 if quota grants50×4/8; do not assume capacity. Announced future compute subtotal would be8,800×(4×.0504+8×.0162)=$2,914.56. Max8h matches requested sessions exactly; creation overhead/timeouts require care. Snapshot/egress rates not established.
## Sources
- https://leap0.dev/
- https://leap0.dev/docs/llms-full.txt