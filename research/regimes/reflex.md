# Reflex — regimes (2026-09-28)
YC: Winter 2023; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/reflex
Python application cloud hosting
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Hosted Python apps | alt | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://reflex.dev/pricing/ |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$None; concurrent=None; max session h=None | https://reflex.dev/pricing/ |
| Pro 25 | Plan limits apply | Monthly fee; credits only as stated | fee=25; included usage=$25; concurrent=None; max session h=None | https://reflex.dev/pricing/ |
| Pro 50 | Plan limits apply | Monthly fee; credits only as stated | fee=50; included usage=$50; concurrent=None; max session h=None | https://reflex.dev/pricing/ |
| Pro 100 | Plan limits apply | Monthly fee; credits only as stated | fee=100; included usage=$100; concurrent=None; max session h=None | https://reflex.dev/pricing/ |
| Pro 200 | Plan limits apply | Monthly fee; credits only as stated | fee=200; included usage=$200; concurrent=None; max session h=None | https://reflex.dev/pricing/ |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://reflex.dev/pricing/ |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://reflex.dev/pricing/ |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://reflex.dev/pricing/ |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://reflex.dev/pricing/ |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://reflex.dev/pricing/ |
## Verified billing facts and gotchas
1. Free 1 published app with periodically refilled limited usage. Pro $25/$50/$100/$200 monthly allowance shared by AI generation and hosting. No session limits does not mean unlimited CPU-hours.
2. Shared/dedicated deployment sizes and regions offered but no per-vCPU/RAM list tariff on pricing page. Enterprise on own Google Cloud, SSO, on-prem and air-gap options quote. Open-source Apache-2.0 framework is not free managed infrastructure.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/reflex
- https://reflex.dev/pricing/
- https://reflex.dev/docs
- https://reflex.dev/
- https://reflex.dev/docs/
- https://reflex.dev/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.