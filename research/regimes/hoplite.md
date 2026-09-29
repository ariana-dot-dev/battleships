# Hoplite — regimes (2026-09-28)
YC: Summer 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/hoplite
Cloud coding agent sessions
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native service | Hardware and complete resource tariff unverified. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://hoplite.sh |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$None; concurrent=5; max session h=None | https://hoplite.sh |
| Pro monthly one seat | Plan limits apply | Monthly fee; credits only as stated | fee=99; included usage=$None; concurrent=None; max session h=None | https://hoplite.sh |
| Enterprise annual | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://hoplite.sh |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://hoplite.sh |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://hoplite.sh |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://hoplite.sh |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://hoplite.sh |
## Verified billing facts and gotchas
1. Free 5 concurrent 2CPU/8GB sessions, 2 projects, card required but no charge. Pro $99/seat monthly or $82.50/seat with annual commitment, credits/limits not quantified. Enterprise annual custom. Free 2-CPU offer cannot satisfy 4-CPU workload; no public unit rate.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/hoplite
- https://hoplite.sh/
- https://hoplite.sh/pricing
- https://hoplite.sh/docs
- https://hoplite.sh/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.