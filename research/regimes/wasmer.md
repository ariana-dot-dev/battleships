# Wasmer — regimes (2026-09-28)
YC: Summer 2019; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/wasmer
The Operating System for Edge Computing
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| WebAssembly Edge | alt | resource; CPU active, memory alloc | $0.1/vCPU-h + $0.01/GiB-h; multiplier 1 | https://wasmer.io/pricing |
| Pro | Plan limits apply | Monthly fee; credits only as stated | fee=10; included usage=$0; concurrent=None; max session h=None | https://wasmer.io/pricing |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://wasmer.io/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | $0.05 | https://wasmer.io/pricing |
| Snapshots / GiB-month | No user snapshot product; InstaBoot warm-up snapshots are automatic | Not priced on the pricing page | n/a; database backups: 1/day on Pro, then $0.20 per backup | https://wasmer.io/pricing |
| Egress / GiB | After 150 GB included | Native add-on | $0.1 | https://wasmer.io/pricing |
| Dedicated IPv4 / month | Pro includes 1 | Native add-on | $1 per extra IP | https://wasmer.io/pricing |
## Verified billing facts and gotchas
1. Pricing uses active CPU plus provisioned memory.
2. Pro includes separate 6 active CPU-hours, 400 GB-hours memory, 150 GB bandwidth, 1 GB volume and package storage, 1M requests and 1000 build-minutes. These category-specific allowances cannot be collapsed into fully fungible credits.
3. Pro $10/mo; extra seats $5, app beyond 100 $0.25, requests $0.50/M, builds $0.005/min, volumes/packages $0.05/GB-month; databases and backups separate.
4. Regions: the pricing page lists 12 global regions (checked 2026-11-08). The regions docs list 6 (France, Germany, Canada, three US).
5. No fork of a running instance. InstaBoot boots new instances from a warm-up snapshot of the app version (https://docs.wasmer.io/edge/learn/instaboot).
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
30% active CPU and full provisioned memory: 8,800×(4×0.3×$0.10+8×$0.01)=$1,760. Subtract separate 6×$0.10 +400×$0.01 allowances, add $10 Pro = $1,765.40 before storage/requests/builds. 100 GB egress fits 150 GB. A 4/8 interactive machine is not assured; this is resource arithmetic, not a feasibility guarantee.
## Sources and coverage
- https://www.ycombinator.com/companies/wasmer
- https://wasmer.io/pricing
- https://wasmer.io/
- https://wasmer.io/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.