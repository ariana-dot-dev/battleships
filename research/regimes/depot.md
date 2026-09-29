# Depot GitHub Actions runners (macOS / Windows): pricing regimes (as of 2026-09-28)
Depot sells GitHub Actions runners (plus Docker builds and Depot CI) under monthly plans that include minutes, with per-minute prices per runner type.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Developer plan | 1 user | Monthly fee including 2,000 GitHub Actions minutes, 500 Docker build minutes, 2,000 Depot CI minutes, 25 GB cache | $20/month | https://depot.dev/pricing |
| 2 | Startup plan | Unlimited users | Monthly fee including 20,000 GHA minutes, 5,000 Docker build minutes, 20,000 Depot CI minutes, 250 GB cache | $200/month | same |
| 3 | Business | Contact | Custom images, custom terms | custom | same |
| 4 | macOS runners | `depot-macos-26/15/14` (M4 or M2) | Per minute; "billed minutes" = elapsed × multiplier minus plan minutes | 8 CPU / 24 GB / 400 GB **$0.08/min** | https://depot.dev/docs/github-actions/runner-types |
| 5 | Windows runners | `depot-windows-2025/2022` | same | 2 CPU/8 GB/100 GB **$0.008/min**; 4 CPU/16 GB/130 GB **$0.016/min** (larger sizes exist; prices not verified) | same |
| 6 | Linux runners (reference) | `depot-ubuntu-24.04` | same | 2 CPU $0.006/min; 4 CPU $0.012/min. GHA overage $0.006/min | same |
| 7 | Depot CI (different product) | Depot's own CI | **Per second** | $0.00005/s/vCPU | https://depot.dev/pricing |
## Gotchas
1. macOS capacity is "not fully elastic" because of Apple licensing, so expect queueing at peak.
2. Included minutes are counted in "billed minutes" after multipliers. Their dollar value for macOS/Windows is unclear.
3. Windows runners have no Hyper-V. Jobs only; not a general sandbox.
4. Per-second billing is documented for Depot CI, not for GHA runners. Per-minute is assumed.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress. Illustrative.
| Regime | Compute | Plan | **Monthly** |
|---|---|---|---|
| macOS 8 CPU/24 GB ($4.80/h) | $42,240.00 | $200 (Startup; included minutes' offset unknown) | **≈ $42,440** |
| Windows 4 CPU/16 GB ($0.96/h) | $8,448.00 | $200 | **≈ $8,648** |
Snapshots and egress are not metered or published.
Sources: https://depot.dev/pricing · https://depot.dev/docs/github-actions/runner-types