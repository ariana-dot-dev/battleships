# Depot GitHub Actions runners and Sandboxes: pricing regimes (as of 2026-11-08)
Depot sells GitHub Actions runners, container builds and sandbox compute (Depot CI, Depot Sandboxes, Managed Agents) under monthly plans that include minutes.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Developer plan | 1 user | Monthly fee including 2,000 GitHub Actions minutes, 2,000 sandbox minutes (shared by Depot CI, Depot Sandboxes and Managed Agents, measured at 2 vCPUs), 500 container build minutes, 25 GB cache | $20/month | https://depot.dev/pricing |
| 2 | Startup plan | Unlimited users | Monthly fee including 20,000 GHA minutes, 20,000 sandbox minutes, 5,000 container build minutes, 250 GB cache | $200/month | same |
| 3 | Business | Contact | Custom images, custom terms | custom | same |
| 4 | macOS runners | `depot-macos-26/15/14` (M4 or M2) | Per minute; "billed minutes" = elapsed × multiplier minus plan minutes | 8 CPU / 24 GB / 400 GB **$0.08/min** | https://depot.dev/docs/github-actions/runner-types |
| 5 | Windows runners | `depot-windows-2025/2022` | same | 2 CPU/8 GB/100 GB **$0.008/min**; 4 CPU/16 GB/130 GB **$0.016/min** (larger sizes exist; prices not verified) | same |
| 6 | Linux runners (reference) | `depot-ubuntu-24.04` | same | 2 CPU $0.006/min; 4 CPU $0.012/min. GHA overage $0.006/min | same |
| 7 | Sandbox compute | Depot CI, Depot Sandboxes (SDK) and Managed Agents; isolated Linux microVMs | **Per second**, after the shared included minutes | $0.00005/s/vCPU ($0.18 per vCPU-hour); SDK default 2 vCPU / 4 GB / 100 GB; 2 to 64 vCPUs; max 24 h | https://depot.dev/pricing · https://depot.dev/docs/api/sandbox-sdk-reference.md |
## Gotchas
1. macOS capacity is "not fully elastic" because of Apple licensing, so expect queueing at peak.
2. Included minutes are counted in "billed minutes" after multipliers. Their dollar value for macOS/Windows is unclear.
3. Windows runners have no Hyper-V. Jobs only; not a general sandbox.
4. The pricing page says per-second billing with no one-minute minimum.
5. Included sandbox minutes count at 2 vCPUs, so a 4-vCPU sandbox uses 2 included minutes per minute. Extra use is billed; the pool is not a hard cap.
6. Sandbox snapshots keep files (home directory and /workspace, up to 25 GiB), not processes or memory. A stopped sandbox cannot restart; a restore makes a new sandbox. Managed Agents save workspace snapshots automatically.
7. The old $0.01/min agent sandbox rate is no longer listed (checked 2026-11-08).
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress. Illustrative.
| Regime | Compute | Plan | **Monthly** |
|---|---|---|---|
| macOS 8 CPU/24 GB ($4.80/h) | $42,240.00 | $200 (Startup; included minutes' offset unknown) | **≈ $42,440** |
| Windows 4 CPU/16 GB ($0.96/h) | $8,448.00 | $200 | **≈ $8,648** |
Snapshots and egress are not metered or published.
Sources: https://depot.dev/pricing · https://depot.dev/docs/github-actions/runner-types