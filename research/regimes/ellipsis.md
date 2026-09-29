# Ellipsis — regimes (2026-09-28)
YC: Winter 2024; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/ellipsis
Cloud platform for coding agents
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand | Public listed mode | resource; CPU alloc, memory alloc | $0.142/vCPU-h + $0.024/GiB-h; multiplier 1 | https://www.ellipsis.dev/pricing |
| Own AWS VPC | AWS infrastructure plus 10% token cost; rates depend on AWS. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.ellipsis.dev/pricing |
| Managed usage | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://www.ellipsis.dev/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.ellipsis.dev/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.ellipsis.dev/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.ellipsis.dev/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.ellipsis.dev/pricing |
## Verified billing facts and gotchas
1. Managed SaaS CPU $0.142/vCPU-hour and memory $0.024/GB-hour plus 10% of token spend. No per-seat or idle charges. Active lifecycle is not confirmed per-core utilization billing.
2. BYOC uses customer AWS compute and 10% token platform fee; cannot reuse SaaS resource rates. Support $5k/$10k/$15k per month is optional, not required plan.
3. YC mentions $100 credit; current pricing page did not confirm eligibility, so no unconditional free credit encoded.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Allocated active-session illustration: 8,800×(4×0.142+8×0.024)=$6,688 plus 10% of model-token cost and unknown storage/network. CPU utilization alone cannot be applied without confirmation of meter semantics.
## Sources and coverage
- https://www.ycombinator.com/companies/ellipsis
- https://www.ellipsis.dev/pricing
- https://www.ellipsis.dev/docs
- https://www.ellipsis.dev/
- https://www.ellipsis.dev/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.