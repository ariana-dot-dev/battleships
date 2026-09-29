# Contabo — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| Core monthly list | 1 month; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | Cloud VPS 4: $6.6/month rental | https://contabo.com/en-us/pricing/ |
| Performance monthly list | 1 month; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | Cloud VPS Plus 4: $16.25/month rental | https://contabo.com/en-us/pricing/ |
| Vds monthly list | 1 month; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | Cloud VDS S: $59/month rental | https://contabo.com/en-us/pricing/ |
## Billing details
- **granularity_seconds**: Unknown; not assumed zero.
- **minimum_billed_seconds**: Unknown; not assumed zero.
- **setup_fee_usd**: Unknown; not assumed zero.
- **api**: True
- **cli**: True
- **ipv 6**: True
- **ingress_usd**: 0
- **minimum_term**: 1 month minimum; quarterly/6/12/24-month alternatives. No pay-by-hour rental.
- **backup**: Core snapshot slots 1-3; Performance 5; retained 30 days. Auto Backup optional daily off-server 10-day retention, price varies. VDS has no managed snapshots/Auto Backup.
- **snapshot_retention_days**: 30
- **provisioning**: Typically a few minutes, provider documentation claim.
- **cpu**: Core and Performance are shared vCPU; VDS dedicated v Cores are SMT threads, two per physical core.
- **discounts**: 12/24-month catalog term discounts; headline 24-month promotion not ongoing one-month rate.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- Core Cloud VPS 4 is 4 vCPU/8 GB/100 GB SSD at native catalog $6.60/month before term discounts/location extras. Old Cloud VPS 10 product price/specs are not substituted.
- Current family traffic is unlimited subject to fair use, throttling on disruptive usage. Old 32 TB allowance documents are superseded for current catalog.
- One IPv 4 and IPv 6 subnet included. Region surcharges, paid images, Auto Backup and add-on storage are additional.
- Snapshot zero rate applies only within included slots/30-day retention on Core/Performance, not unlimited retained snapshot storage and not VDS.
- The 8 vCPU Core configurator shows no setup fee on inspected term options; other product/term setup remains null rather than generalized free.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| Core monthly list | $330.00 | $330.00 |
| Performance monthly list | $812.50 | $812.50 |
| Vds monthly list | $2,950.00 | $2,950.00 |
Snapshot subtotal: $0.0000; rate $0/GiB-month. Egress: see allowances, pooling/accrual and rate $0/GiB; not every mode has the same allowance.
Powered-off compute billed: True. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://contabo.com/en-us/pricing/
- https://docs.contabo.com/docs/servers-hosting/vps/
- https://docs.contabo.com/docs/servers-hosting/max-performance-vps/
- https://docs.contabo.com/docs/servers-hosting/vps-auto-backup/
- https://contabo.com/en-us/vps/
- https://contabo.com/en-us/configurator/cloud-vps-core-8/