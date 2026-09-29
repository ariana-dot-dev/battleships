# Gcore Cloud / Functions / GPU
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Global VM, GPU and FaaS alternatives. A 2023 first-party Functions launch post gives EUR prices per 1 and per million but does not define a reliable CPU/memory-duration unit; do not reinterpret as vCPU-seconds. Current 4/8 VM price not recovered from dynamic catalog.
## Currency, VAT and residency
- Native catalog: EUR. FX: 1 EUR = 1.1378 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Global footprint; EU company or edge POP is not proof that a chosen runtime/snapshot stays in EU.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| vm | Virtual machine | allocated wall time; None second increment | EUR None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://gcore.com/cloud/virtual-machines |
| functions | Functions | allocated wall time; None second increment | EUR None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://gcore.com/cloud/virtual-machines |
| gpu | GPU instance | allocated wall time; None second increment | EUR None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://gcore.com/cloud/virtual-machines |
| historical-faas | 2023 launch list | See rule | Luxembourg EUR 3.45/million units, Singapore 4.02, Tokyo 3.05, Frankfurt 3.51; precise resource unit absent. Not estimator inputs. | https://gcore.com/cloud/virtual-machines |
## Gotchas
- Current VM/Functions/GPU rate, region inventory and billing units require console/API quote.
- 2023 FaaS price is historical, not current confirmed pricing.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: Global footprint; EU company or edge POP is not proof that a chosen runtime/snapshot stays in EU.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- vm: compute **unknown**; cannot produce a comparable quote.
- functions: compute **unknown**; cannot produce a comparable quote.
- gpu: compute **unknown**; cannot produce a comparable quote.
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://gcore.com/cloud/virtual-machines
- https://gcore.com/blog/functions-launch