# OpenComputer — pricing regimes (as of 2026-09-28)
OpenComputer (diggerhq, Apache-2.0) is a managed runtime for long-running agents. It gives each session a QEMU/KVM
Linux VM, and it also has a sandbox SDK. Pricing has two meters: **model tokens**, passed through at API rates (free
with your own key or a Codex subscription), and **machine time** per second. Plans are prepaid credit at **10× the fee**.
Machine rates (pricing section of https://opencomputer.dev/, "billed to the second"):
1 vCPU / 2 GB **$0.00315/min = $0.189/h** (default) · 2 vCPU / 4 GB **$0.378/h** · 4 vCPU / 8 GB **$0.756/h**
(bursting is automatic). That is linear at $0.0945 per (1 vCPU + 2 GB)-hour. 4 vCPU / 8 GiB = **$0.756/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| PAYG | Default | Per-second machine time while running + tokens at API rates | rates above; $10 one-time free credit | https://opencomputer.dev/pricing |
| Pro | $20/mo | Prepaid: fee becomes 10× usage credit for both meters; PAYG after | $20 → $200 credit | same |
| Max | $200/mo | Same, "10+ default machines around the clock" | $200 → $2,000 credit | same |
| Enterprise | Own cloud/VPC, volume pricing, SSO/audit | Custom | null | same |
| Automatic burst | Session needs more RAM/CPU | Bills the burst tier while in it (v1 docs: bill = allocated memory tier × time) | ×2 / ×4 of default | pricing; https://docs-v1.opencomputer.dev/sandboxes/usage.md |
| Hibernated | Idle (sandboxes: 300 s rolling idle timeout) | VM state snapshotted; **no compute billed**; storage billing not stated | $0 compute | https://docs.opencomputer.dev/sandboxes/overview |
| Agent computer lifetime | Any agent session | One computer runs max 1 h, then it is replaced between commands; session has no time expiry | — | github.com/diggerhq/opencomputer/pull/806 |
| Disk beyond 20 GB | Closed beta, up to 256 GB | Per second "at a rate comparable to AWS EBS gp3" | rate unpublished | https://docs.opencomputer.dev/sandboxes/overview |
| Checkpoints (v2) | Filesystem only; `full` rejected | Storage billing not stated | null | https://docs.opencomputer.dev/sandboxes/checkpoints |
| Burst Sandboxes (alpha, v1) | Restart-tolerant workloads; up to 25 s notice; best-effort capacity | "roughly 2x cheaper than on-demand" | rate unpublished | https://docs-v1.opencomputer.dev/sandboxes/burst-sandboxes.md |
| Reserved capacity (v1) | Reserve memory GB per 15-min interval, ≥30 min ahead | `reservedGb × 900` GB-s per interval at the reserved rate, used or not; overage per second at on-demand; non-refundable, no carry-over | reserved rate unpublished | https://docs-v1.opencomputer.dev/reserved-capacity/usage-and-overage.md, /reserving.md |
| Self-host | Apache-2.0 repo + SELFHOSTING.md | Own infra | $0 licence | https://github.com/diggerhq/opencomputer |
### Dated change
Guides dated **2026-07-20** quoted "**$0.004/min flat = $0.24/hr**" for a **4 GB / 1 vCPU** default with RAM resizable 1–16 GB
(https://opencomputer.dev/guides/e2b-alternatives/). The current pricing is $0.00315/min for **2 GB / 1 vCPU**, bursting to
8 GB / 4 vCPU. A 4 GB machine now costs $0.378/h instead of $0.24/h, a 57% increase for that shape. The 1 vCPU price is 21% cheaper, but you get half the RAM.
## Gotchas
1. **Plans are 10× credit, not a fee**: Pro makes the first $200 of usage cost $20 (a 90% discount). Beyond that you pay list price.
2. **Credit is shared with tokens.** If you use OpenComputer's model keys, LLM spend eats the machine-time credit.
3. **Bursting is automatic.** A 4/8 workload is billed at $0.756/h only while it runs at that tier. Workloads that are mostly idle hibernate for free.
4. **Reserved capacity is use-it-or-lose-it per 15-min slot** and cannot be cancelled. Overage above the ceiling is billed per second at on-demand.
5. Storage, egress, concurrency limits and regions are all unpublished.
6. Doc sets are split (docs-v1 vs docs), so which v1 features (reserved capacity, burst sandboxes, memory checkpoints, forks) are still sold is unclear.
## Worked example
4 vCPU / 8 GiB (burst 4/8 tier), 50 concurrent × 8 h/day × 22 days = 8,800 machine-hours, 30% CPU,
50 GiB snapshots, 100 GiB egress. Hibernated between shifts. Tokens via own key ($0).
| Regime | Monthly total |
|---|---|
| PAYG, always at 4/8 tier | 8,800 × $0.756 = **$6,652.80** (+ unknown hibernated storage / egress) |
| Pro | $20 + (6,652.80 − 200) = **$6,472.80** |
| Max | $200 + (6,652.80 − 2,000) = **$4,852.80** |
| Max, autoscaled half the time at 1/2 default | $200 + (8,800 × 0.4725 − 2,000) = $2,358.00 |
| Enterprise / reserved capacity | unpublished |
CPU utilisation (30%) doesn't change the bill directly. Billing follows the allocated tier. Concurrency of 50 is not published as allowed.