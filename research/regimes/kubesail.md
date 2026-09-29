# KubeSail — regimes (2026-09-28)
YC: Summer 2019; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/kubesail
Kubernetes self-hosting platform
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native service | Hardware and complete resource tariff unverified. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://kubesail.com |
| Custom / unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://kubesail.com |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://kubesail.com |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://kubesail.com |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://kubesail.com |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://kubesail.com |
## Verified billing facts and gotchas
1. Home self-hosting product; /pricing 404. Customer devices/clusters and hosted relay/control plane are different. No verified standalone cloud sandbox compute rate.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/kubesail
- https://kubesail.com/
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.