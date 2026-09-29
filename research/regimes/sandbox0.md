# Sandbox0 — pricing regimes (as of 2026-09-28)
Sandbox0 bills **memory only**. There is no CPU line: compute is $0.015 per GiB-hour of the configured memory limit,
per second, and CPU is "platform-derived from memory" by an unpublished ratio. Persistent rootfs and rootfs snapshots
cost $0.02/GiB-month as byte-time. Network and object-store requests are $0 ("egress free for now"). There is no plan
fee and no published free credit. Beyond the cloud meter there are two other regimes: the Apache-2.0 self-hosted runtime
(your own infra, no licence fee found), and Managed Agents (Sandpi Platform), where the sandbox is free and you pay model
tokens plus a 5% top-up fee.
Base rate: $0.015/GiB-h (≈$0.000004167/GiB-s). 4 vCPU / 8 GiB = 8 × 0.015 = **$0.12/h**, assuming a 4-vCPU
allotment at 8 GiB (inferred, see Gotchas).
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Cloud pay-as-you-go (running) | Default; sandbox running | Configured memory limit × wall-clock seconds; CPU not billed; no 1 h minimum, no start fee | $0.015/GiB-h; $0 per vCPU | https://sandbox0.ai/pricing |
| Top-up funding / debt auto-pause | All cloud accounts | Account funded by top-ups; running sandboxes are **auto-paused** (filesystem-only) once unpaid usage reaches 10% of the last successful top-up | Top-up minimum unpublished | https://sandbox0.ai/docs/sandbox/pause-resume.md |
| Paused (filesystem-only, default) | `pause`, `ttl` expiry, billing pause | Compute stops; RootFS kept and billed as storage; processes/memory lost | $0 compute + $0.02/GiB-mo | https://sandbox0.ai/pricing, pause-resume doc |
| Paused with memory (experimental) | `memory: true` on supporting deployments | Compute stops; storage billing of the memory checkpoint not documented | null | pause-resume doc |
| `hard_ttl` expiry | Hard timeout set | Sandbox identity and RootFS deleted → all billing stops | $0 after | pause-resume doc |
| Persistent rootfs | Always, running or paused | Byte-time, prorated hourly over a 730 h month; default rootfs 8 GiB (300 MiB–1 TiB) | $0.02/GiB-mo | https://sandbox0.ai/pricing, template/configuration.md |
| Rootfs snapshots / forks | Named snapshots, CoW forks | Same byte-time meter as rootfs; each fork is a new sandbox billed on its memory | $0.02/GiB-mo | https://sandbox0.ai/pricing |
| Network + requests | Ingress, egress, object-store GET/PUT | Free; egress explicitly "for now" | $0 | https://sandbox0.ai/pricing |
| Default quotas | Every team | Admission limits, not billing; increases free on request (approval needed) | 20 running sandboxes (paused don't count), 5 claims/s, 100 API req/s (burst 200) | https://sandbox0.ai/pricing |
| Managed Agents (Sandpi Platform) | Hosted agent runs (Codex, Claude Code, Pi, Kimi Code, ZCode) | Sandbox runtime not charged; model tokens at provider rates from prepaid credit; 5% fee on each top-up | $0 sandbox; +5% on top-ups | https://sandbox0.ai/managed-agents |
| Self-hosted (open source) | Run the Apache-2.0 runtime on your own Nomad + PostgreSQL + S3 | No licence fee or paid tier found; you pay your own infra | $0 licence | https://github.com/sandbox0-ai/sandbox0, https://sandbox0.ai/docs/sandbox/self-hosted.md |
No dated price changes found; the pricing page's competitor table is marked "checked 2026-09-21".
## Gotchas
1. **CPU isn't billed, but you can't pick it either.** CPU comes from the memory limit by an unpublished ratio. The vendor's
   comparison uses 2 vCPU / 4 GiB, and the ComputeSDK DAX run saw 8 CPUs / 16 GiB, which suggests about 1 vCPU per 2 GiB
   (inferred, not documented). A CPU-heavy, memory-light workload may need to buy memory just to get cores.
2. **Idle running time costs full price.** Billing is on the configured memory limit, not on usage. Set `ttl` so idle sandboxes auto-pause.
3. **Default pause loses processes.** Filesystem-only pause is the default. Memory pause is experimental.
4. **Storage bills in every state.** Rootfs and snapshots accrue $0.02/GiB-mo until `hard_ttl` or delete. It isn't stated whether
   the default 8 GiB rootfs bills on provisioned size or on bytes written.
5. **Egress is free "for now"**, which leaves room for a future charge.
6. **Top-up debt auto-pauses production.** Once unpaid usage reaches 10% of your last top-up, running sandboxes pause.
7. **Default concurrency is only 20.** Raising it is free but needs approval.
8. **Bursts are slow.** ComputeSDK median time-to-interactive for a 100-sandbox burst was about 14.9 s (score 0), against a ~0.8 s single cold start.
9. **There is no free tier or credit** on the cloud.
10. **Managed Agents "free sandbox"** only covers runs on Sandpi. You still pay LLM tokens plus 5%.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots,
100 GiB egress. Sandboxes paused between shifts.
- Compute: 8,800 h × 8 GiB × $0.015 = **$1,056.00**. The 30% CPU figure changes nothing because billing is on the memory limit.
- Snapshots/rootfs: 50 GiB × $0.02 = **$1.00**. If each sandbox's default 8 GiB rootfs is also billed on provisioned size,
  add 50 × 8 GiB × $0.02 = $8.00.
- Egress: 100 GiB × $0 = **$0** (current promotional rate).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Cloud PAYG | Yes, after a free quota increase (50 > 20 default) | **$1,057.00** (up to $1,065.00 with rootfs on provisioned size) |
| Cloud, left running idle 24 h/day instead of pausing | Yes | 50×24×22×$0.12 + $1 = **$3,169.00** |
| Managed Agents (Sandpi) | Only if the workload is agent runs on their harnesses | $0 sandbox + LLM tokens + 5% top-up fee |
| Self-hosted | Yes | $0 licence + your own servers, S3 and ops |