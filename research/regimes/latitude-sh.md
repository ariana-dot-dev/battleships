# Latitude.sh — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| Bare metal hourly starting rates | On demand; Verified Hourly toggle USD starting rates (raw/latitude-billing-toggle-audit.txt); native cores doubled to hardware-thread vCPU proxy for SMT x 86 CPUs. Region and billing-toggle verification required; no cap inferred. | c 3.small.x 86: $0.52/h; cap None | https://www.latitude.sh/pricing |
| Virtual machines | On demand; VM headline rates. VM disk backups exist but pricing was not published in read docs. Do not infer bare-metal isolation for these VMs. | vm.small: $0.19/h; cap None | https://www.latitude.sh/pricing |
| Bare metal monthly prepaid (measured toggle) | One month prepaid; no refund on early deletion; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | c 3.small.x 86: $190/month rental | https://www.latitude.sh/pricing |
| VM monthly prepaid (measured toggle) | One month prepaid; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | vm.small: $69/month rental | https://www.latitude.sh/pricing |
| Bare metal annual prepaid (measured toggle) | One year paid upfront; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | c 3.small.x 86: $133/month rental | https://www.latitude.sh/pricing |
## Billing details
- **granularity_seconds**: 3600
- **minimum_billed_seconds**: Unknown; not assumed zero.
- **setup_fee_usd**: Unknown; not assumed zero.
- **api**: True
- **cli**: True
- **ipv 6**: True
- **ingress_usd**: 0
- **cpu**: Dedicated physical hosts; listed cores are physical, estimator vCPU proxy = two SMT threads/core. VM mode is separate shared-host product.
- **minimum_term**: Hourly on demand; optional nonrefundable full-month or annual prepaid commitment.
- **backup**: VM disk backup/restore into new VM; bare-metal snapshots not a managed service.
- **provisioning**: Some images instant deployment as little as 5 seconds; other Linux images usually 10min; Windows 15-20min. Marketing estimate, not API SLA.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- Explicitly clicked Hourly/Monthly/Paid yearly: c 3.small is $0.52/h on demand, $190/month committed, $1596/year prepaid; default page $0.26/h is MONTHLY amortized, not on-demand. Toggle capture resolves stale FAQ discount conflict; measured commitment modes are priceable.
- 20 TB outbound per server/month, pooled by project and country; ingress/private transfer free. Additional packages sold per 10 TB; overage $0.01/GB.
- One management IP included. Additional/elastic IPs may have separate fees and justification requirements.
- Bare-metal nested virtualization means the host can expose KVM to your VMs; no VM-mode nested support is promised.
- Snapshot/retention costs not verified. Card architecture proxy is not benchmark equivalence.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| Bare metal hourly starting rates | $4,576.00 | $18,980.00 |
| Virtual machines | $1,672.00 | $6,935.00 |
| Bare metal monthly prepaid (measured toggle) | $9,500.00 | $9,500.00 |
| VM monthly prepaid (measured toggle) | $3,450.00 | $3,450.00 |
| Bare metal annual prepaid (measured toggle) | $6,650.00 | $6,650.00 |
Snapshot subtotal: unknown; rate $None/GiB-month. Egress: see allowances, pooling/accrual and rate $0.01/GiB; not every mode has the same allowance.
Powered-off compute billed: True. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://www.latitude.sh/pricing
- https://www.latitude.sh/docs/billing/on-demand-vs-reserved
- https://www.latitude.sh/docs/servers/deploying-a-server
- https://www.latitude.sh/docs/vms/backups-and-restore
- https://www.latitude.sh/pricing/network
- https://www.latitude.sh/docs/networking/ips