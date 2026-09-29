# Release — regimes (2026-09-28)
YC: Winter 2020; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/release
Release cloud environments
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Enterprise BYOC | sales, alt | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://release.com/pricing |
| Custom / unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://release.com/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://release.com/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://release.com/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://release.com/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://release.com/pricing |
## Verified billing facts and gotchas
1. Chrome pricing confirms only Enterprise runs in customer AWS/GCP cloud, custom negotiated platform price. Includes ephemeral, preview, production and cloud dev environments, CLI/API, GitOps, docker-compose, Terraform/Helm, enterprise SSO and unlimited clusters. Underlying infrastructure costs remain separate; no public all-in sandbox price.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/release
- https://release.com/pricing
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.