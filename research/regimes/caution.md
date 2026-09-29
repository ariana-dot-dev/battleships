# Caution — regimes (2026-09-28)
YC: Summer 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/caution
Verifiable AWS Nitro enclave hosting
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Fully managed enclave | sales | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://caution.co/pricing.html |
| Managed enclave in own AWS | sales, alt | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://caution.co/pricing.html |
| AGPL self-host | alt | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://caution.co/pricing.html |
| Current applicable tariff unverified | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://caution.co/pricing.html |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://caution.co/pricing.html |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://caution.co/pricing.html |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://caution.co/pricing.html |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://caution.co/pricing.html |
## Verified billing facts and gotchas
1. Fully managed, managed BYOC AWS, and self-hosted AGPLv3 or commercial license. Public product, contact-sales prices all modes. TDX/SEV/TPM advertised coming in 2026, not established available by crawl.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/caution
- https://caution.co/pricing.html
- https://docs.caution.co/reference/deployment-models/
- https://caution.co/
- https://caution.co/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.