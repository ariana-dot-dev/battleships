# Tencent Cloud Studio
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
IDE machine-hours, not Agent Runtime. The IDE consumes allocated machine time even without executing code; close/edit mode and auto-stop behavior matter. Resource packs use weighted machine-hours, not one credit per wall-clock hour at every size. Newer guide supersedes older 2025 SKU descriptions.
## Currency, VAT and residency
- Native catalog: CNY. FX: 1 CNY = 0.149020326907 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Tencent account binding required; exact runtime/data region choice not verified.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| on-demand | IDE pay-as-you-go | allocated wall time; None second increment | 1C2G 1/2: CNY 0.1/h → USD 0.014902032691; month cap None; 2C4G 2/4: CNY 0.25/h → USD 0.037255081727; month cap None; 4C8G 4/8: CNY 0.5/h → USD 0.074510163453; month cap None; 8C16G 8/16: CNY 1/h → USD 0.149020326907; month cap None; 16C32G 16/32: CNY 2/h → USD 0.298040653814; month cap None; 32C64G 32/64: CNY 4/h → USD 0.596081307628; month cap None; 64C128G 64/128: CNY 7/h → USD 1.043142288349; month cap None | https://cloud.tencent.cn/document/product/1039/131894 |
| prepaid-tier | Machine-hour resource packs | See rule | CNY 1/unit below 100, .95 for 100–200, .9 for 2000–5000, .85 above 5000; 4C8G consumes .5 unit/hour. Expiry/other quantities not verified. | https://cloud.tencent.cn/document/product/1039/131894 |
| gpu | GPU IDE hourly bundles | See rule | T4 CNY 1.2/h; V100 3.6; A10 3.3; L40 8; A800 14. CPU/RAM bundle varies; do not add bare GPU hourly to CPU price. | https://cloud.tencent.cn/document/product/1039/131894 |
## Gotchas
- 50-concurrent eligibility and 8-hour idle/session policies not established.
- Pack table skips 200–1999 machine-hour range; do not interpolate. Tax and network/storage prices not stated.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: Tencent account binding required; exact runtime/data region choice not verified.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- on-demand: USD 0.0745101635/allocated hour × 8,800 = **USD 655.69 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://cloud.tencent.cn/document/product/1039/131894
- https://cloud.tencent.com/document/product/1039/131770
- https://ide.cloud.tencent.com/docs/guide/product_updates/version_comparison/
- https://cloud.tencent.com/document/api/1039/94098