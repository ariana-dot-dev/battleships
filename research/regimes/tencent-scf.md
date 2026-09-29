# Tencent Cloud SCF
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Functions are request-duration compute, not eight-hour interactive VMs. Resource fee is GB-seconds with CPU tied to memory; no verified 4-vCPU/8-GiB mapping, so normalized executable card remains unpriced.
## Currency, VAT and residency
- Native catalog: CNY. FX: 1 CNY = 0.149020326907 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Regional service; domestic catalog lists mainland/Hong Kong, Singapore, Tokyo, Frankfurt and US regions. Egress varies by region.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| event-function | Event function | allocated wall time; None second increment | CNY None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://cloud.tencent.com/document/product/583/17299 |
| web-function | Web function | allocated wall time; None second increment | CNY None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://cloud.tencent.com/document/product/583/17299 |
| active-only | Function invocation | See rule | CNY .00011108/GB-s and .0133/10,000 invocations. CPU bundled, not free. | https://cloud.tencent.com/document/product/583/17299 |
| idle-standby | Provisioned concurrency | See rule | CNY .00005471/GB-s CPU idle allocation, .000045 for GPU idle; invocation resources billed separately. | https://cloud.tencent.com/document/product/583/17299 |
| temporary-storage | Extra temporary storage | See rule | CNY .00000025/GB-s; free capacity/region applicability needs confirmation. | https://cloud.tencent.com/document/product/583/17299 |
## Gotchas
- Memory-to-CPU mapping and session compatibility prevent comparable 4/8 estimate.
- Reviewed limits page lists max 3072 MB and 900 seconds; versions/generations may differ. Requested 4/8 continuous 8-hour workload is not validated.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: Regional service; domestic catalog lists mainland/Hong Kong, Singapore, Tokyo, Frankfurt and US regions. Egress varies by region.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- event-function: compute **unknown**; cannot produce a comparable quote.
- web-function: compute **unknown**; cannot produce a comparable quote.
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **USD 11.92** using captured marginal tariff and 0 GiB verified free allowance (if unspecified, none assumed for this component calculation).
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://cloud.tencent.com/document/product/583/17299
- https://cloud.tencent.cn/document/product/583/12281
- https://cloud.tencent.com/document/product/583/11637