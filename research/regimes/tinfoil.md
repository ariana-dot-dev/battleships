# Tinfoil — regimes (2026-09-28)
YC: Spring 2025; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/tinfoil
Tinfoil Containers
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://tinfoil.sh |
| Current applicable tariff unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://tinfoil.sh |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://tinfoil.sh |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://tinfoil.sh |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://tinfoil.sh |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://tinfoil.sh |
## Verified billing facts and gotchas
1. Custom Docker workloads inside confidential enclaves are relevant separately from token inference and $20/mo chat. Containers pricing not published on captured pricing page. GPU confidential-compute support does not establish sandbox GPU-hour tariff.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/tinfoil
- https://tinfoil.sh/
- https://tinfoil.sh/pricing
- https://tinfoil.sh/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.