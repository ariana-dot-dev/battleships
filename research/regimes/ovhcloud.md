# OVHcloud Public Cloud — regimes (2026-11-08)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| B3 general purpose hourly | On demand; US list; no monthly cap. Local NVMe disk sold separately since 2026-10-01 ($0.0001721/GB-hour); public IPv4 extra. | b3-16: $0.1208/h compute + 100 GB disk = $0.13801/h; cap None | https://us.ovhcloud.com/public-cloud/prices/ |
| C3 compute optimized hourly | On demand; US list; allocated dedicated resources. No automatic monthly cap. | c3-8: $0.1078/h compute + 100 GB disk = $0.12501/h; cap None | https://us.ovhcloud.com/public-cloud/prices/ |
| D2 Discovery hourly | On demand; shared vCPU; disk included. | d2-8: $0.0461/h | https://us.ovhcloud.com/public-cloud/prices/ |
| D2 Discovery monthly | Monthly billing; each started month billed in full. | d2-8: $25.53/month; d2-4 $14.18; d2-2 $7.08 | https://us.ovhcloud.com/public-cloud/prices/ |
| Gen 2 monthly subscription | Full calendar-month billing, not an hourly cap.; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | b2-15: $59.54/month rental | https://us.ovhcloud.com/public-cloud/prices/ |
| Gen 3 12-month Savings Plan | 12 months compute commitment; 15% off compute only (from 2026-09-01). Disk and IPv4 not discounted. | c3-8: $0.09163/h compute + disk = $0.10884/h; cap None | https://us.ovhcloud.com/public-cloud/prices/ |
| Gen 3 36-month Savings Plan | 36 months compute commitment; 30% off compute only (from 2026-09-01). Disk and IPv4 not discounted. | c3-8: $0.07546/h compute + disk = $0.09267/h; cap None | https://us.ovhcloud.com/public-cloud/prices/ |
## Billing details
- **granularity_seconds**: 1 (hourly instances, 1-minute minimum); 3600 for monthly billing
- **minimum_billed_seconds**: 60 (hourly instances); one full month for monthly billing
- **setup_fee_usd**: 0
- **api**: True
- **cli**: True
- **ipv4**: $0.00319/hour (about $2.33/month); instances do not include an IPv4 address by default.
- **ingress_usd**: 0
- **cpu**: B3/C3/R3 dedicated resources; Discovery (D2) shared.
- **backup**: Instance backups $0.000017/GB-hour (about $0.0123/GB-month), on space used. Schedules: Rotation 7, Rotation 14 or a custom UNIX cron schedule; optional remote copy to another region.
- **minimum_term**: Hourly, or monthly billing for Discovery and Gen 2. Gen 3 month prices on the page are 12-month Savings Plan quotes.
- **provisioning**: Unknown; not assumed zero.
- **discounts**: 12mo -15%, 36mo -30% compute; existing legacy commitment rates persist to renewal.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- Since 2026-10-01 local NVMe disk is sold separately for B3/C3/R3; card size prices include it. Public IPv4 is extra on every instance.
- Traffic unlimited on selected US/EU instances at fixed port speed; APAC and Local Zones differ. Do not apply zero egress globally.
- Stopped/paused compute still bills. Shelving hourly instances releases compute but retains a billed disk snapshot; monthly subscriptions are not suspended.
- Quota raise: self-serve purchase of cloud credit billed at once (tiers 20/50/100/200 VMs, up to 512 vCPU), or automatic after 60% use for 30 days; support for more.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Subtotals below include the size's local disk and exclude IPv4 and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| C3 compute optimized hourly | $1,100.09 | $4,562.87 |
| D2 Discovery hourly | $405.68 | $1,682.65 |
| D2 Discovery monthly | $1,276.50 | $1,276.50 |
| Gen 3 12-month Savings Plan (c3-8) | n/a (commitment) | $3,972.66 |
| Gen 3 36-month Savings Plan (c3-8) | n/a (commitment) | $3,382.46 |
Snapshot subtotal: 50 GiB-month × $0.0123 = $0.62. Egress: $0/GiB on included-traffic regions.
Powered-off compute billed: True. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://us.ovhcloud.com/public-cloud/prices/
- https://blog.ovhcloud.com/en/posts/public-cloud-pricing-update-october-2026/
- https://support.us.ovhcloud.com/hc/en-us/articles/22179651508115-Public-Cloud-billing
- https://docs.ovhcloud.com/en/guides/public-cloud/cross-functional/faq-pci
- https://docs.ovhcloud.com/en/guides/public-cloud/compute/save-an-instance.md
- https://docs.ovhcloud.com/en/guides/public-cloud/cross-functional/increasing-public-cloud-quota.md
- https://www.ovhcloud.com/en/public-cloud/prices/
