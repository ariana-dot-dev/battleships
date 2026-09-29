# netcup VPS — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| G12.5 VPS 1-month term (net EUR converted) | 1 months; paid term, not a cap; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | VPS 1000 G12.5: $15.371678/month rental | https://www.netcup.com/en/server/vps |
| G12.5 VPS 12-month term (net EUR converted) | 12 months; paid term, not a cap; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | VPS 1000 G12.5: $13.289504/month rental | https://www.netcup.com/en/server/vps |
| G12.5 VPS 24-month term (net EUR converted) | 24 months; paid term, not a cap; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | VPS 1000 G12.5: $11.20733/month rental | https://www.netcup.com/en/server/vps |
| G12 hourly marketing offer (order verification needed) | On demand; Category page advertises VPS1000 G12 EUR0.017/hour incl 19%VAT; current linked G12.5 configurator has explicit 1/12/24-month terms. Do not infer a current hourly purchasable tariff from old headline. | Rate unavailable; null (not free) | https://www.netcup.com/en/server/vps |
## Billing details
- **granularity_seconds**: Unknown; not assumed zero.
- **minimum_billed_seconds**: Unknown; not assumed zero.
- **setup_fee_usd**: 0
- **api**: True
- **cli**: Unknown; not assumed zero.
- **ipv 6**: True
- **ingress_usd**: 0
- **minimum_term**: Current selected G12.5 configurator 1/12/24 months. Older G12 advertised hourly/no minimum; availability unresolved.
- **cpu**: VPS shared v Cores; Root Server RS dedicated virtual cores, not a physical bare-metal server.
- **backup**: COW snapshots included; external backups/export capacity and price not verified.
- **provisioning**: Minutes marketing claim; API create-to-SSH latency not measured.
- **discounts**: 1/12/24-month net EUR price variants; regions and IPv 4 configuration add cost.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- Current G12.5 VPS1000: 4v Core/8 GB/128 GB SSD; base EUR13.51 net/month at 1-month term, EUR11.68 at 12-month, EUR9.85 at 24-month. IPv 4+IPv 6 adds EUR0.60 gross (19% VAT), converted to EUR0.50420168 net separately.
- Do not mix G12 256 GB NVMe specs/headline with current G12.5 128 GB SSD order SKU. Category page and configurator refer to different generations.
- Traffic flat rate; current selected product throttles to 200 Mbps when last 24h traffic exceeds 2 TB, restores speed when below threshold. No per-GB overage inferred.
- Additional locations add fees; card base is automatic EU placement. Fixed region selection price may be higher.
- Root Server RS1000 G12.5 base net EUR20.50/17.76/15.02 for 1/12/24 months; recorded adjacent option, not confused with dedicated bare metal.
- ARM64 products exist separately but are not interchangeable x 86 configurations; card modes above are x 86 only. Snapshot included does not establish unlimited durable snapshots.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| G12.5 VPS 1-month term (net EUR converted) | $768.58 | $768.58 |
| G12.5 VPS 12-month term (net EUR converted) | $664.48 | $664.48 |
| G12.5 VPS 24-month term (net EUR converted) | $560.37 | $560.37 |
| G12 hourly marketing offer (order verification needed) | Unknown / unavailable | Unknown / unavailable |
Snapshot subtotal: $0.0000; rate $0/GiB-month. Egress: see allowances, pooling/accrual and rate $0/GiB; not every mode has the same allowance.
Powered-off compute billed: True. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://www.netcup.com/en/server/vps
- https://www.netcup.com/en/server/vps/vps-1000-g12.5-iv-24m-eu
- https://www.netcup.com/en/server/root-server/rs-1000-g12.5-iv-24m-eu
- https://www.netcup.com/en/server/arm-server
- https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml