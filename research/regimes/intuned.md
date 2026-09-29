# Intuned — regimes (2026-09-28)
YC: Summer 2022; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/intuned
Code-first scrapers and RPAs — built and maintained by AI
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Managed browser service | Session tariff cannot be normalized to 4 vCPU/8 GiB without guaranteed resource specifications. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://intunedhq.com/pricing |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=5; max session h=None | https://intunedhq.com/pricing |
| Developer | Plan limits apply | Monthly fee; credits only as stated | fee=25; included usage=$0; concurrent=25; max session h=None | https://intunedhq.com/pricing |
| Startup | Plan limits apply | Monthly fee; credits only as stated | fee=120; included usage=$0; concurrent=100; max session h=None | https://intunedhq.com/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://intunedhq.com/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://intunedhq.com/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://intunedhq.com/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://intunedhq.com/pricing |
## Verified billing facts and gotchas
1. Included standard compute 3/100/500 h; Developer excess $0.12/h, Startup $0.10/h. Large +$0.18/$0.15 per hour and XL +$0.48/$0.40. Job runs also $0.12/$0.10 beyond 100/400. API machine count is provisioned pool, not necessarily browser concurrency. Pricing and docs disagree on AI credit allowances; keep them separate from compute.
2. No invented browser vCPU or memory allocation: normalized 4/8 rate remains null. Proxy traffic is not necessarily equivalent to sandbox egress.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
A 4-vCPU/8-GiB VM is not established by the browser offering. Native plan/runtime billing is documented above; no honest general-VM monthly total can be calculated.
## Sources and coverage
- https://www.ycombinator.com/companies/intuned
- https://intunedhq.com/pricing
- https://intunedhq.com/docs/main/05-references/plans-and-billing
- https://intunedhq.com/
- https://intunedhq.com/docs/main/00-getting-started/introduction
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.