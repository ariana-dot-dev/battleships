# Samsung SDS Cloud Platform
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Virtual Server and Cloud Functions are general compute, not a verified standalone AI sandbox API. Pricing selector loaded but no stable current 4/8 SKU quote extracted. Do not use old tutorial screenshots as live prices.
## Currency, VAT and residency
- Native catalog: KRW. FX: 1 KRW = 0.000736416297207 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Region/enterprise/finance offerings selected in calculator; exact locations and residency commitment unresolved.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| virtual-server | Virtual Server hourly | allocated wall time; None second increment | KRW None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://cloud.samsungsds.com/serviceportal/pricing.html |
| reserved-1y | Planned Compute 1 year | allocated wall time; None second increment | KRW None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://cloud.samsungsds.com/serviceportal/pricing.html |
| reserved-3y | Planned Compute 3 years | allocated wall time; None second increment | KRW None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://cloud.samsungsds.com/serviceportal/pricing.html |
## Gotchas
- Native on-demand rate and tax unknown.
- Savings require specific type, quantity, term; headline up to 55% is not an unconditional discount.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: Region/enterprise/finance offerings selected in calculator; exact locations and residency commitment unresolved.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- virtual-server: compute **unknown**; cannot produce a comparable quote.
- reserved-1y: compute **unknown**; cannot produce a comparable quote.
- reserved-3y: compute **unknown**; cannot produce a comparable quote.
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://cloud.samsungsds.com/serviceportal/pricing.html
- https://www.samsungsds.com/ap/compute-virtualserver/virtualserver.html
- https://www.samsungsds.com/en/management-planned-compute/planned-compute.html