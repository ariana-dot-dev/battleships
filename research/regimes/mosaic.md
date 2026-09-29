# Mosaic Sandbox (sandbox.mosaicos.com) — pricing regimes (as of 2026-09-28)
Not to be confused with **mosaic.so** (an AI video editor with $40/$125 credit plans). Mosaic Sandbox is a Firecracker
microVM sandbox (PyPI `mosaic-sandbox`, the ComputeSDK "mosaic" provider). It has a single metered regime: **$0.05 per hour
of awake ("active") compute, RAM and storage included, $0 while hibernated**. Larger shapes cost 2x/4x/8x units. The
host hibernates a sandbox after **3 quiet seconds**, so agent workloads that wait on LLMs pay for bursts only. A
running process, though, keeps the sandbox awake.
4 vCPU / 8 GiB = 2 units = **$0.10/h** awake (1 unit = 2 vCPU / 4 GB, confirmed on sandbox.mosaicos.com/pricing: "$0.00001389 / second, at 2 vCPU / 4 GB. The 4 vCPU guest bills as two of those").
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Active compute, default shape | Sandbox awake, 2 vCPU / 4096 MiB (kept warm) | Per awake second (meter `sandbox_active_seconds`), RAM + storage included | $0.05/h | https://sandbox.mosaicos.com/, https://sandbox.mosaicos.com/docs/ |
| Larger shapes | 4/8192 (all templates); 8/16384, 16/32768 (`base` template only) | Metered at units occupied; cold boot (only default kept warm) | 2x = $0.10/h, 4x = $0.20/h, 8x = $0.40/h | https://sandbox.mosaicos.com/llms.txt |
| Small shape 1 vCPU / 2048 MiB | Any template | "The 1 vCPU guest still bills as one" unit | $0.05/h (same as default) | https://sandbox.mosaicos.com/pricing |
| Idle hibernation | Automatic after 3 quiet seconds (no running process); wakes on use; also explicit `pause` | Not metered | $0 | https://sandbox.mosaicos.com/docs/ |
| Archived (`persist: true`) | Sandbox reaches its TTL deadline | Resumable under same id within 7-day retention | unpublished (assumed $0) | docs |
| Named environments / snapshots | Built from image, Dockerfile or repo+setup | Reclaimed when unused past `environments.retention_seconds` (~30 d); max 100/org | unpublished (assumed $0) | llms.txt |
| Volumes (Mosaic Object Storage) | Up to 4 mounts, shared across hosts | unpublished | null | llms.txt |
| Fork / fan-out (1–32 children) | Children from parent memory image | Each awake child metered | $0.05/h per unit per child | llms.txt |
| Billing account | Before first use | Hosted checkout ("requires_checkout"); metered subscription | No base fee, plan, free tier or trial published | https://sandbox.mosaicos.com/docs/ |
| Egress | All traffic | Allowlist/eBPF policy; no price or quota published | null | docs |
Dated changes: none published.
## Gotchas
1. **"Quiet" means no running processes.** "A running process prevents hibernation." Dev servers, file watchers, `sleep` loops or a long agent process keep the sandbox awake and billed. The 3-second hibernation only helps request/response-style agent turns.
2. **Unit confirmed (verify 2026-09-28)**: the pricing page states $0.05/h is "at 2 vCPU / 4 GB"; 4 vCPU bills as two units and the 1 vCPU guest still bills as one, so downsizing below 2/4 saves nothing. If the host awake-time record is unreachable, billing falls back to wall-clock lifetime.
3. **Non-default shapes are cold boots.** Only 2/4 is kept warm, so 4/8 and above lose the fast-start advantage.
4. **"Includes storage"** covers the running sandbox. Archived sandboxes, named environments and volumes have no published storage price.
5. No published egress price, free tier or concurrency cap ("fleet capacity bound"). US regions only.
6. **Name collision**: the mosaic.so pricing page (video credits) is sometimes cited for this sandbox. It is unrelated.
## Worked example
Workload: 4 vCPU / 8 GiB (2 units), 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU,
50 GiB snapshots, 100 GiB egress.
| Regime | Feasible? | Monthly total |
|---|---|---|
| Awake the whole session (processes keep it awake) | Yes | 8,800 × $0.10 = **$880.00** |
| Awake only 30% of the session (hibernates between bursts) | Yes, if no long-running processes | 2,640 h × $0.10 = **$264.00** |
| Default 2 vCPU / 4 GiB instead (half the RAM) | If the workload fits | 8,800 × $0.05 = $440.00 |
| Snapshots 50 GiB | Hibernated state: $0; archived/named environments: unpublished | $0 (assumed) |
| Egress 100 GiB | Price unpublished | excluded |