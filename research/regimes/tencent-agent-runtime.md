# Tencent Cloud Agent Runtime — Agent Sandbox
As of 2026-11-08 (billing page updated 2026-10-27). Price basis: public list rates.
Allocated CPU and memory bill while running. While paused, CPU and memory stop billing, and the stored state bills at 0.0021 CNY/GiB-h (disk used, plus declared RAM for a memory pause). The 15 GiB free disk applies only while running. Default account quotas include 50 aggregate vCPU: fifty 4-vCPU instances need a quota increase even though the instance quota is 50.
Session length: prebuilt sandbox types stop after at most 24 h. Custom sandboxes have a persistent run mode with no timeout reclaim (changelog 2026-03-17, doc 1814/132338).
## Currency, VAT and residency
- Native catalog: CNY. FX: 1 CNY = 0.149020326907 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Chinese Tencent catalog. Documented regions: Shanghai and Beijing (changelog), Guangzhou (MCP endpoint). No official page lists Hong Kong.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| on-demand | Agent Sandbox allocated runtime | allocated wall time; 1 second increment | CNY 0.2916/vCPU-h + 0.09000000000000001/GiB-h → USD 0.043454327326 + 0.013411829422; null means unknown | https://cloud.tencent.com/document/product/1814/133249 |
| idle-standby | Paused (hibernated) | stored GiB per hour | No CPU/RAM; CNY 0.0021/GiB-h → USD ~0.228/GiB-month on disk used (+ declared RAM for a memory pause); no free disk while paused. | https://cloud.tencent.com/document/product/1814/133249 |
| startup-acceleration | Private beta add-on | See rule | Future compute/storage acceleration fees announced but not numerically published. | https://cloud.tencent.com/document/product/1814/133249 |
## Gotchas
- Default quota: 20 paused instances per account/region; Tencent raises quotas on request.
- Default aggregate CPU 50 and RAM quota apply in addition to instance count; card cannot encode resource-pool quota.
- Default regional memory pool is 100 GiB as well as 50 vCPU; fifty 4/8 instances exceed both. No Windows sandbox type is documented.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: see above. No EU region.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- on-demand: USD 0.281111945/allocated hour × 8,800 = **USD 2473.79 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained paused state: CNY 0.0021 × 50 × 730 = CNY 76.65 (~USD 11.42) per month, disk-only pause.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://cloud.tencent.com/document/product/1814/133249
- https://cloud.tencent.com/document/product/1814/123815
- https://cloud.tencent.cn/document/product/1814/123828
- https://cloud.tencent.com/document/product/1814/130978