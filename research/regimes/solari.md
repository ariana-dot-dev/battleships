# Solari — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public tiered list rates, shared credits cover browsers, sandboxes and desktop VMs. Professional only permits 10 concurrent sandboxes.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Free | $0 fee; $3 monthly credits; C=1, max1h | CPU $0.0525 + RAM $0.0165/h; browser $0.15/h. | https://docs.getsolari.com/pricing |
| Starter | $20 fee; $20 credits; C=2, max5h | CPU $0.035 + RAM $0.011/h; browser $0.10/h. | https://docs.getsolari.com/pricing |
| Professional | $200 fee; $200 credits; C=10, max24h | CPU $0.0245 + RAM $0.0077/h; browser $0.07/h. | https://docs.getsolari.com/pricing |
| Enterprise | Custom fee/credits; C=50+ | Published CPU $0.0175 + RAM $0.0055/h; browser $0.05/h subject to contract. | https://docs.getsolari.com/pricing |
| Desktop VM | Any tier | Add $0.02/runtime-hour for live screen. | https://docs.getsolari.com/pricing |
| Snapshot storage | 2026-10-01 onward | $0.05/GB-month above 10 GB, daily prorated. | https://docs.getsolari.com/pricing |
## Gotchas
- Public tiered list rates, shared credits cover browsers, sandboxes and desktop VMs. Professional only permits 10 concurrent sandboxes.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Professional compute at 4/8 is $0.1596/h; 8,800h → $1,404.48; with $200 fee and $200 credits the compute bill remains $1,404.48, but C=10 fails C=50. Enterprise published compute subtotal 8,800×(4×.0175+8×.0055)=$1,003.20, plus unknown contracted minimum/fees and egress. Snapshots are free as of Sep 28; after Oct 1, 50−10=40 GB costs $2/month. No feasible all-in self-serve estimate.
## Sources
- https://docs.getsolari.com/pricing
- https://getsolari.com/
- https://docs.getsolari.com/sandboxes/overview