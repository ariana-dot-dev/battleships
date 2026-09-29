# HUD — regimes (2026-09-28)
YC: Winter 2025; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/hud
HUD RL environments
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native service | Hardware and complete resource tariff unverified. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.hud.ai/ |
| Custom / unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.hud.ai/ |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.hud.ai/ |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.hud.ai/ |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.hud.ai/ |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.hud.ai/ |
## Verified billing facts and gotchas
1. Official website pricing: SDK/platform free; Cloud $0.10/environment-hour, 100+ parallel instances, $10 free credits. Enterprise custom adds 24h runtime and training; academic grant $100 conditional. CPU/RAM allocation unspecified, so environment-hour not a 4/8 VM guarantee.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
8,800 environment-hours ×$0.10=$880 before enterprise runtime limits or other charges. CPU/RAM shape is unspecified; 8h sessions may need Enterprise because the website reserves extended 24h runtime for it. Not a 4/8 price quote.
## Sources and coverage
- https://www.ycombinator.com/companies/hud
- https://www.hud.ai/
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.