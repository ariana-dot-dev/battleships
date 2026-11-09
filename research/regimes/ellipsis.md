# Ellipsis — regimes (2026-11-08)
YC: Winter 2024; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/ellipsis
Cloud platform for coding agents
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand | Public listed mode | resource; CPU alloc, memory alloc; per second; paused = not billed | $0.0504/CPU core-h + $0.0162/GiB-h (docs); multiplier 1.1 (10% fee on credit purchases) | https://www.ellipsis.dev/docs/pricing.md |
| On-demand (marketing page) | Same mode; the two official pages conflict | same | $0.142/vCPU-h + $0.024/GB-h | https://www.ellipsis.dev/pricing |
| Own AWS VPC | AWS infrastructure plus 10% token cost; rates depend on AWS. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.ellipsis.dev/pricing |
| Managed usage | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; per seat=$0 | https://www.ellipsis.dev/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.ellipsis.dev/docs/pricing.md |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.ellipsis.dev/docs/pricing.md |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.ellipsis.dev/docs/pricing.md |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.ellipsis.dev/docs/pricing.md |
## Verified billing facts and gotchas
1. Docs rates: $0.0504 per CPU core-hour and $0.0162 per GiB-hour, billed per second while an environment runs and while it waits for the next message. A paused environment is not billed. The card prices 1 core = 1 vCPU, because the schema sizes compute in vCPUs and publishes no conversion.
2. The marketing pricing page still shows $0.142/vCPU-hour and $0.024/GB-hour. The two official pages conflict.
3. A 10% platform fee applies to credit purchases before discounts. No per-seat fee. No current page says compute is free on personal accounts.
4. compute.timeout caps one message's work at 1 min to 22 h (default 4 h). compute.idle (10 s to 1 h, default 10 min) then pauses the environment; the next message resumes it with its files and processes. Nothing runs while paused.
5. BYOC uses customer AWS compute and 10% token platform fee; cannot reuse SaaS resource rates. Support $5k/$10k/$15k per month is optional, not required plan.
6. YC mentions $100 credit; current pricing page did not confirm eligibility, so no unconditional free credit encoded.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Allocated active-session illustration at docs rates: 8,800×(4×0.0504+8×0.0162)=$2,915, ×1.1 fee = $3,206, plus model-token cost and unknown storage/network. At marketing-page rates: 8,800×(4×0.142+8×0.024)=$6,688, ×1.1 = $7,357. The workday fits only with compute.timeout raised to 8 h or more (default 4 h).
## Sources and coverage
- https://www.ycombinator.com/companies/ellipsis
- https://www.ellipsis.dev/pricing
- https://www.ellipsis.dev/docs/pricing.md
- https://www.ellipsis.dev/docs/environments/schema.md
- https://raw.githubusercontent.com/ellipsis-dev/cli/main/skills/ellipsis/SKILL.md
- https://www.ellipsis.dev/docs
- https://www.ellipsis.dev/
- https://www.ellipsis.dev/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.
