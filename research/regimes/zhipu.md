# Zhipu Z Managed Agents
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
API private beta with managed Agent/Environment/Session. Sandbox/runtime currently temporarily free, but model inference separately uses standard API balance (Coding Plan excluded). CPU/RAM dimensions and arbitrary 4/8 access not specified: zero marginal sandbox fee is NOT a free 4/8 VM quote. Filesystem checkpoint is opt-in; do not infer in-memory process resume from conversational session state.
## Currency, VAT and residency
- Native catalog: CNY. FX: 1 CNY = 0.149020326907 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Chinese API agent-api.bigmodel.cn; precise execution region and residency controls unpublished.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| managed-agents-beta | Managed Agent sandbox, temporary free runtime fee | allocated wall time; None second increment | CNY None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://docs.bigmodel.cn/cn/managed-agents/overview.md |
| promo | Private beta runtime | See rule | CNY 0 sandbox/runtime fee temporarily. Do not price arbitrary requested VM shape as free. | https://docs.bigmodel.cn/cn/managed-agents/overview.md |
| inference | Every model call | See rule | Separate model tokens; no Coding Plan credit. Not represented by CPU-hour estimator. | https://docs.bigmodel.cn/cn/managed-agents/overview.md |
| checkpoint | Filesystem only | See rule | /mnt/session/outputs retained; /workspace and /tmp require x-checkpoint true. Docker CLI installed, daemon unavailable. | https://docs.bigmodel.cn/cn/managed-agents/overview.md |
## Gotchas
- Fixed CPU/RAM size, 50-concurrent access and 8-hour runtime eligibility unknown; no 4/8 comparison.
- Runtime promo end date unknown; model-token bill is mandatory but depends on selected model/tokens.
- Outbound network limited to HTTP/HTTPS ports 80/443; allowlists available.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: Chinese API agent-api.bigmodel.cn; precise execution region and residency controls unpublished.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- managed-agents-beta: compute **unknown**; cannot produce a comparable quote.
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://docs.bigmodel.cn/cn/managed-agents/overview.md
- https://docs.bigmodel.cn/cn/managed-agents/cloud-environment.md
- https://docs.bigmodel.cn/cn/managed-agents/sandbox-reference.md
- https://docs.bigmodel.cn/cn/managed-agents/faq.md
- https://docs.bigmodel.cn/cn/guide/start/pricing.md