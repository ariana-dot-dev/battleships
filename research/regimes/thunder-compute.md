# Thunder Compute — regimes (2026-09-28)
YC: Summer 2024; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/thunder-compute
GPUs for Agents
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| GPU instances | Public listed mode | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://www.thundercompute.com/pricing |
| Usage | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://www.thundercompute.com/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.thundercompute.com/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | $0.05 | https://www.thundercompute.com/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | $0 | https://www.thundercompute.com/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://www.thundercompute.com/pricing |
## Verified billing facts and gotchas
1. All prices are complete base GPU-instance bundles at the minimum CPU count, not stand-alone GPU surcharges. Minute billing; no egress charge.
2. Additional CPU $0.04/core-h, usually 8 GB RAM included per core. Running disk first 100 GB included then $0.03/100GB-h; stopped storage uses snapshots $0.05/GB-month.
3. Multi-GPU non-linear: 4×/8× A100 and L40 cost more per GPU than 1×/2×. Do not multiply single-GPU price blindly.
4. Card has gpu_only mode with null rates because host inclusion and count-specific bundles cannot safely be represented by one GPU additive table.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
The specified workload has no GPU, so there is no directly comparable CPU-only offer. If forced onto cheapest 1× RTX A6000 (6 vCPU/48 GB minimum), 8,800×$0.35=$3,080 plus $2.50 for 50 GB snapshot-month, egress $0. This overprovisions GPU/CPU/RAM and is not a CPU-only quote.
## Sources and coverage
- https://www.ycombinator.com/companies/thunder-compute
- https://www.thundercompute.com/pricing
- https://www.thundercompute.com/docs/technical-specs
- https://www.thundercompute.com/docs/llms.txt
- https://www.thundercompute.com/
- https://www.thundercompute.com/docs/vscode/quickstart
- https://www.thundercompute.com/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.