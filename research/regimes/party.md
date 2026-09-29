# Party — regimes (2026-09-28)
YC: Summer 2024; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/party
Team coding agent workspace
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://party.build |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=2; max session h=None | https://party.build |
| Starter | Plan limits apply | Monthly fee; credits only as stated | fee=20; included usage=$20; concurrent=10; max session h=None | https://party.build |
| Pro | Plan limits apply | Monthly fee; credits only as stated | fee=200; included usage=$400; concurrent=None; max session h=None | https://party.build |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://party.build |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://party.build |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://party.build |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://party.build |
## Verified billing facts and gotchas
1. Free one-time $100, 2 sessions/4 session-hours per day; Starter $20/month includes $20/month and $200 once, 10 sessions/20 session-hours per day; Pro $200 includes $400/month/$400 once and unlimited advertised session limits. Credit-to-compute exchange and machine shape unverified. Credits also fund agents/models; not all compute.
2. Monthly credits also pay model usage; platform has no published compute-only exchange, so plan allowances are not sufficient to price a workload.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/party
- https://party.build/
- https://party.build/pricing
- https://party.build/docs
- https://party.build/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.