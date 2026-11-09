# OpenComputer — pricing regimes (as of 2026-11-08)
OpenComputer (diggerhq, Apache-2.0) sells persistent QEMU/KVM Linux VMs for AI agents ("Persistent cloud VMs for AI agents. Beyond sandboxes.", https://opencomputer.dev/).
It also sells @Computer, a hosted coding agent that runs Claude Code and Codex, billed per work minute (https://opencomputer.dev/sandboxes).
Sandbox machine time has three regimes: on-demand per GB-hour, reserved per GB-hour, and a monthly machine pool.
Billing follows the memory tier. vCPU follows memory: 1 GB = 1 best-effort vCPU, 4 GB = 1, 8 GB = 2, 16 GB = 4 (https://docs-v1.opencomputer.dev/sandboxes/elasticity.md).
4 vCPU needs the 16 GB tier: **$0.96/h** on-demand, **$0.192/h** reserved.

## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand (instant) | Default | Per second on the memory tier, flat across sizes | **$0.060/GB-hour** (1 / 4 / 8 / 16 GB = $0.06 / $0.24 / $0.48 / $0.96 per hour) | https://docs-v1.opencomputer.dev/reserved-capacity/overview.md |
| Reserved (pre-booked) | Book 4 GB steps per 15-min UTC interval, at least 30 min ahead | Paid whether used or not; no cancellation; use above the booking bills on-demand | **$0.012/GB-hour** | same; https://docs-v1.opencomputer.dev/reserved-capacity/usage-and-overage.md |
| Pool: Free | Homepage tier | $0 | shared up to 2 vCPU / 2 GB, 3 GB disk, 5 concurrency | https://opencomputer.dev/ |
| Pool: Medium | Homepage tier | $300/mo | 8 CPU / 16 GB, 50 GB disk (addable), 50 concurrency | same |
| Pool: Large | Homepage tier | $3,000/mo | 64 CPU / 512 GB, 3,800 GB disk, 500 concurrency | same |
| Pool: Custom | Sales | Custom | null | same |
| Burst Sandboxes (alpha) | Restart-tolerant work; up to 25 s notice | "roughly 2x cheaper than on-demand sandboxes" | exact rate unpublished | https://docs-v1.opencomputer.dev/sandboxes/burst-sandboxes.md |
| Hibernated | After the idle timeout | Memory + disk snapshotted; no compute billed; storage billing not stated | $0 compute | https://docs-v1.opencomputer.dev/sandboxes/timeout.md |
| Disk above 20 GB | Closed beta, up to 256 GB | Per second "at a rate comparable to AWS EBS gp3" | rate unpublished | https://docs-v1.opencomputer.dev/llms-full.txt |
| @Computer agent | Slack or API coding agent | Work minutes per workspace | Trial 3 days / 600 min; Pro $20 / 2,000 min; Max $200 / 25,000 min; then $0.01/min from prepaid packs | https://opencomputer.dev/sandboxes |
| Self-host | Apache-2.0 repo | Own infra | $0 licence | https://github.com/diggerhq/opencomputer |

## Dated changes
- Until 2026-10: opencomputer.dev/sandboxes listed baseline sizes (0.25-4 vCPU) that burst to 4x, billed at the peak rate, and Pro/Max plans gave 10x the fee as credit. That page now sells @Computer work minutes. The 4x burst model is no longer documented.
- 2026-07-20 guides quoted "$0.004/min flat = $0.24/hr" for 4 GB / 1 vCPU. This matches today's on-demand 4 GB tier ($0.060 x 4).

## Gotchas
1. Pro and Max are @Computer work-minute plans, not sandbox credit.
2. Autoscale between tiers is opt-in and off by default. Live resize by API is available.
3. Free-tier orgs are capped at 4 GB per sandbox.
4. Docs disagree on the idle default: 300 s (overview) against 0 = never hibernate (timeout page). Set a timeout.
5. The per-GB-hour rates and the sandbox docs live on docs-v1; docs.opencomputer.dev covers Serverless Agents.
6. Region choice (us, eu, ap and narrower) is documented for Serverless Agents only; default is usually the US. No region setting for bare sandboxes.
7. Egress, IPv4 and on-demand concurrency are unpublished. The pool tiers publish concurrency (5 / 50 / 500).
8. The price of a machine added to a pool is not published.

## Worked example
4 vCPU workload (16 GB tier), 50 concurrent x 8 h/day x 22 days = 8,800 machine-hours.
| Regime | Monthly total |
|---|---|
| On-demand | 8,800 x $0.96 = **$8,448** (+ unpublished disk above 20 GB, egress) |
| Reserved for the work hours | 8,800 x $0.192 = **$1,689.60**, only if every 15-min interval is booked ahead and used |
| Pool | 50 x 4 vCPU = 200 vCPU: above Large (64 CPU); Custom only |
