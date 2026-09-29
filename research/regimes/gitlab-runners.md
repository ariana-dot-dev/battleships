# GitLab.com hosted runners (macOS / Windows): pricing regimes (as of 2026-09-28)
GitLab bills hosted runners in **compute minutes × a cost factor**. Plans include a monthly quota, and extra minutes cost **$10 per 1,000** (one-time packs, verified on about.gitlab.com/pricing). That gives **$0.01 per compute minute**, which confirms the sweep's assumption.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Free | Default | 400 compute minutes/month. No macOS | $0 | https://about.gitlab.com/pricing/ |
| 2 | Premium | Paid | $29/user/month (billed annually), 10,000 compute minutes/month | $29/user | same |
| 3 | Ultimate | Sales | 50,000 compute minutes/month | custom | same |
| 4 | Extra compute minutes | Over quota | One-time packs | $10 per 1,000 minutes | same |
| 5 | macOS runners (beta) | Premium/Ultimate/OSS | Minutes × cost factor | saas-macos-medium-m1 4 vCPU/8 GB/50 GB **factor 6 → $0.06/min**; saas-macos-large-m2pro 6 vCPU/16 GB **factor 12 → $0.12/min** | https://docs.gitlab.com/ci/pipelines/compute_minutes/, https://docs.gitlab.com/ci/runners/hosted_runners/macos/ |
| 6 | Windows runners (beta) | All tiers | Minutes × factor | saas-windows-medium-amd64 2 vCPU/7.5 GB/75 GB, Windows 2022, **factor 1 → $0.01/min** | https://docs.gitlab.com/ci/runners/hosted_runners/windows/ |
| 7 | Linux (reference) | All | Minutes × factor | small 1, medium 2, large 3 | compute_minutes docs |
## Gotchas
1. macOS and Windows runners are still beta. macOS needs Premium or above.
2. Windows comes in one size only (2 vCPU / 7.5 GB). A 4-vCPU Windows job can't run on GitLab-hosted runners.
3. The dollar figure is the extra-pack price. Included minutes are consumed × factor, so a Premium quota covers only about 1,667 macOS M1 minutes.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h = 528,000 min), 30% CPU, 50 GiB snapshots, 100 GiB egress. Illustrative.
| Regime | Compute-minutes | Cost | **Monthly** |
|---|---|---|---|
| macOS M1 medium (4/8, factor 6) | 528,000 × 6 = 3,168,000 | minus 10,000 included (Premium) → 3,158,000 × $0.01 = $31,580 | **$31,609** (with 1 Premium seat) |
| Windows medium | n/a (2 vCPU only) | | |
Snapshots and egress are not metered or published.
Sources: https://docs.gitlab.com/ci/pipelines/compute_minutes/ · https://about.gitlab.com/pricing/ · https://docs.gitlab.com/ci/runners/hosted_runners/macos/ · https://docs.gitlab.com/ci/runners/hosted_runners/windows/