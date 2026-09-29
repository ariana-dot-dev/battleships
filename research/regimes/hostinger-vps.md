# Hostinger VPS — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| 24-month renewal amortized monthly | 24 months paid upfront; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | KVM 4: $28.99/month rental | https://www.hostinger.com/vps-hosting |
| Introductory 24-month prepaid promotion | 24 months paid upfront; introductory discount; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | KVM 4: $12.99/month rental | https://www.hostinger.com/vps-hosting |
## Billing details
- **granularity_seconds**: Unknown; not assumed zero.
- **minimum_billed_seconds**: Unknown; not assumed zero.
- **setup_fee_usd**: Unknown; not assumed zero.
- **api**: True
- **cli**: Unknown; not assumed zero.
- **ipv 6**: True
- **ingress_usd**: Unknown; not assumed zero.
- **minimum_term**: Captured rates require 24-month upfront payment. Shorter-term checkout prices not captured.
- **cpu**: KVM guest vCPU on AMD EPYC; dedicated physical CPU thread guarantee not established.
- **backup**: Weekly backups included; snapshot retention/quantity and daily-backup add-on price not confirmed.
- **provisioning**: Unknown; not assumed zero.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- Smallest captured >=4/8 shape is KVM4: 4 vCPU/16 GB/200 GB; $12.99/month intro, $28.99/month renewal, both paid 24 months. 8 GB KVM2 has only 2 vCPU and cannot satisfy 4 vCPU.
- KVM4 upfront per machine $311.76 intro or $695.76 renewal; 50-machine cash outlay $15588 or $34788, not $649.50/$1449.50 total cash.
- 4/8/16/32 TB transfer per KVM1/2/4/8 respectively. OneIPv 4+IPv 6 included; overage price not verified, so not assumed zero.
- Snapshot zero is only within included product allowance, not proof of unlimited external 50 GB retention. Public API exists; no per-hour burst billing or cost-saving power-off.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| 24-month renewal amortized monthly | $1,449.50 | $1,449.50 |
| Introductory 24-month prepaid promotion | $649.50 | $649.50 |
Snapshot subtotal: $0.0000; rate $0/GiB-month. Egress: see allowances, pooling/accrual and rate $None/GiB; not every mode has the same allowance.
Powered-off compute billed: True. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://www.hostinger.com/vps-hosting
- https://www.hostinger.com/support/6976044-parameters-and-limits-of-hosting-plans-in-hostinger/
- https://developers.hostinger.com/
This flag does not mean Hostinger requires a sales representative.
This flag does not mean Hostinger requires a sales representative.
This flag does not mean Hostinger requires a sales representative.