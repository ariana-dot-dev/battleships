# Kamatera — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| Availability shared hourly | On demand; NY2 Linux calculator component sum CPU+RAM+50 GB disk, divided by 730. TypeB 4/8/50 rendered $88/month equivalent, $0.121/hour rounded. Hourly traffic differs from monthly bundle. | A-4c-8g-50 GB: $0.054794521/h; cap None | https://www.kamatera.com/pricing/ |
| Availability shared monthly | 1 month; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | A-4c-8g-50 GB: $40/month rental | https://www.kamatera.com/pricing/ |
| General purpose reserved thread hourly | On demand; NY2 Linux calculator component sum CPU+RAM+50 GB disk, divided by 730. TypeB 4/8/50 rendered $88/month equivalent, $0.121/hour rounded. Hourly traffic differs from monthly bundle. | B-4c-8g-50 GB: $0.12054795/h; cap None | https://www.kamatera.com/pricing/ |
| General purpose reserved thread monthly | 1 month; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | B-4c-8g-50 GB: $88/month rental | https://www.kamatera.com/pricing/ |
| Dedicated hourly | On demand; NY2 Linux calculator component sum CPU+RAM+50 GB disk, divided by 730. TypeB 4/8/50 rendered $88/month equivalent, $0.121/hour rounded. Hourly traffic differs from monthly bundle. | D-4c-8g-50 GB: $0.1890411/h; cap None | https://www.kamatera.com/pricing/ |
| Dedicated monthly | 1 month; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | D-4c-8g-50 GB: $138/month rental | https://www.kamatera.com/pricing/ |
| Type T burstable | On demand; Hourly-only CPU bursting; quote and CPU usage economics not captured. | Rate unavailable; null (not free) | https://www.kamatera.com/pricing/ |
## Billing details
- **granularity_seconds**: 3600
- **minimum_billed_seconds**: Unknown; not assumed zero.
- **setup_fee_usd**: 0
- **api**: True
- **cli**: Unknown; not assumed zero.
- **ipv 6**: Unknown; not assumed zero.
- **ingress_usd**: 0.01
- **minimum_term**: Hourly or explicit monthly; no long-term commitment needed.
- **cpu**: Type A shared availability; B dedicated/reserved CPU threads; D dedicated resources; T burstable.
- **backup**: Daily backups retained up to 14 days, add-on varies with server specification; not a uniform percentage verified.
- **provisioning**: Deploy in 60 seconds marketing claim; card verification and account setup may add time.
- **free**: 30-day trial subject to verification; trial traffic 1 TB; no universal recurring credit modeled.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- Component-derived A4/8/50 GB $40/month equivalent ($0.0547945/h), B4/8/50 GB $88/month equivalent ($0.1205479/h). A interactive capture did not match selected shape and was discarded; B capture validated formula.
- Hourly post-trial traffic costs $0.01/GB both directions. Monthly plans include 5 TB in most locations, 1 TB in Hong Kong/Sydney/Tokyo/Singapore. A single card network block cannot encode both; monthly estimate is conservative.
- 50 Mbps unmetered option has an inbound/outbound ratio restriction, not unrestricted symmetric free bandwidth.
- Powered-off hourly calculator formula retains $5/month/IP plus $0.05/GB/month storage; for oneIP/50 GB $7.50/730h. This is not full VM billing. Primary IP while running included in selected total; no additional recurring IPv 4 line added by card.
- Setup/minimum billing increment beyond advertised hourly basis not independently contractual-verified. Snapshot standalone price unknown.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| Availability shared hourly | $482.19 | $2,000.00 |
| Availability shared monthly | $2,000.00 | $2,000.00 |
| General purpose reserved thread hourly | $1,060.82 | $4,400.00 |
| General purpose reserved thread monthly | $4,400.00 | $4,400.00 |
| Dedicated hourly | $1,663.56 | $6,900.00 |
| Dedicated monthly | $6,900.00 | $6,900.00 |
| Type T burstable | Unknown / unavailable | Unknown / unavailable |
Snapshot subtotal: unknown; rate $None/GiB-month. Egress: see allowances, pooling/accrual and rate $0.01/GiB; not every mode has the same allowance.
Powered-off compute billed: False. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://www.kamatera.com/pricing/
- https://www.kamatera.com/faq/answer/what-are-the-traffic-data-transfer-rates-for-hourly-billed-servers/
- https://www.kamatera.com/faq/answer/what-are-the-limits-on-internet-data-on-monthly-server-plans/
- https://www.kamatera.com/faq/answer/will-i-be-charged-for-my-hourly-server-even-when-its-powered-off/
- https://www.kamatera.com/faq/answer/what-backup-services-are-available-for-my-cloud-server/