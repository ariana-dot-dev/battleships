# Smooth — regimes (2026-09-28)
YC: Fall 2024; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/smooth
Fast, simple, reliable AI browser agent
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Managed browser service | Session tariff cannot be normalized to 4 vCPU/8 GiB without guaranteed resource specifications. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.smooth.sh/pricing |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=2; max session h=None | https://www.smooth.sh/pricing |
| Starter | Plan limits apply | Monthly fee; credits only as stated | fee=50; included usage=$50; concurrent=10; max session h=None | https://www.smooth.sh/pricing |
| Growth | Plan limits apply | Monthly fee; credits only as stated | fee=500; included usage=$500; concurrent=50; max session h=None | https://www.smooth.sh/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.smooth.sh/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.smooth.sh/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.smooth.sh/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.smooth.sh/pricing |
## Verified billing facts and gotchas
1. Browser agent step $0.005; plans include API credits, not guaranteed browser CPU/RAM hours. Free welcome credit amount not stated; Enterprise custom. A step-to-hours conversion cannot be inferred.
2. No invented browser vCPU or memory allocation: normalized 4/8 rate remains null. Proxy traffic is not necessarily equivalent to sandbox egress.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
A 4-vCPU/8-GiB VM is not established by the browser offering. Native plan/runtime billing is documented above; no honest general-VM monthly total can be calculated.
## Sources and coverage
- https://www.ycombinator.com/companies/smooth
- https://www.smooth.sh/pricing
- https://www.smooth.sh/
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.