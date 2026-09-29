# Blacksmith: pricing regimes (as of 2026-09-28)
Blacksmith sells drop-in GitHub Actions runners (Linux x64/arm64, Windows Server 2025 beta, macOS M4), billed per minute. Prices scale with vCPU relative to a **2-vCPU x64 base minute ($0.004)**:
- ARM: 0.625x
- Windows: 2x
- macOS: 20x per 6 vCPU
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Ubuntu x64 | `blacksmith-Nvcpu-ubuntu-*` | Per minute, proportional to vCPU | $0.004/min per 2 vCPU (2/8 $0.004 up to 32/128 $0.064) | https://www.blacksmith.sh/pricing, https://docs.blacksmith.sh/blacksmith-runners/overview |
| 2 | Ubuntu arm64 | arm labels | same | $0.0025/min per 2 vCPU | same |
| 3 | Windows x64 (public beta) | Windows Server 2025 | same, 2x x64 | 2 vCPU/7 GB **$0.008**; 4/14 $0.016; 8/28 $0.032; 16/56 $0.064; 32/112 $0.128 | same |
| 4 | macOS M4 | `blacksmith-6vcpu-macos-*` / 12vcpu | same, 20x x64 per 6 vCPU | 6 vCPU/24 GB **$0.08/min**; 12 vCPU/48 GB $0.16/min | same |
| 5 | Free minutes | Every org | 3,000 x64-2vCPU minutes/month, consumed faster on bigger, Windows or macOS runners | ≈ $12/month of usage | docs overview |
| 6 | Sticky disks / Docker layer cache | Opt-in | GB-month | $0.50/GB-month | pricing |
| 7 | Static IPs | Windows/Ubuntu | Per IP per month | $100/IP/month | pricing |
| 8 | Enterprise | Contact | SLA, support | Custom | pricing |
## Gotchas
1. GitHub Actions jobs only (`runs-on:` label), not a general sandbox.
2. Free minutes are x64-equivalent: 3,000 free minutes = only 150 macOS 6-vCPU minutes.
3. Windows is beta. macOS capacity and regions are not published.
4. Per-minute rounding is assumed (GitHub job minutes).
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB "snapshots" (sticky disk), 100 GiB egress. Illustrative: CI jobs, not sessions.
| Regime | Compute | Sticky disk 50 GB | Free credit | **Monthly** |
|---|---|---|---|---|
| macOS 6 vCPU ($4.80/h) | $42,240.00 | $25.00 | -$12.00 | **$42,253.00** |
| Windows 4 vCPU/14 GB ($0.96/h; RAM 14 ≥ 8) | $8,448.00 | $25.00 | -$12.00 | **$8,461.00** |
| Linux 4 vCPU/16 GB ($0.48/h) | $4,224.00 | $25.00 | -$12.00 | $4,237.00 |
Egress is not metered or published. CPU utilisation does not matter.
Sources: https://www.blacksmith.sh/pricing · https://docs.blacksmith.sh/blacksmith-runners/overview