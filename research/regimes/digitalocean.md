# Digital Ocean Droplets: pricing regimes (as of 2026-09-28)
Digital Ocean sells fixed-size VMs ("Droplets") in bundled plans, plus a new per-resource "v 5" family.
Since **2026-01-01 CPU Droplets are billed per second** (minimum 60 s or $0.01, whichever is higher).
Bundled plans are capped at **672 h (28 days) per month**, so the hourly price is exactly monthly/672
(s-4vcpu-8gb: $48/672 = $0.07143/h). v 5 configurations (US-only, launched 2026-08-25) are per-resource,
per-second and have **no monthly cap**. A Droplet bills from create to destroy, including while powered off.
All prices USD list, excl. tax/VAT. There are no regional price differences for Droplets or bandwidth.
Reference shape 4 vCPU / 8 GiB: Basic Regular `s-4vcpu-8gb` **$0.07143/h, cap $48/mo** (160 GiB SSD, 5,000 GiB transfer, IPv 4 included).
## Regime table
| Regime | When it applies | How billed | Numbers (4 vCPU / 8 GiB unless noted) | Source |
|---|---|---|---|---|
| Basic Regular (shared vCPU) | Default cheapest line, all regions except MEM1 | Per second (60 s / $0.01 min) at monthly/672, capped at the monthly price after 672 h | s-4vcpu-8gb $0.07143/h, cap $48; 2/4 $0.03571/h cap $24; 8/16 $0.14286/h cap $96 (Basic max 8 vCPU) | https://www.digitalocean.com/pricing/droplets, https://docs.digitalocean.com/products/droplets/details/pricing/ |
| Basic Premium AMD / Intel (shared, NVMe) | Newer CPUs, NVMe, up to 10 Gbps | Same as above | s-4vcpu-8gb-amd/-intel $0.08333/h, cap $56; up to 8 vCPU/32 GiB ($0.25-$0.28571/h) | same |
| CPU-Optimized / General Purpose / Memory- / Storage-Optimized (dedicated vCPU, Regular) | Need a dedicated hyperthread | Same per-second + 672 h cap | CPU-Opt c-4 (4/8) $0.125/h cap $84; GP g-4vcpu-16gb $0.1875/h cap $126; CPU-Opt up to 48 vCPU, GP up to 40 (Regular) / 60 (Premium Intel) | same |
| Dedicated Premium Intel | NVMe + 10 Gbps dedicated | Same | c-4-intel $0.1622/h cap $109; g-4vcpu-16gb-intel $0.2247/h cap $151 | same |
| v 5 Shared (per-resource) | US datacenters ATL1, RIC1, MKC1, MEM1 only | Per second, 60 s min, **no monthly cap**; vCPU + RAM + boot disk priced separately | $0.0158219/vCPU-h + $0.0040411/GiB-h + $0.000137/GiB-h disk: 4/8/50 GiB = $0.0956 + $0.00685 = **$0.1025/h**; RAM 1x-3x per vCPU, max 8 vCPU / 24 GB | https://docs.digitalocean.com/products/droplets/details/pricing/, https://docs.digitalocean.com/products/droplets/concepts/choosing-a-plan/ |
| v 5 General Purpose (per-resource, dedicated) | US v 5 datacenters | Same, no cap | $0.028/vCPU-h + $0.0040411/GiB-h + disk; 4/8 = $0.1443/h + disk; 4/16/30 = $0.181/h; 2-64 vCPU, RAM 2x-8x | same |
| Monthly cap (automatic) | Bundled Droplet exists >= 672 h in the month | Charge stops accruing at 672 h | always-on s-4vcpu-8gb = $48/mo (vs $51.43 at 720 h) = ~7% off | https://docs.digitalocean.com/products/droplets/details/pricing/ |
| Powered off | Droplet shut down but not destroyed | **Billed in full** (resources stay reserved) | same as running | same |
| Snapshots | Keep state after destroying | $0.06/GB-month on snapshot size (full images, not incremental; min $0.01); free multi-region | 50 GiB = $3.00/mo | https://docs.digitalocean.com/products/snapshots/details/pricing/ |
| Backups | Automatic, per Droplet | Weekly +20% / daily +30% of Droplet cost, or usage-based $0.04 (weekly) ... $0.01 (4-hourly)/GiB-month | s-4vcpu-8gb weekly = $9.60/mo if on all month | https://docs.digitalocean.com/products/backups/details/pricing/ |
| Volumes | Extra block storage | $0.10/GiB-month while the volume exists (attached or not) | 1 GiB-16 TiB | https://docs.digitalocean.com/products/volumes/details/pricing/ |
| Egress | Outbound public traffic | Per-Droplet allowance accrues per second (allowance/2,419,200 s) into a team pool; overage $0.01/GiB; inbound free | s-4vcpu-8gb contributes 5,000 GiB per 672 h | https://docs.digitalocean.com/platform/billing/bandwidth/ |
| IPv 4 | Public IP | Included in bundled plans; Reserved IPv 4 free while assigned, $5/mo when unassigned; v 5 IPv 4 separate line item at $0.00 intro price | $0 | https://docs.digitalocean.com/products/networking/reserved-ips/details/pricing/ |
| GPU Droplets | GPU workloads | Per second, 60 s min, per-GPU hourly, no cap, billed while off | L40S $1.57, H100 $4.41 (8x $35.28), H200 $4.47, RTX 4000 Ada $0.76, RTX 6000 Ada $1.57, MI300X $2.59, MI325X $3.80; spot preview (MI350X/MI355X/B300) varies daily | https://docs.digitalocean.com/products/droplets/details/pricing/ |
| Commit / reserved | - | **None published** for Droplets; contract GPUs via sales | n/a | pricing page |
| Signup credit | New team | One-time | $5, expires after 90 days | https://docs.digitalocean.com/platform/billing/signup-credit/ |
Dated changes: 2022-07-01 price increase for Droplets, snapshots, reserved IPs and custom images (first in 10 years; $4 512 MiB
Droplet introduced). 2026-01-01 per-second billing with 60 s minimum replaced hourly billing for CPU Droplets.
2026-08-25 v 5 per-resource configurations (no monthly cap) in ATL1/RIC1/MKC1/MEM1. Source: https://docs.digitalocean.com/release-notes/archive/
## Gotchas
1. **Power-off is not a pause.** A stopped Droplet keeps billing at the full rate. For bursty agent work you must destroy and recreate from a snapshot (no memory state; boot + restore time).
2. **672 h cap only helps always-on machines.** A Droplet reaches the cap after 28 days; part-time machines pay hourly.
3. **v 5 has no cap and a separate disk charge.** For always-on use a v 5 Shared 4/8 costs ~$69-$76/mo (720-744 h, + disk) vs $48 for Basic Regular. v 5 IPv 4 is $0 "introductory, subject to change".
4. **Transfer pool is prorated per second.** Short-lived Droplets contribute only a fraction of their allowance; a fleet that exists 176 h/month contributes 26% of the monthly allowance each.
5. **Default Droplet limit is unpublished** and has to be raised via a request for 50 concurrent machines; creates are limited to 10 per request.
6. **Snapshots are full images** (not incremental), so per-Droplet snapshots add up; a 160 GiB disk with 20 GiB used snapshots at roughly used size.
7. **No ARM, no Windows.** Custom images are Linux/Unix only.
8. **Nested virtualization works** (Digital Ocean's own live-migration doc tells users to restart nested VMs after migration) but it is not a formally guaranteed feature; live migration can disrupt nested VMs.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent x 8 h/day x 22 days = **8,800 instance-hours**, 30% CPU (irrelevant: allocation billing),
50 GiB snapshots retained, 100 GiB egress, 50 GiB disk. Droplets destroyed after each shift and recreated from snapshot.
| Regime | Feasible? | Compute | Snapshots | Egress | Monthly total |
|---|---|---|---|---|---|
| **Basic Regular s-4vcpu-8gb, hourly (per-second)** | yes; 176 h/Droplet < 672 h cap | 8,800 x $0.07143 = $628.58 | $3.00 | $0 (pool ~65,000 GiB) | **$631.58** (cheapest) |
| Basic Premium AMD/Intel | yes | 8,800 x $0.08333 = $733.30 | $3.00 | $0 | $736.30 |
| Dedicated CPU-Optimized c-4 | yes | 8,800 x $0.125 = $1,100.00 | $3.00 | $0 | $1,103.00 |
| Dedicated Premium Intel c-4-intel | yes | 8,800 x $0.1622 = $1,427.36 | $3.00 | $0 | $1,430.36 |
| v 5 Shared 4/8 + 50 GiB boot disk (US only) | yes | 8,800 x $0.0956164 = $841.42 + disk 50 x 8,800/730 x $0.10 = $60.27 | $3.00 | $0 | $904.70 |
| v 5 General Purpose 4/8 (US only) | yes | 8,800 x $0.1443288 = $1,270.09 + disk $60.27 | $3.00 | $0 | $1,333.37 |
| Always-on 50 x s-4vcpu-8gb (kept, not destroyed) | yes | 50 x $48 cap = $2,400.00 | $3.00 | $0 | $2,403.00 |
| Powered off between shifts (not destroyed) | same as always-on | 50 x $48 | | | $2,400+ |
| Commit / reserved | not offered | - | - | - | n/a |
Cheapest: **Basic Regular per-second, destroy between shifts: ~$632/month** ($0.0718 per instance-hour all-in).