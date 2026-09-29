# OpenReward Sandboxes: pricing regimes (as of 2026-09-28)
OpenReward (https://openreward.ai) is an RL environment hub built by GR Inc (General Reasoning), with 380+ hosted ORS environments.
Its native sandboxes are isolated containers provisioned through an environment workspace. The docs say they are "not a general
sandbox compute solution: it is meant to be tied to environment use". E2B, Daytona and Modal are documented as alternative backends.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Pay-as-you-go CPU sandbox | Any sandbox from `start()` to `stop()` | Per second on the chosen `machine_size` preset (allocated) | $0.0504/vCPU-h, $0.0162/GiB-h; presets 0.5:0.5 … 4:16 | https://openreward.ai/pricing, https://docs.openreward.ai/concepts/sandboxes.md |
| GPU sandbox | `machine_size="nvidia-l4"` | Per second | NVIDIA L4 $1.51/GPU-h (whether CPU/RAM are billed on top is undocumented) | pricing page, https://docs.openreward.ai/environments/gpu-environments.md |
| Hosted environment used by others | Someone runs your hosted environment | Sandbox time billed to the caller's account, not the host's | — | concepts/sandboxes.md |
| BackSearch / BackFetch | Point-in-time web tools | Per request | $10 / 1,000 searches; $2 / 1,000 fetches | pricing page |
| Researcher credits | Academic program | Credits on request | unpublished | pricing page |
| Enterprise | On-prem, dedicated support, SLAs | Contact sales | unpublished | pricing page |
| Disk / egress / snapshots | — | Not published | null | — |
## Gotchas
1. **The sandboxes are tied to environment workspaces.** You need an OpenReward environment namespace to get sandbox compute at all, so this isn't a general agent-VM product.
2. **The largest CPU size is 4 vCPU / 16 GiB,** and only fixed ratios are offered (1, 2 or 4 GiB per vCPU).
3. **There is no pause or snapshot.** Network control is all-or-nothing (`block_network`).
4. **Concurrency limits, max lifetime and minimum billed time are undocumented.**
5. **The CPU/RAM rates match E2B's list rates exactly.** The backend isn't disclosed.
## Worked example
4 vCPU / 8 GiB ("4:8" preset), 50 concurrent × 8 h/day × 22 days = 8,800 sandbox-hours, 30% CPU, 50 GiB snapshots, 100 GiB egress.
- Compute: 8,800 × (4 × 0.0504 + 8 × 0.0162) = 8,800 × $0.3312 = **$2,914.56** (vCPU $1,774.08 + RAM $1,140.48). Billing is on allocation, so the 30% CPU figure doesn't change it.
- Snapshots: not available. Egress: price not published (unknown).
- **Total ≈ $2,914.56/month** + unknown egress/disk. Whether 50 concurrent sandboxes are allowed is not documented.
## Sources
- https://docs.openreward.ai/concepts/sandboxes.md
- https://docs.openreward.ai/sandboxes/openreward.md
- https://docs.openreward.ai/environments/gpu-environments.md
- https://docs.openreward.ai/llms-full.txt