# orkestr Sandboxes
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Self-serve beta EU-operated hardware-isolated Linux VMs. Landing page explicitly says numeric rates will be published after metering real workloads. Per-second CPU/RAM and snapshot billing declared, not enough to quantify. No platform fee or request charge for sandboxes; do not borrow pricing for other orkestr products.
## Currency, VAT and residency
- Native catalog: EUR. FX: 1 EUR = 1.1378 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: Provider claims code, memory, snapshots and environment remain EU; Falkenstein DE, Helsinki FI, Roubaix FR; DPA available. Not independently audited.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| beta | Beta sandbox | allocated wall time; 1 second increment | EUR None/vCPU-h + None/GiB-h → USD None + None; null means unknown | https://orkestr.eu/sandboxes |
| free-tier | Beta initial usage | See rule | Free to start; quantity not published, not unlimited zero cost. | https://orkestr.eu/sandboxes |
## Gotchas
- Numeric CPU/RAM/storage tariffs and free-tier quantity unpublished.
- Default network off; full egress needs paid verified account.
- 150–300 ms cold-start claims vary by page/template; no benchmark recorded.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: Provider claims code, memory, snapshots and environment remain EU; Falkenstein DE, Helsinki FI, Roubaix FR; DPA available. Not independently audited.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- beta: compute **unknown**; cannot produce a comparable quote.
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://orkestr.eu/sandboxes
- https://orkestr.eu/docs/sandboxes
- https://orkestr.eu/pricing