# Windmill — regimes (2026-09-28)
YC: Summer 2022; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/windmill
Open-source platform to turn scripts into internal apps & workflows
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Cloud Team execution credits | alt | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.windmill.dev/pricing |
| Dedicated Cloud Enterprise | sales, alt | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.windmill.dev/pricing |
| Self-hosted software | alt | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.windmill.dev/pricing |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://www.windmill.dev/pricing |
| Team one developer | Plan limits apply | Monthly fee; credits only as stated | fee=10; included usage=$0; concurrent=None; max session h=None | https://www.windmill.dev/pricing |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.windmill.dev/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.windmill.dev/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.windmill.dev/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.windmill.dev/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.windmill.dev/pricing |
## Verified billing facts and gotchas
1. Cloud and self-hosted toggles have different economics; raw server HTML defaults self-hosted. Cloud rendered separately: Free 1000 executions/mo, Team $10/developer ($5/operator), 10k normalized 1-second executions/seat and max 10 seats.
2. Cloud Enterprise core $600/mo, $40/developer/$20/operator, $100/CU-month. Default 2 workers+8 native subworkers+1 developer = $940; advertised minimum from $840. Self-hosted Enterprise $50/CU plus $20/developer is a software license, not hosted hardware.
3. CU sizing depends workers/memory/native subworkers; 4-vCPU/8GB per session is not equivalent to four pooled workflow execution slots. Snapshot/network price not verified.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
50 simultaneous 4/8 executions would require 200 vCPU/400 GiB, but the calculator prices persistent worker capacity and memory-based CUs, not time-used sandboxes. A valid bill needs worker groups/CU mapping and workflow duration normalization. No honest total from 8,800 hours alone.
## Sources and coverage
- https://www.ycombinator.com/companies/windmill
- https://www.windmill.dev/pricing
- https://www.windmill.dev/docs/intro
- https://www.windmill.dev/
- https://www.windmill.dev/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.