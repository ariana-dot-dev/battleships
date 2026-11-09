# orkestr Sandboxes
As of 2026-11-08. Price basis: public list rates from the Sandboxes tab of https://orkestr.eu/pricing.
Self-serve EU-operated hardware-isolated Linux VMs. Billing is per second on the allocated vCPU and RAM of the size you run, while it runs, busy or idle. Pausing stops the compute meter; the paused snapshot is billed as held storage. No plan fee or request charge for sandboxes; do not borrow pricing for other orkestr products (app hosting, Agent Runtime beta, Workers preview).
## Currency, VAT and residency
- Native catalog: EUR. FX: 1 EUR = 1.1378 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)).
- Tax: the pricing page compares orkestr figures "excl. VAT".
- Residency/restrictions: Provider claims code, memory, snapshots and environment remain EU; Falkenstein DE, Helsinki FI, Roubaix FR; DPA available. Not independently audited.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| beta (Pay as you go) | Card on file | allocated vCPU + RAM, per second while running | EUR 0.045/vCPU-h + EUR 0.015/GiB-h → USD 0.051201 + 0.017067 | https://orkestr.eu/pricing |
| held storage | Paused snapshots + templates | GB-month | first 10 GB free, then EUR 0.10/GB-month (USD 0.11378) | https://orkestr.eu/pricing |
| volumes | /persist volumes | GB-month on provisioned size | EUR 0.10/GB-month (storage rate) | https://orkestr.eu/docs/sandboxes/volumes |
| free-tier | Email verified, no card | credit | EUR 5 one-time credit, small size only; a card adds EUR 25 credit | https://orkestr.eu/pricing |
## Gotchas
- Default network off. Open egress is listed as "paid tier with verified billing". Public preview ports need a card on file.
- Cold start: "roughly 150 ms cold, under 30 ms from a warm pool" (product page); no benchmark recorded.
- /workspace and /tmp are RAM-backed and lost on terminate. Keep state with pause (memory + disk snapshot, kept 30 days on Pay as you go) or a /persist volume (max 100 GB each, 200 GB total on Pay as you go).
- Each create or set_timeout call runs a countdown of at most 24 h; continuous running is unlimited on carded tiers if you call set_timeout.
- Egress price unpublished.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**.
- Concurrency: 50 × 8 GiB = 400 GiB live RAM exceeds the Pay as you go budget of 32 GB; this needs Enterprise (128 GB default, "a default, not a ceiling") or a raise.
- beta compute: 8,800 h × (4 × EUR 0.045 + 8 × EUR 0.015) = 8,800 × EUR 0.30 = **EUR 2,640 (USD 3,003.79)**.
- 50 GiB retained snapshots: (50 − 10 free) × EUR 0.10 = **EUR 4.00 (USD 4.55)** per month.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** while egress price and the Enterprise price are unpublished.
## Sources
- https://orkestr.eu/pricing
- https://orkestr.eu/sandboxes
- https://orkestr.eu/docs/sandboxes
- https://orkestr.eu/docs/sandboxes/limits
- https://orkestr.eu/docs/sandboxes/volumes
- https://orkestr.eu/docs/sandboxes/networking
