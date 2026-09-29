# BrowserCloud — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Browser-hour, bandwidth, residential-proxy and browser-agent charges all draw from one monthly credit pool. Displayed hours/GB are alternative uses of credits, not additive included pools. Dedicated-cluster/unlimited plans are a different regime.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Free | 1 concurrent /15min | 1,000 credits;1h browser-time equivalent. | https://browsercloud.io/pricing |
| Hobby | 5 concurrent | $19/mo;120h browser-time equivalent. | https://browsercloud.io/pricing |
| Startup | 50 concurrent | $99/mo;1,000h browser-time equivalent. | https://browsercloud.io/pricing |
| Business | 100 concurrent | $249/mo;3,000h browser-time equivalent. | https://browsercloud.io/pricing |
| Dedicated clusters | 100–400+ concurrent | Separate unlimited-credit offer; quote required. | https://browsercloud.io/pricing |
## Gotchas
- Browser-hour, bandwidth, residential-proxy and browser-agent charges all draw from one monthly credit pool. Displayed hours/GB are alternative uses of credits, not additive included pools. Dedicated-cluster/unlimited plans are a different regime.
- Overage and eight-hour session eligibility need detailed plan confirmation; cannot stack the hours and traffic equivalents.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Browser-hour examples are explicitly not 4-vCPU/8-GiB general-compute equivalents. Browser CPU/RAM allocation is unspecified.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
A numerical total is not defensible from the public evidence. Need an eligible4/8 machine rate, C50 and8h limits, snapshot retention/price and network tariff. Resource template:35,200×CPU_rate×(0.30 if active else1)+70,400×RAM_rate+plan+50×snapshot_rate+max(0,100−free_egress)×egress_rate. Unknown inputs stay unknown, not zero.
## Sources
- https://browsercloud.io/pricing