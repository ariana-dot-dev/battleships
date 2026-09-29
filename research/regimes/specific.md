# Specific — regimes (2026-09-28)
YC: Fall 2025; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/specific
The cloud platform built for coding agents
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Hosted services | alt | sizes; CPU alloc, memory alloc | Tiny: 0.25 vCPU/0.5 GiB $0.009/h; Small: 1 vCPU/2 GiB $0.025/h; Medium: 2 vCPU/4 GiB $0.12/h; Large: 4 vCPU/8 GiB $0.24/h; XL: 4 vCPU/16 GiB $0.32/h; 2XL: 8 vCPU/32 GiB $0.62/h | https://specific.dev/pricing |
| Pro | Plan limits apply | Monthly fee; credits only as stated | fee=25; included usage=$25; concurrent=None; max session h=None | https://specific.dev/pricing |
| Scale | Plan limits apply | Monthly fee; credits only as stated | fee=299; included usage=$299; concurrent=None; max session h=None | https://specific.dev/pricing |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://specific.dev/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | $0.15 | https://specific.dev/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://specific.dev/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | $0.09 | https://specific.dev/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://specific.dev/pricing |
## Verified billing facts and gotchas
1. Services (web/workers/cron) priced separately from managed Postgres, workflows and object storage; those are not interchangeable compute units. Pro $25 and Scale $299 are usage-credit fees.
2. Free service is only 0.25 vCPU/512 MB, not general 4/8. Raw usage card excludes database and workflow charges.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Large: 8,800×$0.24=$2,112. Pro $25 includes $25; 100 GB egress adds $9. If 50 GB are eligible persistent volume storage, add $7.50; snapshots specifically unknown. Subtotal $2,128.50 excluding databases and workflow actions; session/concurrency eligibility unverified.
## Sources and coverage
- https://www.ycombinator.com/companies/specific
- https://specific.dev/pricing
- https://docs.specific.dev
- https://specific.dev/
- https://specific.dev/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.