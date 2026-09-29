# OneCLI — regimes (2026-09-28)
YC: Summer 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/onecli
Isolated VM per employee / AI teammates
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://onecli.sh |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$None; concurrent=None; max session h=None | https://onecli.sh |
| Team BYOK | Plan limits apply | Monthly fee; credits only as stated | fee=149; included usage=$None; concurrent=None; max session h=None | https://onecli.sh |
| Scale BYOK | Plan limits apply | Monthly fee; credits only as stated | fee=499; included usage=$None; concurrent=None; max session h=None | https://onecli.sh |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://onecli.sh |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://onecli.sh |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://onecli.sh |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://onecli.sh |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://onecli.sh |
## Verified billing facts and gotchas
1. Free 3 seats/3 agents/500 calls and $5 AI credit; Team displayed $149 for 5 seats/10 agents with BYO key, Scale $499/10 seats/20 agents and $49 extra user. Model toggle changes totals; values not unconditional all-model subscription. VM shape and runtime caps unknown.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/onecli
- https://onecli.sh/
- https://onecli.sh/pricing
- https://onecli.sh/docs
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.