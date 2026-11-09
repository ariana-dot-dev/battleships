# Replicas — regimes (2026-09-28)
YC: Spring 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/replicas
Cloud coding-agent VMs
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Team Flex manual workspaces | For manual workspaces only; automated/API usage has separate billing. | sizes; CPU alloc, memory alloc | Team: 4 vCPU/16 GiB $0.96/h | https://replicas.dev |
| Team Flex | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://replicas.dev |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://replicas.dev |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://replicas.dev |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://replicas.dev |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://replicas.dev |
## Update 2026-11-08 (supersedes the seat-model rows above)
- Usage plans: Developer $50/month, Team $200+ in $100 steps; each fee is included usage. Per minute (included / overage 1.5x): small 2 vCPU/8 GB $0.004 / $0.006, large 4 vCPU/16 GB $0.008 / $0.012, ultra 8 vCPU/32 GB $0.016 / $0.024; Auto bills each minute at the size it ran at. Source: https://docs.replicas.dev/admin/billing
- Static egress IP traffic: $0.15/GB. No other egress price. Source: https://docs.replicas.dev/admin/billing
- Lifecycle: sleep after 30 min idle; archived after 7 days asleep, then deleted about 30 minutes later; a hand-archived workspace is deleted 3 days after archive. API, MCP and new automation workspaces are deleted when the agent finishes. Sources: https://docs.replicas.dev/features/workspaces/overview, https://docs.replicas.dev/changelog
- GPU sandboxes (T4 to 8x B200) run as separate jobs, billed at cost. Source: https://docs.replicas.dev/features/gpu-sandboxes
## Verified billing facts and gotchas (2026-09-28, superseded)
1. Developer Flex $0.008/min ($0.48/h), Team Flex $0.016/min ($0.96/h). Full seats $50/150h and $200/unlimited MANUAL time; APIs/automations billed separately. Team documented 4vCPU/16GB/32GB disk. Unlimited seat runtime is not free API fleets; exact automation rates require billing docs.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Team Flex 4/16 raw manual runtime: 8,800×$0.96=$8,448. A $200 full seat has unlimited manual minutes, not unlimited automation, API use or 50 parallel workspaces. Workload eligibility is not established; do not quote $200 for the fleet.
## Sources and coverage
- https://www.ycombinator.com/companies/replicas
- https://replicas.dev/
- https://replicas.dev/pricing
- https://replicas.dev/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.