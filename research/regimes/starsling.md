# StarSling — regimes (2026-09-28)
YC: Spring 2025; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/starsling
Self-Driving CI: fast AI-native GitHub Actions runners
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| CPU CI runners | alt | sizes; CPU alloc, memory alloc | 2: 2 vCPU/8 GiB $0.24/h; 4: 4 vCPU/16 GiB $0.48/h; 8: 8 vCPU/32 GiB $0.96/h; 16: 16 vCPU/64 GiB $1.92/h; 32: 32 vCPU/128 GiB $3.84/h; 64: 64 vCPU/256 GiB $7.68/h | https://starsling.dev/pricing |
| Usage | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://starsling.dev/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://starsling.dev/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://starsling.dev/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://starsling.dev/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://starsling.dev/pricing |
## Verified billing facts and gotchas
1. GitHub Actions/Review Runners, not always-on generic VM; CPU mode alt. Ubuntu 24.04, 5th-gen AMD EPYC. Advertised unlimited concurrency; job/session maximum not verified.
2. GPU rates include 4 vCPU/16 GB/100 GB host, not add-on rates. GPU access requires contacting provider; H100 coming soon, excluded from numerical rate list.
3. Do not apply advertised performance/TFLOPS savings as universal wall-clock discounts.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
4 vCPU/16 GB runner fits requested 4/8: 8,800×$0.48=$4,224 CPU-runner usage. No performance multiplier assumed. Eight-hour jobs, 50 parallel runners and arbitrary retained snapshots still require validation; snapshots and egress not priced.
## Sources and coverage
- https://www.ycombinator.com/companies/starsling
- https://starsling.dev/pricing
- https://docs.starsling.dev/runners/compute-sizing
- https://starsling.dev/
- https://starsling.dev/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.