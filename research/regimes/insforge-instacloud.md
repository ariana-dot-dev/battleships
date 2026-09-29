# InsForge (InstaCloud) — regimes (2026-09-28)
YC: Spring 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/insforge-instacloud
Custom Compute plus backend service
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://insforge.dev/ |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$None; concurrent=None; max session h=None | https://insforge.dev/ |
| Pro monthly | Plan limits apply | Monthly fee; credits only as stated | fee=25; included usage=$None; concurrent=None; max session h=None | https://insforge.dev/ |
| Pro annual equivalent | Plan limits apply | Monthly fee; credits only as stated | fee=20; included usage=$None; concurrent=None; max session h=None | https://insforge.dev/ |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://insforge.dev/ |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://insforge.dev/ |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://insforge.dev/ |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://insforge.dev/ |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://insforge.dev/ |
## Verified billing facts and gotchas
1. Pro $25 monthly/$20 annual with $10 InsForge Compute credits; backend compute is specifically API+Postgres, NOT Custom Compute. Public table 4vCPU/16GB $0.2144/h describes backend project server. Do not price arbitrary containers at it. Custom Compute has separate usage billing, current rate unresolved; free 120h default custom compute. Backend bandwidth 250GB then $0.09/GB.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/insforge-instacloud
- https://insforge.dev/
- https://insforge.dev/pricing
- https://insforge.dev/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.