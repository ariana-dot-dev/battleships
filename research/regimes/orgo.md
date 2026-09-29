# Orgo: pricing regimes (as of 2026-09-28)
Orgo sells persistent "computers for agents": full desktops with screenshot/click/type/scroll/drag APIs, REST/SDK/CLI/MCP and SSH. Pricing is a **flat monthly plan** that buys a number of always-on computers sharing a RAM and storage pool. There is no per-hour meter.
- **OS:** Linux on every plan; Windows from the Scale plan; Mac desktops only in Enterprise closed beta.
- **Sizes:** a computer is sized by `cpu` (0.5, 1, 2 or 4 cores) and `ram` (4, 8, 16, 32 or 64 GB). The hard cap per computer is 4 vCPU / 64 GB / 300 GB, and each plan sets a lower per-computer ceiling (unpublished).
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Hacker | 1 computer, Linux | Flat monthly | **$29/mo**: 1 computer, 8 GB RAM, 40 GB storage, 1 seat, $5 AI credit | https://www.orgo.ai/pricing |
| 2 | Startup | Up to 4 computers, Linux | Flat monthly | **$99/mo**: 4 computers, 32 GB RAM, 160 GB, 5 seats, $10 AI credit | same |
| 3 | Scale | Up to 16 computers, **Linux + Windows** | Flat monthly | **$399/mo**: 16 computers, 128 GB RAM, 640 GB, 25 seats, $50 AI credit, custom templates | same |
| 4 | Yearly billing | Toggle "Yearly" | Prepaid annually | **$290/yr** ($24/mo), **$990/yr** ($82), **$3,990/yr** ($332) | same (Yearly toggle) |
| 5 | Enterprise | 60+ computers, Linux + Windows + **Mac** | "Custom. Volume pricing, billed annually." Shared, dedicated or on-prem | null | same |
| 6 | Stopped computer | `stop` | Disk archived. Restarts on a fresh host with a new IP and no RAM state | Included in the plan | https://docs.orgo.ai/guides/instance-types |
| 7 | Capacity add-ons | "Add computers as demand grows" | Not priced | null | pricing |
| 8 | AI credit | Managed model access | Model-usage credit, **not compute** | $5 / $10 / $50 per month | pricing |
| 9 | Egress / IPv4 | – | Not published | null | – |
## Gotchas
1. **The plan caps both count and RAM.** Scale's 128 GB pool means 16 × 8 GB computers, or only 4 × 32 GB.
2. **Pool vCPU is unpublished.** The card uses computers × 4 vCPU (the hard per-computer cap) as an upper bound. Real plan ceilings are lower and can return 403 `PER_COMPUTER_CPU_CAP`.
3. **Windows needs Scale ($399).** No Windows licence line is shown.
4. **macOS is closed beta on Enterprise only**, with no price.
5. **Flat pricing:** idle time costs nothing extra, and a busy fleet costs no more than an idle one.
6. **Stacking plans is undocumented.** More than 16 concurrent computers officially means Enterprise.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent, 8 h/day × 22 days, 30% CPU, 50 GiB snapshots, 100 GiB egress.
| Regime | Fits? | Monthly |
|---|---|---|
| Scale monthly | 16 computers only (8 GB each uses the whole 128 GB pool) | $399 covers 16 concurrent |
| 4 × Scale (hypothetical; stacking undocumented) | 64 computers / 512 GB | 4 × $399 = **$1,596** (yearly: 4 × $332.50 = $1,330) |
| Enterprise (the official path for 50) | yes | null (custom) |
| Windows | Scale or Enterprise only | same as above |
| Snapshots / egress | not priced | null ($0 assumed) |
Hours and CPU utilisation do not change the bill.
Sources: https://www.orgo.ai/pricing · https://docs.orgo.ai/guides/instance-types · https://docs.orgo.ai/llms.txt