# Isorun: pricing regimes (as of 2026-09-28)
Isorun (public beta since v1.0.0, 2026-06-16) has one of the simplest price sheets in the set. There is one per-second
rate on allocated vCPU and RAM, no plan fee and no minimums. Hibernation costs $0, and persistent disks are the only
separately billed storage. Egress, TLS and platform fees are "included in compute".
Base rates: vCPU **$0.025/h**, RAM **$0.015/GiB-h**. 4 vCPU / 8 GiB = 0.10 + 0.12 = **$0.22/h** (the docs list this same shape).
isorun.com/pricing and isorun.ai/pricing return 404. Pricing lives on the homepage and at docs.isorun.ai/getting-started/pricing.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Pay as you go (public beta) | Every account | No fee. Per-second usage drawn from credit/card | $0 fee. Concurrency limits exist but are unpublished | https://docs.isorun.ai/getting-started/pricing |
| Free credit | New accounts, no card | One-time credit | $50 (~1,250 h of 1 vCPU/1 GiB, ~227 h of 4/8) | https://isorun.ai/ |
| Running | create() to destroy()/auto-destroy | Allocated vCPU + GiB RAM per second, "no minimums" | $0.025/vCPU-h + $0.015/GiB-h. Shapes: 1/1 $0.04, 2/4 $0.11, 4/8 $0.22, 8/16 $0.44 per h | https://docs.isorun.ai/getting-started/pricing |
| Idle tail before auto-destroy | Sandbox idle with default `timeoutSec` | Billed as running until the idle timer fires, then **destroyed** (not hibernated) | default 300 s (up to 5 min extra per session); 0 disables | https://docs.isorun.ai/sandboxes/lifecycle |
| Hibernated | `hibernate()` (memory + processes + FDs preserved) | "you pay nothing while the sandbox is paused" | $0 | https://docs.isorun.ai/getting-started/pricing |
| Destroyed | `destroy()` | Billing stops. Returns exact `costCents` | $0 | same |
| Snapshot / restore / fork | `snapshot()`, `fork(n)` | Forks are new running sandboxes at full rate. Snapshot storage price not published | null | https://docs.isorun.ai/sandboxes/checkpoints-and-rollback |
| Scratch disk | Every sandbox | Included, grows on write, wiped on destroy | 4 GiB default (`diskMiB` adjustable; larger-disk price unpublished) | https://docs.isorun.ai/sandboxes/lifecycle |
| Persistent disk (Tigris Cloud Disk) | `createDisk()` | Per GB-month of data **actually stored** (not provisioned), plus compute while attached. Forks add only divergent writes | $0.02/GB-month; no egress fees | https://docs.isorun.ai/sandboxes/persistent-storage |
| Egress / TLS / platform | All traffic | Included in the compute price | $0 | https://isorun.ai/ |
| Region | Org pinned to US or EU by API key | No regional price difference published | multiplier 1 | https://docs.isorun.ai/getting-started/authentication |
| Custom / enterprise | "Talk to us" | Unpublished | null | https://isorun.ai/ |
Dated changes: public launch with these rates on 2026-06-16 (changelog v1.0.0). No change since.
## Gotchas
1. **The default timeout destroys the sandbox.** Idle sandboxes are *destroyed* after 300 s, not hibernated. To keep state for free you have to call `hibernate()` yourself.
2. **Idle running time is billed at full price** (allocation billing). The only $0 idle state is hibernation.
3. **Hibernation really is $0**, with no hibernation-storage fee published. This is rare: E2B is also $0, while MIOSA and Daytona charge disk.
4. **Resume changes the guest IP.** Established outbound TCP connections reset after resume. This is a correctness cost, not a price.
5. **Persistent disk is billed on bytes stored**, not provisioned size, at $0.02/GB-month. That is cheaper than most block storage.
6. Wording conflict: the pricing page bills "by the second based on vCPU and RAM" (allocation), but `destroy()` says cpuMs/memPeakBytes "are the numbers you're billed on". The worked example on the pricing page is allocation-based, so we use allocation.
7. Public beta: concurrency and session limits and SLA are unpublished. SOC 2 is "soon".
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots retained, 100 GiB egress.
Sandboxes are hibernated between shifts.
- Compute: 8,800 × $0.22 = **$1,936.00** (vCPU $880 + RAM $1,056). 30% CPU changes nothing because billing is on allocation.
- Snapshots: hibernated state is $0. If the 50 GiB lived on persistent disks instead: 50 × $0.02 = $1.00.
- Egress: $0 (included).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Pay as you go, hibernate between shifts | Yes (concurrency limit unpublished) | **$1,936.00** |
| Same, state on persistent disks | Yes | $1,937.00 |
| First month with $50 credit | Yes | $1,886.00 |
| Anti-pattern: never hibernated or destroyed (24 h/day) | Yes | 50 × 24 × 22 × 0.22 = **$5,808.00** |
| Anti-pattern: default 300 s timeout | Same $ | State is destroyed after 5 idle minutes |