# Sandbox0 — pricing regimes (as of 2026-11-08)
Sandbox0 bills **memory time plus retained storage**. There is no CPU line: compute is $0.015 per GiB-hour of the configured
memory limit, per second, and "CPU is platform-derived from memory and is intentionally absent from the public API" (ratio
unpublished). Retained storage is $0.02 per GiB-month of changed RootFS blocks and memory checkpoints. Network and
object-store requests are $0 ("egress is temporarily free"). There is no plan fee. Eligible new users get a one-time $5 credit
after they add a card. Self-hosting ended on 2026-10-16, and the runtime is now closed source. BYOC is planned, not available.
Base rate: $0.015/GiB-h (≈$0.000004167/GiB-s). 4 vCPU / 8 GiB = 8 × 0.015 = **$0.12/h**, assuming a 4-vCPU
allotment at 8 GiB (inferred, see Gotchas).
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Cloud pay-as-you-go (running) | Default; sandbox running | Configured memory limit × wall-clock seconds; CPU not billed; no 1 h minimum, no start fee | $0.015/GiB-h; $0 per vCPU | https://sandbox0.ai/pricing |
| New-user credit | Eligible new user or team, once | Credit after a card is saved | $5 one-time | https://sandbox0.ai/pricing |
| Top-up funding / debt auto-pause | All cloud accounts | Running sandboxes are **auto-paused** (filesystem-only) once outstanding usage and payment debt reach 10% of the last successful top-up; with no top-up, any debt triggers the pause | Top-up minimum unpublished | https://sandbox0.ai/docs/sandbox/pause-resume.md |
| Paused (filesystem-only, default) | `pause`, `ttl` expiry, billing pause | Compute stops; "Paused sandboxes incur storage charges only"; processes/memory lost | $0 compute + $0.02/GiB-mo retained storage | https://sandbox0.ai/pricing, pause-resume doc |
| Paused with memory (experimental) | `memory: true` on supporting deployments | Compute stops; the memory checkpoint is retained storage | $0.02/GiB-mo | https://sandbox0.ai/pricing, pause-resume doc |
| `hard_ttl` expiry | Hard timeout set (off by default) | Sandbox identity and RootFS deleted → all billing stops | $0 after | pause-resume doc, get-started doc |
| Retained storage | Always, running or paused | Changed RootFS blocks and retained memory checkpoint data; shared base images and duplicate references excluded; default rootfs 8 GiB (300 MiB–1 TiB) | $0.02/GiB-mo | https://sandbox0.ai/pricing, template/configuration.md |
| Network + requests | Ingress, egress, object-store GET/PUT | Free; egress explicitly "for now" | $0 | https://sandbox0.ai/pricing |
| Default quotas | Every team | Admission limits, not billing; increases free on request (approval needed) | 20 running sandboxes; "No paused sandbox count limit" | https://sandbox0.ai/pricing |
| Self-hosted | Ended 2026-10-16 | "Self-hosting is no longer supported." Apache-2.0 repo is a read-only archive; CLI and SDKs stay open source | n/a | https://sandbox0.ai/docs/sandbox/self-hosted.md |
| BYOC | Not available | "Bring Your Own Cloud (BYOC) is planned and is not available yet." | n/a | https://sandbox0.ai/docs/sandbox/self-hosted.md |
The earlier Sandpi Platform (hosted coding-agent runs) is not modelled: sandpi.ai does not resolve on 2026-11-08 and sandbox0.ai no longer links it.
## Gotchas
1. **CPU isn't billed, but you can't pick it either.** CPU comes from the memory limit by an unpublished ratio. The vendor's
   comparison uses 2 vCPU / 4 GiB, and the ComputeSDK DAX run saw 8 CPUs / 16 GiB, which suggests about 1 vCPU per 2 GiB
   (inferred, not documented). A CPU-heavy, memory-light workload may need to buy memory just to get cores.
2. **Idle running time costs full price.** Billing is on the configured memory limit, not on usage. The soft `ttl` and `hard_ttl`
   both default to 0 (disabled), so set `ttl` if you want idle sandboxes to auto-pause.
3. **Default pause loses processes.** Filesystem-only pause is the default. Memory pause is experimental.
4. **Storage bills in every state, but only on changed blocks.** Shared base images and data shared by snapshots and forks
   count once. This is cheaper than a flat price on the provisioned disk size.
5. **Egress is free "for now"**, which leaves room for a future charge.
6. **Top-up debt auto-pauses production.** Once unpaid usage and debt reach 10% of your last top-up, running sandboxes pause.
7. **Default concurrency is 20 running sandboxes.** Raising it is free but needs approval. Paused sandboxes are unlimited.
8. **Bursts are slow.** ComputeSDK reports a slow 100-sandbox burst against a ~0.8 s single cold start.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots,
100 GiB egress. Sandboxes paused between shifts.
- Compute: 8,800 h × 8 GiB × $0.015 = **$1,056.00**. The 30% CPU figure changes nothing because billing is on the memory limit.
- Retained storage: 50 GiB changed data × $0.02 = **$1.00**. Shared base-image blocks are not billed.
- Egress: 100 GiB × $0 = **$0** (current promotional rate).
- One-time $5 credit for a new user lowers the first bill only.
| Regime | Feasible? | Monthly total |
|---|---|---|
| Cloud PAYG | Yes, after a free quota increase (50 > 20 default) | **$1,057.00** |
| Cloud, left running idle 24 h/day instead of pausing | Yes | 50×24×22×$0.12 + $1 = **$3,169.00** |
