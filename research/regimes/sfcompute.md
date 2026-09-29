# SF Compute: pricing regimes (as of 2026-09-28)
SF Compute is a GPU cloud built around an **orderbook**. You buy (and resell) time on 8-GPU nodes, as reserved windows or as
spot deployments, and there is no list price. Its sister product **Autoresearch / "givemeanode"** is an agent PaaS with
fixed per-minute list prices for RL sandboxes, CPU nodes, H100 nodes and batch jobs. The computesdk benchmark ("givemeanode")
measured the Autoresearch sandboxes. The main sfcompute.com/pricing is a login wall and sfcompute.com/prices now serves the homepage.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Sandbox running | Autoresearch RL sandbox with a command in flight | Per GiB of **RAM** per minute. Each core comes with 4 GiB, so billed GiB = max(RAM, 4 × vCPU) | $0.04572/GiB-h. sm 1/2 → 2 GiB $0.0914/h. **md 4/8 → 16 GiB $0.7315/h**. lg 8/32 $1.4630/h. xl 16/64 $2.9261/h | https://autoresearch.sfcompute.com/, /llms.txt |
| Sandbox parked | Automatically after ~1.5 s idle | Spare memory handed back stops billing at the RAM rate. The held disk bills at the parked rate. Processes keep running, wake takes tens of ms | ~$0.000139/GiB-h (~330× cheaper) | same |
| Sandbox fork / bake | `fork_sandbox` (1-256 per call), `create_sandbox_env` | Forks are free (CoW) and each fork pays its own RAM-minutes. A bake bills as sandbox time | $0 fork | same |
| Sandbox snapshots | Stored bake/branch snapshots | Deduplicated GiB-month. Resident on host vs cold in object store (automatic, one-time rehydrate) | $0.10 resident / $0.05 cold per GiB-month. Live until deleted or expiry | same |
| Sandbox limits | New workspace | `sandbox_vcpus` starts at 4 (lg/xl need a raise). RAM ceiling 8 GiB (64 GiB platform cap) | - | /llms.txt |
| H100 interactive node | `create_node --chip h100` / `8xh100` | Per minute while running **plus an idle window** after the last command unless stopped. Stopped means disk parked at $0 | h100-1 $0.066/min = **$3.96/h** (15-min window, $0.99 max). h100-8 $0.528/min = $31.68/h (20-min, $10.56 max) | https://autoresearch.sfcompute.com/ |
| CPU node | chip `cpu-2` / `cpu-8` | Per minute, 15-min idle window | cpu-2 (2 physical cores, 8 GiB) $0.18/h. cpu-8 (8 cores, 32 GiB) $0.4824/h ("33% off, CPU node launch pricing") | same |
| Calendar discount | Minutes that run on Fri / Sat / Sun (US Pacific), **nodes only** | Applied per minute, never raises a quoted rate | Fri 33% off (cpu-2 32%), Sat/Sun 20% off. **Sandboxes: none** | same |
| Batch jobs (H100) | `submit_job`, sweeps, tasks | Per GPU-minute. Queued time free. Preemption-tolerant (checkpoints survive) | $0.0495/min = **$2.97/GPU-h** (25% below interactive). Friday interactive ($2.65) beats it | same |
| Market: reserved | `sf buy`, orderbook limit order on an 8-GPU SKU (H100/H200/B200) and delivery window | Prepaid node-minutes for the whole window, whole minutes, min 1 node × 1 min. Includes boot/idle. Buyers pay no fees | **No list price.** Illustrations: homepage "Reserved $3.00/gpu/hr" (3-mo), docs example ~$17.42/node-h (~$2.18/GPU-h), old prices page "H100 from $1.50/gpu/hr" | https://docs.sfcompute.com/preview/orders, https://sfcompute.com/ |
| Market: resale | Selling unused reserved time | Fill price minus platform fee (fixed $/node-h + %, per org, unpublished), credited | Vendor reports a 25% average realized discount (2026-09-09): $4.50 → $3.375 realized | https://sfcompute.com/news/realized-discount |
| Market: spot deployment | Preview access | Immediate-or-cancel buys at or below max $/node-h. Pays the seller price for each contract block (min runtime 1 min-24 h). 2-min preemption notice | market price | https://docs.sfcompute.com/preview/spot-deployments |
| Bare metal / managed Slurm (InfiniBand) | Contact sales | Negotiated | null | https://sfcompute.com/specs |
| Egress / ingress | GPU clusters | "No ingress/egress fees" | $0 (sandbox egress not separately stated) | https://sfcompute.com/specs |
| Credit | All usage is prepaid | Buy $10-$10,000. Purchased credit valid 12 months, promo credit 3 weeks. Auto top-up default <$20 → +$100. Invoice accounts move to prepaid on **2026-10-01** | - | /llms.txt |
| Other meters | - | Builds $0.01/min (300 min free). Logs/traces $0.50/GB (5 GB free). Metrics $8/1k series (10k free). Node snapshots $0.10/GiB-mo (250 GiB free). Object storage 100 GB free then $0.10→$0.035/GB-mo tiers | - | https://autoresearch.sfcompute.com/ |
## Gotchas
1. **Sandboxes are priced on RAM only, with a 4 GiB/core floor.** CPU-heavy shapes are expensive: 4 vCPU / 8 GiB bills as 16 GiB = $0.73/h flat-out, 3.3× Isorun.
2. **Parking is the whole economics.** Agent loops that are idle 87% of the time pay about 13% of the flat-out figure, but only for memory actually handed back. A sandbox holding a loaded model keeps paying.
3. **Calendar discounts do not apply to sandboxes.** They apply to Autoresearch nodes only. Our earlier record assumed they might, and the live table shows "-" for sandbox rows.
4. **Idle windows on nodes**: a node keeps billing for 15-20 min after its last command unless you stop it.
5. **Stale docs**: llms.txt implies an H100 list price of $3.60/h ("$0.90 at the H100 list rate" for 15 min), and the CLI example shows $0.0666/min. The live table says $0.066/min = $3.96/h.
6. **Market GPUs have no price list.** Prices vary by SKU, zone and window, and are sold per 8-GPU node. Market VMs have no persistent storage and can take ~10 min to boot, and boot minutes are billed.
7. **Everything is prepaid**, and spend caps count credit-paid usage, so a cap can stop nodes while credit remains.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots retained, 100 GiB egress.
- Sandbox-md flat-out (never parked): 8,800 × 16 GiB × $0.04572 = **$6,437.38**.
- Parked 70% of the time (using the 30% CPU figure as a proxy for "command in flight"): 2,640 h × $0.73152 = **$1,931.21**, plus a small parked-disk charge (unknown disk size, ~$0.000139/GiB-h).
- Snapshots: 50 GiB × $0.10 = **$5.00** resident ($2.50 cold). Egress: $0 (not charged per specs page; unverified for sandboxes).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Sandbox-md, never parked | Yes (sandbox_vcpus limit starts at 4 per workspace, so 50 × 4 vCPU needs a raise) | **$6,442.38** |
| Sandbox-md, parked 70% | Yes | ≈ **$1,936** + parked disk |
| cpu-2 node (2 physical cores / 8 GiB), stopped between shifts, weekdays | Alt product (container node, not sandbox API) | 8,800 × $0.18 = $1,584. With ~4.4 Fridays at 32% off: **$1,482.62** |
| H100 / market GPU | Not a GPU workload | n/a |