# Archal — regimes (2026-09-28)
YC: Summer 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/archal
Stateful API simulation sandboxes
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.archal.ai/ |
| Current applicable tariff unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.archal.ai/ |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.archal.ai/ |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.archal.ai/ |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.archal.ai/ |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.archal.ai/ |
## Verified billing facts and gotchas
1. Simulated API environments; Archal documents no shell, exec or code runtime. $0.10 per active environment-minute, prorated by the second from ready to teardown; a sandbox with several environments pays for each. Failed provisioning and cold-start time are free. Verified workspaces get $5 at signup and $15 after the first ready sandbox, once. Paid continuation is not yet available to self-serve workspaces, so the $20 credit cannot sustain a benchmark. Source: https://docs.archal.ai/pricing-usage (checked 2026-11-08).
2. Environments are hosted, Archal-managed simulations. The docs mention runtime containers only in a billing context: customers pay per ready environment, not per container.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/archal
- https://archal.ai/
- https://docs.archal.ai/introduction
- https://archal.ai/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.