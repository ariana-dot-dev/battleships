# Rescale — regimes (2026-09-28)
YC: Winter 2012; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/rescale
Managed HPC/batch/custom applications
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://rescale.com |
| Current applicable tariff unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://rescale.com |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://rescale.com |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://rescale.com |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://rescale.com |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://rescale.com |
## Verified billing facts and gotchas
1. Public HPC CPU/GPU platform with simulation and custom software, multi-cloud and enterprise features. Current prices request quote and depend hardware/software licensing; no universal 4/8 hourly list rate. App licenses may dominate total.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/rescale
- https://rescale.com/
- https://rescale.com/pricing/
- https://rescale.com/documentation/
- https://rescale.com/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.