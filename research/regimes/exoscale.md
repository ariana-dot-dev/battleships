# Exoscale — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| Standard | On demand; USD list compute only; local root SSD minimum 10 GB and priced separately. No monthly cap; compute meter stops powered off. | standard-large: $0.09333/h; cap None | https://www.exoscale.com/pricing/ |
| Cpu | On demand; USD list compute only; local root SSD minimum 10 GB and priced separately. No monthly cap; compute meter stops powered off. | cpu-extra_large: $0.23333/h; cap None | https://www.exoscale.com/pricing/ |
| Memory | On demand; USD list compute only; local root SSD minimum 10 GB and priced separately. No monthly cap; compute meter stops powered off. | memory-huge: $0.28/h; cap None | https://www.exoscale.com/pricing/ |
## Billing details
- **granularity_seconds**: 1
- **minimum_billed_seconds**: Unknown; not assumed zero.
- **setup_fee_usd**: 0
- **api**: True
- **cli**: True
- **ipv 6**: True
- **ingress_usd**: 0
- **cpu**: KVM shared physical infrastructure; CPU optimized is a shape ratio, not a verified dedicated-core guarantee.
- **minimum_term**: Per-second usage, no long-term commitment.
- **backup**: Snapshots and local SSD $0.00014/GB-hour = $0.1022/GB per 730h. Custom templates $0.00028/GB-hour.
- **provisioning**: Unknown; not assumed zero.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- Large 4/8 compute $0.09333/hour; 50 GB root disk adds $0.007/hour. Root SSD is not included despite table minimum-storage column.
- 1.42 GB outbound per running instance-hour pooled within organization, reset/accounted hourly; overage $0.02/GB. Static card allowance set to 0 conservatively; it overstates egress for the example, which is within aggregate allowance if distributed normally.
- Primary management IP included; extra Elastic IP $0.01389/hour (~$10.1397/730h); no global free extra IPv 4 assumption.
- Deleting an instance deletes its snapshots; export or custom-template workflow needed for durable delete/recreate. Snapshot operations may take hours; 30 snapshots/account default, not nameable; storage-optimized snapshots unsupported.
- Card represents compute+storage floor. Account transfer timing and disk retention must be modeled separately.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| Standard | $821.30 | $3,406.55 |
| Cpu | $2,053.30 | $8,516.55 |
| Memory | $2,464.00 | $10,220.00 |
Snapshot subtotal: $5.1100; rate $0.10219999999999999/GiB-month. Egress: see allowances, pooling/accrual and rate $0.02/GiB; not every mode has the same allowance.
Powered-off compute billed: False. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://www.exoscale.com/pricing/
- https://www.exoscale.com/compute/
- https://portal.exoscale.com/api/pricing/opencompute
- https://community.exoscale.com/platform/billing/
- https://community.exoscale.com/product/compute/instances/overview/
- https://community.exoscale.com/product/compute/instances/how-to/snapshot/