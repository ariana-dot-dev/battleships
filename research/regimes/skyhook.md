# Skyhook — regimes (2026-09-28)
YC: Winter 2023; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/skyhook
Managed Kubernetes PaaS / BYOC
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native service | Hardware and complete resource tariff unverified. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://skyhook.io |
| Free BYOC | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://skyhook.io |
| Premium monthly BYOC | Plan limits apply | Monthly fee; credits only as stated | fee=1000; included usage=$0; concurrent=None; max session h=None | https://skyhook.io |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://skyhook.io |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://skyhook.io |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://skyhook.io |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://skyhook.io |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://skyhook.io |
## Verified billing facts and gotchas
1. Free own-cloud 3 git users/3 services/1 cluster; Premium $1000/month up to 10 users/15 services/5 clusters, annual 20% off; Enterprise custom. Infrastructure cost is separate. YC mentions optional fully hosted cluster, but no specific host tariff verified.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/skyhook
- https://www.skyhook.io/
- https://www.skyhook.io/pricing
- https://www.skyhook.io/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.