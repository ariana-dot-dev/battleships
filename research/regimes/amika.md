# Amika — regimes (2026-09-28)
YC: Fall 2025; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/amika
Infra to build your own software factory
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand | Public listed mode | resource; CPU alloc, memory alloc | $0.1008/vCPU-h + $0.0324/GiB-h; multiplier 1 | https://www.amika.dev/pricing |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$5; concurrent=2; max session h=None | https://www.amika.dev/pricing |
| Developer (one user) | Plan limits apply | Monthly fee; credits only as stated | fee=30; included usage=$15; concurrent=10; max session h=None | https://www.amika.dev/pricing |
| Team (one user) | Plan limits apply | Monthly fee; credits only as stated | fee=100; included usage=$50; concurrent=None; max session h=None | https://www.amika.dev/pricing |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.amika.dev/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.amika.dev/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.amika.dev/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.amika.dev/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.amika.dev/pricing |
## Verified billing facts and gotchas
1. BYO LLM keys; no token markup. Allocated-vs-utilized CPU wording not specified: conservatively model allocated.
2. Storage table conflicts by 10×: $0.00216/GiB-h vs $0.00000006/GiB-s (= $0.000216/h). Keep storage rate null pending clarification.
3. Per-user plan credits apply CPU/RAM/storage; Developer $30/user includes $15, Team $100/user includes $50. Concurrency Developer 10/user, Team advertised unlimited.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
One Team seat meets advertised concurrency: $100+8,800×$0.6624−$50=$5,879.12 before disputed storage and unknown egress. Five Developer seats give 50 slots and $75 credits for $150 fee, costing $5,904.12 before extras. LLM spend separate.
## Sources and coverage
- https://www.ycombinator.com/companies/amika
- https://www.amika.dev/pricing
- https://docs.amika.dev
- https://www.amika.dev/
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.