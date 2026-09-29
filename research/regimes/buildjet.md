# BuildJet — regimes (2026-09-28)
YC: Winter 2023; directory status **Active**. Research scope: marginal-or-unavailable. Source: https://www.ycombinator.com/companies/buildjet
Historical hosted GitHub Actions runners
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://buildjet.com/for-github-actions |
| Current applicable tariff unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://buildjet.com/for-github-actions |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://buildjet.com/for-github-actions |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://buildjet.com/for-github-actions |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://buildjet.com/for-github-actions |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://buildjet.com/for-github-actions |
## Verified billing facts and gotchas
1. Official homepage says BuildJet for GitHub Actions has been shut down, despite YC Active. Historical 4-vCPU/16GB rate $0.008/min and $300/month per extra 100 concurrent vCPUs are retained as historical only; do not auto-rank a discontinued service.
2. Inventory exclusion: officially shut down. Card contains no numeric compute modes and no selectable price plan.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/buildjet
- https://buildjet.com/for-github-actions
- https://buildjet.com/for-github-actions/docs/about/pricing
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.