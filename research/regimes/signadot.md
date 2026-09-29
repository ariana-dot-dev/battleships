# Signadot — regimes (2026-09-28)
YC: Winter 2020; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/signadot
Kubernetes sandboxes and validation
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.signadot.com/ |
| Starter | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$None; concurrent=None; max session h=None | https://www.signadot.com/ |
| Business | Plan limits apply | Monthly fee; credits only as stated | fee=250; included usage=$None; concurrent=None; max session h=None | https://www.signadot.com/ |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.signadot.com/ |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.signadot.com/ |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.signadot.com/ |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.signadot.com/ |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.signadot.com/ |
## Verified billing facts and gotchas
1. Free 50 sandbox creates/100 tests/10 devboxes; Business $250/mo includes 100 creates/200 tests/15 concurrent devboxes. Add-ons sold in blocks; max Business $2050 excluding $250 SSO. BYO Kubernetes host costs separate. Devboxes count integrated workstations/CDEs, not purchased VMs.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/signadot
- https://www.signadot.com/
- https://www.signadot.com/pricing/
- https://www.signadot.com/docs/overview
- https://www.signadot.com/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.