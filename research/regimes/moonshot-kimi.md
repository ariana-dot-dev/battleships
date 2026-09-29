# Moonshot Kimi Hosted Agents sandbox
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
China-site Kimi Hosted Agents private enterprise beta has a real sandbox tariff, absent from the international .ai index. Published shape is only 1 CPU / 1 GB at CNY .072/hour; model tokens and plugins extra. Do not multiply to invent 4/8 availability. Sandbox state/conversation retained by service, so not covered by zero-data-retention.
## Currency, VAT and residency
- Native catalog: CNY. FX: 1 CNY = 0.149020326907 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: China domestic enterprise-verified customers only, sales-assisted beta. Exact datacenter not published.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| hosted-beta | Hosted Agents 1C/1G sandbox | allocated wall time; 1 second increment | 1C1GB 1/1: CNY 0.072/h → USD 0.010729463537; month cap None | https://platform.kimi.com/docs/pricing/hosted-agents.md |
| model | Inference | See rule | Chosen model tokens charged separately. | https://platform.kimi.com/docs/pricing/hosted-agents.md |
| plugins | Optional tools | See rule | CNY 1/20/30/45/60/110/150/450 per 1000 calls by plugin. Search 30, image search 45. | https://platform.kimi.com/docs/pricing/hosted-agents.md |
## Gotchas
- 4/8 machine unavailable in published shape table; 50-way concurrency unknown.
- Tax basis not stated; do not assume CNY prices include 6% VAT.
- Pause of conversation is not proof of RAM/process snapshot persistence.
- 1 core may not equal dedicated physical core.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: China domestic enterprise-verified customers only, sales-assisted beta. Exact datacenter not published.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- hosted-beta: compute **unknown**; cannot produce a comparable quote.
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://platform.kimi.com/docs/pricing/hosted-agents.md
- https://platform.kimi.com/docs/hosted-agents/quickstart.md
- https://platform.kimi.com/docs/hosted-agents/sandbox-reference.md
- https://platform.kimi.com/docs/hosted-agents/environments.md