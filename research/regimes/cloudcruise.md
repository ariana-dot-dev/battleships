# CloudCruise — regimes (2026-09-28)
YC: Winter 2024; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/cloudcruise
The developer platform for fast and reliable browser agents
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Managed browser service | Session tariff cannot be normalized to 4 vCPU/8 GiB without guaranteed resource specifications. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://cloudcruise.com/pricing |
| Starter | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://cloudcruise.com/pricing |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=700; included usage=$0; concurrent=None; max session h=None | https://cloudcruise.com/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://cloudcruise.com/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://cloudcruise.com/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://cloudcruise.com/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://cloudcruise.com/pricing |
## Verified billing facts and gotchas
1. Starter includes 2 automation-hours then $3/hour. Enterprise $700/month; workflow maintenance and model runtime differ from raw browser hosting. CPU/RAM unspecified.
2. No invented browser vCPU or memory allocation: normalized 4/8 rate remains null. Proxy traffic is not necessarily equivalent to sandbox egress.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
A 4-vCPU/8-GiB VM is not established by the browser offering. For 8,800 browser-hours only, native usage is $26,400.00 before plan credits, proxy data, model costs and session/concurrency restrictions.
## Sources and coverage
- https://www.ycombinator.com/companies/cloudcruise
- https://cloudcruise.com/pricing
- https://cloudcruise.com/
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.