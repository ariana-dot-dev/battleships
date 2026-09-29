# Artillery — regimes (2026-09-28)
YC: Summer 2021; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/artillery
Load and Playwright E2E testing
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Test workers and Cloud platform | alt | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.artillery.io/pricing |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$None; concurrent=None; max session h=None | https://www.artillery.io/pricing |
| Team | Plan limits apply | Monthly fee; credits only as stated | fee=199; included usage=$None; concurrent=None; max session h=None | https://www.artillery.io/pricing |
| Business | Plan limits apply | Monthly fee; credits only as stated | fee=499; included usage=$None; concurrent=None; max session h=None | https://www.artillery.io/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.artillery.io/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.artillery.io/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.artillery.io/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.artillery.io/pricing |
## Verified billing facts and gotchas
1. Public Artillery CLI/Cloud subscription: Free 30 reports/mo, up to 5 workers/test, 30min test; Team $199/mo, 1000 reports, 25 workers, 2h; Business $499/mo, 2500 reports with no stated worker/duration cap. Annual 20% discount.
2. Distributed test workers run in AWS/Azure; separate underlying compute charges must be verified, not assumed included in dashboard/report subscription. Enterprise security add-ons start $1199/mo, own-account cloud deployment quote.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/artillery
- https://www.artillery.io/pricing
- https://www.artillery.io/docs
- https://www.artillery.io/
- https://www.artillery.io/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.