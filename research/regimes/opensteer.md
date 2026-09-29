# Opensteer — regimes (2026-09-28)
YC: Summer 2023; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/opensteer
Specialized agents for real work
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Managed browser service | Session tariff cannot be normalized to 4 vCPU/8 GiB without guaranteed resource specifications. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://opensteer.com/pricing |
| Developer | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$5; concurrent=None; max session h=None | https://opensteer.com/pricing |
| Starter | Plan limits apply | Monthly fee; credits only as stated | fee=50; included usage=$50; concurrent=None; max session h=None | https://opensteer.com/pricing |
| Business | Plan limits apply | Monthly fee; credits only as stated | fee=200; included usage=$200; concurrent=None; max session h=None | https://opensteer.com/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://opensteer.com/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://opensteer.com/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://opensteer.com/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://opensteer.com/pricing |
## Verified billing facts and gotchas
1. Browser and computer runtime each $0.20/h. Model and platform credits are distinct; $5/$25/$100 model credits must not offset compute. BYO Claude/ChatGPT subscription agent claim does not establish free underlying 4/8 VM.
2. No invented browser vCPU or memory allocation: normalized 4/8 rate remains null. Proxy traffic is not necessarily equivalent to sandbox egress.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
A 4-vCPU/8-GiB VM is not established by the browser offering. For 8,800 browser-hours only, native usage is $1,760.00 before plan credits, proxy data, model costs and session/concurrency restrictions.
## Sources and coverage
- https://www.ycombinator.com/companies/opensteer
- https://opensteer.com/pricing
- https://opensteer.com/
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.