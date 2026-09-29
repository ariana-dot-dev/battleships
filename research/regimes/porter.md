# Porter — regimes (2026-09-28)
YC: Summer 2020; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/porter
Managed application platform on own cloud
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native service | Hardware and complete resource tariff unverified. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://porter.run |
| Custom / unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://porter.run |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://porter.run |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://porter.run |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://porter.run |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://porter.run |
## Verified billing facts and gotchas
1. Platform fee only: requested vCPU $0.019/h, memory $0.009/GB-h, minute prorated. Website monthly $13/$6 are rounded illustrative numbers. Underlying AWS/Azure/GCP NOT included; over 40vCPU/80GB negotiated discounts. Nonprofit 50% off conditional. Do not rank software surcharge as all-in compute.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Platform fee arithmetic 8,800×(4×$0.019+8×$0.009)=$1,302.40, PLUS customer cloud compute/storage/network. 200 concurrent requested vCPUs qualifies for negotiated discount; no all-in total without cloud and contract.
## Sources and coverage
- https://www.ycombinator.com/companies/porter
- https://www.porter.run/
- https://www.porter.run/pricing
- https://docs.porter.run
- https://agents.porter.run/agents.md
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.