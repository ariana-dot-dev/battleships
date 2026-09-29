# Dexto — regimes (2026-09-28)
YC: Winter 2025; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/dexto
Persistent cloud computer / sandbox API
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.dexto.ai/docs/models/ |
| Prepaid usage | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=1; max session h=None | https://www.dexto.ai/docs/models/ |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.dexto.ai/docs/models/ |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.dexto.ai/docs/models/ |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.dexto.ai/docs/models/ |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.dexto.ai/docs/models/ |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.dexto.ai/docs/models/ |
## Verified billing facts and gotchas
1. Rendered pricing links through /docs/pricing to Services billing: Sandbox managed compute $0.414/hour while running. CPU/RAM allocation not specified, so not normalized to 4/8.
2. Public API permits one primary Linux sandbox per user; repeated create returns the same resource. Pause stops active compute charges while retaining workspace; visual desktop is not a separate public API resource.
3. Free $5 one-time; Pro displayed $25 is top-up credit, not a monthly fee. Credits also fund tokens/media/connections; dedicated GPU/model services available on request.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
8,800 native sandbox-hours ×$0.414=$3,643.20 before storage/network/models, but a user gets only one primary sandbox, so 50 concurrent is NOT supported by the documented self-serve API. Hardware shape and enterprise fleet terms unknown.
## Sources and coverage
- https://www.ycombinator.com/companies/dexto
- https://www.dexto.ai/docs/models/
- https://www.dexto.ai/docs/platform/api/sandboxes/
- https://www.dexto.ai/pricing/
- https://www.dexto.ai/docs/
- https://www.dexto.ai/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.