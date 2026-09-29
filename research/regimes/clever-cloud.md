# Clever Cloud
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Managed runtimes including Docker; use official v4 EUR Paris price system (PT1H) joined to v2 flavor dimensions. v2 embedded XS/S prices were zero placeholders, not free service. Smallest captured flavor meeting 4/8 is L with 6 CPU/8 GiB.
## Currency, VAT and residency
- Native catalog: EUR. FX: 1 EUR = 1.1378 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Normalized Paris (par); zone catalog includes other deployments, so EU-only residency requires pinning Paris and storage.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| docker-par | Docker application, Paris | allocated wall time; 1 second increment | nano 1/0.5: EUR 0.0083333333313/h → USD 0.009481666664; month cap None; XS 1/1.0: EUR 0.022222222222222223/h → USD 0.025284444444; month cap None; S 2/2.0: EUR 0.044444444444444446/h → USD 0.050568888889; month cap None; M 4/4.0: EUR 0.10555555555555556/h → USD 0.120101111111; month cap None; L 6/8.0: EUR 0.2111111111111111/h → USD 0.240202222222; month cap None; XL 8/16.0: EUR 0.4222222222222222/h → USD 0.480404444444; month cap None; 2XL 12/24.0: EUR 0.6666666666666666/h → USD 0.758533333333; month cap None; 3XL 16/32.0: EUR 0.8888888888888888/h → USD 1.011377777778; month cap None | https://www.clever.cloud/pricing/ |
| autoscale | Multiple active instances/flavors | See rule | Sum each allocated runtime second; utilization causes scaling, not a fractional CPU billing discount. | https://www.clever.cloud/pricing/ |
| dedicated | Private deployment | See rule | Contact provider; no public numeric rate captured. | https://www.clever.cloud/pricing/ |
## Gotchas
- 50 concurrent replicas exceed v2 Docker maxInstances=40 per application; split apps or request limit increase.
- Tax treatment not established from captured API.
- Container image runs on managed VM; not full root/nested virtualization sandbox.
- Storage and egress not normalized.
- Exact isolation mechanism not verified in cited pricing/API pages; no container/VM guarantee inferred.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: Normalized Paris (par); zone catalog includes other deployments, so EU-only residency requires pinning Paris and storage.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- docker-par: USD 0.240202222/allocated hour × 8,800 = **USD 2113.78 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://www.clever.cloud/pricing/
- https://www.clever.cloud/developers/doc/account-billing/consumption/
- https://api.clever-cloud.com/v2/products/instances
- https://api.clever-cloud.com/v4/billing/price-system?zone_id=par&currency=EUR
- https://api.clever-cloud.com/v4/products/zones