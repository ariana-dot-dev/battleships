# Mistral Compute / AI Cloud
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Mistral Compute offers reserveable European AI capacity; no public self-serve 4-vCPU/8-GiB sandbox price recovered. Chat/Vibe subscriptions, model-token prices and Koyeb CPU tariffs are different products. Do not merge them.
## Currency, VAT and residency
- Native catalog: EUR. FX: 1 EUR = 1.1378 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: European dedicated capacity marketed; exact contracted facility, data control and subprocessor scope require contract.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| dedicated-ai | Dedicated AI capacity | allocated wall time; None second increment | EUR None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://mistral.ai/products/aicloud/ |
## Gotchas
- Compute list price, currency, minimum commitment, GPU SKU and ordinary CPU availability unknown.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: European dedicated capacity marketed; exact contracted facility, data control and subprocessor scope require contract.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- dedicated-ai: compute **unknown**; cannot produce a comparable quote.
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://mistral.ai/products/aicloud/
- https://mistral.ai/pricing/