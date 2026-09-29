# Revyl — regimes (2026-09-28)
YC: Fall 2024; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/revyl
Cloud iOS/Android builds and simulators
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.revyl.com |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=1; max session h=None | https://www.revyl.com |
| Starter | Plan limits apply | Monthly fee; credits only as stated | fee=250; included usage=$250; concurrent=3; max session h=None | https://www.revyl.com |
| Team Pro | Plan limits apply | Monthly fee; credits only as stated | fee=750; included usage=$750; concurrent=10; max session h=None | https://www.revyl.com |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.revyl.com |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.revyl.com |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.revyl.com |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.revyl.com |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.revyl.com |
## Verified billing facts and gotchas
1. Free 1 concurrent device per platform; Starter $250/mo includes $250 credits/3 devices, Team Pro $750 with $750/10; annual $200/$600. Overage enabled: iOS $0.15/min, Android $0.12/min. LLM uses same allowance. Enterprise dedicated iOS runners; no 4/8 sizing guaranteed.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
4/8 hardware is unspecified. 8,800 iOS simulator-hours ×$9=$79,200, or Android ×$7.20=$63,360 before plan credits. Fifty concurrent devices exceed Team Pro (10), requiring a custom Enterprise quote; these unit illustrations are not a total quote.
## Sources and coverage
- https://www.ycombinator.com/companies/revyl
- https://revyl.com/
- https://revyl.com/pricing/
- https://revyl.com/docs
- https://revyl.com/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.