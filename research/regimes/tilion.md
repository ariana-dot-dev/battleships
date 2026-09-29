# Tilion — regimes (2026-09-28)
YC: Fall 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/tilion
Super fast, unblockable browser infra for agents
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Managed browser service | Session tariff cannot be normalized to 4 vCPU/8 GiB without guaranteed resource specifications. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://tilion.com/pricing |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=3; max session h=None | https://tilion.com/pricing |
| Developer | Plan limits apply | Monthly fee; credits only as stated | fee=19.99; included usage=$0; concurrent=15; max session h=None | https://tilion.com/pricing |
| Pro | Plan limits apply | Monthly fee; credits only as stated | fee=99.99; included usage=$0; concurrent=50; max session h=None | https://tilion.com/pricing |
| Scale | Plan limits apply | Monthly fee; credits only as stated | fee=499; included usage=$0; concurrent=200; max session h=None | https://tilion.com/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://tilion.com/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://tilion.com/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://tilion.com/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://tilion.com/pricing |
## Verified billing facts and gotchas
1. Browser infrastructure: concurrency tiers and runtime-overage billing advertised; verify full duration/overage details in raw evidence. CPU/RAM allocation not documented.
2. No invented browser vCPU or memory allocation: normalized 4/8 rate remains null. Proxy traffic is not necessarily equivalent to sandbox egress.
3. Free includes 10h/500MB/100 sessions; Developer 100h/2GB, Pro 500h/10GB, Scale 5000h/35GB. Numeric overage rate not on captured page; plans say contact us.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
A 4-vCPU/8-GiB VM is not established by the browser offering. Native plan/runtime billing is documented above; no honest general-VM monthly total can be calculated.
## Sources and coverage
- https://www.ycombinator.com/companies/tilion
- https://tilion.com/pricing
- https://tilion.com/
- https://tilion.com/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.