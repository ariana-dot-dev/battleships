# GitHub Actions hosted runners (macOS / Windows): pricing regimes (as of 2026-11-08)
GitHub-hosted runners are billed **per job-minute, rounded up to the whole minute**. Each plan includes a monthly compute amount in dollars. On Team and Enterprise Cloud, larger runners can draw from it. All rates were re-checked against the official runner pricing reference.
## Regime table
| # | Regime | When it applies | How billed | Numbers ($/min) | Source |
|---|---|---|---|---|---|
| 1 | Standard runners | `ubuntu-latest`, `windows-latest`, `macos-latest` | Per minute, rounded up per job. Free for public repos | Linux 2-core $0.006; **Windows 2-core x64 $0.010**; Windows 2-core arm64 $0.010; **macOS 3/4-core (M1 or Intel) $0.062** | https://docs.github.com/en/billing/reference/actions-runner-pricing |
| 2 | Larger Windows x64 | Larger runner labels | Billed on public repos too; on Team/Enterprise Cloud can draw from included usage | 4-core $0.022; 8 $0.042; 16 $0.082; 32 $0.162; 64 $0.322; 96 $0.552 | same |
| 3 | Larger Windows arm64 | same | same | 2-core $0.008; 4 $0.014; 8 $0.026; 16 $0.050; 32 $0.098; 64 $0.194 | same |
| 4 | Larger macOS | `macos-*-large` / `-xlarge` | Billed on public repos too | 12-core Intel $0.077; 5-core M2 Pro $0.102 | same |
| 5 | GPU | GPU runners | Billed on public repos too | Linux 4-core $0.052; Windows 4-core $0.102 | same |
| 6 | Included compute usage | Private-repo standard runners (all plans), larger runners where available (Team/Enterprise Cloud), Copilot cloud sandboxes | Monthly dollar amount | Free $12; Pro/Team $18; Enterprise Cloud $300 (about 2,000 / 3,000 / 50,000 min of 2-core Linux) | https://docs.github.com/en/billing/reference/product-usage-included |
| 7 | Self-hosted runners | Your machines | "free for self-hosted runners" (the proposed $0.002/min fee is postponed) | $0 | https://docs.github.com/en/billing/concepts/product-billing/github-actions |
## Gotchas
1. Workflow jobs only: GitHub's terms tie Actions to repository CI. Standard jobs time out at 6 h.
2. macOS standard is 10x Linux; Windows is 1.7x.
3. The docs do not say whether macOS larger runners or GPU runners draw from included usage.
4. The 1-minute macOS minimum is possible because GitHub is the lessor running CI ("Permitted Developer Services").
5. Larger runners (Linux x64, Linux ARM64, Windows x64) can save their disk as a custom image with the `snapshot` keyword. New jobs boot from that image. Source: https://docs.github.com/en/actions/how-tos/manage-runners/larger-runners/use-custom-images
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress. Illustrative.
| Regime | Rate | **Monthly** |
|---|---|---|
| macOS 5-core M2 Pro (smallest ≥ 4 cores) | $6.12/h | **$53,856.00** |
| macOS 12-core Intel (cheaper per hour) | $4.62/h | $40,656.00 |
| Windows 4-core larger runner | $1.32/h | **$11,616.00** |
On Team/Enterprise Cloud, the included usage ($18 / $300) offsets part of the Windows larger-runner row. Cache/artifact storage is billed separately (not encoded). Egress is free.
Sources: https://docs.github.com/en/billing/reference/actions-runner-pricing · https://docs.github.com/en/billing/concepts/product-billing/github-actions · https://docs.github.com/en/billing/reference/product-usage-included
