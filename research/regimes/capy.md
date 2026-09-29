# Capy — regimes (2026-09-28)
YC: Fall 2024; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/capy
Parallel coding agent IDE
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://capy.ai |
| Lite monthly | Plan limits apply | Monthly fee; credits only as stated | fee=20; included usage=$None; concurrent=None; max session h=None | https://capy.ai |
| Pro monthly | Plan limits apply | Monthly fee; credits only as stated | fee=100; included usage=$None; concurrent=None; max session h=None | https://capy.ai |
| Max base monthly | Plan limits apply | Monthly fee; credits only as stated | fee=200; included usage=$None; concurrent=None; max session h=None | https://capy.ai |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://capy.ai |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://capy.ai |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://capy.ai |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://capy.ai |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://capy.ai |
## Verified billing facts and gotchas
1. Lite $20/mo includes $20 credits, Pro $100 includes $105, Max $200–1000 in $100 steps includes 110%; annual 20% discount, trial $1/7d/card. Credits pay agent/model work and resource exchange unverified; unlimited members not unlimited compute.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/capy
- https://capy.ai/
- https://capy.ai/pricing
- https://capy.ai/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.