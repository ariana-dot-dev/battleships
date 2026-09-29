# Daytona: pricing regimes (as of 2026-09-28)
Daytona has **no plan fees**. One price sheet ($0.0504/vCPU-h, $0.0162/GiB-h, $0.000108/GiB-h disk after 5 GiB free, per second, on **reserved** resources) applies to every sandbox class. What changes the bill is:
- the sandbox class (container, Linux VM, Windows, GPU on-demand, GPU spot),
- the lifecycle state,
- the prepaid-top-up tier, which sets the org-wide resource pool and network access.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Container sandbox, on-demand (default class) | Default `daytona-*` snapshots or any OCI image | Per second on **reserved** vCPU + RAM + disk while Started. Utilisation is not considered | $0.0504/vCPU-h, $0.0162/GiB-h. 4 vCPU/8 GiB = **$0.3312/h**. Default 1/1/3; per-sandbox max 4 vCPU/8 GiB/10 GiB (org limit, raisable per region) | https://www.daytona.io/pricing, https://www.daytona.io/docs/en/billing |
| 2 | Linux VM sandbox | `daytona-vm-*` class (fork, pause/resume, memory snapshots, nested KVM) | Same billing table as containers. No separate VM price is published | Assumed same $0.0504/$0.0162 (no VM line on the pricing page) | https://www.daytona.io/docs/en/sandboxes.md, /docs/en/billing |
| 3 | Windows VM sandbox | `windows-small/medium/large` presets only | Windows vCPU rate. RAM and disk are presumably the standard rates | $0.0858/vCPU-h. Presets 1/4/30, 2/8/50, 4/16/50 (vCPU/GiB/GiB disk). It is **ambiguous** whether $0.0858 replaces $0.0504 (A) or is added to it (B). windows-large: A = $0.6024/h, B = $0.8040/h (compute only) | https://www.daytona.io/pricing, /docs/en/sandboxes.md |
| 4 | GPU sandbox, on-demand | GPU class (container with exclusive GPUs, up to 8 GPUs) | GPU $/h per GPU. Per a third-party tracker (not in the official docs), vCPU/RAM/disk are metered on top at the normal rates. Deleted on stop | B300 6.25, B200 6.25, MI355X 5.99, H200 4.54, H100 3.95, RTX PRO 6000 3.03, RTX 5090 1.29, RTX 4090 0.99 ($/GPU-h). Each GPU unlocks up to 16 vCPU / 192 GB / 512 GB | https://www.daytona.io/pricing, https://gpuadvisor.com/providers/daytona |
| 5 | GPU sandbox, **spot/preemptible** (added v0.205.0, 2026-08-18) | `spot` flag on GPU create | Same as 4 at a lower GPU rate. Can be evicted **without notice** when on-demand needs capacity (`spotEvictedAt`). Does **not** count against GPU quota | B300 4.08, B200 3.59, MI355X 3.44, H200 2.61, H100 2.27, RTX PRO 6000 1.74, RTX 5090 0.74, RTX 4090 0.57 (about 35-43% off) | https://www.daytona.io/pricing, /docs/en/sandboxes.md, https://www.daytona.io/changelog |
| 6 | Transitional states | Creating, Starting, Stopping, Pausing | Billed **like Started** (full vCPU+RAM+disk). The reduced rate only begins once the Stopped/Paused state is reached | Duration not published | /docs/en/billing |
| 7 | Idle-but-running (auto-stop tail) | Until the idle timer fires | Full running rate. Idle = no *external* activity. Background processes do not reset the timer | Container/GPU auto-stop 15 min default. VM auto-pause 60 min default. `0` = never stop (bills forever) | /docs/en/sandboxes.md |
| 8 | Stopped | Container or Linux VM stopped | **Disk only** | $0.000108/GiB-h above 5 GiB = $0.0788/GiB-month. Stopped containers still occupy disk *quota* until archived. Stopped VMs offload state and free the quota but are still billed | /docs/en/billing, /docs/en/limits |
| 9 | Paused (VM / Windows only) | Pause (memory preserved) | **Disk only**. Preserved memory state is **not billed** | Same disk rate | /docs/en/billing |
| 10 | Archived (containers only) | Manual, or auto-archive after 7 days stopped by default (max 30) | **$0** (filesystem moved to object storage, quota freed) | 0 | /docs/en/billing, /docs/en/limits |
| 11 | Ephemeral | `autoDeleteInterval=0`. GPU sandboxes are always ephemeral | Deleted on stop, so no stopped-disk billing | 0 after stop | /docs/en/sandboxes.md |
| 12 | Snapshots created from a sandbox (cold fs, or hot fs+memory for VMs) | Retained snapshots | "Remain billed for storage" even after the sandbox is deleted. **Rate not published**. They deactivate after 2 weeks unused. Default quota 30 snapshots (v0.175.0) | null | /docs/en/billing, /docs/en/snapshots.md, /changelog |
| 13 | Volumes (S3-backed FUSE) | Shared data | **Free**, and not counted in the storage quota | $0. Max 100 volumes/org | /docs/en/volumes.md |
| 14 | Warm pools | Pre-created running sandboxes per snapshot/region (gated, contact support) | Count against quota like running sandboxes. **Billing while idle in the pool is not documented** (likely running rate) | null | /docs/en/warm-pools.md |
| 15 | Tier 1 (email verified) | Default | No fee. Org pool 10 vCPU / 10 GiB / 30 GiB (limits page re-checked 2026-09-28; an earlier "20 GiB" reading no longer appears). 300 creates/min. **Restricted egress** (allowlisted essentials only) | $0 | /docs/en/limits |
| 16 | Tier 2 | Card linked + $25 top-up (prepaid credit) | Pool 100 vCPU / 200 GiB / 300 GiB. 400 creates/min. Egress still restricted | $25 one-time prepaid | /docs/en/limits, /docs/en/network-limits.md |
| 17 | Tier 3 | $500 top-up (prepaid credit) | Pool 250 vCPU / 500 GiB / 2 TB. 500 creates/min. **Full internet** | $500 one-time prepaid | /docs/en/limits |
| 18 | Tier 4 | **$2,000 top-up every 30 days** | Pool 500 vCPU / 1000 GiB / 5 TB. 600 creates/min. In effect a $2k/month minimum spend, consumed as credit | $2,000 per 30 days | /docs/en/limits |
| 19 | Enterprise / dedicated region / custom region (BYOC) | Contact sales | Custom limits, SSO/SCIM, audit logs. Dedicated = Daytona-managed single-tenant. Custom = your runners, "unlimited" bounded by your compute. **Prices unpublished** | null | https://www.daytona.io/pricing, /docs/en/regions.md |
| 20 | Volume discounts | "as you scale" | Unpublished | null | https://www.daytona.io/pricing |
| 21 | Free credit | Sign-up, no card | $200 one-time. Consumed before paid credit. **Not usable on GPU**. Expiry exists ("See breakdown and expiration") but the term is unpublished | $200 | /pricing, /docs/en/billing |
| 22 | Startup program | Application | Pricing page says "up to $50k". Startups page says "up to $100k, $10K straight away". Inconsistent | $10k-$100k | https://www.daytona.io/startups |
| 23 | Regions | `us`, `eu` shared. GPU runs in virtual `earth` region (region preference ignored) | **No regional price differences published** | multiplier 1 | /docs/en/regions.md |
| 24 | Egress / ingress / IP | Any | **Not published and not metered on the pricing page**. No public IPv4 offered (HTTPS preview proxy + SSH gateway only) | null | /docs/en/network-limits.md |
## Gotchas
1. **Utilisation doesn't matter.** Billing is on *reserved* vCPU/RAM. At 30% CPU util you still pay 100%. Resize live (up only while running) to right-size.
2. **The idle tail is billed at full rate**, and "idle" ignores your own background processes. A container keeps billing 15 min after the last external call. A VM bills a full **60 min** before auto-pause. Setting auto-stop `0` means it runs and bills until you stop it. There is no org-level max-runtime guard (open feature request, GitHub daytonaio/daytona#4158).
3. **Stopping ≠ free.** Stopped and paused sandboxes bill disk (above 5 GiB) indefinitely. Only *archived* containers or deleted sandboxes are free. VMs cannot be archived, so a paused/stopped VM pays disk forever.
4. **Stop/pause transitions bill as running**, and so do Creating/Starting.
5. **Snapshots keep billing after the sandbox is deleted**, and the rate is unpublished.
6. **The tier system is a hidden gate.** Tiers 1-2 have **restricted outbound internet** (package registries, git hosts, model APIs only). Full internet needs a $500 top-up (Tier 3). More than 250 vCPU concurrent needs the recurring $2,000/30-day top-up (Tier 4). Concurrency is an org-wide vCPU/RAM/disk *pool*, not a sandbox count.
7. **Disk quota and disk billing are decoupled.** Stopped containers eat quota (which can block creates even when CPU is free) until archived. Stopped VMs free the quota but still bill.
8. **Windows** comes only as presets with 4 GiB RAM per vCPU. A 4 vCPU/8 GiB need forces windows-large (16 GiB, 50 GiB disk), and the vCPU rate is 1.7x Linux (or 2.7x if additive). Windows sandboxes also count 16 GiB each against the RAM pool.
9. **GPU:** the $200 free credit cannot be spent on GPUs. GPU sandboxes are deleted on stop, so no pause and no persistence. Spot GPUs are killed without warning. GPU work on shared regions ignores the region choice ("earth").
10. **Free-credit reassignment.** Redeeming free credits later in the month retroactively re-assigns usage and releases paid balance. Billing lags up to 48 h, which matters for spend monitoring. No spend-cap feature is documented. Auto top-up can keep charging the card.
11. Per-sandbox default max is **4 vCPU / 8 GiB / 10 GiB disk** unless raised per region. Disk can never shrink.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU util, 50 GiB snapshots retained, 100 GiB egress.
Assumptions:
- Container/VM disk = 10 GiB (daytona-large). Billable disk = 5 GiB × $0.000108 = $0.00054/h per sandbox.
- The 5 GiB free allowance is read as per sandbox (unverified).
- Persistent sandboxes are stopped outside hours: 730 − 176 = 554 h × 50 = 27,700 stopped sandbox-hours. That is below the 7-day auto-archive, so they are never archived.
- Tier: 50 × 4 vCPU = 200 vCPU and 400 GiB RAM needs **Tier 3** (one-time $500 top-up, spent as credit, so no extra cost). Windows needs 800 GiB RAM, so **Tier 4** ($2,000/30-day top-up, exceeded by usage anyway).
| Regime | Compute (8,800 h) | Disk running | Disk stopped/paused | Snapshots 50 GiB | Egress 100 GiB | Plan fee | **Monthly total** |
|---|---|---|---|---|---|---|---|
| Container, persistent (stop nightly) | 8,800 × 0.3312 = $2,914.56 | $4.75 | $14.96 | unpublished (null)* | not published ($0 assumed) | $0 (Tier 3) | **$2,934.27** + snapshots |
| Container, ephemeral (delete each day) or archived nightly | $2,914.56 | $4.75 | $0 | null* | $0? | $0 | **$2,919.31** + snapshots |
| Linux VM, paused/stopped nightly (price assumed same as container) | $2,914.56 | $4.75 | $14.96 | null* | $0? | $0 | **$2,934.27** + snapshots |
| Windows windows-large (4/16/50), reading A: $0.0858 replaces $0.0504 | 8,800 × 0.6024 = $5,301.12 | 45 GiB → $42.77 | $134.62 | null* | $0? | $0 (Tier 4 top-up consumed) | **$5,478.51** |
| Windows, reading B: $0.0858 added to $0.0504 | 8,800 × 0.8040 = $7,075.20 | $42.77 | $134.62 | null* | $0? | $0 | **$7,252.59** |
| GPU on-demand / spot | n/a (workload has no GPU). Adding 1 H100 each would add 8,800 × 3.95 = $34,760 (on-demand) or 8,800 × 2.27 = $19,976 (spot) | | | | | | |
\* Snapshot rate unpublished. *If* charged at the disk rate ($0.0788/GiB-month), 50 GiB would cost $3.94. This is illustrative only.
Other effects on the total:
- The **30% CPU utilisation does not reduce any figure**, because billing is on allocation.
- **Idle-tail sensitivity:** if each sandbox is left to the idle timer instead of being stopped explicitly:
  - containers add 15 min × 50 × 22 = 275 h, or **+$91.08**
  - VMs add 60 min × 50 × 22 = 1,100 h, or **+$364.32**
- The $200 one-time free credit reduces month 1 only (or about $16.67/month amortised over 12 months).
Sources: https://www.daytona.io/pricing · https://www.daytona.io/docs/en/billing · https://www.daytona.io/docs/en/limits · https://www.daytona.io/docs/en/sandboxes.md · https://www.daytona.io/docs/en/snapshots.md · https://www.daytona.io/docs/en/volumes.md · https://www.daytona.io/docs/en/warm-pools.md · https://www.daytona.io/docs/en/regions.md · https://www.daytona.io/docs/en/network-limits.md · https://www.daytona.io/changelog · https://www.daytona.io/startups · https://github.com/daytonaio/daytona/issues/4158 · https://gpuadvisor.com/providers/daytona (third-party, GPU billing composition)