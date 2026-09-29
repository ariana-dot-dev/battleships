# Tencent Cloud Agent Runtime — Agent Sandbox
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Allocated CPU and memory billed while running. Pricing page says paused disk remains billable, but a later explicit note waives paused-system-disk charges during the current beta. Treat the waiver as temporary, not permanent free snapshots. Account quotas include only 50 aggregate vCPU: fifty 4-vCPU instances require an increase even though instance quota is 50.
## Currency, VAT and residency
- Native catalog: CNY. FX: 1 CNY = 0.149020326907 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Chinese Tencent catalog; verified account/per-region quotas, but exact supported locations were not established.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| on-demand | Agent Sandbox allocated runtime | allocated wall time; 1 second increment | CNY 0.2916/vCPU-h + 0.09000000000000001/GiB-h → USD 0.043454327326 + 0.013411829422; null means unknown | https://cloud.tencent.com/document/product/1814/133249 |
| idle-standby | Paused, beta waiver | See rule | No CPU/RAM; paused system disk temporarily waived per billing-example note. Future storage expected. | https://cloud.tencent.com/document/product/1814/133249 |
| startup-acceleration | Private beta add-on | See rule | Future compute/storage acceleration fees announced but not numerically published. | https://cloud.tencent.com/document/product/1814/133249 |
## Gotchas
- Separate snapshot tariff and post-beta pause tariff unknown.
- Default aggregate CPU 50 and RAM quota apply in addition to instance count; card cannot encode resource-pool quota.
- Default regional memory pool is 100 GiB as well as 50 vCPU; fifty 4/8 instances exceed both. Windows is forthcoming, not generally available.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: Chinese Tencent catalog; verified account/per-region quotas, but exact supported locations were not established.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- on-demand: USD 0.281111945/allocated hour × 8,800 = **USD 2473.79 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://cloud.tencent.com/document/product/1814/133249
- https://cloud.tencent.com/document/product/1814/123815
- https://cloud.tencent.cn/document/product/1814/123828
- https://cloud.tencent.com/document/product/1814/130978