# Cua Fleet (Windows): pricing regimes (as of 2026-09-28)
Cua Fleet is Cua's hosted cloud for computer-use sandboxes; the Cua SDK itself is open source (MIT). It bills one usage rate per vCPU-hour and per GiB-hour of memory for every OS. The Fleet's built-in images are **Ubuntu 24.04 and Windows Server 2022**. Windows 11, macOS and Android are rejected for Fleet; they are local-only through Lume, QEMU or an emulator.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Fleet usage, Windows Server 2022 | Cloud sandbox | Allocated vCPU + memory per hour. Granularity/minimum not published | **$0.044625/vCPU-h + $0.0223125/GiB-h**. No published Windows surcharge. 4 vCPU/8 GiB = **$0.357/h** | https://cua.ai/pricing, https://cua.ai/docs/reference/sandbox-sdk/runtime-support |
| 2 | Local sandbox (OSS) | Your machine | Free (Docker, QEMU, Apple VZ; Windows 11 via local ISO; macOS via Lume) | $0 | https://cua.ai/pricing |
| 3 | Enterprise / on-prem / BYOC | Contact | custom | custom | https://cua.ai/pricing |
## Gotchas
1. Storage, egress, idle/paused billing, minimums and free credits are **not published**.
2. No published Windows licence surcharge. If one exists, this estimate is low.
3. Cua does **not** host macOS. The sweep's "macOS only locally through Lume" holds.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress.
- Compute: 8,800 × $0.357 = **$3,141.60/month**.
- Snapshots, egress and stopped-state billing are unpublished (null), so the real total is at least $3,141.60.
Sources: https://cua.ai/pricing · https://cua.ai/docs/reference/sandbox-sdk/runtime-support