# Rivet — regimes (2026-09-28)
YC: Winter 2023; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/rivet
Rivet Actors are the primitive for stateful workloads
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Managed actor execution | alt | resource; CPU alloc, memory alloc | $0.1188/vCPU-h + $0.01044/GiB-h; multiplier 1 | https://rivet.dev/pricing/ |
| Hobby | Plan limits apply | Monthly fee; credits only as stated | fee=20; included usage=$0; concurrent=None; max session h=None | https://rivet.dev/pricing/ |
| Team | Plan limits apply | Monthly fee; credits only as stated | fee=200; included usage=$0; concurrent=None; max session h=None | https://rivet.dev/pricing/ |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://rivet.dev/pricing/ |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | $0.4 | https://rivet.dev/pricing/ |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://rivet.dev/pricing/ |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | $0.15 | https://rivet.dev/pricing/ |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://rivet.dev/pricing/ |
## Verified billing facts and gotchas
1. Compute from $0.1188/vCPU-hour +$0.01044/GiB-hour, billed active execution lifetime, not CPU utilization. Awake actor-hours are a separate coordination meter $0.05/1000. Paid Hobby $20 or Team $200 includes no compute credit.
2. Calculator caps memory at 4 GiB, so requested 8 GiB instance is unsupported by published limits. Persistence $0.40/GB-month beyond 5GB; 1TB paid egress then $0.15/GB; reads/writes charge separately.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Published 4GiB maximum prevents the requested 8GiB per instance; no feasible normalized total. Algebraic 4/8 $0.55872/h is not a purchasable 4/8 configuration. Actor-hours, reads and writes also require workload inputs.
## Sources and coverage
- https://www.ycombinator.com/companies/rivet
- https://rivet.dev/pricing/
- https://rivet.dev/
- https://rivet.dev/docs/
- https://rivet.dev/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.