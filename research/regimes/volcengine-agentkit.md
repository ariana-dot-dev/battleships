# Volcano Engine AgentKit / veFaaS sandbox
As of 2026-11-08 (billing page re-checked; rates unchanged since 2026-09-28). Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
E2B API compatibility uses injected envd in arbitrary sandbox images. Use official docs, not user-written volcengine /article pages: those conflict materially with the rate table. Billing changed 2026-08-31.
## Currency, VAT and residency
- Native catalog: CNY. FX: 1 CNY = 0.149020326907 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs (BytePlus) remain independent quotes.
- Tax: mainland China list prices include VAT (6% for IT technical services). BytePlus USD tax basis not stated.
- Billing modes: postpaid pay-as-you-go (按量计费，后付费) or prepaid packages (套餐包) for vCPU and memory.
- Residency: mainland China (cn-beijing, cn-shanghai) and BytePlus Johor (ap-southeast-1). No EU region.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| sandbox | AgentKit Sandbox | allocated wall time; 1 second increment | CNY 0.1458/vCPU-h + 0.03672/GiB-h → USD 0.021727163663 + 0.005472026404 | https://docs.volcengine.com/docs/agentkit/Billing_items?lang=zh |
| agent-runtime | Agent application Runtime | allocated wall time; 1 second increment | CNY 0.35055/vCPU-h + 0.0556416/GiB-h → USD 0.052239075597 + 0.008291729422 | https://docs.volcengine.com/docs/agentkit/Billing_items?lang=zh |
| gateway | Runtime/MCP gateways | See rule | Shared/dedicated gateway charges are additive; separate Runtime and MCP instances. Minimum balance CNY 100 to buy gateway; not monthly subscription. See raw full price table. | https://docs.volcengine.com/docs/agentkit/Billing_items?lang=zh |
## Limits
- 100 sandbox instances per account per region, raisable through the quota center. 50 sandbox templates per account per region. Source: https://docs.volcengine.com/docs/agentkit/Limits?lang=zh (checked 2026-11-08).
- Lifetime: the Limits page says 24 h at most, not adjustable. The Codex CLI guide says 8 h by default and up to 7 days through an account manager (https://docs.volcengine.com/docs/agentkit/RunningCodexinasandboxviaAgentKitCLI?lang=zh). The two pages disagree.
## Persistence
- Pause keeps the filesystem, not memory or processes. It is beta and turned on by ticket. Compute billing stops while paused. Retention is not stated. Source: https://docs.volcengine.com/docs/vefaas/Sandboxinstancepauseandresume?lang=en
- Opt-in per-template snapshot when an instance expires, plus manual snapshots that each restore once.
- TOS bucket mounts keep files outside the instance; TOS bills separately.
## Gotchas
- CPU accounting described as resource usage but active CPU utilization not proven; allocation assumed conservatively.
- A separate direct veFaaS sandbox tariff was not found; the card prices only the AgentKit Sandbox list.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- sandbox: USD 0.130684866/allocated hour × 8,800 = **USD 1150.03 compute** (before quotas, fees, free buckets, storage and tax).
- agent-runtime: USD 0.275290138/allocated hour × 8,800 = **USD 2422.55 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: **price not published**, not USD 0.
- 100 GiB egress: **USD 11.92** using captured marginal tariff and 0 GiB verified free allowance.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. 50 workers fit the default 100-instance quota.
## Sources
- https://docs.volcengine.com/docs/agentkit/Billing_items?lang=zh
- https://docs.volcengine.com/docs/agentkit/Limits?lang=zh
- https://docs.volcengine.com/docs/vefaas/Sandboxinstancepauseandresume?lang=en
- https://docs.volcengine.com/docs/vefaas/E2Bcompatibilityinstructions?lang=en
