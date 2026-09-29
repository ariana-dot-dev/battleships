# PPIO Agent Sandbox
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
PPIO is separately priced from Novita: CNY domestic API, Shanghai v1 and Beijing v2 endpoints. Novita first-party gym repository mentions PPIO templates, suggesting shared engineering, not sufficient proof of legal ownership or identical tariff. Keep distinct IDs. Storage allowance is shared 60 GB/account across templates, snapshots and paused sandboxes.
## Currency, VAT and residency
- Native catalog: CNY. FX: 1 CNY = 0.149020326907 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency/restrictions: cn-shanghai-1 v1 and cn-beijing-1 v2. Do not inherit Novita US regions. Volumes/secrets/new snapshots need v2.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| on-demand | CPU + RAM allocation | allocated wall time; 1 second increment | CNY 0.108/vCPU-h + 0.054/GiB-h → USD 0.016094195306 + 0.008047097653; null means unknown | https://ppio.com/docs/sandbox/pricing.md |
| idle-standby | Paused sandbox | See rule | CPU/RAM zero; state persisted; first 60 GB/account free, then CNY .0005/GB-h. | https://ppio.com/docs/sandbox/pricing.md |
| enterprise | Higher concurrency/custom quota | See rule | Sales-assessed; no published discount. | https://ppio.com/docs/sandbox/pricing.md |
## Gotchas
- Exact VAT inclusion unknown.
- Volume beta has no independently published rate.
- Legal corporate relation to Novita remains unresolved.
- Default lifetime is five minutes; explicit timeout/update needed for eight-hour work. Maximum accepted timeout not established in current docs.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Unknown: reviewed pricing source does not explicitly establish VAT/tax inclusion.
- Residency: cn-shanghai-1 v1 and cn-beijing-1 v2. Do not inherit Novita US regions. Volumes/secrets/new snapshots need v2.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- on-demand: USD 0.128753562/allocated hour × 8,800 = **USD 1133.03 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained state: CNY 0 / USD 0 only if this is the entire account storage total and the shared 60 GB allowance is otherwise unused; excess CNY .0005/GB-hour.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://ppio.com/docs/sandbox/pricing.md
- https://ppio.com/docs/sandbox/quota-limits.md
- https://ppio.com/docs/sandbox/overview.md
- https://ppio.com/docs/sandbox/e2b-compatible.md
- https://ppio.com/docs/sandbox/sandbox-auto-persistence.md
- https://ppio.com/docs/sandbox/volume-overview.md
- https://ppio.com/ai-computing/sandbox
- https://blog.ppio.com/untitled-20/
- https://github.com/novitalabs/novita-gym
- https://ppio.com/docs/sandbox/sandbox-timeout.md