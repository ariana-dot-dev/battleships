# Replicate — regimes (2026-09-28)
YC: Winter 2020; directory status **Acquired**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/replicate
Run machine learning models in the cloud
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Private Cog CPU model | alt | sizes; CPU alloc, memory alloc | cpu-small: 1 vCPU/2 GiB $0.09/h; cpu: 4 vCPU/8 GiB $0.36/h | https://replicate.com/pricing |
| Usage | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://replicate.com/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://replicate.com/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://replicate.com/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://replicate.com/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://replicate.com/pricing |
## Verified billing facts and gotchas
1. Public inference charges only processing (some by output/token); private custom Cog models charge setup + idle + active dedicated instance time. Fast-booting fine-tunes are special active-only exceptions.
2. Private CPU model deployment is an alt to interactive VM. GPUs include their hosts; do not double-count host CPU/RAM. Several multi-GPU and H200 SKUs require committed-spend contracts.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
CPU 4/8 private model costs 8,800×$0.36=$3,168, plus billed setup and any idle replica time. Public inference only charges processing but cannot host arbitrary interactive workspaces. Snapshot, egress, 50-replica and 8-hour-request eligibility unresolved.
## Sources and coverage
- https://www.ycombinator.com/companies/replicate
- https://replicate.com/pricing
- https://replicate.com/docs/guides/deploy-a-custom-model
- https://replicate.com/
- https://replicate.com/docs
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.