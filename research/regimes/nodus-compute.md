# Nodus Compute — regimes (2026-09-28)
YC: Fall 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/nodus-compute
Intelligent Cloud for AI workloads
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Admitted managed sandbox | Final customer rates unknown; supply quotes are not all-in bill. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.nodus-compute.ai/pricing/ |
| Unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.nodus-compute.ai/pricing/ |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.nodus-compute.ai/pricing/ |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.nodus-compute.ai/pricing/ |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.nodus-compute.ai/pricing/ |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.nodus-compute.ai/pricing/ |
## Verified billing facts and gotchas
1. Published table says supply costs, NOT final all-in customer tariffs. Live meter separates compute/platform/storage/model/subscription charges. Do not rank the $0.0714 4/8 supply figure as a customer price.
2. CPU managed agent tools sandbox is gated by account admission and deployment qualification. Final billing can settle after completion; retained files keep billing. Legacy per-run budget fields do not enforce spend limits.
3. Sleep saves a verified project and releases compute; wake rebuilds tools/processes, not proof of memory snapshot.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
4/8 supply-only arithmetic: 8,800×$0.0714=$628.32. This is NOT a bill estimate: platform fees, retained storage, egress and admission terms are unverified. 30% CPU is not shown to reduce supply charges.
## Sources and coverage
- https://www.ycombinator.com/companies/nodus-compute
- https://www.nodus-compute.ai/pricing/
- https://www.nodus-compute.ai/docs/concepts/costs/
- https://www.nodus-compute.ai/docs/guides/agent-sandboxes/
- https://www.nodus-compute.ai/
- https://www.nodus-compute.ai/docs/
- https://www.nodus-compute.ai/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.