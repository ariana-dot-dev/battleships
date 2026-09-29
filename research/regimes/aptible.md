# Aptible — regimes (2026-09-28)
YC: Summer 2014; directory status **Acquired**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/aptible
Compliant app containers
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.aptible.com |
| Development | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://www.aptible.com |
| Production | Plan limits apply | Monthly fee; credits only as stated | fee=499; included usage=$0; concurrent=None; max session h=None | https://www.aptible.com |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.aptible.com |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.aptible.com |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.aptible.com |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.aptible.com |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.aptible.com |
## Verified billing facts and gotchas
1. Development $0 platform, Production $499/mo plus resources. General purpose $0.08/GB RAM-hour, CPU-optimized $0.10, RAM-optimized $0.05. vCPU ratios need confirmation. Endpoints $0.06/h; dedicated stacks $499/mo, VPN peer $99/mo; databases/backup extra. API gateway credits unrelated to compute.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/aptible
- https://www.aptible.com/
- https://www.aptible.com/pricing
- https://www.aptible.com/docs/getting-started/home
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.