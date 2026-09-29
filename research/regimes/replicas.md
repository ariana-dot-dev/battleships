# Replicas — regimes (2026-09-28)
YC: Spring 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/replicas
Cloud coding-agent VMs
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Team Flex manual workspaces | For manual workspaces only; automated/API usage has separate billing. | sizes; CPU alloc, memory alloc | Team: 4 vCPU/16 GiB $0.96/h | https://replicas.dev |
| Team Flex | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://replicas.dev |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://replicas.dev |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://replicas.dev |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://replicas.dev |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://replicas.dev |
## Verified billing facts and gotchas
1. Developer Flex $0.008/min ($0.48/h), Team Flex $0.016/min ($0.96/h). Full seats $50/150h and $200/unlimited MANUAL time; APIs/automations billed separately. Team documented 4vCPU/16GB/32GB disk. Unlimited seat runtime is not free API fleets; exact automation rates require billing docs.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Team Flex 4/16 raw manual runtime: 8,800×$0.96=$8,448. A $200 full seat has unlimited manual minutes, not unlimited automation, API use or 50 parallel workspaces. Workload eligibility is not established; do not quote $200 for the fleet.
## Sources and coverage
- https://www.ycombinator.com/companies/replicas
- https://replicas.dev/
- https://replicas.dev/pricing
- https://replicas.dev/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.