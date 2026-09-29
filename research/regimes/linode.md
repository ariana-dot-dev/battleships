# Akamai Cloud / Linode — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| Shared CPU | On demand; Hourly rounded up; monthly cap per instance, including powered-off time. Default API USD region; regional uplifts apply. | g 6-standard-4: $0.072/h; cap 48.0 | https://www.akamai.com/cloud/pricing |
| Dedicated CPU | On demand; Hourly rounded up; monthly cap per instance, including powered-off time. Default API USD region; regional uplifts apply. | g 6-dedicated-4: $0.108/h; cap 72.0 | https://www.akamai.com/cloud/pricing |
| Premium CPU | On demand; Hourly rounded up; monthly cap per instance, including powered-off time. Default API USD region; regional uplifts apply. | g 7-premium-4: $0.129/h; cap 86.0 | https://www.akamai.com/cloud/pricing |
| High-Memory CPU | On demand; Hourly rounded up; monthly cap per instance, including powered-off time. Default API USD region; regional uplifts apply. | g 7-highmem-4: $0.36/h; cap 240.0 | https://www.akamai.com/cloud/pricing |
## Billing details
- **granularity_seconds**: 3600
- **minimum_billed_seconds**: 3600
- **setup_fee_usd**: 0
- **api**: True
- **cli**: True
- **ipv 6**: True
- **ingress_usd**: 0
- **cpu**: Shared versus dedicated/premium/high-memory classes in API.
- **backup**: 8 GB shared/dedicated backup add-on $10/month or $0.015/hour (not flat percentage); per-shape addons.backups captured in API.
- **minimum_term**: Hourly; powered-off instance billed until deleted.
- **provisioning**: Unknown; not assumed zero.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- Shared 4/8 is $0.072/h, cap $48; dedicated 4/8 $0.108/h, cap $72; premium $0.129/h, cap $86. API prices vary by region.
- Transfer is pooled and prorated, not a universal fixed account allowance. Card uses one 8 GB plan allowance. Check current regional network-transfer price API; the default egress rate is not globally universal.
- Images are not RAM snapshots; snapshot_gib_month models paid image storage, not the backup plan. Disk/backup/image limits and regional quotas constrain cloning.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| Shared CPU | $633.60 | $2,400.00 |
| Dedicated CPU | $950.40 | $3,600.00 |
| Premium CPU | $1,135.20 | $4,300.00 |
| High-Memory CPU | $3,168.00 | $12,000.00 |
Snapshot subtotal: $5.0000; rate $0.1/GiB-month. Egress: see allowances, pooling/accrual and rate $0.005/GiB; not every mode has the same allowance.
Powered-off compute billed: True. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://www.akamai.com/cloud/pricing
- https://api.linode.com/v4/linode/types
- https://techdocs.akamai.com/cloud-computing/docs/understanding-how-billing-works
- https://techdocs.akamai.com/cloud-computing/docs/network-transfer-usage-and-costs
- https://techdocs.akamai.com/cloud-computing/docs/images
- https://techdocs.akamai.com/cloud-computing/docs/backups-faq
- https://techdocs.akamai.com/cloud-computing/docs/compute-instance-plan-types