# Manufact — regimes (2026-09-28)
YC: Summer 2025; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/manufact
Hosted MCP servers
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://manufact.com |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$5; concurrent=None; max session h=None | https://manufact.com |
| Hobby monthly | Plan limits apply | Monthly fee; credits only as stated | fee=30; included usage=$30; concurrent=None; max session h=None | https://manufact.com |
| Startup monthly | Plan limits apply | Monthly fee; credits only as stated | fee=300; included usage=$300; concurrent=None; max session h=None | https://manufact.com |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://manufact.com |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://manufact.com |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://manufact.com |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://manufact.com |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://manufact.com |
## Verified billing facts and gotchas
1. Monthly Hobby $30 with $30 credits, Startup $300 with $300; annual $25/$250 monthly equivalent. Free $5 monthly. Plan credits also pay other platform services. Enterprise starts $1000/mo. Usage breakdown must separate runtime, requests, inspection, logs and tests; pricing page raw dump retained.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/manufact
- https://manufact.com/
- https://manufact.com/pricing
- https://docs.manufact.com/dashboard
- https://manufact.com/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.