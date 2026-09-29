# Zeabur
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Current pricing is management subscriptions plus separately purchased server/cluster compute. The 2C4G/4C8G labels on subscriptions are build-CI specifications, NOT included runtime machines. No reliable runtime unit tariff was extracted from current cluster toggle.
## Currency, VAT and residency
- Native catalog: USD. FX: 1 USD = 1 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Server marketplace lets users choose provider and city; selection determines runtime location. Control-plane/support residency not established.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| managed-server | Bring or buy server; compute separately billed | allocated wall time; None second increment | USD None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://zeabur.com/pricing |
| subscription | Platform management | See rule | USD 0/5/19/79 per month Free/Dev/Pro/Team; these do not buy a 4/8 runtime. | https://zeabur.com/pricing |
| sales | Enterprise | See rule | Custom contracts and usage limits; no public quote. | https://zeabur.com/pricing |
## Gotchas
- Runtime server prices vary by selected marketplace provider and location.
- 14-day Dev/Pro trial is promotional; no permanent free compute inferred.
- Team includes three seats; +USD 24/additional seat/month.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: Server marketplace lets users choose provider and city; selection determines runtime location. Control-plane/support residency not established.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- managed-server: compute **unknown**; cannot produce a comparable quote.
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://zeabur.com/pricing
- https://zeabur.com/docs/en-US/server/purchase