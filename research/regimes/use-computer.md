# use.computer: pricing regimes (as of 2026-09-28)
use.computer sells macOS sandboxes for computer-use agents on dedicated Apple M4 Mac minis. You do not rent a sandbox; you rent a **reservation** of N Mac minis for X hours (X ≥ 24), paid up front. Inside the reservation you can create and destroy as many sandboxes as you like, with at most 2 macOS VMs at a time per Mac. Each Mac is a stock M4 with 16 GB RAM and 512 GB SSD, and each VM gets "4 cores + 8 GB". Daytona's macOS sandbox docs route here, and the support address is support@daytona.io.
**Price conflict:** the homepage says **$0.90/hr per Mac** (twice), but the docs (Quick start and Lifecycle) say "**Reservations cost $1.91/hour per Mac**" and "You pay up front ($1.91/hr × N × X)". The card uses the homepage list price. At the docs rate every number below is 2.12× higher.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Mac reservation | Always. `client.reserve(hours=24, mini_count=1)` or the dashboard | Up front: rate × N Macs × X hours. Minimum 24 h (Apple SLA lease floor) | **$0.90/h per Mac** (homepage) or $1.91/h (docs). 24 h minimum = **$21.60** (or $45.84) per Mac | https://use.computer/, https://docs.use.computer/llms-full.txt |
| 2 | Per-VM effective rate | Both VM slots of each Mac used | Same reservation, split over 2 VMs | $0.45/h per VM (or $0.955/h) | derived |
| 3 | Single VM on a Mac | Odd VM count, or only one VM | Whole Mac billed | $0.90/h per VM | derived |
| 4 | Sandboxes inside a reservation | create/delete, warm boot <1 s | No extra charge | $0 | docs Lifecycle |
| 5 | End of reservation | `end_at` passes | All sandboxes destroyed, Macs return to the pool | – | docs Lifecycle |
| 6 | Snapshots | `box.snapshot()`, portable disk deltas, forkable across reserved Macs | Price not published | null | https://use.computer/ |
| 7 | Free credit | New account, no card | One-time | **$100** starter credit, one per account | homepage + docs |
| 8 | Egress / IPv4 / regions | – | Not published. "10 Gbps network" | null | homepage |
| 9 | Capacity | – | "The production fleet currently has 28 Mac minis live" | ≈ 56 concurrent VMs | docs |
## Gotchas
1. **Resolve the $0.90 vs $1.91 conflict before quoting.** Nobody states which is current. The homepage CTA ("reserve Mac minis at $0.90/hr") and the docs disagree by 2.12×.
2. **The 24 h lease floor dominates short sessions.** A 10-minute agent run costs a 24 h Mac reservation ($21.60) unless it fits inside a reservation you already hold. The card encodes this as min_billed_seconds 86400 per VM slot.
3. **Pay per Mac, not per VM.** The $0.45/VM-h figure only holds when VMs are paired.
4. **Fixed VM shape** of 4 cores / 8 GB. Nothing bigger is offered.
5. **Fleet size is small** (28 Macs), so 50+ concurrent VMs may not be available.
6. **Licensing:** Apple allows leasing only for "Permitted Developer Services". Non-dev computer-use agents are a grey zone.
## Worked example
Workload: 4 vCPU / 8 GiB fits exactly one VM slot. 50 concurrent × 8 h/day × 22 days = 8,800 VM-hours in 1,100 sessions. 50 VMs = **25 Macs**. Snapshots (50 GiB) and egress (100 GiB) are unpriced ($0 assumed).
| Strategy | Maths | Monthly |
|---|---|---|
| Reserve 25 Macs for 24 h on each working day (card / engine view: 1,100 sessions × 24 h × $0.45) | 25 × 24 × 22 × $0.90 | **$11,880** |
| Reserve 25 Macs for the whole month | 25 × 730 × $0.90 | $16,425 |
| Same two strategies at the docs rate ($1.91) | | $25,212 / $34,857.50 |
| $100 starter credit | one-time | −$100 once |
30% CPU makes no difference, because billing is on the reservation.
Sources: https://use.computer/ · https://docs.use.computer/ · https://docs.use.computer/llms-full.txt · https://www.apple.com/legal/sla/docs/macOS27.pdf