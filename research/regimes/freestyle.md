# Freestyle (freestyle.sh) - pricing regimes
As of 2026-09-28. Product: Freestyle VMs (full KVM VMs on bare metal, memory snapshots, pause/resume).
Primary sources: https://www.freestyle.sh/pricing, https://www.freestyle.sh/docs/vms/pricing-and-limits,
https://www.freestyle.sh/docs/vms/lifecycle, https://www.freestyle.sh/products/vms,
https://apis.io/plans/freestyle-sh/freestyle-sh-plans-pricing/ (mirror of an older pricing page).
List rates (identical on every plan): vCPU $0.04032/h, memory $0.0129/GiB-h, storage $0.000086/GiB-h
(= $0.0628/GiB-month), data transfer $0.02/GB. Metered per second, billed per resource-hour, on ALLOCATION.
Default 4 vCPU / 8 GiB / 32 GB = $0.26448/h compute (+$0.00275/h disk).
## Regimes
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Monthly allowance (all plans) | Every plan incl. Free, applied before anything else | First N resource-hours each month free; per-resource, not fungible | 200 vCPU-h ($8.06), 400 GiB-h RAM ($5.16), 60,000 GiB-h storage ($5.16), transfer 50 GB Free / 500 GB Hobby+Pro | /pricing, /docs/vms/pricing-and-limits |
| Free - hard cap | Free plan | Allowances are hard stops; exhausting compute pauses VMs until monthly reset, no auto-resume, no overage possible | $0; 10 concurrent, 10 saved VMs, 10 snapshots; per-VM max 4 vCPU/8 GiB/32 GB; account 40 vCPU/80 GiB/320 GB; no custom sizing. 200 vCPU-h = only 50 h of a default VM | /pricing |
| Hobby - min spend as credit | Hobby | Pay max($50, usage above allowances) | $50/mo fully usable as usage; 40 concurrent, 200 saved, 1,000 snapshots; 8 vCPU/16 GiB/64 GB per VM; 800 vCPU/1.56 TiB/3,125 GB totals | docs pricing-and-limits |
| Pro - min spend as credit | Pro | Pay max($500, usage above allowances) | $500/mo; 400 concurrent, 4,000 saved, 12,000 snapshots; 32 vCPU/64 GiB/256 GB per VM; 16,000 vCPU/31.25 TiB/62,500 GB totals | docs pricing-and-limits |
| Running (on-demand) | VM running, starting or pausing | vCPU + RAM + disk on allocated size, per second; no discount for idle-but-running | $0.04032/vCPU-h, $0.0129/GiB-h, $0.000086/GiB-h | docs pricing-and-limits |
| Always-on (no discount) | idleTimeoutSeconds null (the default - no idle timeout unless you set one) | Same as running, 730 h/month | 4/8 VM: $193.07/mo compute + $2.01 disk (32 GB) | derived |
| Paused | vm.pause() or idle timeout (network-inactivity based) | No compute; storage only. Doesn't count toward concurrency, does count toward saved VMs + disk budget | Disk $0.000086/GiB-h; saved-memory image billing not stated | docs lifecycle, pricing-and-limits |
| Stopped (persistent) | Persistent VM powered off | Disk only, memory discarded | $0.000086/GiB-h | docs lifecycle |
| Ephemeral | autoDeleteSeconds: 0 | VM deleted when it stops - no disk after the session | running rates only | docs pricing-and-limits |
| Snapshots | Named snapshots; kept until deleted | Storage price NOT published (count-limited: 10/1,000/12,000). Pricing page says persistent snapshots are paid-only | unknown (assumed storage rate in the example) | /pricing |
| Data transfer | Bytes crossing the DC boundary in either direction | $0.02/GB after 50 GB (Free, hard stop) / 500 GB (paid). VPC-internal free | $0.02/GB | docs pricing-and-limits |
| IPv4 | - | Not offered: per-VM public IPv6; all VMs share one outbound IPv4 | n/a | features/freestyle.json |
| Enterprise active CPU | Enterprise | Bill measured CPU time instead of allocated vCPU | rate unpublished | docs #enterprise-options |
| Enterprise node-based | Enterprise | Flat rate for dedicated capacity instead of per-resource billing | rate unpublished | docs #enterprise-options |
| Enterprise commitment | Enterprise | Reduced rates for usage/spend commitment | discount unpublished | docs #enterprise-options |
| Historical: daily allowance | Superseded, date unknown | Same rates; allowances were 20 vCPU-h, 40 GiB-h, 16,800 GiB-h storage PER DAY (~600/1,200/504,000 per month), plus repo/run quotas from the older Git/serverless product | - | apis.io mirror |
| Card verification | Adding card to Free | $1 charged then refunded; not credit | $1 refunded | docs pricing-and-limits |
## Gotchas
- Allowances are applied BEFORE the plan-fee credit on paid plans, so a Hobby account gets ~$18.38 of resource-hours + 500 GB transfer
  on top of the $50 credit. But they are per-resource: unused storage-hours cannot pay for vCPU-hours.
- The compute allowance got smaller: the older page gave 20 vCPU-h per DAY; now it is 200 per MONTH (~3x cut, date unknown).
- No self-serve always-on / reserved discount. The only discounts (active-CPU, node-based, commitment) are Enterprise with unpublished rates.
- Billing is on allocation: "a reserved core is yours whether or not the guest is busy". At 30% CPU utilisation you still pay 100%.
- There is no default idle timeout: a VM runs, and bills, until you pause it, set idleTimeoutSeconds/maxRunSeconds, or delete it.
  Marketing implies ~30 s auto-suspend; the docs don't. The idle timeout is based on network activity, so CPU-only work can get
  paused mid-job, while a VM that only prints to a PTY can still idle out.
- Marketing says "pay nothing while paused"; the docs say a paused VM "bills only for storage". Whether the saved RAM image counts as
  storage is not documented.
- Resize is up-only (live hot-add). Once grown, a VM can't shrink. VMs always start at their snapshot's size, so a snapshot taken
  from a big VM forces every clone to be big.
- Disk budget, not the saved-VM count, is the binding limit: Hobby fits only 97 default (32 GB) VMs despite "200 saved VMs".
- Concurrency counts running/starting/pausing VMs only, so paused VMs are "free" against the concurrency cap. 50 concurrent forces
  Pro ($500 minimum), because Hobby is capped at 40.
- Transfer counts both directions. Ingress (npm/pip pulls, uploads) uses up the 500 GB and then bills at $0.02/GB.
- Free contradicts itself: the pricing page shows persistent VMs/snapshots as unavailable on Free, but the docs limits table shows
  persistent VMs on every plan.
- Downgrading pauses VMs that are too large (or persistent) for the new plan, and they don't auto-resume. On Free, running out of
  allowance pauses VMs the same way.
- Snapshot storage has no published price, only count limits.
- exec() times out at 5 min. Longer jobs need PTY/nohup, which affects how you'd script auto-pause.
## Worked example
4 vCPU / 8 GiB (the default size, fits every plan's per-VM cap). 50 concurrent × 8 h/day × 22 days = 8,800 VM-h =
35,200 vCPU-h + 70,400 GiB-h RAM. CPU utilisation is 30%, but that is irrelevant here because billing is on allocation.
50 GiB of snapshots retained all month. 100 GiB egress. Month = 730 h. Disk = default 32 GB per VM.
Plan: 50 concurrent > Hobby's 40, so **Pro** ($500 minimum, credited against usage). Free: not eligible (10 concurrent, hard caps).
Common pieces:
- vCPU: (35,200 − 200) × 0.04032 = $1,411.20
- RAM: (70,400 − 400) × 0.0129 = $903.00
- Compute subtotal: **$2,314.20** (without the allowance it would be $2,327.42)
- Snapshots: 50 × 730 = 36,500 GiB-h. The price is unpublished; here it's assumed billed like storage at $0.000086. If snapshots are free, subtract ≤ $3.14.
- Egress: 100 GB < 500 GB included, so $0. Ingress counts too.
| Regime | Storage GiB-h (after 60,000 free) | Storage $ | Total/month |
|---|---|---|---|
| A. Pro, ephemeral VMs per session (autoDeleteSeconds 0), clone from snapshot | 50×32×176 = 281,600 + 36,500 − 60,000 = 258,100 | $22.20 | **$2,336.40** (usage > $500 min) |
| B. Pro, persistent VMs paused between sessions (disk kept 730 h) | 50×32×730 = 1,168,000 + 36,500 − 60,000 = 1,144,500 | $98.43 | **$2,412.63** (+ unknown saved-RAM storage, if billed) |
| C. Pro, VMs never paused (no idle timeout set = always-on) | same as B | $98.43 | compute (146,000−200)×0.04032 + (292,000−400)×0.0129 = $9,640.30. **$9,738.73** |
| D. Hobby | not eligible (40-concurrent cap). Rates are identical, so Hobby only differs when usage < $500 | - | n/a |
| E. Free | not eligible (10 concurrent; 200 vCPU-h hard stop) | - | n/a |
| F. Enterprise active CPU | rate unpublished | - | **null**. Illustrative only: if list rates applied to 30% of vCPU-h, (10,560−200)×0.04032 + $903.00 + $22.20 = $1,342.92. This is NOT a published price |
| G. Enterprise node-based / commitment | rates unpublished | - | **null** |
| H. Historical daily-allowance regime (superseded) | daily storage allowance 16,800 GiB-h > 14,000 GiB-h/day used, so free | $0 | (1,600−20)×22×0.04032 + (3,200−40)×22×0.0129 = **$2,298.33** |
The big swing is lifecycle (A vs C = 4.2x), not plan choice. Always set idleTimeoutSeconds/maxRunSeconds or pause explicitly.