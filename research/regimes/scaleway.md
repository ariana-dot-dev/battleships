# Scaleway Instances — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| shared-development | On demand; PAR-1 EUR API price × 1.1378 USD/EUR (ECB 2026-09-28); no monthly cap. Storage and IPv 4 excluded. Arm mode requires ARM-compatible software; opt-in avoids x 86 engine selection bug. | DEV1-L: $0.048743352/h; cap None | https://www.scaleway.com/en/pricing/virtual-instances/ |
| general-purpose | On demand; PAR-1 EUR API price × 1.1378 USD/EUR (ECB 2026-09-28); no monthly cap. Storage and IPv 4 excluded. Arm mode requires ARM-compatible software; opt-in avoids x 86 engine selection bug. | BASIC3-X4C-8G: $0.089887338/h; cap None | https://www.scaleway.com/en/pricing/virtual-instances/ |
| dedicated-compute | On demand; PAR-1 EUR API price × 1.1378 USD/EUR (ECB 2026-09-28); no monthly cap. Storage and IPv 4 excluded. Arm mode requires ARM-compatible software; opt-in avoids x 86 engine selection bug. | POP2-HC-4C-8G: $0.12106192/h; cap None | https://www.scaleway.com/en/pricing/virtual-instances/ |
| arm | On demand; PAR-1 EUR API price × 1.1378 USD/EUR (ECB 2026-09-28); no monthly cap. Storage and IPv 4 excluded. Arm mode requires ARM-compatible software; opt-in avoids x 86 engine selection bug. | BASIC2-A4C-8G: $0.05882426/h; cap None | https://www.scaleway.com/en/pricing/virtual-instances/ |
## Billing details
- **granularity_seconds**: 3600
- **minimum_billed_seconds**: Unknown; not assumed zero.
- **setup_fee_usd**: 0
- **api**: True
- **cli**: True
- **ipv 6**: True
- **ingress_usd**: 0
- **cpu**: Development shared; dedicated physical cores in compute/memory optimized families; general-purpose family varies.
- **backup**: Snapshot EUR 0.000049/GB-hour; 5k IOPS block storage reference EUR 0.000130/GB-hour.
- **minimum_term**: No commitment on demand; hourly. Savings plans optional.
- **discounts**: Up to 25% Savings Plans; contract-specific rates not normalized.
- **provisioning**: Pricing page says provision in seconds; no API-ready SLA.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- IPv 6 and egress included, IPv 4 EUR 0.005/hour separately billed. Power-off stops compute but not disks/IP.
- Apple Silicon provider already exists and is not duplicated. API monthly_price is an estimate, not an automatic cap.
- Storage profile selection changes price; card block-storage rate is a reference profile, not local SSD or every IOPS tier.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| shared-development | $428.94 | $1,779.13 |
| general-purpose | $791.01 | $3,280.89 |
| dedicated-compute | $1,065.34 | $4,418.76 |
| arm | $517.65 | $2,147.09 |
Snapshot subtotal: $2.0350; rate $0.04069910599999999/GiB-month. Egress: see allowances, pooling/accrual and rate $0/GiB; not every mode has the same allowance.
Powered-off compute billed: False. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://www.scaleway.com/en/pricing/virtual-instances/
- https://api.scaleway.com/instance/v1/zones/fr-par-1/products/servers
- https://www.scaleway.com/en/pricing/storage/
- https://www.scaleway.com/en/pricing/network/
- https://www.scaleway.com/en/docs/instances/reference-content/understanding-instance-pricing/
- https://www.scaleway.com/en/docs/instances/reference-content/choosing-shared-vs-dedicated-cpus/
- https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml