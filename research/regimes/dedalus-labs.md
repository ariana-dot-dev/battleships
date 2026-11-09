# Dedalus Labs — regimes (2026-09-28)
YC: Summer 2025; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/dedalus-labs
Compute substrate for AI agents
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand | Public listed mode | resource; CPU alloc, memory alloc | $0.04536/vCPU-h + $0.01458/GiB-h; multiplier 1 | https://www.dedaluslabs.ai/pricing |
| Hobby | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=5; max session h=None | https://www.dedaluslabs.ai/pricing |
| Pro | Plan limits apply | Monthly fee; credits only as stated | fee=20; included usage=$20; concurrent=20; max session h=None | https://www.dedaluslabs.ai/pricing |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.dedaluslabs.ai/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | $0.073 | https://www.dedaluslabs.ai/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.dedaluslabs.ai/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.dedaluslabs.ai/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.dedaluslabs.ai/pricing |
## Verified billing facts and gotchas
1. VM with its own guest kernel (VM-level isolation); CPU/RAM charged per second while the machine runs, sleep is free. This is lifecycle-active, not CPU-utilization billing.
2. Storage is $0.0001/GiB-hour ($0.073 at 730 h), billed also while asleep. The included allowance is per plan, not per machine: Hobby 10 GiB, Pro 20 GiB expandable (https://docs.dedaluslabs.ai/dcs/dm/pricing.md, checked 2026-11-08).
3. Hobby: $20 one-time credit, 5 machines and a 50 compute-hours a month ceiling, so no machine runs all month on Hobby; Pro 20 machines, unlimited hours. Startups can get up to $10,000 in credits for 12 months. Fifty concurrent requires Enterprise, whose fee and rates are unknown. Pricing footer says join waitlist: public rates do not prove instant admission.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
List-rate compute illustration: 8,800×(4×0.04536+8×0.01458)=$2,623.10. 50 GiB storage at $0.0001/GiB-h ×730 adds $3.65. Not a purchasable total: Pro supports only 20 machines; 50 concurrent needs an Enterprise quote. Do not assume 30% CPU utilization yields 70% savings.
## Sources and coverage
- https://www.ycombinator.com/companies/dedalus-labs
- https://www.dedaluslabs.ai/pricing
- https://www.dedaluslabs.ai/blog/dedalus-machines-journey
- https://docs.dedaluslabs.ai/.well-known/skills/dedalus-machines/skill.md
- https://www.dedaluslabs.ai/
- https://www.dedaluslabs.ai/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.