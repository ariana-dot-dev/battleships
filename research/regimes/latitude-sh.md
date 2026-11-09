# Latitude.sh — regimes (2026-09-28, updated 2026-11-08)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| Bare metal hourly starting rates | On demand; Hourly on-demand = 2x the monthly price / 730 h (monthly is 50% below hourly). All Metal plans are AMD; native cores doubled to a hardware-thread vCPU proxy. Gen3 Intel plans (c3/s3/m3) are no longer on the pricing page (2026-11-08). | m4.metal.small: $0.81/h; cap None | https://www.latitude.sh/pricing |
| Virtual machines | On demand; VM headline rates. VM disk backups exist but pricing was not published in read docs. Do not infer bare-metal isolation for these VMs. | vm.small: $0.19/h (page default shows $0.09/h, the monthly-amortized rate); cap None | https://www.latitude.sh/pricing |
| Bare metal monthly prepaid (measured toggle) | One month prepaid; deleting early gives no pro-ration or refund; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | m4.metal.small: $296/month rental | https://www.latitude.sh/pricing |
| VM monthly prepaid (measured toggle) | One month prepaid; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | vm.micro: $18, vm.mini: $37, vm.small: $69/month rental | https://www.latitude.sh/pricing |
| Bare metal annual prepaid (measured toggle) | One year paid upfront (65% below hourly); the billing doc gives no early-deletion rule; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | m4.metal.small: $207.17/month rental | https://www.latitude.sh/pricing |
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
- The pricing page shows monthly-amortized rates by default (m4.metal.small $0.41/h = $296/month; vm.small $0.09/h = $69/month). On-demand hourly is 2x that. Monthly is 50% below hourly; paid yearly is 65% below hourly.
- 20 TB outbound per server/month, pooled by project and country; ingress/private transfer free. Additional packages sold per 10 TB; overage $0.01/GB.
- One management IP included. Additional/elastic IPs may have separate fees and justification requirements.
- Bare-metal nested virtualization means the host can expose KVM to your VMs; no VM-mode nested support is promised.
- Snapshot/retention costs not verified. Card architecture proxy is not benchmark equivalence.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| Bare metal hourly starting rates | $7,128.00 | $29,565.00 |
| Virtual machines | $1,672.00 | $6,935.00 |
| Bare metal monthly prepaid (measured toggle) | $14,800.00 | $14,800.00 |
| VM monthly prepaid (measured toggle) | $3,450.00 | $3,450.00 |
| Bare metal annual prepaid (measured toggle) | $10,358.33 | $10,358.33 |
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
- https://www.latitude.sh/pricing/virtual-machines