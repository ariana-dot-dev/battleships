# Comfy Deploy — regimes (2026-09-28)
YC: Summer 2024; directory status **Active**. Research scope: closed-to-new-customers. Source: https://www.ycombinator.com/companies/comfy-deploy
Managed ComfyUI workflows
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://app.comfydeploy.com/pricing |
| Current applicable tariff unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://app.comfydeploy.com/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://app.comfydeploy.com/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://app.comfydeploy.com/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://app.comfydeploy.com/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://app.comfydeploy.com/pricing |
## Verified billing facts and gotchas
1. Chrome-rendered official app pricing explicitly says no longer taking new customers; existing customer service/support continues. Exclude new-buyer ranking.
2. Legacy pay-as-you-go: GPU concurrency 1, max 3 cloud machines; Business from $998/month. GPU/hour T4 0.648, L4 1.152, A10G 1.2132, L40S 2.1456, A100 4.104, A10080GB 6.1488, H100 8.4168, H200 6.8112, B200 9.3744; CPU 0.1512/hour has unspecified core/RAM unit. Per-second charging shown.
3. CPU and GPU host inclusion and idle machine fees not verified; these are legacy customer rates, not a currently purchasable public offer.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/comfy-deploy
- https://app.comfydeploy.com/pricing
- https://www.comfydeploy.com/
- https://docs.comfydeploy.com/docs/introduction
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.