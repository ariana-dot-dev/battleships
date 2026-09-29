# Up Cloud — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| Starter | On demand; USD Global Price /672 for hourly rate; cap at listed monthly price. Compute charged while powered off; primary IPv 4 and root disk included. | starter-4c-8g: $0.035714286/h; cap 24.0 | https://upcloud.com/pricing/ |
| Premium | On demand; USD Global Price /672 for hourly rate; cap at listed monthly price. Compute charged while powered off; primary IPv 4 and root disk included. | premium-4c-8g: $0.080357143/h; cap 54.0 | https://upcloud.com/pricing/ |
| Cloud-Native | On demand; USD Global Price /672 for hourly rate; cap at listed monthly price. Only compute stops billing on power off; storage/IP extra. | cloud-native-4c-8g: $0.055059524/h; cap 37.0 | https://upcloud.com/pricing/ |
## Billing details
- **granularity_seconds**: 3600
- **minimum_billed_seconds**: 3600
- **setup_fee_usd**: 0
- **api**: True
- **cli**: True
- **ipv 6**: True
- **ingress_usd**: 0
- **cpu**: Starter previous-gen AMD; Premium MaxIOPS; shared vs dedicated hardware thread guarantees not inferred.
- **backup**: Simple Backup day/week/month/year +10/20/40/60% of bundled plan; Cloud Native/additional disks charged per GB. On-demand backup $0.06/GB-month.
- **minimum_term**: One started hour, 672h monthly cap.
- **provisioning**: 45-second deployment marketing claim, not measured API timing.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- Starter 4/8/40 GB $24/month; Premium 4/8/100 GB $54/month; Cloud Native 4/8 compute $37/month plus storage and IPv 4.
- Provider-global card IPv 4=0 applies to bundled Starter/Premium only; Cloud Native or extra IPv 4 $3.85/month.
- MaxIOPS additional storage $0.250/GB-month versus Standard $0.097; card uses Standard, so Premium expanded storage needs manual adjustment.
- Zero transfer fees subject to Fair Transfer Policy, not unlimited guaranteed bandwidth. Cloud Native power-off differs from bundled plans.
- New Starter 1 GB/1CPU plan limited to 5 simultaneous deployments. 7-day trial resources may be deleted without deposit.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| Starter | $314.29 | $1,200.00 |
| Premium | $707.14 | $2,700.00 |
| Cloud-Native | $484.52 | $1,850.00 |
Snapshot subtotal: $3.0000; rate $0.06/GiB-month. Egress: see allowances, pooling/accrual and rate $0/GiB; not every mode has the same allowance.
Powered-off compute billed: None. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://upcloud.com/pricing/
- https://upcloud.com/docs/products/cloud-servers/configurations/
- https://upcloud.com/docs/products/block-storage/backups/
- https://upcloud.com/docs/products/networking/network-transfer/
- https://upcloud.com/fair-transfer-policy/