# MiniMax Agent hosting / developer API scope
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Developer docs expose model/media APIs and hosted-agent applications, not a verified generic CPU/RAM-selectable sandbox rental API. Existing local research reported consumer MaxClaw/MaxHermes hosting; its USD 4/month claim was third-party only and is NOT accepted as normalized compute price. Mini-Agent is an agent harness, not evidence of free cloud execution.
## Currency, VAT and residency
- Native catalog: USD. FX: 1 USD = 1 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: International minimax.io and China minimaxi.com are separate sites; actual sandbox hosting country and region pinning not verified.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| hosted-agent | Hosted agent environment quote/spec unverified | allocated wall time; None second increment | USD None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://platform.minimax.io/docs/llms.txt |
| token-plan | Model subscription | See rule | Not a CPU/RAM machine rental; do not convert model tokens to vCPU-hours. | https://platform.minimax.io/docs/llms.txt |
## Gotchas
- Standalone sandbox size, concurrency, hourly or fixed runtime fee and tax treatment not confirmed in first-party pricing.
- Credits have a monetary conversion but this does not verify how many credits hosting costs.
- No arbitrary 4/8 machine or eight-hour session eligibility established.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: International minimax.io and China minimaxi.com are separate sites; actual sandbox hosting country and region pinning not verified.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- hosted-agent: compute **unknown**; cannot produce a comparable quote.
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://platform.minimax.io/docs/llms.txt
- https://platform.minimax.io/docs/guides/pricing-token-plan.md
- https://platform.minimax.io/subscribe/token-plan?tab=api-enterprise
- https://github.com/MiniMax-AI/Mini-Agent
- https://agent.minimax.io/pricing