# Beam: pricing regimes (as of 2026-11-08)
Beam (beam.cloud, Smartshare Inc.; open-source core "beta9") sells several products off one account:
- sandboxes (container by default; VM-backed sandboxes exist)
- VMs (persistent CPU microVMs with a browser desktop)
- serverless functions/endpoints (CPU or GPU)
- flat-price on-demand GPU machines
- reserved GPU clusters
- BYOC (a management fee on your own cloud)
CPU is priced **per vCPU** on three tiers. Sandboxes and serverless bill per millisecond while running. VMs bill per second while running, and nothing for compute while stopped.
New accounts default to **Performance**; workloads opt into Shared or Spot ("New accounts default to Performance, and workloads opt into Shared or Spot", https://docs.beam.cloud/v2/resources/pricing-and-billing.md).
## CPU tiers (sandboxes, VMs, CPU functions)
| Tier | vCPU-hour | GiB-hour | 4 vCPU / 8 GiB per hour | Conditions | Source |
|---|---|---|---|---|---|
| Performance (default) | $0.05 | $0.01 | $0.28 | "No CPU sharing, not preemptible." | https://www.beam.cloud/pricing |
| Shared | $0.011 | $0.0055 | $0.088 | "Shared vCPUs, not preemptible. Up to 8 vCPU / 16 GiB." | https://www.beam.cloud/pricing |
| Spot | $0.0063 | $0.00135 | $0.036 | "may be interrupted with 30 seconds' notice". Spot sandboxes terminate when reclaimed; Spot VMs keep disk and URLs, lose memory, restart by hand | https://docs.beam.cloud/v2/vm/configuration.md |
Tiered VMs and VM-backed sandboxes need at least 1 vCPU / 1 GiB.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Sandbox, CPU | `Sandbox(cpu=…, memory=…, cpu_tier=…)` running | Per ms on allocated vCPU + GiB until terminate / TTL expiry | Tier rates above. Page example: 2 vCPU / 8 GiB on Performance = $0.18/h | https://www.beam.cloud/pricing |
| 2 | Sandbox, CPU (previous sheet, 2026-09-28) | Dated | Per physical core (= 2 vCPU) | $0.135/core-h = $0.0675/vCPU-h, $0.02304/GiB-h. 4/8 then = $0.4543/h | archived card data |
| 3 | Sandbox with GPU | `Sandbox(gpu=…)` | Not published for sandboxes | Serverless reference: RTX 4090 $0.69/h, RTX 5090 $1.09/h; GPU-attached CPU $0.18972/vCPU-h, RAM $0.0198/GiB-h | /pricing |
| 4 | VM | `beam vm new` | Per second while running; no compute charge while stopped | Tier rates above. Performance 1 vCPU / 1 GiB = $0.06/h. Root disk 50 GiB default, 100 GiB max | /pricing, https://docs.beam.cloud/v2/vm/configuration.md |
| 5 | Serverless function / endpoint / task queue (CPU), alt product | `@function`, `@endpoint`, `@task_queue`, pods | Per ms incl. `on_start` and keep_warm_seconds (default 180 s endpoints, 10 s task queues, 600 s pods) | $0.05/vCPU-h + $0.01/GiB-h (same as sandbox Performance) | /pricing |
| 6 | Serverless GPU | GPU functions/endpoints | GPU per hour + GPU-attached CPU/RAM | RTX 4090 $0.69/h, RTX 5090 $1.09/h. Example: 4090 + 4 vCPU + 16 GiB = $1.77/h | /pricing |
| 7 | On-demand GPU machine (alt) | Flat per machine | Hourly flat incl. vCPU/RAM/NVMe ("from" prices) | B200 $4.11, H200 $2.09, H100 PCIe $1.83, A100-80 $1.36, RTX PRO 6000 $1.09, L40S $0.76, RTX 5090 $0.72, A6000 $0.54, RTX 4090 $0.44 | /pricing |
| 8 | GPU clusters (H100/H200/B200/B300, InfiniBand) | Reserved monthly/yearly | Contact sales | null | /pricing |
| 9 | BYOC (AWS/GCP/Azure) | Beam orchestrates in your account | Management fee per vCPU + per GB; compute billed by your cloud | $0.019/vCPU-h + $0.009/GB-h. Example: g5.2xlarge (8/32) = $0.44/h fee | /pricing |
| 10 | Self-host (beta9, AGPL-3.0) | Your k8s | No Beam fee | $0 | https://docs.beam.cloud/v2/self-hosting/overview |
| 11 | Developer plan | Default | $20/month with $20 of monthly credit | 30 concurrent vCPUs, 5 concurrent GPUs, 1 seat | /pricing |
| 12 | Team plan | Fee | $89/month + usage (not credit) | 1,000 concurrent vCPUs, 50 concurrent GPUs, 3 seats + $25/seat | /pricing |
| 13 | Growth plan | Contact | Custom vCPU and GPU limits, unlimited seats, 1-year logs | null | /pricing |
| 14 | Keep-warm / TTL tail | Sandbox `keep_warm_seconds` (Python default lifetime 600 s; `-1` = never) | Billed as running until TTL expiry or `terminate()` | full rate | https://docs.beam.cloud/v2/sandbox/configuration.md |
| 15 | Storage (volumes, snapshots, VM disks) | Persistent data | "Storage is not billed yet." Planned: $0.0001 per GB-hour, no free allowance | $0 now | https://docs.beam.cloud/v2/resources/pricing-and-billing.md |
| 16 | Egress / bandwidth | Any plan | Free | $0 | /pricing FAQ |
| 17 | Regions | US by default, "unless you choose a specific region"; no region list published | No multiplier published | 1 | https://docs.beam.cloud/v2/security/security.md |
## Gotchas
1. **Tier choice drives price.** The default Performance tier costs about 8x Spot and 3x Shared for the same 4 vCPU / 8 GiB. Shared caps a sandbox or VM at 8 vCPU / 16 GiB. Spot can be interrupted with 30 s notice.
2. **Plan limits count vCPUs, not containers.** "Concurrent vCPUs is the total CPU running at once across VMs, sandboxes, and serverless apps." Developer allows 30 vCPUs, so eight 4-vCPU sandboxes need Team.
3. **Price changed between 2026-09-28 and 2026-11-08.** The old sheet was per physical core; serverless was 1/3 of the sandbox rate. The new sheet is per vCPU, and serverless CPU equals sandbox Performance.
4. **The keep-warm tail is billable** for sandboxes. `-1` bills until you terminate. VMs have an opt-in idle sleep (`--ttl`, off by default).
5. **The Team fee is not credit.** Developer's $20 fee comes with $20 of credit.
6. **Storage is free for now.** A planned $0.0001/GB-hour (about $0.073/GB-month) has no start date.
7. **Egress is free.**
8. **Secrets in sandboxes and VMs are brokered.** The guest sees a placeholder; Beam puts the real value only into HTTPS headers to approved hosts (https://docs.beam.cloud/v2/vm/secrets.md).
9. **GPU sandbox pricing is not published.** GPU machine "from" prices on the page conflict with the docs' GPU table.
10. **Isolation.** Default sandboxes are containers (Beam's blog says gVisor). VMs and VM-backed sandboxes run in a CPU microVM with systemd. VMs have no GPUs.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% util, 50 GiB snapshots, 100 GiB egress.
Assumptions:
- 50 × 4 = 200 concurrent vCPUs > 30, so **Team** ($89) is required.
- Sandboxes are terminated explicitly.
| Regime | Compute | Snapshots 50 GiB | Egress 100 GiB | Plan | **Monthly total** |
|---|---|---|---|---|---|
| Sandbox, Performance (default) | 8,800 × 0.28 = $2,464.00 | $0 (not billed yet) | $0 | $89 | **$2,553.00** |
| Sandbox, Shared | 8,800 × 0.088 = $774.40 | $0 | $0 | $89 | **$863.40** |
| Sandbox, Spot (interruptible) | 8,800 × 0.036 = $316.80 | $0 | $0 | $89 | **$405.80** |
| Sandbox, 2026-09-28 sheet (historical) | 8,800 × 0.45432 = $3,998.02 | $0 | $0 | $89 | **$4,087.02** |
| Serverless container / pod (alt, not a sandbox) | 8,800 × 0.28 = $2,464.00 | $0 | $0 | $89 | **$2,553.00** + pod keep-warm tail |
| BYOC | Fee 8,800 × (4×0.019 + 8×0.009) = $1,302.40, **plus** your cloud's VM bill | your cloud | your cloud | $89 (assumed) | **$1,391.40 + cloud compute** |
Other effects:
- The 30% utilisation has no effect (allocated billing).
- Snapshots at the planned storage rate: 50 GiB × $0.0001 × 730 h ≈ $3.65/month.
Sources: https://www.beam.cloud/pricing · https://docs.beam.cloud/v2/resources/pricing-and-billing.md · https://docs.beam.cloud/v2/vm/configuration.md · https://docs.beam.cloud/v2/sandbox/configuration.md · https://docs.beam.cloud/v2/vm/secrets.md · https://docs.beam.cloud/v2/security/security.md · https://docs.beam.cloud/v2/self-hosting/overview
