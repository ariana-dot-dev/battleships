# Volcano Engine AgentKit / veFaaS sandbox
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
E2B API compatibility uses injected envd in arbitrary sandbox images. Use official docs, not user-written volcengine /article pages: those conflict materially with the rate table. Billing changed 2026-08-31.
## Currency, VAT and residency
- Native catalog: CNY. FX: 1 CNY = 0.149020326907 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: China catalog; specific sandbox region list not captured; no EU residency guarantee established.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| sandbox | AgentKit Sandbox | allocated wall time; 1 second increment | CNY 0.1458/vCPU-h + 0.03672/GiB-h → USD 0.021727163663 + 0.005472026404; null means unknown | https://docs.volcengine.com/docs/agentkit/Billing_items?lang=zh |
| agent-runtime | Agent application Runtime | allocated wall time; 1 second increment | CNY 0.35055/vCPU-h + 0.0556416/GiB-h → USD 0.052239075597 + 0.008291729422; null means unknown | https://docs.volcengine.com/docs/agentkit/Billing_items?lang=zh |
| vefaas-direct | Direct veFaaS sandbox tariff not verified | allocated wall time; 1 second increment | CNY None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://docs.volcengine.com/docs/agentkit/Billing_items?lang=zh |
| gateway | Runtime/MCP gateways | See rule | Shared/dedicated gateway charges are additive; separate Runtime and MCP instances. Minimum balance CNY 100 to buy gateway; not monthly subscription. See raw full price table. | https://docs.volcengine.com/docs/agentkit/Billing_items?lang=zh |
## Gotchas
- CPU accounting described as resource usage but active CPU utilization not proven; allocation assumed conservatively.
- veFaaS direct sandbox tariff may differ from AgentKit Sandbox; separate direct rate unknown.
- Template runtime versus build storage, concurrency and maximum lifetime unverified.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: China catalog; specific sandbox region list not captured; no EU residency guarantee established.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- sandbox: USD 0.130684866/allocated hour × 8,800 = **USD 1150.03 compute** (before quotas, fees, free buckets, storage and tax).
- agent-runtime: USD 0.275290138/allocated hour × 8,800 = **USD 2422.55 compute** (before quotas, fees, free buckets, storage and tax).
- vefaas-direct: compute **unknown**; cannot produce a comparable quote.
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **USD 11.92** using captured marginal tariff and 0 GiB verified free allowance (if unspecified, none assumed for this component calculation).
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://docs.volcengine.com/docs/agentkit/Billing_items?lang=zh
- https://docs.volcengine.com/docs/vefaas/E2Bcompatibilityinstructions?lang=en