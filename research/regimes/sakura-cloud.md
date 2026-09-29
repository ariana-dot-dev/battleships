# Sakura Internet Cloud
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Ordinary VM. Default displayed Ishikari zone normal-plan 4-core/8GB list JPY 46/h, 462/day, 9240/month tax-inclusive. Hourly, daily and monthly bands: do not interpret month price as hourly/730. Card retains tax-inclusive quote; do not compare to net prices without adjustment.
## Currency, VAT and residency
- Native catalog: JPY. FX: 1 JPY = 0.00637422969188 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: All displayed server prices include Japanese consumption tax; source explicitly says tax-inclusive. Card retains gross; net rate not assumed.
- Residency/restrictions: Japan: Ishikari and Tokyo zones. Exact SKU/price varies by zone.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| normal-ishikari | Normal VM, displayed Ishikari zone | allocated wall time; 3600 second increment | 4C8GB 4/8: JPY 46/h → USD 0.293214565826; month cap 9240 | https://cloud.sakura.ad.jp/products/server/ |
| daily-cap | Up to JPY 462/day | See rule | The standard calculator switches to daily billing at 10 hours; hourly is rounded. | https://cloud.sakura.ad.jp/products/server/ |
| dedicated | Core-dedicated/confidential/GPU/host variants | See rule | Separate product plans not numerically normalized. | https://cloud.sakura.ad.jp/products/server/ |
## Gotchas
- Stopped-server billing and disk/snapshot tariff not verified.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: All displayed server prices include Japanese consumption tax; source explicitly says tax-inclusive. Card retains gross; net rate not assumed.
- Residency: Japan: Ishikari and Tokyo zones. Exact SKU/price varies by zone.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- normal-ishikari: USD 0.293214566/allocated hour × 8,800 = **USD 2580.29 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **USD 0.00** using captured marginal tariff and 0 GiB verified free allowance (if unspecified, none assumed for this component calculation).
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://cloud.sakura.ad.jp/products/server/
- https://cloud.sakura.ad.jp/payment/
- https://cloud.sakura.ad.jp/payment/about/