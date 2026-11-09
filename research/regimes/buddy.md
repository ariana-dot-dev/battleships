# Buddy Sandboxes — billing regimes
As of 2026-11-08. Prices are USD unless labelled otherwise. Source type: official docs and pricing page.
The docs list plan fees in USD ($29, $299). The pricing page shows the same numbers in EUR. Sandbox billing must not be confused with pipeline concurrency.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Free | 1 seat | $0; $1/month usage credit (compute and storage); no pay-as-you-go; sandboxes stop when the credit is spent. All features except SSO and advanced permissions. | https://buddy.works/docs/basics/billing-and-usage/gbmin |
| Pro | 1 seat (extra $20/mo) | $29/month + pay-as-you-go usage. | https://buddy.works/docs/basics/billing-and-usage/features |
| Team | 1 seat (extra $30/mo) | $299/month + pay-as-you-go usage; adds SSO and advanced permissions. | https://buddy.works/docs/basics/billing-and-usage/features |
| Usage | Pro and Team | $0.00024 per CPU-minute + $0.00024 per GB-minute of RAM, on allocation; sandbox storage $0.00011 per GB-hour. | https://buddy.works/docs/basics/billing-and-usage/gbmin |
| Concurrents | Pipelines, not sandboxes | 2 on Free and Pro, 5 on Team; extra $5/mo each. Do not treat as a sandbox quota. | https://buddy.works/pricing |
## Gotchas
- The old Hyper plan and the 300 sandbox CPU-minute allowance are no longer listed (2026-11-08).
- Free covers only $1 of usage a month. A kept 50 GB disk alone costs about $4/month.
- Sandbox concurrency limits are not published.
- No sandbox was purchased or tested; feature statements are documentation claims.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours** of RAM.
On Pro: 35,200 × $0.0144 + 70,400 × $0.0144 = $1,520.64 compute, plus $29 fee, plus storage (50 GB fixed disk per sandbox at $0.00011 per GB-hour while kept). Snapshot storage pricing and 50-way quota are not published.
## Sources
- https://buddy.works/pricing
- https://buddy.works/docs/basics/billing-and-usage/features
- https://buddy.works/docs/basics/billing-and-usage/gbmin
- https://buddy.works/docs/sandboxes
- https://buddy.works/docs/sandboxes/configuration
- https://buddy.works/docs/sandboxes/lifecycle
- https://buddy.works/docs/sandboxes/snapshots
