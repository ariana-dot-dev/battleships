# Aptible — regimes (2026-09-28)
YC: Summer 2014; directory status **Acquired**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/aptible
Compliant app containers
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.aptible.com |
| Development | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://www.aptible.com |
| Production | Plan limits apply | Monthly fee; credits only as stated | fee=499; included usage=$0; concurrent=None; max session h=None | https://www.aptible.com |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://www.aptible.com |
| Persistent Disk / GB-month | Billed on provisioned size, also while scaled to 0 | Native add-on | $0.20; 3,000 IOPS included, $0.01 per extra IOPS-month | https://www.aptible.com/docs/core-concepts/apps/persistent-disks |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.aptible.com |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.aptible.com |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.aptible.com |
## Verified billing facts and gotchas
1. Development $0 platform, Production $499/mo plus resources. General purpose $0.08/GB RAM-hour, CPU-optimized $0.10 (2 GB/vCPU), RAM-optimized $0.05 (8 GB/vCPU); General purpose is 4 GB/vCPU. Endpoints $0.06/h; dedicated stacks $499/mo, VPN peer $99/mo; databases/backup extra. LLM Gateway is an optional add-on at $200/mo plus tokens, unrelated to compute.
2. Files survive a stop only on the one Persistent Disk mount path per Service (Service runs 1 container, single AZ). Aptible does not back the disk up. Checked 2026-11-08.
3. Compliance: Production lists HIPAA and SOC 2; Enterprise lists HITRUST and PCI. Source: https://www.aptible.com/pricing
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/aptible
- https://www.aptible.com/
- https://www.aptible.com/pricing
- https://www.aptible.com/docs/getting-started/home
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.