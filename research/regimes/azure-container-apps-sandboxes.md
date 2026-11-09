# Azure Container Apps Sandboxes — pricing regimes (as of 2026-09-28)
ACA Sandboxes (`Microsoft.App/SandboxGroups`) are per-sandbox microVMs with suspend/resume (memory + disk snapshots),
volumes and egress policies. **GA announced 2026-09-23** (Apps on Azure blog; text saved in
The Azure pricing page states: "Azure Container Apps Express and
Sandboxes follow the same pay-per-second pricing as Consumption Plan". There are no sandbox-specific meters in the
Azure Retail Prices API, so compute uses the Consumption meters ($0.000024/vCPU-s, $0.000003/GiB-s, eastus).
Reference XL tier (4 cores / 8 GB) = **$0.432/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Running, tier XS | 0.25 core / 0.5 GiB / 5 GiB disk | Per second on tier allocation | $0.027/h | Learn overview tier table (updated 2026-11-06) + Consumption meters (Retail API, re-checked 2026-11-08) |
| Running, tier S | 0.5 / 1 GiB / 10 GiB | Same | $0.054/h | same |
| Running, tier M (default) | 1 / 2 GB / 20 GB | Same | $0.108/h | same |
| Running, tier L | 2 / 4 GB / 40 GB | Same | $0.216/h | same |
| Running, tier XL | 4 / 8 GB / 80 GB | Same | $0.432/h | same |
| Running, tier 2XL | 8 / 16 GiB / 160 GiB | Same | $0.864/h | Learn overview |
| Running, tier 3XL | 16 / 32 GiB / 320 GiB | Same | $1.728/h | Learn overview |
| Quota | 300 concurrent active cores and 3,000 API requests/min per region per subscription (default) | Raised by support request; may need review | 300 M-tier sandboxes at once | https://sandboxes.azure.com/docs/sandboxes/limits (2026-11-08) |
| Stopped / suspended | Manual stop, lifecycle policy, auto-suspend after idle (no ingress, exec, shell or file ops) | No CPU or memory charges | $0 compute | docs, GA blog |
| Snapshot, image and volume storage | Memory+disk or disk-only snapshots (incl. automatic ones on stop), custom disk images (one copy regardless of how many sandboxes boot from it), data disks and blob volumes (GA blog, updated 2026-10-15); OS disk not billed | "Charged (coming soon) at Premium Azure Blob ZRS rates" | Premium Block Blob ZRS Data Stored $0.20/GB-month (Retail API eastus); **$0 today** | GA blog; Retail API |
| Volumes | Azure Blob (shared) / Data Disk (single mount) / BYO Blob | Azure storage rates | not captured | docs |
| Savings plan | Azure savings plan for compute | Consumption SP meters (applicability inferred) | 1y $0.0000204 / $0.00000255; 3y $0.00001992 / $0.00000249 | Retail API |
| Egress | Internet out | Azure bandwidth | 100 GB/month free, $0.087/GB NA/EU, $0.12/GB Asia | Retail API "Bandwidth" |
| Free grant | Consumption 180k vCPU-s / 360k GiB-s | **Unclear whether it covers Sandboxes** | not assumed | — |
| Auto-delete | N days after stop | Stops storage charges | configurable | docs |
## Gotchas
1. **Snapshot storage becomes a real cost** once the "coming soon" Premium Blob ZRS charge starts: $0.20/GB-month is 2.5x EBS snapshots and 40x what GitHub charges for the same service's snapshots in Copilot.
2. **Every stop takes a snapshot** (memory mode = RAM + disk), so stopped sandboxes accrue storage until auto-delete.
3. **No Sandbox-specific regional surcharge is published.** The pricing page says only "same pay-per-second pricing as Consumption Plan"; the higher Consumption meters in westeurope etc. (+42% vCPU) apply only if that inference holds.
4. **Entra ID accounts only**; personal Microsoft accounts are not supported.
5. **No public image ships a desktop or a browser.** Any OCI image can be imported as a disk image, so you build one yourself; no official example.
## Worked example
XL tier (4 / 8 GB), 50 concurrent x 8 h/day x 22 days = **8,800 sandbox-hours**, stopped (snapshotted) between
shifts, 30% CPU (no effect), 50 GiB snapshots retained, 100 GiB egress (free 100 GB).
| Regime | Calculation | Total / month |
|---|---|---|
| XL on-demand, today (storage not yet charged) | 8,800 x 0.432 | **$3,801.60** |
| XL on-demand, once snapshot storage is charged | $3,801.60 + 50 x $0.20 | **$3,811.60** |
| XL + 3y savings plan committed 24/7 | 50 x 730 x 0.35856 = $13,087.44 | **$13,087.44** (worse) |
| M tier (1 / 2 GB) if the agent fits | 8,800 x 0.108 + $10 | **$960.40** |
| Anti-pattern: never stopped (24 h/day) | 50 x 730 x 0.432 | **$15,768.00** |