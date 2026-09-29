# Agent 37 — regimes (2026-09-28)
YC: Fall 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/agent-37
Persistent sandboxes for agents like hermes, openclaw, claude code
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Standard shared instances | Public listed mode | resource; CPU alloc, memory alloc | $0.0010958904109589042/vCPU-h + $0.0009589041095890411/GiB-h; multiplier 1 | https://www.agent37.com/pricing |
| Dedicated Performance | Public listed mode | resource; CPU alloc, memory alloc | $0.004383561643835617/vCPU-h + $0.0038356164383561643/GiB-h; multiplier 1 | https://www.agent37.com/pricing |
| Paid wallet | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=200; max session h=None | https://www.agent37.com/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | $0.09 | https://www.agent37.com/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.agent37.com/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.agent37.com/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.agent37.com/pricing |
## Verified billing facts and gotchas
1. Cloud API uses monthly resource rates divided by 730 then by 60 for minute metering. Running and start/stop transitions bill allocation, NOT measured CPU utilization.
2. Dedicated Performance compute is 4× CPU and RAM, disk unchanged. Managed hosting is a separate flat monthly per-instance product; model allowances are not compute credits.
3. Website advertises $5 starter credit but detailed billing docs say $1; one_time_credit left null until reconciled.
4. Instance cap: 1 before top-up, 10 after any top-up, 50 at $100 lifetime top-ups, 200 at $250; this is not a monthly subscription fee. Create needs one day of balance, not a debit.
5. Cold parked compressed files $0.03/GB-month versus reserved hot disk $0.09. Non-payment suspension is unbilled and deletes after 30 days; ordinary persistence is until deletion. Default auto-topup buys $25 below $10.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Standard compute: 8,800×(4×0.80+8×0.70)/730=$106.08. Fifty 4/8 instances with default 6 GB reserved disk add 300×$0.09=$27/mo. If the separate 50 GiB are cold compressed files, add $1.50: $134.58 plus unknown egress. Need $100 lifetime top-ups to unlock 50 instances; it funds usage, not a fee. Performance compute is $424.33 before the same storage. Snapshot quantity cannot be assumed equal to reserved disk.
## Sources and coverage
- https://www.ycombinator.com/companies/agent-37
- https://www.agent37.com/pricing
- https://www.agent37.com/docs/agents-api/billing
- https://www.agent37.com/docs/llms-full.txt
- https://www.agent37.com/cloud
- https://www.agent37.com/docs
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.