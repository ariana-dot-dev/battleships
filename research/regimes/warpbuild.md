# WarpBuild: pricing regimes (as of 2026-11-08)
WarpBuild sells GitHub Actions runners (Linux x64/arm64, Windows x64, macOS M4 Pro / M5 Pro, Linux on Apple Silicon), billed **per minute** with unlimited job concurrency on Linux and Windows. You can also bring your own cloud (BYOC). The runner modes are flagged `alt`. Since 2026-10-29 it also sells **macOS 26 sandboxes** (wb CLI: exec, files, pty, VNC desktop), billed **per second**, with pause and resume (https://www.warpbuild.com/docs/ci/sandboxes).
## Regime table
| # | Regime | When it applies | How billed | Numbers ($/min → $/h) | Source |
|---|---|---|---|---|---|
| 1 | macOS (M4 Pro / M5 Pro) | `macos` runners | Per minute | 6 vCPU/14 GB **$0.08** ($4.80/h) · 12/28 $0.16 ($9.60/h) | https://www.warpbuild.com/pricing |
| 2 | Windows x64 | Windows runners | Per minute | 4/16 **$0.016** ($0.96/h) · 8/32 $0.032 · 16/64 $0.064 · 32/128 $0.128 | same |
| 3 | Linux x64 | – | Per minute | 2/8 $0.004 · 4/16 $0.008 · 8/32 $0.016 · 16/64 $0.032 · 32/128 $0.064 | same |
| 4 | Linux arm64 | – | Per minute | 2/8 $0.003 · 4/16 $0.006 · 8/32 $0.012 · 16/64 $0.024 · 32/128 $0.048 | same |
| 5 | Linux arm64 on Apple Silicon | – | Per minute | 6/14 $0.08 · 12/28 $0.16 | same |
| 6 | BYOC (AWS/GCP/Azure) | Your cloud account | Per runner-minute + your cloud bill | Linux / Windows **$0.002/min**. Add-ons free | same |
| 7 | Add-ons | Cache, snapshots | Metered | Cache $0.20/GB-mo · cache op $0.0001 · snapshot restore $0.04/job · snapshot storage **$0.025/h per snapshot** | same |
| 8 | Docker builders | Shared builders | Per minute | $0.06–$0.88/min | same |
| 9 | Enterprise | Contact | Dedicated cloud, region pinning, 99.9% SLA | Add-ons: SAML SSO $250/month · Data Residency $250/month · Audit Logs $400/month · Tailscale networking free | same |
| 10 | macOS 26 sandbox | `wb sbx` sandboxes | Per second while running; paused = no compute charge, saved disk billed as cache | 6 vCPU/14 GB/60 GB **$0.08/min** ($4.80/h) · 12/28/60 $0.16/min ($9.60/h) · paused disk $0.20/GB-month + $0.0001 per save/restore | https://www.warpbuild.com/docs/ci/sandboxes |
## Gotchas
1. **Windows costs 2× Linux x64 per size;** macOS costs 10× Linux x64 for comparable vCPU.
2. **Snapshots are billed per snapshot-hour** (≈ $18.25/month each), not per GiB.
3. There is free usage for new accounts, but the amount is unpublished.
4. Runners live only for a job. Ubuntu snapshot runners carry the disk to the next job (deleted after 15 days; not on Windows, macOS or BYOC).
5. macOS sandboxes keep `/Users/runner` and `/opt/homebrew` on pause, not `~/Library`, `/usr/local`, `/Applications` or memory. A sandbox lasts 7 days from creation, running or paused.
## Worked example
Workload: 4 vCPU / 8 GiB for 8,800 h (as if it were CI minutes). One snapshot is kept, and egress is not priced.
| Regime | Size picked | Maths | Monthly |
|---|---|---|---|
| macOS | 6/14 | 8,800 × $4.80 | **$42,240** |
| Windows | 4/16 | 8,800 × $0.96 | $8,448 |
| Linux x64 | 4/16 | 8,800 × $0.48 | $4,224 |
| + 1 snapshot | – | 730 × $0.025 | +$18.25 |
Sources: https://www.warpbuild.com/pricing