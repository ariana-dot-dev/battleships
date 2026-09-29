# STACKIT Compute Engine
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Public Price Information Model JSON retrieved on 2026-09-28. Decode attributes.vCPU and ram rather than guessing dimensions from flavor suffix (c1.4 is 8/16, not 4/8). Single versus Metro differ. MonthlyPrice is 720-hour projection, not cap.
## Currency, VAT and residency
- Native catalog: EUR. FX: 1 EUR = 1.1378 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Official price-list preamble: net list prices plus applicable taxes and duties.
- Residency/restrictions: eu01 Germany and eu02 Austria; captured example eu01. Country control is not certification of all dependent services.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| single | Single AZ | allocated wall time; 3600 second increment | Compute Optimized Server-c1.3-EU01 4/8: EUR 0.137902475/h → USD 0.156905436055; month cap None; Compute Optimized Server-c1a.4d-EU01 4/8: EUR 0.18704166667/h → USD 0.212816008337; month cap None; Compute Optimized Server-c2a.4d-EU01 4/8: EUR 0.19996457/h → USD 0.227519687746; month cap None; Compute Optimized Server-c2i.4-EU01 4/8: EUR 0.15331746528/h → USD 0.174444611996; month cap None; Compute Optimized Server-c3i.4-EU01 4/8: EUR 0.173877151/h → USD 0.197837422408; month cap None | https://pim.api.stackit.cloud/v1/skus |
| metro | Metro HA | allocated wall time; 3600 second increment | Compute Optimized Server-c1.3-EU01-m 4/8: EUR 0.27580495/h → USD 0.31381087211; month cap None; Compute Optimized Server-c1a.4d-EU01-m 4/8: EUR 0.37408333333/h → USD 0.425632016663; month cap None; Compute Optimized Server-c2a.4d-EU01-m 4/8: EUR 0.39992914/h → USD 0.455039375492; month cap None; Compute Optimized Server-c2i.4-EU01-m 4/8: EUR 0.30663493056/h → USD 0.348889223991; month cap None; Compute Optimized Server-c3i.4-EU01-m 4/8: EUR 0.347754302/h → USD 0.395674844816; month cap None | https://pim.api.stackit.cloud/v1/skus |
| metro | High-availability VM | See rule | Separate Metro pricing, do not assume single-AZ price includes standby resources. | https://pim.api.stackit.cloud/v1/skus |
| stopped | Power off | See rule | Stopped billing not proven; full allocation exposure must be checked. | https://pim.api.stackit.cloud/v1/skus |
## Gotchas
- OS disks, IP, snapshots, stopped state and egress not flattened from full PIM dataset.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Official price-list preamble: net list prices plus applicable taxes and duties.
- Residency: eu01 Germany and eu02 Austria; captured example eu01. Country control is not certification of all dependent services.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- single: USD 0.156905436/allocated hour × 8,800 = **USD 1380.77 compute** (before quotas, fees, free buckets, storage and tax).
- metro: USD 0.313810872/allocated hour × 8,800 = **USD 2761.54 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://pim.api.stackit.cloud/v1/skus
- https://stackit.com/en/prices
- https://stackit.com/en/asset/download/37788/file/STACKIT_price_list.pdf?version=18