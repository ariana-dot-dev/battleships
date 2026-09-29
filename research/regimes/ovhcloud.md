# OVHcloud Public Cloud — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| B3 general purpose hourly | On demand; US list; no monthly cap. Storage and public IPv 4 currently bundled, scheduled to unbundle 2026-10-01. | b 3-16: $0.1208/h; cap None | https://us.ovhcloud.com/public-cloud/prices/ |
| C3 compute optimized hourly | On demand; US list; allocated dedicated resources. No automatic monthly cap. | c 3-8: $0.1078/h; cap None | https://us.ovhcloud.com/public-cloud/prices/ |
| Gen 2 monthly subscription | Full calendar-month billing, not an hourly cap.; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | b 2-15: $59.54/month rental | https://us.ovhcloud.com/public-cloud/prices/ |
| Gen 3 12-month Savings Plan | 12 months compute commitment; 15% off compute only.; Effective new plan terms 2026-09-01. Storage/IPv 4 not discounted after October. Must cover full commitment hours, not just active use. | c 3-8: $0.09163/h; cap None | https://us.ovhcloud.com/public-cloud/prices/ |
| Gen 3 36-month Savings Plan | 36 months compute commitment; 30% off compute only.; Effective new plan terms 2026-09-01. Storage/IPv 4 not discounted after October. Must cover full commitment hours, not just active use. | c 3-8: $0.07546/h; cap None | https://us.ovhcloud.com/public-cloud/prices/ |
## Billing details
- **granularity_seconds**: 3600
- **minimum_billed_seconds**: 3600
- **setup_fee_usd**: 0
- **api**: True
- **cli**: True
- **ipv 6**: Unknown; not assumed zero.
- **ingress_usd**: 0
- **cpu**: B3/C3 dedicated resources; Discovery shared is separate and not priced here.
- **backup**: Instance backups billed by retained storage; exact regional USD rate unresolved.
- **minimum_term**: Hourly or explicit monthly subscription. Gen 3 displayed month is 730-hour estimate, sometimes a 12-month commitment quote.
- **provisioning**: Unknown; not assumed zero.
- **discounts**: 12mo -15%, 36mo -30% compute; existing legacy commitment rates persist to renewal.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- As of 2026-09-28. On October 1 local storage EUR 0.0001458/GB-hour plus public IPv 4 EUR 0.0027/hour become extra for B3/C3/R3. Future prices not silently substituted for current bundles.
- US pricing page also says optional IPv 4 by default; intro/unbundling wording conflicts. Verify checkout; network.ipv 4_month=0 reflects pre-October bundled documentation only.
- Traffic unlimited on selected US/EU instances at fixed port speed; APAC and Local Zones differ. Do not apply zero egress globally.
- Stopped/paused compute still bills. Shelving hourly instances releases compute but retains a billed disk snapshot; monthly subscriptions are not suspended.
- 50x C3-8 active compute $948.64; retaining all month $3934.70 before future disk/IP charges. Snapshot total unknown.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| B3 general purpose hourly | $1,063.04 | $4,409.20 |
| C3 compute optimized hourly | $948.64 | $3,934.70 |
| Gen 2 monthly subscription | $2,977.00 | $2,977.00 |
| Gen 3 12-month Savings Plan | $806.34 | $3,344.49 |
| Gen 3 36-month Savings Plan | $664.05 | $2,754.29 |
Snapshot subtotal: unknown; rate $None/GiB-month. Egress: see allowances, pooling/accrual and rate $0/GiB; not every mode has the same allowance.
Powered-off compute billed: True. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://us.ovhcloud.com/public-cloud/prices/
- https://blog.ovhcloud.com/en/posts/public-cloud-pricing-update-october-2026/
- https://support.us.ovhcloud.com/hc/en-us/articles/22179651508115-Public-Cloud-billing
- https://docs.ovhcloud.com/en/guides/public-cloud/cross-functional/faq-pci
- https://www.ovhcloud.com/en/public-cloud/prices/