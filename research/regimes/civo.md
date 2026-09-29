# Civo Compute — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| Standard Compute | On demand; No monthly cap: billing docs explicitly call monthly figures illustrative 730-hour equivalents. | Large: $0.059524/h; cap None | https://www.civo.com/pricing |
| Performance Compute | On demand; Larger RAM ratio; hourly, not usage-based CPU. | Performance-S: $0.119055/h; cap None | https://www.civo.com/pricing |
| CPU optimized | On demand;  | CPU-8: $0.190476/h; cap None | https://www.civo.com/pricing |
## Billing details
- **granularity_seconds**: 3600
- **minimum_billed_seconds**: 3600
- **setup_fee_usd**: 0
- **api**: True
- **cli**: True
- **ipv 6**: Unknown; not assumed zero.
- **ingress_usd**: 0
- **minimum_term**: Started hour, no cap confirmed.
- **backup**: Unknown; not assumed zero.
- **cpu**: Fixed compute sizes; dedicated physical-thread guarantee not established.
- **provisioning**: Provider claims under 60-second VM launches, not measured API-ready guarantee.
- **free**: $250 new account credit for first month; not a recurring free tier.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- Compute Large 4/8/100 GB $0.059524/h; do not substitute Kubernetes Large 60 GB root-disk specs.
- Hourly/monthly toggle is illustrative. Billing docs say 730h month, while displayed $40/month divided by hourly rate is ~672h; no cap inferred from inconsistent arithmetic.
- Egress and ingress explicitly free/unlimited. Powered-off instances still charged until deleted.
- Snapshot API lifecycle/current price not verified: linked snapshots page returned 404. Billing mentions snapshots but that alone does not establish usable snapshot entitlement. Custom OS images described for Civo Stack Enterprise; public-cloud custom image support left null.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| Standard Compute | $523.81 | $2,172.63 |
| Performance Compute | $1,047.68 | $4,345.51 |
| CPU optimized | $1,676.19 | $6,952.37 |
Snapshot subtotal: unknown; rate $None/GiB-month. Egress: see allowances, pooling/accrual and rate $0/GiB; not every mode has the same allowance.
Powered-off compute billed: True. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://www.civo.com/pricing
- https://www.civo.com/docs/account/billing
- https://www.civo.com/docs/compute/create-an-instance
- https://www.civo.com/compute