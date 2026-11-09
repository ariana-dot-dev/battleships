# Clever Cloud
As of 2026-09-28; prices and limits re-checked 2026-11-08. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Managed runtimes including Docker; use official v4 EUR Paris price system (PT1H) joined to v2 flavor dimensions. v2 embedded XS/S prices were zero placeholders, not free service. Smallest captured flavor meeting 4/8 is L with 6 CPU/8 GiB.
## Currency, VAT and residency
- Native catalog: EUR. FX: 1 EUR = 1.1378 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Normalized Paris (par); zone catalog includes other deployments, so EU-only residency requires pinning Paris and storage.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| docker-par | Docker application, Paris | allocated wall time; 1 second increment | Official USD list (price-system API, currency=USD, re-checked 2026-11-08): nano 1/0.5: USD 0.00725/h; XS 1/1: USD 0.019333/h; S 2/2: USD 0.038667/h; M 4/4: USD 0.091833/h; L 6/8: USD 0.183667/h; XL 8/16: USD 0.367333/h; 2XL 12/24: USD 0.58/h; 3XL 16/32: USD 0.773333/h. EUR list (currency=EUR): M 0.105556/h, L 0.211111/h. | https://api.clever-cloud.com/v4/billing/price-system?zone_id=par&currency=USD |
| autoscale | Multiple active instances/flavors | See rule | Sum each allocated runtime second; utilization causes scaling, not a fractional CPU billing discount. | https://www.clever.cloud/pricing/ |
| dedicated | Private deployment | See rule | Contact provider; no public numeric rate captured. | https://www.clever.cloud/pricing/ |
## Gotchas
- An application can have up to 40 instances (20 when set with Clever Tools); 50 concurrent sandboxes need several applications. Applications per organisation are unlimited ([scaling](https://www.clever.cloud/developers/doc/manage/scaling/), FAQ).
- Tax treatment not established from captured API.
- A Docker app runs one container on a managed VM. SSH opens as the non-root user bas. Instances are immutable: the disk is writable, but changes are lost when a deploy or scaling replaces the instance ([ssh-access](https://www.clever.cloud/developers/doc/manage/ssh-access/)).
- Docker apps cannot mount FS Buckets. For persistent volumes, Clever Cloud points to Clever Kubernetes Engine (public beta since 2026-04-27): workers on dedicated VMs, opt-in Ceph volumes, default quota 40 vCPU / 40 GB RAM per organisation, storage not billed during the beta. Not priced here ([CKE](https://www.clever.cloud/developers/doc/deploy/kubernetes/)).
- Storage and egress not normalized.
- Exact isolation mechanism not verified in cited pricing/API pages; no container/VM guarantee inferred.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: Normalized Paris (par); zone catalog includes other deployments, so EU-only residency requires pinning Paris and storage.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- docker-par: USD 0.183666667/allocated hour (L, official USD list) × 8,800 = **USD 1,616.27 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://www.clever.cloud/pricing/
- https://www.clever.cloud/developers/doc/account-billing/consumption/
- https://api.clever-cloud.com/v2/products/instances
- https://api.clever-cloud.com/v4/billing/price-system?zone_id=par&currency=EUR
- https://api.clever-cloud.com/v4/products/zones
- https://api.clever-cloud.com/v4/billing/price-system?zone_id=par&currency=USD
- https://www.clever.cloud/developers/doc/manage/ssh-access/
- https://www.clever.cloud/developers/doc/manage/scaling/
- https://www.clever.cloud/developers/doc/deploy/kubernetes/