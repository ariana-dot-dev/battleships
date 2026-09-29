# machine0 — regimes (2026-09-28)
YC: Summer 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/machine0
AWS for Agents
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand | Public listed mode | sizes; CPU alloc, memory alloc | small: 1 vCPU/1 GiB $0.013/h; medium: 2 vCPU/2 GiB $0.034/h; large: 2 vCPU/4 GiB $0.052/h; xl: 4 vCPU/8 GiB $0.104/h; xxl: 8 vCPU/16 GiB $0.208/h; large-nvme: 2 vCPU/4 GiB $0.061/h; xl-nvme: 4 vCPU/8 GiB $0.121/h; xxl-nvme: 8 vCPU/16 GiB $0.243/h; xl-premium: 4 vCPU/8 GiB $0.236/h; xxl-premium: 8 vCPU/16 GiB $0.473/h; xxxl: 16 vCPU/64 GiB $0.825/h; 4xl: 32 vCPU/128 GiB $1.98/h; 5xl: 48 vCPU/192 GiB $2.97/h; 6xl: 60 vCPU/240 GiB $3.714/h | https://machine0.io/ |
| Pay as you go | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://machine0.io/ |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://machine0.io/ |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | $0.078 | https://machine0.io/ |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://machine0.io/ |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://machine0.io/ |
## Verified billing facts and gotchas
1. List prices; CPU sizes regular/shared, NVMe and dedicated premium differ. Marketing headline dedicated resources does not mean all vCPUs dedicated.
2. Monthly figures are illustrative, not a price cap; per-minute billing. $5 minimum refundable top-up. GPU bundle prices include CPU/RAM; do not treat them as GPU-only add-ons.
3. Suspending stops compute; image storage is $0.078/GB-month. Snapshot is disk-based unless memory preservation verified; no egress tariff found.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
The xl (4 vCPU/8 GB/160 GB) costs 8,800 × $0.104 = $915.20. 50 GiB retained images add $3.90/month. Subtotal $919.10 before unverified network fees or other retained disk; 30% CPU changes nothing. Fifty concurrent VMs and 8-hour runs require confirmation of account limits.
## Sources and coverage
- https://www.ycombinator.com/companies/machine0
- https://machine0.io/
- https://docs.machine0.io
- https://machine0.io/changelog
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.