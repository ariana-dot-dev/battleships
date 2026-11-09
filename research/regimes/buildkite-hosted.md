# Buildkite hosted agents: pricing regimes (as of 2026-11-08)
Buildkite charges **per active user** for the platform and **per vCPU-minute** for hosted agents, metered to the second with no minimums:
- macOS M4: $0.02 per vCPU-minute.
- Linux AMD64 and ARM64: $0.004 per vCPU-minute.
- Windows Server 2022 (public preview): $0.008 per vCPU-minute.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Free plan | ≤5 users | 10 concurrent jobs, up to 2,000 Linux vCPU-minutes/month. No macOS hosted agents | $0 | https://buildkite.com/pricing |
| 2 | Pro plan | Teams | $30 per active user/month. Up to 50 users, 4,000 Linux minutes/month included. Hosted vCPU pools: Linux AMD64 256, Linux ARM64 64, macOS 48, Windows 64 | $30/user/month | same |
| 3 | macOS hosted agents | Pro+ | Per vCPU-minute | M4 Medium 6 vCPU/28 GB **$0.12/min**; M4 Large 12 vCPU/56 GB **$0.24/min** | same |
| 4 | Linux hosted agents | AMD64 Small on all plans; ARM64 on Trial, Pro, Enterprise; XL..3XL Enterprise | Per vCPU-minute | Small 2 vCPU/4 GB $0.008; Medium 4/16 GB $0.016; Large 8/32 GB $0.032 (same for AMD64 and ARM64) | same, https://buildkite.com/docs/pipelines/hosted-agents/linux |
| 5 | Windows hosted agents (public preview) | Trial, Pro, Enterprise | Per vCPU-minute | Small 2/8 GB $0.016; Medium 4/16 GB $0.032; Large 8/32 GB $0.064; XL 16/64 GB Enterprise | same, https://buildkite.com/docs/agent/buildkite-hosted/windows |
| 6 | Self-hosted agents | Your machines | Platform fee; Pro: up to 250 concurrent agents, 10 included, then $3.50 per agent/month | plan fee + agents | same |
| 7 | Enterprise | Contact | Volume discounts, custom limits | custom | same |
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