# Buildkite hosted agents: pricing regimes (as of 2026-09-28)
Buildkite charges **per active user** for the platform and **per vCPU-minute** for hosted agents:
- macOS M4: $0.02 per vCPU-minute.
- Linux: $0.004 per vCPU-minute.
There are no Windows hosted agents.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Free plan | ≤5 users | 10 concurrent jobs, up to 2,000 Linux vCPU-minutes/month. No macOS hosted agents | $0 | https://buildkite.com/pricing |
| 2 | Pro plan | Teams | $30 per active user/month. Up to 50 users, 250 concurrent agents (10 included), 4,000 Linux minutes/month included, access to macOS agents | $30/user/month | same |
| 3 | macOS hosted agents | Pro+ | Per vCPU-minute | M4 Medium 6 vCPU/28 GB **$0.12/min**; M4 Large 12 vCPU/56 GB **$0.24/min** | same |
| 4 | Linux hosted agents | All | Per vCPU-minute | Small 2 vCPU $0.008; Medium 4 $0.016; Large 8 $0.032 (RAM not captured) | same |
| 5 | Self-hosted agents | Your machines | Platform fee only | included in the plan | same |
| 6 | Enterprise | Contact | Volume discounts, custom limits | custom | same |
## Gotchas
1. macOS costs 5x Linux per vCPU, and the smallest Mac is 6 vCPU, so you can't rent less than $0.12/min.
2. Included minutes are Linux only.
3. Jobs only (Buildkite pipelines), not interactive sandboxes.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress. Illustrative.
- macOS M4 Medium (6 vCPU): 8,800 × $7.20 = **$63,360/month**, plus $30/active user.
- Linux Medium 4 vCPU ($0.96/h): 8,800 × $0.96 = $8,448 minus included 4,000 min ($64) ≈ **$8,384**, plus seats.
- Snapshots and egress: not applicable or not published.
Sources: https://buildkite.com/pricing