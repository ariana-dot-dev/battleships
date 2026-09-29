# Daytona Windows sandboxes: pricing regimes (as of 2026-09-28)
Daytona runs Windows as VM sandboxes built for computer use. They support pause/resume with memory, fork, and memory snapshots, and come only as three presets. The live pricing page lists **"OS, Windows, $0.0858/vCPU/h"** as its own line next to Compute ($0.0504/vCPU-h), Memory ($0.0162/GiB-h) and Storage ($0.000108/GiB-h). That layout reads as a surcharge **added** to the vCPU rate, giving $0.1362/vCPU-h. This card encodes the additive reading.
The two cards disagree until that is reconciled.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Windows VM, running | Presets only | Per second on allocated vCPU + RAM + disk | vCPU $0.0504 + Windows $0.0858 = $0.1362/vCPU-h; RAM $0.0162/GiB-h. windows-small 1/4/30 = $0.201/h; windows-medium 2/8/50 = $0.4020/h; **windows-large 4/16/50 = $0.804/h** (excluding disk) | https://www.daytona.io/pricing, https://www.daytona.io/docs/en/sandboxes.md |
| 2 | Idle tail | Until auto-pause | Full rate. Windows defaults to **auto-pause after 60 min idle**, auto-stop disabled | | docs/sandboxes |
| 3 | Paused (memory preserved) | Pause | Disk only | $0.000108/GiB-h above 5 GiB ($0.0788/GiB-month) | https://www.daytona.io/docs/en/billing |
| 4 | Stopped | Stop | Disk only. Windows cannot be archived ("stopping already releases disk quota") | same | docs/sandboxes |
| 5 | Snapshots (fs or fs+memory) | Retained snapshots | "Remain billed", rate unpublished | null | docs/billing |
| 6 | Tiers / pools | Org-wide | Prepaid top-ups set vCPU/RAM/disk pools. Windows uses 4 GiB/vCPU, so RAM pools fill fast | Tier 3 ($500) 250 vCPU/500 GiB; Tier 4 ($2,000 per 30 days) 500/1000 | https://www.daytona.io/docs/en/limits |
| 7 | Free credit | Sign-up | One-time | $200 | pricing |
## Gotchas
1. Fixed 4 GiB per vCPU: a 4 vCPU/8 GiB workload has to use windows-large (16 GiB).
2. The **60-minute idle auto-pause** tail bills at the full Windows rate.
3. Additive vs replacement ambiguity: the replacement reading would make windows-large $0.6024/h.
4. 50 × 16 GiB = 800 GiB of RAM needs Tier 4 (the $2,000 per 30 days top-up is consumed as credit).
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress.
Assumptions: windows-large, paused outside hours (27,700 paused sandbox-hours), 45 GiB billable disk each.
| Item | Cost |
|---|---|
| Compute 8,800 × $0.804 | $7,075.20 |
| Disk while running 8,800 × 45 × $0.000108 | $42.77 |
| Disk while paused 27,700 × 45 × $0.000108 | $134.62 |
| Snapshots 50 GiB | unpublished (null) |
| Egress | not published |
| **Monthly** | **$7,252.59** (replacement reading: $5,478.51) |
The idle tail adds 60 min × 50 × 22 = 1,100 h × $0.804 = **+$884.40** if sandboxes are left to auto-pause.
Sources: https://www.daytona.io/pricing · https://www.daytona.io/docs/en/sandboxes.md · https://www.daytona.io/docs/en/billing · https://www.daytona.io/docs/en/limits