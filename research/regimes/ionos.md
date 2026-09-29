# IONOS Cloud
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Use IONOS SE EUR catalog, not US USD tariff mixed with EUR billing. Basic Cube M 4/8/240 EUR .024/hour; current vCPU Server .012/vCPU-h + .002/GB-h. Dedicated Core is a different entitlement; do not silently label one physical dedicated core as one vCPU.
## Currency, VAT and residency
- Native catalog: EUR. FX: 1 EUR = 1.1378 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Net of applicable taxes/duties.
- Residency/restrictions: Cloud Cubes available EU and Newark US per price page; choose specific datacenter. Account contracting entity controls currency.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| cubes | Basic Cloud Cubes | allocated wall time; 60 second increment | XS 1/2: EUR 0.007/h → USD 0.0079646; month cap None; S 2/4: EUR 0.013/h → USD 0.0147914; month cap None; M 4/8: EUR 0.024/h → USD 0.0273072; month cap None; L 8/16: EUR 0.044/h → USD 0.0500632; month cap None | https://docs.ionos.com/cloud/support/general-information/price-list/ionos-cloud-eur-en |
| vcpu-server | Compute Engine vCPU | allocated wall time; 60 second increment | EUR 0.012/vCPU-h + 0.002/GiB-h → USD 0.0136536 + 0.0022756; null means unknown | https://docs.ionos.com/cloud/support/general-information/price-list/ionos-cloud-eur-en |
| dedicated | Dedicated Core list | See rule | EUR AMD Milan .036/core-h, Turin .042; Intel Haswell/Skylake/IceLake .04, SierraForest .046; RAM .0045/GB-h. Core-to-vCPU conversion not verified. | https://docs.ionos.com/cloud/support/general-information/price-list/ionos-cloud-eur-en |
| reserved-1y | Dedicated Core savings | See rule | EUR .034/core-h + .0038/GB-h under commitment; not for all vCPU Server modes. | https://docs.ionos.com/cloud/support/general-information/price-list/ionos-cloud-eur-en |
| reserved-3y | Dedicated Core savings | See rule | EUR .024/core-h + .0027/GB-h under commitment. | https://docs.ionos.com/cloud/support/general-information/price-list/ionos-cloud-eur-en |
| usd-list | US published Basic Cube M | See rule | USD .026/hour and 18.72/30 days; separate provider price, not EUR FX. | https://docs.ionos.com/cloud/support/general-information/price-list/ionos-cloud-eur-en |
| suspend | Cubes via DCD | See rule | Suspend guide releases CPU/RAM/IP but bills storage. Overview says suspended Cubes still incur costs; no zero-total-stopped assumption. | https://docs.ionos.com/cloud/support/general-information/price-list/ionos-cloud-eur-en |
## Gotchas
- Snapshot EUR .04/GB/30 days normalized to 730 hours; disk storage differs by mode.
- Stopped Cubes may retain reserved resources; stop/delete billing needs explicit confirmation.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Net of applicable taxes/duties.
- Residency: Cloud Cubes available EU and Newark US per price page; choose specific datacenter. Account contracting entity controls currency.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- cubes: USD 0.0273072/allocated hour × 8,800 = **USD 240.30 compute** (before quotas, fees, free buckets, storage and tax).
- vcpu-server: USD 0.0728192/allocated hour × 8,800 = **USD 640.81 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: 50 × USD 0.0461441111 = **USD 2.31/730 hours**. State-size and mode caveats above apply.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://docs.ionos.com/cloud/support/general-information/price-list/ionos-cloud-eur-en
- https://cloud.ionos.com/prices
- https://docs.ionos.com/cloud/compute-services/cubes/dcd-how-tos/suspend-cube.md
- https://docs.ionos.com/cloud/compute-services/cubes/overview.md