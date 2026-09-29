# Agent Relay — regimes (2026-09-28)
YC: Fall 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/agent-relay
Coding-agent fleet infrastructure
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://agentrelay.com |
| Current applicable tariff unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://agentrelay.com |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://agentrelay.com |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://agentrelay.com |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://agentrelay.com |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://agentrelay.com |
## Verified billing facts and gotchas
1. Public open-source agent communication/runtime platform and cloud factory. /pricing 404; no verified per-sandbox tariff. Self-hosting does not include host compute. Do not use decorative CLI examples in 404 page as evidence.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/agent-relay
- https://agentrelay.com/
- https://agentrelay.com/docs/introduction
- https://agentrelay.com/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.