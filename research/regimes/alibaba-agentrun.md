# Alibaba Cloud Agent Sandbox / FC / AgentRun
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Current Agent Sandbox has Flash and Container editions. Do not substitute old AgentRun AIO or ordinary FC prices. China-site CNY and international USD are distinct catalogs. Per-second figures govern conversion; rounded hourly parentheticals in the Chinese table disagree, especially overseas Economy. Active billing is allocation, not CPU utilization. Light sleep removes CPU only; deep sleep persists RAM+disk without the 15 GiB free allowance.
## Currency, VAT and residency
- Native catalog: CNY. FX: 1 CNY = 0.149020326907 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Mainland China, Hong Kong, Singapore and US releases verified; exact edition availability differs. Region choice is not a guarantee that every supporting service remains in that region.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| cn-economy | cn economy | allocated wall time; 1 second increment | CNY 0.06012/vCPU-h + 0.029988/GiB-h → USD 0.008959102054 + 0.004468821563; null means unknown | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| cn-default | cn default | allocated wall time; 1 second increment | CNY 0.07812/vCPU-h + 0.038988/GiB-h → USD 0.011641467938 + 0.005810004505; null means unknown | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| cn-performance | cn performance | allocated wall time; 1 second increment | CNY 0.119988/vCPU-h + 0.060012/GiB-h → USD 0.017880650985 + 0.008943007858; null means unknown | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| overseas-economy | overseas economy | allocated wall time; 1 second increment | CNY 0.08856/vCPU-h + 0.044316/GiB-h → USD 0.013197240151 + 0.006603984807; null means unknown | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| overseas-default | overseas default | allocated wall time; 1 second increment | CNY 0.12312/vCPU-h + 0.061596000000000005/GiB-h → USD 0.018347382649 + 0.009179056056; null means unknown | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| overseas-performance | overseas performance | allocated wall time; 1 second increment | CNY 0.18000000000000002/vCPU-h + 0.09000000000000001/GiB-h → USD 0.026823658843 + 0.013411829422; null means unknown | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| intl-cn-economy | intl-cn economy | allocated wall time; 1 second increment | USD 0.00936/vCPU-h + 0.004608/GiB-h → USD 0.00936 + 0.004608; null means unknown | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| intl-cn-default | intl-cn default | allocated wall time; 1 second increment | USD 0.012240000000000001/vCPU-h + 0.006012/GiB-h → USD 0.01224 + 0.006012; null means unknown | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| intl-cn-performance | intl-cn performance | allocated wall time; 1 second increment | USD 0.01872/vCPU-h + 0.00936/GiB-h → USD 0.01872 + 0.00936; null means unknown | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| intl-overseas-economy | intl-overseas economy | allocated wall time; 1 second increment | USD 0.013715999999999999/vCPU-h + 0.006875999999999999/GiB-h → USD 0.013716 + 0.006876; null means unknown | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| intl-overseas-default | intl-overseas default | allocated wall time; 1 second increment | USD 0.017856/vCPU-h + 0.008928/GiB-h → USD 0.017856 + 0.008928; null means unknown | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| intl-overseas-performance | intl-overseas performance | allocated wall time; 1 second increment | USD 0.027324/vCPU-h + 0.013896/GiB-h → USD 0.027324 + 0.013896; null means unknown | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| idle-standby | Flash light hibernation | See rule | CPU zero; memory at selected full rate; disk above 15 GiB charged. Not a runnable discount mode. | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| deep-hibernation | Flash and Container | See rule | CPU/RAM zero; all RAM+disk retained bytes charged, no 15 GiB allowance. | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| snapshot | Saved state | See rule | Same storage rule as deep sleep; no compute. | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| legacy-agentrun | AgentRun AIO | See rule | Maximum six-hour lifetime; numeric legacy compute quote not carried into current card. | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
| storage-region | Native storage catalogs | See rule | China-site mainland CNY 0.00000059/GiB-s; overseas CNY 0.00000046/GiB-s. International mainland USD 0.0000000886/GiB-s; overseas USD 0.0000000703/GiB-s. | https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview |
## Gotchas
- New Agent Sandbox/FC quotas not transferred from legacy AIO. SDK compatibility is not full E2B feature parity.
- CNY per-second versus printed per-hour discrepancies retained in raw capture.
- Flash and Container have different isolation implementations; no unified VM isolation assigned.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: Mainland China, Hong Kong, Singapore and US releases verified; exact edition availability differs. Region choice is not a guarantee that every supporting service remains in that region.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- cn-economy: USD 0.0715869807/allocated hour × 8,800 = **USD 629.97 compute** (before quotas, fees, free buckets, storage and tax).
- cn-default: USD 0.0930459078/allocated hour × 8,800 = **USD 818.80 compute** (before quotas, fees, free buckets, storage and tax).
- cn-performance: USD 0.143066667/allocated hour × 8,800 = **USD 1258.99 compute** (before quotas, fees, free buckets, storage and tax).
- overseas-economy: USD 0.105620839/allocated hour × 8,800 = **USD 929.46 compute** (before quotas, fees, free buckets, storage and tax).
- overseas-default: USD 0.146821979/allocated hour × 8,800 = **USD 1292.03 compute** (before quotas, fees, free buckets, storage and tax).
- overseas-performance: USD 0.214589271/allocated hour × 8,800 = **USD 1888.39 compute** (before quotas, fees, free buckets, storage and tax).
- intl-cn-economy: USD 0.074304/allocated hour × 8,800 = **USD 653.88 compute** (before quotas, fees, free buckets, storage and tax).
- intl-cn-default: USD 0.097056/allocated hour × 8,800 = **USD 854.09 compute** (before quotas, fees, free buckets, storage and tax).
- intl-cn-performance: USD 0.14976/allocated hour × 8,800 = **USD 1317.89 compute** (before quotas, fees, free buckets, storage and tax).
- intl-overseas-economy: USD 0.109872/allocated hour × 8,800 = **USD 966.87 compute** (before quotas, fees, free buckets, storage and tax).
- intl-overseas-default: USD 0.142848/allocated hour × 8,800 = **USD 1257.06 compute** (before quotas, fees, free buckets, storage and tax).
- intl-overseas-performance: USD 0.220464/allocated hour × 8,800 = **USD 1940.08 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: 50 × USD 0.231058997 = **USD 11.55/730 hours**. State-size and mode caveats above apply.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://help.aliyun.com/zh/agent-sandbox/product-overview/billing-overview
- https://www.alibabacloud.com/help/en/agent-sandbox/product-overview/billing-overview
- https://www.alibabacloud.com/help/en/agentrun/agenrun-sandbox-upgrade-fc-cloud-sandbox-scheme
- https://www.alibabacloud.com/help/en/agentrun/aio-sandbox-1
- https://www.alibabacloud.com/help/en/functioncompute/feature-release-log-for-fc-agent-sandbox-2026
- https://www.alibabacloud.com/help/en/functioncompute/sandbox-functions-using-constraints