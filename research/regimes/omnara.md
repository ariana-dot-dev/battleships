# Omnara — regimes (2026-09-28)
YC: Summer 2025; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/omnara
The Open-Source Alternative to Claude Managed Agents
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Managed machines | Native: $0.0414/GiB-memory-h + $0.20016/GiB-memory/30d retention. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.omnara.com/pricing |
| Self-serve | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://www.omnara.com/pricing |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.omnara.com/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.omnara.com/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.omnara.com/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.omnara.com/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.omnara.com/pricing |
## Verified billing facts and gotchas
1. Runtime $0.0414 per GiB memory-hour online. Retention $0.20016 per GiB MEMORY per 30 days, not disk GiB. CPU capacity-to-memory mapping unverified.
2. Idle sleep preserves data and pauses runtime; retaining machine still costs. BYO models/machines and Apache-2.0 self-hosting have $0 platform fee, but own compute/model bills remain.
3. Card resource prices left null because memory-only tariff cannot prove 4 requested vCPUs and retention cannot be represented as snapshot-disk storage.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
If an 8 GiB machine meets CPU needs, online time is 8,800×8×$0.0414=$2,914.56; 50×8 GiB retained for 30 days adds $80.064. $2,994.62 before models/network; CPU sizing and separate 50 GiB snapshot capability are unknown.
## Sources and coverage
- https://www.ycombinator.com/companies/omnara
- https://www.omnara.com/pricing
- https://docs.omnara.com/machines/overview
- https://www.omnara.com/
- https://www.omnara.com/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.