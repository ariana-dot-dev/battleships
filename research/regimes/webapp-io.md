# webapp.io — regimes (2026-09-28)
YC: Summer 2020; directory status **Acquired**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/webapp-io
CI and preview VMs
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://webapp.io |
| Starter | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$None; concurrent=None; max session h=None | https://webapp.io |
| Pro one member | Plan limits apply | Monthly fee; credits only as stated | fee=15; included usage=$None; concurrent=None; max session h=None | https://webapp.io |
| Team one member | Plan limits apply | Monthly fee; credits only as stated | fee=39; included usage=$None; concurrent=12; max session h=None | https://webapp.io |
| Scale | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://webapp.io |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://webapp.io |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://webapp.io |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://webapp.io |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://webapp.io |
## Verified billing facts and gotchas
1. Starter $0 up to 3 members; Pro $15/member/mo up to 10; Team $39/member/mo up to 50; annual 20% off, Enterprise quote. VM pool quotas and retained previews tied to plan, but CPU/RAM pool shape not verified. Twelve parallel VMs shown for Team; 50 concurrent benchmark requires custom service. YC acquired status does not equal shutdown.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/webapp-io
- https://webapp.io/
- https://webapp.io/pricing
- https://docs.webapp.io/introduction
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.