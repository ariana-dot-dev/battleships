# Skyvern — regimes (2026-09-28)
YC: Summer 2023; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/skyvern
Open Source AI Agent to automate browser workflows via an API
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Managed browser service | Session tariff cannot be normalized to 4 vCPU/8 GiB without guaranteed resource specifications. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.skyvern.com/pricing |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=1; max session h=None | https://www.skyvern.com/pricing |
| Hobby | Plan limits apply | Monthly fee; credits only as stated | fee=29; included usage=$None; concurrent=10; max session h=None | https://www.skyvern.com/pricing |
| Pro | Plan limits apply | Monthly fee; credits only as stated | fee=149; included usage=$None; concurrent=25; max session h=None | https://www.skyvern.com/pricing |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=100; max session h=None | https://www.skyvern.com/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.skyvern.com/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.skyvern.com/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.skyvern.com/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.skyvern.com/pricing |
## Verified billing facts and gotchas
1. Free 5,000 credits once; Hobby 30,000/month, Pro 150,000/month. Actions have variable credit use; no invariant credit-to-CPU-hour conversion. Enterprise enables custom code blocks and HIPAA; Pro SMS $10/number/month.
2. No invented browser vCPU or memory allocation: normalized 4/8 rate remains null. Proxy traffic is not necessarily equivalent to sandbox egress.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
A 4-vCPU/8-GiB VM is not established by the browser offering. Native plan/runtime billing is documented above; no honest general-VM monthly total can be calculated.
## Sources and coverage
- https://www.ycombinator.com/companies/skyvern
- https://www.skyvern.com/pricing
- https://www.skyvern.com/
- https://www.skyvern.com/docs
- https://www.skyvern.com/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.