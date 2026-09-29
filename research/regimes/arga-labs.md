# Arga Labs — regimes (2026-09-28)
YC: Spring 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/arga-labs
Service twins and test sandboxes
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.argalabs.com/ |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$None; concurrent=None; max session h=None | https://www.argalabs.com/ |
| Pro | Plan limits apply | Monthly fee; credits only as stated | fee=1250; included usage=$None; concurrent=None; max session h=None | https://www.argalabs.com/ |
| Team | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.argalabs.com/ |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.argalabs.com/ |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.argalabs.com/ |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.argalabs.com/ |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.argalabs.com/ |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.argalabs.com/ |
## Verified billing facts and gotchas
1. Free 10 twins/mo and 10min runs; Pro $1250/mo with 1500 runs, 30k long-running twin minutes, 1500 CI checks; Team from $3500 quote-adjusted, Enterprise custom/on-prem. Not a raw 4/8 sandbox rate; stateful API twins have different units.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/arga-labs
- https://www.argalabs.com/
- https://www.argalabs.com/pricing
- https://www.argalabs.com/docs
- https://www.argalabs.com/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.