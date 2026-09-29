# Trigger.dev — regimes (2026-09-28)
YC: Winter 2023; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/trigger-dev
Build and deploy fully‑managed AI agents and workflows
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Managed tasks | alt | sizes; CPU alloc, memory alloc | Micro: 0.25 vCPU/0.25 GiB $0.060840000000000005/h; Small 1x: 0.5 vCPU/0.5 GiB $0.12168000000000001/h; Small 2x: 1 vCPU/1 GiB $0.243/h; Medium 1x: 1 vCPU/2 GiB $0.30600000000000005/h; Medium 2x: 2 vCPU/4 GiB $0.6120000000000001/h; Large 1x: 4 vCPU/8 GiB $1.2240000000000002/h; Large 2x: 8 vCPU/16 GiB $2.4480000000000004/h | https://trigger.dev/pricing |
| Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$5; concurrent=20; max session h=None | https://trigger.dev/pricing |
| Hobby | Plan limits apply | Monthly fee; credits only as stated | fee=10; included usage=$10; concurrent=50; max session h=None | https://trigger.dev/pricing |
| Pro | Plan limits apply | Monthly fee; credits only as stated | fee=50; included usage=$50; concurrent=200; max session h=None | https://trigger.dev/pricing |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://trigger.dev/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://trigger.dev/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://trigger.dev/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://trigger.dev/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://trigger.dev/pricing |
## Verified billing facts and gotchas
1. Durable TypeScript tasks, not arbitrary interactive VMs; mode is alt. Billed allocated machine seconds when executing plus $0.000025/run.
2. Wait >5 seconds and parent waiting for subtasks are checkpointed and unbilled. No execution timeouts. Free 20 concurrency; Hobby 50; Pro 200 + $10/month per 50.
3. Extra Pro seats $20/month beyond 25; HIPAA BAA is add-on not an included plan fee.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
50×22=1,100 eight-hour runs: 8,800×$1.224+$0.000025×1,100=$10,771.2275 usage. Hobby $10 includes $10: $10,771.23 recurring before unverified snapshot/network costs. 30% CPU does not discount allocated execution, but explicit checkpointed waits do.
## Sources and coverage
- https://www.ycombinator.com/companies/trigger-dev
- https://trigger.dev/pricing
- https://trigger.dev/docs/introduction
- https://trigger.dev/docs/self-hosting/overview
- https://trigger.dev/
- https://trigger.dev/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.