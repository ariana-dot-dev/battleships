# Cirrus Runners: pricing regimes (as of 2026-09-28)
Cirrus Labs sells GitHub Actions runners as a **flat monthly subscription per concurrent runner with unlimited minutes**. macOS runners are M4 Pro Tart VMs.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Monthly per runner | Default | Flat per concurrent runner slot, **no limit on minutes**, change subscription any time | **$150/month** per runner | https://cirrus-runners.app/pricing/ |
| 2 | Annual | 12-month commitment | 15% "Annual Discount" | $127.50/runner/month (derived) | same |
| 3 | Nonprofit | Non-revenue projects | 50% discount | $75/runner/month (derived) | same |
| 4 | Runner types | Same price for each | macOS M4 Pro 4 vCPU/16 GB (paravirtualized GPU); Linux x86 16 vCPU/48 GB (KVM); Linux arm64 8 vCPU/24 GB; Linux GPU 8 vCPU/24 GB + NVIDIA GPU | $150 each | same |
| 5 | Low-priority tasks | Opt-in label | Queue behind normal jobs within your concurrency | $0 extra | same |
## Gotchas
1. You pay for **concurrency, not usage**. 50 parallel jobs need 50 runners even if they run 1 h/day.
2. At 100% utilisation macOS costs about $0.0034/min, the cheapest macOS CI minute anywhere. At low utilisation it is expensive.
3. GitHub Actions only; no Windows.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress. Illustrative.
- 50 macOS runners (4 vCPU/16 GB): 50 × $150 = **$7,500/month** (annual: $6,375).
- Effective rate: $7,500 / 8,800 h = $0.85/h, or $0.0142/min.
- Snapshots and egress are not metered or published.
Sources: https://cirrus-runners.app/pricing/