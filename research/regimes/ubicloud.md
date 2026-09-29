# Ubicloud — regimes (2026-09-28)
YC: Winter 2024; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/ubicloud
Open source alternative to AWS
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Dedicated VMs Germany | Public listed mode | sizes; CPU alloc, memory alloc | standard-2: 2 vCPU/8 GiB $0.0624/h; standard-4: 4 vCPU/16 GiB $0.1248/h; standard-8: 8 vCPU/32 GiB $0.2496/h; standard-16: 16 vCPU/64 GiB $0.4986/h; standard-30: 30 vCPU/120 GiB $0.9354/h; standard-60: 60 vCPU/240 GiB $1.8702/h | https://www.ubicloud.com/docs/about/pricing |
| Shared burstable VMs | Public listed mode | sizes; CPU alloc, memory alloc | burstable-1: 1 vCPU/2 GiB $0.0156/h; burstable-2: 2 vCPU/4 GiB $0.0312/h | https://www.ubicloud.com/docs/about/pricing |
| Standard x64 CI | alt | sizes; CPU alloc, memory alloc | 2: 2 vCPU/8 GiB $0.075/h; 4: 4 vCPU/16 GiB $0.15/h; 8: 8 vCPU/32 GiB $0.3/h; 16: 16 vCPU/64 GiB $0.6/h; 30: 30 vCPU/120 GiB $1.125/h | https://www.ubicloud.com/docs/about/pricing |
| Premium x64 CI | alt | sizes; CPU alloc, memory alloc | 2: 2 vCPU/8 GiB $0.12/h; 4: 4 vCPU/16 GiB $0.24/h; 8: 8 vCPU/32 GiB $0.48/h; 16: 16 vCPU/64 GiB $0.96/h; 30: 30 vCPU/120 GiB $1.7999999999999998/h | https://www.ubicloud.com/docs/about/pricing |
| arm64 CI | alt | sizes; CPU alloc, memory alloc | 2: 2 vCPU/6 GiB $0.075/h; 4: 4 vCPU/12 GiB $0.15/h; 8: 8 vCPU/24 GiB $0.3/h; 16: 16 vCPU/48 GiB $0.6/h; 30: 30 vCPU/90 GiB $1.125/h | https://www.ubicloud.com/docs/about/pricing |
| Usage | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://www.ubicloud.com/docs/about/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.ubicloud.com/docs/about/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | $0.15208236 | https://www.ubicloud.com/docs/about/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | $0.003 | https://www.ubicloud.com/docs/about/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | $3 | https://www.ubicloud.com/docs/about/pricing |
## Verified billing facts and gotchas
1. Separate dedicated VM, burstable VM, standard/premium x64 CI and arm64 CI tariffs. All below from official Germany rate card; US described as comparable, not exact same price.
2. VM monthly illustrative figures disagree with 730h×per-minute rates. Normalize authoritative explicit per-minute rates; do not assume monthly cap.
3. Burstable baseline up to 50% of allocated vCPU with micro-interval bursts to 100%; dedicated RAM/disk.
4. VM IPv4 is $3/mo per minute prorated; runners include IPv4. VM allowance 0.625 TB egress per 2 vCPUs, then $3/TB; scope is per-VM not account-wide.
5. Machine images billed compressed archive size $0.0000034722/GiB/min, approximated $0.15/GiB-month. CI $2.50 monthly credit only, not VM credit. New CI users default to premium.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Dedicated standard-4 (4/16) compute: 8,800×$0.1248=$1,098.24. Fifty public IPv4s kept all month add $150, optional. 50 GiB image archives add about $7.60 using exact per-minute×730 rate. 100 GiB total egress fits VM allowances if distributed within each VM quota. Subtotal $1,255.84; no monthly cap assumed. CI alternative standard-x64 = $1,320 minus $2.50 credit, with different lifecycle/network features.
## Sources and coverage
- https://www.ycombinator.com/companies/ubicloud
- https://www.ubicloud.com/docs/about/pricing
- https://www.ubicloud.com/docs/llms-full.txt
- https://www.ubicloud.com/
- https://www.ubicloud.com/docs/overview
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.