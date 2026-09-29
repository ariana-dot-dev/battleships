# GitHub Actions hosted runners (macOS / Windows): pricing regimes (as of 2026-09-28)
GitHub-hosted runners are billed **per job-minute, rounded up to the whole minute**. Plans include minutes for standard runners. Larger runners are always billed. All rates were re-checked against the official runner pricing reference.
## Regime table
| # | Regime | When it applies | How billed | Numbers ($/min) | Source |
|---|---|---|---|---|---|
| 1 | Standard runners | `ubuntu-latest`, `windows-latest`, `macos-latest` | Per minute, rounded up per job. Free for public repos | Linux 2-core $0.006; **Windows 2-core x64 $0.010**; Windows 2-core arm64 $0.010; **macOS 3/4-core (M1 or Intel) $0.062** | https://docs.github.com/en/billing/reference/actions-runner-pricing |
| 2 | Larger Windows x64 | Larger runner labels | Always billed (no quota, even public repos) | 4-core $0.022; 8 $0.042; 16 $0.082; 32 $0.162; 64 $0.322; 96 $0.552 | same |
| 3 | Larger Windows arm64 | same | same | 2-core $0.008; 4 $0.014; 8 $0.026; 16 $0.050; 32 $0.098; 64 $0.194 | same |
| 4 | Larger macOS | `macos-*-large` / `-xlarge` | same | 12-core Intel $0.077; 5-core M2 Pro $0.102 | same |
| 5 | GPU | GPU runners | same | Linux 4-core $0.052; Windows 4-core $0.102 | same |
| 6 | Included minutes | Private repos, standard runners | Monthly quota | Free 2,000; Pro/Team 3,000; Enterprise Cloud 50,000 minutes/month | https://docs.github.com/en/billing/concepts/product-billing/github-actions |
| 7 | Self-hosted runners | Your machines | "free for self-hosted runners" | $0 | same |
## Gotchas
1. Workflow jobs only: GitHub's terms tie Actions to repository CI. Standard jobs time out at 6 h.
2. macOS standard is 10x Linux; Windows is 1.7x.
3. How macOS/Windows jobs draw down included minutes is not stated on the current billing page.
4. The 1-minute macOS minimum is possible because GitHub is the lessor running CI ("Permitted Developer Services").
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress. Illustrative.
| Regime | Rate | **Monthly** |
|---|---|---|
| macOS 5-core M2 Pro (smallest ≥ 4 cores) | $6.12/h | **$53,856.00** |
| macOS 12-core Intel (cheaper per hour) | $4.62/h | $40,656.00 |
| Windows 4-core larger runner | $1.32/h | **$11,616.00** |
Included minutes don't apply to larger runners. Cache/artifact storage is billed separately (not encoded). Egress is free.
Sources: https://docs.github.com/en/billing/reference/actions-runner-pricing · https://docs.github.com/en/billing/concepts/product-billing/github-actions