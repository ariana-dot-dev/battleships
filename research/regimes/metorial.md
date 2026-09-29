# Metorial — regimes (2026-09-28)
YC: Fall 2025; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/metorial
Managed MCP runtime/integrations
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native service | Hardware and complete resource tariff unverified. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://metorial.com |
| Dev | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$None; concurrent=None; max session h=None | https://metorial.com |
| Scale | Plan limits apply | Monthly fee; credits only as stated | fee=250; included usage=$None; concurrent=None; max session h=None | https://metorial.com |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://metorial.com |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://metorial.com |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://metorial.com |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://metorial.com |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://metorial.com |
## Verified billing facts and gotchas
1. Free 500k tool calls/month, Scale $250/month includes 2.5M calls and 20 seats, then $20/seat; extra calls $1/1500, callbacks $1/750. Does not guarantee arbitrary-code CPU/RAM hours; fair-use applies even to unlimited sessions. EU/US hosted, open-source self-hosting and enterprise on-prem.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/metorial
- https://metorial.com/
- https://metorial.com/pricing
- https://metorial.com/docs
- https://metorial.com/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.