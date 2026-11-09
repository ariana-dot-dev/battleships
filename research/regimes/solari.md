# Solari — billing regimes
As of 2026-11-08. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public tiered list rates, shared credits cover browsers, sandboxes and desktop VMs. Professional permits 10 concurrent sandboxes; Team 50+ (custom price, through sales).
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Free | $0 fee; $3 monthly credits; C=1, max1h | CPU $0.0525 + RAM $0.0165/h; browser $0.15/h. | https://docs.getsolari.com/pricing |
| Starter | $20 fee; $20 credits; C=2, max5h | CPU $0.035 + RAM $0.011/h; browser $0.10/h. | https://docs.getsolari.com/pricing |
| Professional | $200 fee; $200 credits; C=10, max24h | CPU $0.0245 + RAM $0.0077/h; browser $0.07/h. | https://docs.getsolari.com/pricing |
| Team | Custom fee/credits (sales); C=50+; unlimited session; HIPAA; own-VPC deploy | Published CPU $0.0175 + RAM $0.0055/h unless the contract sets other rates; volume pricing agreed with sales. | https://docs.getsolari.com/pricing |
| Enterprise | Custom fee/credits (sales); C=100,000; unlimited session; HIPAA; own-VPC deploy | Published CPU $0.00175 + RAM $0.00055/h unless the contract sets other rates. | https://docs.getsolari.com/pricing |
| Desktop VM | Any tier | Add $0.02/runtime-hour for live screen ($0.002/h on Enterprise). | https://docs.getsolari.com/pricing |
| Snapshot storage | 2026-10-01 onward | $0.05/GB-month, pro-rated daily; first 10 GB per organization free. | https://docs.getsolari.com/pricing |
## Gotchas
- Team and Enterprise are sales-only; their published rates apply "unless your contract sets different ones".
- Default idle timeout: 2 h for headless sandboxes, 30 min for desktop VMs; the default action is pause (state kept). Billing and retention of paused machines are not published.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. Assume one start/instance/day: 1,100 starts. Retain 50 GiB snapshots for a month; 100 GiB outbound. Active disk capacity was not specified.
Professional compute at 4/8 is $0.1596/h; 8,800 h → $1,404.48; C=10 fails C=50. Team published compute: 8,800×(4×0.0175+8×0.0055) = $1,003.20, plus a custom fee through sales. Enterprise published compute: 8,800×(4×0.00175+8×0.00055) = $100.32, plus a custom fee through sales. Snapshots: 50−10 = 40 GB costs $2/month. No self-serve plan fits C=50.
## Sources
- https://docs.getsolari.com/pricing
- https://getsolari.com/
- https://docs.getsolari.com/sandboxes
- https://docs.getsolari.com/snapshots
