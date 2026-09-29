# Hatchet — regimes (2026-09-28)
YC: Winter 2024; directory status **Active**. Research scope: marginal-or-unavailable. Source: https://www.ycombinator.com/companies/hatchet-run
Task orchestration, BYO workers
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://hatchet.run |
| Current applicable tariff unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://hatchet.run |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://hatchet.run |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://hatchet.run |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://hatchet.run |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://hatchet.run |
## Verified billing facts and gotchas
1. Explicitly describes workers as processes YOU run. $30/million runs and $5/million events after 1M monthly each; $0.03/GB-hour active payload storage; logs $0.0004/GB-hour, $10 extra user beyond 50. These prices do not include execution hosts; not standalone cloud compute.
2. Inventory exclusion: BYO execution workers. Card contains no numeric compute modes and no selectable price plan.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/hatchet-run
- https://hatchet.run/
- https://hatchet.run/pricing
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.