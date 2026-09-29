# Cerebrium — regimes (2026-09-28)
YC: Winter 2022; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/cerebrium
Serverless Infrastructure Platform for AI
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Interruptible | spot, alt | resource; CPU alloc, memory alloc | $0.02358/vCPU-h + $0.007992/GiB-h; multiplier 1 | https://cerebrium.ai/pricing |
| Protected compute | alt | resource; CPU alloc, memory alloc | $0.02358/vCPU-h + $0.007992/GiB-h; multiplier 2 | https://cerebrium.ai/pricing |
| Hobby | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=500; max session h=None | https://cerebrium.ai/pricing |
| Standard | Plan limits apply | Monthly fee; credits only as stated | fee=100; included usage=$0; concurrent=1000; max session h=None | https://cerebrium.ai/pricing |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://cerebrium.ai/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | $0.05 | https://cerebrium.ai/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://cerebrium.ai/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://cerebrium.ai/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://cerebrium.ai/pricing |
## Verified billing facts and gotchas
1. CPU $0.00000655/vCPU-s, RAM $0.00000222/GB-s. Hardware docs say actual CPU/memory usage; pricing FAQ also says resources allocated while processing. Record utilization ambiguity rather than promise savings.
2. Default interruptible tier can be preempted or consolidated. Protected tier costs 2× all compute including GPU, CPU and RAM; storage unaffected.
3. Storage first 100 GB free then $0.05/GB-month. Standard $100 is plus compute (no stated credits). Pricing comparison conflicts on Standard seats and Hobby log retention.
4. GPU listed per-second rates converted without rounding to marketing hourly approximations.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Conservative allocated-resource scenario: 8,800×(4×0.02358+8×0.007992)=$1,392.65 interruptible, or $2,785.31 protected. If CPU is truly utilization-metered, 30% CPU/full RAM gives $811.64/$1,623.29. Storage 50 GB fits the 100 GB persistent-volume allowance only if it is eligible volume data, not automatically snapshot storage. Egress and snapshot charges remain unknown.
## Sources and coverage
- https://www.ycombinator.com/companies/cerebrium
- https://cerebrium.ai/pricing
- https://cerebrium.ai/docs/hardware/cpu-and-memory
- https://cerebrium.ai/docs/llms-full.txt
- https://cerebrium.ai/
- https://cerebrium.ai/docs/getting-started/introduction
- https://cerebrium.ai/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.