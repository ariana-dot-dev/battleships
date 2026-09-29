# E2E Networks
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
India-based cloud, distinct from E2B. Current public page rendered USD. INR was not offered by attempted toggle, so INR shown only as FX back-conversion, not native invoice/list price. 2026 price-update docs require portal final quote; monthly price is not assumed to be an hourly cap.
## Currency, VAT and residency
- Native catalog: USD. FX: 1 USD = 1 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Indian sovereign-cloud positioning; exact C3 facility selectable region not confirmed.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| c3 | C3 compute-intensive | allocated wall time; None second increment | C3.8GB 4/8: USD 0.049/h → USD 0.049; month cap None | https://www.e2enetworks.com/pricing |
| sdc3 | Dedicated CPU | allocated wall time; None second increment | SDC3-4.30GB 4/30: USD 0.099/h → USD 0.099; month cap None | https://www.e2enetworks.com/pricing |
| monthly | C3.8GB | See rule | USD 35.64/month listed; cap versus reserved-bundle mechanics unverified, not auto-selected. | https://www.e2enetworks.com/pricing |
| gpu | GPU cloud | See rule | GPU bundles, on-demand and longer commitments published separately; not CPU sandbox pricing. | https://www.e2enetworks.com/pricing |
## Gotchas
- Authoritative INR rate and GST treatment not confirmed.
- Website USD hourly is rounded; monthly C3.8GB USD 35.64 versus .049*730=35.77.
- July/August 2026 update exists; quote portal before purchase.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: Indian sovereign-cloud positioning; exact C3 facility selectable region not confirmed.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- c3: USD 0.049/allocated hour × 8,800 = **USD 431.20 compute** (before quotas, fees, free buckets, storage and tax).
- sdc3: USD 0.099/allocated hour × 8,800 = **USD 871.20 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://www.e2enetworks.com/pricing
- https://docs.e2enetworks.com/docs/myaccount/billing/pricing-update-july-2026/
- https://docs.e2enetworks.com/docs/myaccount/node/e1-series/
- https://www.e2enetworks.com/policy-faq