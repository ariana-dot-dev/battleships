# Beam: pricing regimes (as of 2026-09-28)
Beam (beam.cloud, Smartshare Inc.; open-source core "beta9") sells several products off one account:
- sandboxes
- serverless functions/endpoints (CPU or GPU)
- flat-price on-demand GPU machines
- reserved GPU clusters
- BYOC (a management fee on your own cloud)
Everything is billed **per millisecond while the container runs**. Pricing is per **physical core = 2 vCPU**.
The sandbox CPU rate is **3x** the serverless CPU rate (RAM about 3.05x). Plans set concurrency and seats only. The plan fee is **not** usage credit.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Sandbox, CPU (current price sheet) | `Sandbox(cpu=…, memory=…)` running | Per ms on allocated cores + GiB, from when your code starts (machine start and image pull not billed) until terminate / keep_warm expiry | $0.0000375/core-s = $0.135/core-h = **$0.0675/vCPU-h**. $0.0000064/GiB-s = **$0.02304/GiB-h**. Page example: 1 core (2 vCPU) / 8 GiB = $0.319/h. 4 vCPU/8 GiB = **$0.4543/h** | https://www.beam.cloud/pricing |
| 2 | Sandbox, CPU (**previous** price, June 2026) | Dated: Beam's own blogs of 2026-06-04 and 2026-06-27 | Same basis | $0.0000528/core-s ($0.19/core-h = $0.095/vCPU-h), RAM $0.0000056/GB-s ($0.0202/GB-h). So CPU has since fallen ~29% and RAM risen ~14%. 4/8 then = $0.5416/h | https://www.beam.cloud/blog/2026-sandbox-guide, https://www.beam.cloud/blog/modal-pricing-explained |
| 3 | Sandbox with GPU | `Sandbox(gpu="A10G"…)` (the SDK supports it) | Not stated for sandboxes. Presumably the serverless GPU rate + GPU-attached CPU/RAM rate | GPU $/h: RTX 4090 0.6912, RTX 5090 1.0908, H100 3.4992, A10G 1.0512 (June blog). T4 unpriced. GPU-attached CPU $0.000105/core-s ($0.189/vCPU-h), RAM $0.0000055/GiB-s ($0.0198/GiB-h) | /pricing, docs /v2/environment/gpu |
| 4 | Serverless function / endpoint / task queue (CPU), alt product | Not a sandbox: `@function`, `@endpoint`, `@task_queue`, pods | Per ms incl. `on_start` and **keep_warm_seconds** (default 180 s endpoints, 10 s task queues, 600 s pods) | $0.0000125/core-s ($0.0225/vCPU-h), $0.0000021/GiB-s ($0.00756/GiB-h). **1/3 of the sandbox rate** | /pricing, https://docs.beam.cloud/v2/resources/pricing-and-billing |
| 5 | Serverless GPU | GPU functions/endpoints | GPU per s + GPU-attached CPU/RAM | RTX 4090 $0.000192/s, RTX 5090 $0.000303/s, H100 $0.000972/s. Example: 4090 + 2 cores + 16 GiB = $1.77/h | /pricing |
| 6 | On-demand GPU machine (alt) | Flat per machine, bare metal or VM | Hourly flat incl. vCPU/RAM/NVMe ("from" prices) | B200 28vCPU/256GB $4.11. H200 24/192 $2.09. H100 26/200 $1.83. A100-80 16/128 $1.36. RTX PRO 6000 16/128 $1.09. L40S 12/96 $0.76. RTX 5090 12/64 $0.72. A6000 8/64 $0.54. RTX 4090 8/64 $0.44. The docs GPU page shows stale/different figures (A100-80 $1.49, H100 $3.63, 4090 $0.66). June blog: H100 $1.74, H200 $1.99, B200 $3.93 | /pricing, docs /v2/environment/gpu |
| 7 | GPU clusters (8-GPU nodes, InfiniBand) | Reserved monthly/yearly | Contact sales | H100/H200/B200/B300: null | /pricing |
| 8 | BYOC (AWS/GCP/Azure) | Beam orchestrates in your account | Management fee **per vCPU** (not per core) + per GB. Compute billed by your cloud (your credits/discounts) | $0.019/vCPU-h + $0.009/GB-h. Example: g5.2xlarge (8/32) = $0.44/h fee | /pricing FAQ |
| 9 | Self-host (beta9, AGPL-3.0) | Your k8s / EKS | No Beam fee | $0 | https://docs.beam.cloud/v2/self-hosting/overview |
| 10 | Developer plan | Default (card required for pay-as-you-go) | $0/month + usage. 30 CPU / 5 GPU concurrent containers. 1 seat | $0. Beam's June 2026 blog: "$30/month free credits". Not shown on the current pricing page | /pricing, FAQ, blog |
| 11 | Team plan | Fee | $89/month + usage (**not credit**). 1,000 CPU / 50 GPU containers. 3 seats + $25/seat | $89 | /pricing |
| 12 | Growth plan | Contact | Unlimited CPU containers, 1,000+ GPU, unlimited seats, 1-year logs. Price unpublished | null | /pricing |
| 13 | Volume discount | > $10K/month spend | "Volume discounts available", unpublished. Committed spend for serverless GPUs | null | /pricing |
| 14 | Keep-warm / TTL tail | `keep_warm_seconds` (sandbox examples 1800–7200 s; `-1` = never) | Billed as running until TTL expiry or `terminate()`. `update_ttl()` extends | full rate | https://docs.beam.cloud/v2/sandbox/configuration |
| 15 | Snapshots (filesystem image, memory snapshot) | `create_image_from_filesystem()`, `snapshot_memory()` | "Snapshots are included" (free) | $0 | /pricing, pricing-and-billing |
| 16 | Storage volumes / durable disks | Persistent data | Free up to **1 TB** (account), then per GB-month. Not billed as compute while stopped | $0.021/GB-month > 1 TB | /pricing |
| 17 | Egress / bandwidth | Any plan | Free | $0 | /pricing FAQ |
| 18 | Regions | US default; Europe/Asia by contacting Beam | No multiplier published | 1 | docs /v2/environment/gpu |
## Gotchas
1. **Core vs vCPU.** All CPU prices are per *physical core (2 vCPU)*. The sandbox SDK takes `cpu=` with no unit stated (runtime config shows millicores, `cpu:1000`). Whether `cpu=1` is one core (2 vCPU) or one vCPU is **not documented**. If it is 1 vCPU billed as 1 core, the effective price doubles to $0.135/vCPU-h.
2. **The sandbox is 3x the serverless container** for the same CPU. Wrapping the workload as a `@function` or pod costs $0.15/h instead of $0.45/h for 4 vCPU/8 GiB, but you lose the sandbox API (exec, fs, snapshots).
3. **Price changed mid-2026.** June blogs quote $0.19/core-h and $0.0202/GB-h. The current page shows $0.135 and $0.02304. RAM-heavy sandboxes got *more* expensive.
4. **The keep-warm tail is billable.** Beam's own doc examples use 30 min–2 h TTLs. Idle time until expiry is paid in full. `-1` bills until you terminate.
5. **The plan fee is not credit.** Team $89 is on top of usage, and needed for more than 30 concurrent CPU containers (Developer cap). Extra seats cost $25.
6. **Snapshots and memory snapshots are free**, and storage is free to 1 TB. Retained state is essentially free, unlike most rivals.
7. **Egress is free.**
8. **BYOC fee is per vCPU, not per core.** $0.019/vCPU-h is 28% of the managed sandbox's $0.0675/vCPU-h, *before* paying AWS for the VM.
9. **GPU sandbox pricing isn't spelled out.** GPU on-demand "from" prices on the page conflict with the docs' GPU table.
10. **Isolation.** The pricing FAQ says "non-root containers", and Beam's blog says gVisor. There is no root, no Docker-in-sandbox and no systemd.
## Worked example
Workload: 4 vCPU / 8 GiB (= **2 cores**), 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% util, 50 GiB snapshots, 100 GiB egress.
Assumptions:
- 50 concurrent > 30, so **Team** ($89) is required.
- Sandboxes are terminated (or snapshotted) nightly.
| Regime | Compute | Idle tail | Snapshots 50 GiB | Egress 100 GiB | Plan | **Monthly total** |
|---|---|---|---|---|---|---|
| Sandbox, current rates | 8,800 × (2×0.135 + 8×0.02304) = 8,800 × 0.45432 = $3,998.02 | $0 (terminate explicitly) | $0 (included) | $0 | $89 | **$4,087.02** |
| Sandbox + 30-min keep-warm tail each session | $3,998.02 | 1,100 sessions × 0.5 h × 0.45432 = $249.88 | $0 | $0 | $89 | **$4,336.90** |
| Sandbox, June-2026 rates (historical) | 8,800 × 0.5416 = $4,766.08 | | $0 | $0 | $89 | **$4,855.08** |
| Sandbox, if `cpu=4` is needed for 4 vCPU (billed as 4 cores) | 8,800 × (4×0.135 + 8×0.02304) = $6,374.02 | | $0 | $0 | $89 | **$6,463.02** (worst-case unit reading) |
| Serverless container / pod (alt, not a sandbox) | 8,800 × (2×0.045 + 8×0.00756) = 8,800 × 0.15048 = $1,324.22 | pod default 600 s tail extra | $0 | $0 | $89 | **$1,413.22** |
| BYOC | Fee 8,800 × (4×0.019 + 8×0.009) = $1,302.40, **plus** your cloud's VM bill (not included) | | your cloud | your cloud | $89 (assumed still needed) | **$1,391.40 + cloud compute** |
Other effects:
- The 30% utilisation has no effect (allocated billing).
- If the reported $30/month Developer credit also applies on Team, subtract $30.
Sources: https://www.beam.cloud/pricing · https://docs.beam.cloud/v2/resources/pricing-and-billing · https://docs.beam.cloud/v2/resources/faq · https://docs.beam.cloud/v2/sandbox/configuration · https://docs.beam.cloud/v2/environment/gpu · https://docs.beam.cloud/v2/self-hosting/overview · https://www.beam.cloud/blog/2026-sandbox-guide · https://www.beam.cloud/blog/modal-pricing-explained