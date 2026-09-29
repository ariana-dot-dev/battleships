# Runpod — pricing regimes (as of 2026-09-28)
Runpod rents Docker-container "Pods" (GPU or CPU) plus scale-to-zero Serverless workers and multi-node Clusters.
All usage comes out of a prepaid credit balance, billed per second, with **no ingress/egress fees**. There is no plan
fee. The same GPU costs a different amount depending on where it runs (Secure vs Community Cloud), how you run it
(Pod vs Serverless flex vs Cluster), and whether you prepay (savings plan). Stopped pods keep paying for disk, at
double the running rate.
Verified live 2026-09-28: runpod.io/pricing ("Updated September 27, 2026"; Community and Secure prices both
embedded in the page's schema.org Offer data), docs.runpod.io pods/pricing (modified 2026-07-20), serverless/pricing,
accounts-billing/billing, API v2 catalog reference, Flash CPU types.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| CPU Pod (Secure Cloud) | CPU-only container pod | Per second while running, per vCPU with RAM bundled | cpu3c compute-optimized **$0.04/vCPU-h** (4 vCPU / 8 GB = $0.16/h), 2-32 vCPU. **Only source is an example payload in the API v2 catalog docs**; cpu3g (4 GB/vCPU) and cpu5c prices unpublished (console / authenticated API only) | https://docs.runpod.io/api-reference-v2/catalog/list-cpu-types, https://docs.runpod.io/flash/configuration/cpu-types |
| GPU Pod, Secure Cloud on-demand | GPU pod in T3/T4 DCs; the only option for Organizations / post-paid | Per second per GPU; per-GPU vCPU/RAM shape bundled | B300 $7.89, B200 $6.79, H200 $4.59, H100 SXM $3.49, H100 NVL $3.19, H100 PCIe $2.89, RTX PRO 6000 $2.09, A100 80GB SXM/PCIe $1.59, L40S $1.09, MIG 48GB $1.09, 6000 Ada $0.84, L40 $0.82, A6000 $0.53, A40 $0.49, 5090 $0.99, 4090 $0.74, MIG 24GB $0.59, 3090 $0.50, L4 $0.49, A5000 $0.27 per GPU-h | https://www.runpod.io/pricing |
| GPU Pod, Community Cloud on-demand | Peer-hosted GPUs; variable reliability; not for Organizations | Same, cheaper; not interruptible | B300 $6.94, B200 $5.98, H200 $3.59, H100 SXM $2.69, H100 NVL $2.59, H100 PCIe $1.99, PRO 6000 $1.69, A100 SXM $1.39 / PCIe $1.19, L40S $0.79, 6000 Ada $0.74, L40 $0.69, A6000 $0.33, A40 $0.35, 5090 $0.69, 4090 $0.34, 3090 $0.22, L4 $0.44, A5000 $0.16. Runpod no longer accepts new Community hosts | https://www.runpod.io/pricing (embedded Offer data), https://docs.runpod.io/pods/choose-a-pod |
| Savings plan | GPU pods, long-running | 3- or 6-month **upfront** prepay; GPU compute only (storage at standard rates); non-refundable; fixed expiry; auto-applies to next deploy of same GPU type | Discount % **not published** (console only) | https://docs.runpod.io/pods/pricing |
| Spot / interruptible | — | Not mentioned anywhere in current docs (llms-full.txt) or pricing page; older records and third-party blogs still describe it | null (possibly discontinued) | https://docs.runpod.io/llms-full.txt |
| Serverless flex workers (GPU) | Request/queue endpoints, scale to zero | Per second, rounded up, from worker start to full stop: cold start + execution + idle timeout (default 5 s) | per GPU class: B300 $9.98, B200 $8.64, H200 $5.93, H100 $4.79, RTX 6000 Pro $3.49, A100 $2.72, 48GB PRO $1.75, A6000/A40 $1.22, 5090 $1.58, PRO 4500 $1.15, 4090 $1.10, 24GB $0.69, 16GB $0.58 per h | https://www.runpod.io/pricing, https://docs.runpod.io/serverless/pricing |
| Serverless active workers | Always-on (24/7) workers | Always billed; discount "through sales inquiry" | null | https://docs.runpod.io/serverless/pricing |
| Serverless CPU workers / Flash CPU | CPU endpoints | Same as flex | $0.03/vCPU-h cpu3c (**API example payload only**) | https://docs.runpod.io/api-reference-v2/catalog/list-cpu-types |
| Instant Clusters | Multi-node, up to 64 GPUs self-serve | Per GPU-h, no commitment | H200 SXM $4.31, A100 SXM $1.79; L40S / H100 SXM / B200 contact sales | https://www.runpod.io/pricing |
| Reserved Clusters | 1/3/6/12/12+ month terms, SLA | Sales contract | contact sales | https://www.runpod.io/pricing |
| Enterprise post-paid (Organizations) | Contracted customers | Invoiced in arrears at contracted rates; Secure Cloud only; no $0 auto-stop | null | https://docs.runpod.io/accounts-billing/post-paid-billing |
| Container disk | Every pod / worker | Per second while running; erased on stop, not billed when stopped | $0.10/GB-month (serverless: ~$0.10, 5-min intervals) | https://docs.runpod.io/pods/pricing |
| Volume disk | Pod-attached persistent disk | Per second; **doubles when pod is stopped** | $0.10 running / **$0.20 stopped** per GB-month | https://docs.runpod.io/pods/pricing |
| Network volume | Portable, shared across pods/serverless | Hourly, whether attached or not | $0.07/GB-mo < 1 TB, $0.05 > 1 TB; high-performance $0.14 | https://docs.runpod.io/pods/pricing, https://www.runpod.io/pricing |
| Data transfer | All | Free | $0 ingress / $0 egress | https://docs.runpod.io/accounts-billing/billing |
| Account limits | Prepaid accounts | $80/hour default spend limit (auto-raised with history); deploy needs ≥ 1 h credit for the config; start from ~$10 | — | https://docs.runpod.io/accounts-billing/billing |
## Gotchas
1. **CPU pod pricing is effectively unpublished.** The only official number ($0.04/vCPU-h) is an API example payload;
   the pricing page lists GPUs only. RAM/vCPU for cpu3c also conflicts (2.5 GB in the example vs 2 GB in Flash IDs).
2. **Stopped pods cost more per GB.** Volume disk goes from $0.10 to $0.20/GB-month when stopped; container disk is
   wiped on stop. Network volumes ($0.07) are cheaper for parked state and survive balance exhaustion.
3. **$0 balance = data loss.** Pods auto-stop at $0; pods without a network volume are terminated unrecoverably.
   Network volumes can also be terminated if charges stay uncovered.
4. **No idle auto-stop for pods.** A pod bills until you stop it; there is no activity-based shutdown.
5. **Stopped GPU pods may restart with zero GPUs** if the host's GPUs were taken meanwhile (docs "Zero GPU Pods").
6. **Serverless bills cold start and idle timeout**, not just execution; per-class serverless rates are 25-100%+ above
   the pod rate for the same GPU (e.g. H100 $4.79 serverless vs $3.49 Secure pod vs $2.69 Community).
7. **Community Cloud is shrinking** (no new hosts) and unavailable to Organizations, so the cheapest GPU prices may
   not be obtainable at scale or for enterprise accounts.
8. **Spot is gone from the docs**; older comparisons quoting spot prices are stale.
9. **Granularity conflict**: pricing/billing docs say per second, the docs overview says pods are "billed by the minute".
10. **Savings plans** lock GPU type and are non-refundable; discount only visible in the console.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 pod-hours**, 30% CPU, 50 GiB retained
state, 100 GiB egress. CPU pods (no GPU). Pods stopped between shifts.
Compute: 8,800 × $0.16 = **$1,408.00** (cpu3c 4 vCPU @ $0.04, RAM bundled; utilisation irrelevant, allocated billing).
Retained 50 GiB: on stopped-pod volume disk 50 × $0.20 = $10.00; on a network volume 50 × $0.07 = $3.50.
Egress: $0.
| Regime | Feasible? | Monthly total |
|---|---|---|
| CPU Pod, Secure, state on stopped volume disk | Yes (spend limit $80/h vs 50 × $0.16 = $8/h) | **$1,418.00** (+ running container/volume disk at $0.10/GB-mo) |
| CPU Pod, state on network volume | Yes | **$1,411.50** |
| Serverless CPU worker (cpu3c-4-8 @ $0.12/h) | Only for request/queue work, not interactive sessions; no SSH | ≈ $1,056 + cold-start/idle overhead (rate from API example only) |
| Savings plan | No: GPU compute only | n/a |
| Anti-pattern: pods left running 24/7 | Yes | 50 × 730 × $0.16 = **$5,840** |
| GPU variant (same schedule, 1× H100 SXM each) | Yes | Secure 8,800 × $3.49 = $30,712; Community 8,800 × $2.69 = $23,672; serverless flex 8,800 × $4.79 = $42,152 (+ overhead) |