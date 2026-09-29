# Heroku — regimes (2026-09-28)
YC: Winter 2008; directory status **Acquired**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/heroku
Cedar and Fir dynos
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | http://heroku.com |
| Current applicable tariff unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | http://heroku.com |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | http://heroku.com |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | http://heroku.com |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | http://heroku.com |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | http://heroku.com |
## Verified billing facts and gotchas
1. Cedar CPU units are relative 1x/12x/50x, not vCPUs; do not equate them. Fir Compute 4CPU/8GB $300/month needs Private Space; public table alone does not yield all-in total. Eco $5 is 1000-hour shared pool, not per-dyno always-on rate. Disk ephemeral, paid data separate.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/heroku
- https://www.heroku.com/
- https://www.heroku.com/pricing/
- https://devcenter.heroku.com
- https://heroku.com/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.