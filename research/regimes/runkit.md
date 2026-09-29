# RunKit — regimes (2026-09-28)
YC: Summer 2016; directory status **Acquired**. Research scope: marginal-or-unavailable. Source: https://www.ycombinator.com/companies/runkit
RunKit JavaScript notebooks
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| JavaScript notebooks | alt | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.ycombinator.com/companies/runkit |
| Unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.ycombinator.com/companies/runkit |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.ycombinator.com/companies/runkit |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.ycombinator.com/companies/runkit |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.ycombinator.com/companies/runkit |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.ycombinator.com/companies/runkit |
## Verified billing facts and gotchas
1. Historical acquired public Node.js notebooks. YC website tonicdev.com has expired TLS certificate; runkit.com is the current domain probe. No verified commercial CPU/RAM tariff, capacity or fleet API. Public notebook execution is not a claim of production sandbox availability.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/runkit
- https://runkit.com/
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.