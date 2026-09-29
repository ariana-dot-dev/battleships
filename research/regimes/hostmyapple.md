# HostMyApple: pricing regimes (as of 2026-09-28)
HostMyApple (since 2009; Atlanta, Denver, Amsterdam) sells monthly **macOS cloud VPS**, i.e. virtualized macOS VMs, and monthly **dedicated Mac minis**. All plans include a dedicated IP, unlimited bandwidth (1000 Mbps), full admin, SSH and NoMachine/ARD/VNC. Prices are in USD.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | macOS Tahoe Cloud VPS | Virtual Mac server | Monthly, instant activation | Lite 4 vCPU/3 GB/60 GB **$24.99** · Basic 4/4/80 $34.99 · Pro 4/5/100 $44.99 · Max 6/6/100 $54.99 | https://hostmyapple.com/mac-vps-hosting |
| 2 | CloudApp editions | Preinstalled BlueBubbles / Beeper | Monthly | 4 vCPU/3 GB/60 GB $24.99 | https://hostmyapple.com/macos-cloudapp |
| 3 | Dedicated Mac mini | Whole Mac | Monthly, instant activation | Intel i7 16 GB/256 GB $59.99 · M1 8 GB/256 GB **$69.99** (on sale) · M1 16 GB $84.99 · M4 16 GB/256 GB $119.99 · M6 16 GB $139.99 · M6 32 GB $179.99 | https://hostmyapple.com/dedicated-mac-hosting |
| 4 | Bandwidth / IP | All | Included | Unlimited, dedicated IP | homepage |
## Gotchas
1. **VPS RAM tops out at 6 GB,** so a 4 vCPU / 8 GiB workload needs a dedicated Mac.
2. **Licensing:** a multi-tenant macOS VPS conflicts with the Apple SLA's "sole and exclusive use" of a leased Mac. VM density per host is undisclosed.
3. **The research file is outdated.** It said VPS up to 64 GB and dedicated pricing unpublished. The live pages list both (above).
4. There is no API. Access is by remote desktop and SSH only.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h × 22 days, 50 GiB snapshots (no product), 100 GiB egress (free).
| Regime | Maths | Monthly |
|---|---|---|
| VPS | no plan ≥ 8 GB | not viable |
| Card/engine: 50 × dedicated M1 8 GB | 50 × $69.99 | **$3,499.50** |
| 2 VMs per Mac: 25 × M4 16 GB (tight) | 25 × $119.99 | $2,999.75 |
| 2 VMs per Mac: 25 × M6 32 GB | 25 × $179.99 | $4,499.75 |
Sources: https://hostmyapple.com/ · https://hostmyapple.com/mac-vps-hosting · https://hostmyapple.com/dedicated-mac-hosting · https://hostmyapple.com/macos-cloudapp