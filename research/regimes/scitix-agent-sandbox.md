# ScitiX Agent Sandbox
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Open-source Apache-2.0 Helm-deployed orchestrator compatible with E2B; multi-cloud warm pools and containers or microVMs. This is software/bring-your-own infrastructure, not a verified independently priced public sandbox cloud. Do not turn free software license into free compute.
## Currency, VAT and residency
- Native catalog: USD. FX: 1 USD = 1 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Placement can route across AWS/GCP/Azure/Volcano/Alibaba/Cloudflare/ScitiX; residency depends on operator routing and clusters.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| self-hosted | Self-hosted runtime + externally billed clusters | allocated wall time; None second increment | USD None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://scitix.github.io/Agent-Sandbox/ |
| warm-pool | Idle prewarmed capacity | See rule | Cloud resources continue to incur chosen-provider costs; no free-idle assumption. | https://scitix.github.io/Agent-Sandbox/ |
| software | Apache 2.0 | See rule | License grants do not establish hosted compute rates. | https://scitix.github.io/Agent-Sandbox/ |
## Gotchas
- Hosted service price, CPU/RAM dimensions, warm idle costs and direct ScitiX cloud tariff unavailable.
- Cross-cloud router must be constrained to satisfy residency.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: Placement can route across AWS/GCP/Azure/Volcano/Alibaba/Cloudflare/ScitiX; residency depends on operator routing and clusters.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- self-hosted: compute **unknown**; cannot produce a comparable quote.
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://scitix.github.io/Agent-Sandbox/