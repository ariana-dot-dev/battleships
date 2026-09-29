# Huawei Cloud AgentArts
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
CU-based shared wallet for Runtime, code interpreter, browser and other platform services. CPU-hour=1 CU; GiB-hour=.1 CU. Base marginal price CNY 1.1108/CU below 55,000 monthly CU. Next band to 280,000 costs 1/CU, then .9/CU. Progressive tiers are not selectable discount plans. Initial 20 CU is one-time, not monthly.
## Currency, VAT and residency
- Native catalog: CNY. FX: 1 CNY = 0.149020326907 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: China AgentArts public-beta documentation; Beijing-four legacy service differs from newer platform. Region and 4/8 configurable tool support need confirmation.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| base-cu | Base CU tariff: code interpreter/browser/runtime | allocated wall time; None second increment | CNY 1.1108/vCPU-h + 0.11108/GiB-h → USD 0.165531779128 + 0.016553177913; null means unknown | https://support.huaweicloud.com/price-agentarts/agentarts-price-pdf.pdf |
| volume-tier | 55,000–280,000 CU | See rule | CNY 1/CU marginal; not retroactive. | https://support.huaweicloud.com/price-agentarts/agentarts-price-pdf.pdf |
| volume-tier | 280,000+ CU | See rule | CNY .9/CU marginal; not retroactive. | https://support.huaweicloud.com/price-agentarts/agentarts-price-pdf.pdf |
| subscription | Team/enterprise and annual CU packs | See rule | Package prices available in resource/subscription console, not public PDF; CU overage still applies. | https://support.huaweicloud.com/price-agentarts/agentarts-price-pdf.pdf |
## Gotchas
- 4-vCPU/8-GiB tool sizing and concurrency not confirmed; worked example is conditional CU arithmetic.
- CU billed to 0.0001 precision monthly; wall-clock metering increment not specified.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: China AgentArts public-beta documentation; Beijing-four legacy service differs from newer platform. Region and 4/8 configurable tool support need confirmation.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- base-cu: USD 0.79455254/allocated hour × 8,800 = **USD 6992.06 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://support.huaweicloud.com/price-agentarts/agentarts-price-pdf.pdf
- https://support.huaweicloud.com/highcode-agentarts/agentarts_10_164.html
- https://support.huaweicloud.com/api-agentarts/CreateCoreRuntime.html
- https://support.huaweicloud.com/wtsnew-agentarts/index.html