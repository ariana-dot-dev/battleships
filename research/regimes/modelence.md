# Modelence — regimes (2026-09-28)
YC: Summer 2025; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/modelence
Hosted application containers
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| App containers | alt | sizes; CPU alloc, memory alloc | Micro: 0.25 vCPU/0.5 GiB $0.013/h; Micro Plus: 0.25 vCPU/1 GiB $0.02/h; Small: 0.5 vCPU/1 GiB $0.03/h; Small Plus: 0.5 vCPU/2 GiB $0.04/h; Medium: 1 vCPU/2 GiB $0.06/h; Medium Plus: 1 vCPU/4 GiB $0.07/h; Large: 2 vCPU/4 GiB $0.12/h; Large Plus: 2 vCPU/8 GiB $0.14/h; X-Large: 4 vCPU/8 GiB $0.24/h; X-Large Plus: 4 vCPU/16 GiB $0.28/h | https://modelence.com |
| Starter | Plan limits apply | Monthly fee; credits only as stated | fee=20; included usage=$0; concurrent=None; max session h=None | https://modelence.com |
| Pro | Plan limits apply | Monthly fee; credits only as stated | fee=100; included usage=$0; concurrent=None; max session h=None | https://modelence.com |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://modelence.com |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://modelence.com |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://modelence.com |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://modelence.com |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://modelence.com |
## Verified billing facts and gotchas
1. Free prototype; Starter $20/mo includes 1 production instance; Pro $100 includes 5. App Builder $20/$100 credits are LLM credits, not compute credit. Containers 4/8 $0.24/h, 4/16 $0.28/h; included-instance shape not explicit so total cannot be accurately netted. Hourly charges stop when environment stopped.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Gross 4/8 container runtime 8,800×$0.24=$2,112. Subscription adds $20 or $100, but includes 1 or 5 unspecified production instances: exact net bill cannot be derived until included shape/hours and 50-instance eligibility are known. AI builder credits do not offset runtime.
## Sources and coverage
- https://www.ycombinator.com/companies/modelence
- https://modelence.com/
- https://modelence.com/pricing
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.