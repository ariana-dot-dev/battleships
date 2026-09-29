# Open Telekom Cloud / T Cloud Public
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Now branded T Cloud Public. Official service description revised 2026-08-17 has ECS s9.xlarge.2 4/8 open Linux EUR .188821/hour in both DE/NL. Reserved prices are contract payments, not always-on hourly caps.
## Currency, VAT and residency
- Native catalog: EUR. FX: 1 EUR = 1.1378 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Prices exclude applicable taxes and duties (service-description section 6).
- Residency/restrictions: EU-DE Germany and EU-NL Netherlands explicitly in service description.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| on-demand | ECS s9 Linux on demand | allocated wall time; None second increment | s9.xlarge.2 4/8: EUR 0.188821/h → USD 0.2148405338; month cap None | https://www.open-telekom-cloud.com/en/prices |
| reserved-1y | s9.xlarge.2 12 months | See rule | EUR 90.97/month recurring OR EUR 1059 upfront/year. | https://www.open-telekom-cloud.com/en/prices |
| reserved-2y | s9.xlarge.2 24 months | See rule | EUR 77.19/month OR EUR 1786 total upfront. | https://www.open-telekom-cloud.com/en/prices |
| reserved-3y | s9.xlarge.2 36 months | See rule | EUR 62.03/month OR EUR 2084 total upfront. | https://www.open-telekom-cloud.com/en/prices |
## Gotchas
- Stopped ECS, disk/snapshot and egress details not normalized.
- Credits expire two months after contract and redemption deadline is 2026-12-31.
- Annual upfront versus monthly commitment cannot be modeled with zero-runtime months by simple hourly rates.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Prices exclude applicable taxes and duties (service-description section 6).
- Residency: EU-DE Germany and EU-NL Netherlands explicitly in service description.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- on-demand: USD 0.214840534/allocated hour × 8,800 = **USD 1890.60 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://www.open-telekom-cloud.com/en/prices
- https://www.t-cloud-public.com/_Resources/Persistent/6/3/8/d/638d781300085c7feadded0654e709a49c6e9e2a/t-cloud-public-servicedescription.pdf