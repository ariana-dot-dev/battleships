# boat.dev: pricing regimes
Sources (checked 2026-11-08):
- P = https://docs.boat.dev/pricing
- B = https://docs.boat.dev/billing
- F = https://docs.boat.dev/faq
- M = https://docs.boat.dev/machines
- V = https://docs.boat.dev/machines/virtualization
- S = https://docs.boat.dev/snapshots
- W = https://docs.boat.dev/snapshots/whats-saved
- L = https://docs.boat.dev/limits
- T = https://docs.boat.dev/free-trial
- A = https://docs.boat.dev/long-running-tasks/auto-stop
- O = https://docs.boat.dev/organizations/seats-and-limits
- C = https://docs.boat.dev/compliance
- K = https://docs.boat.dev/ai-credentials
## Core model in one line
A flat price per size, per second, **only while running**. CPU and RAM are not metered separately. Utilisation has no effect on the bill. A stopped sandbox has no compute charge and keeps its disk free for at least 14 days. Egress is not billed. The monthly plan price comes back as VM time for that month; unused time expires at period end.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | **Size: small** | `--type small` | Flat $/h, per second while running | $0.018/h: 2 vCPU / 4 GB / 51 GB disk (= $0.009/vCPU-h, RAM included) | P |
| 2 | **Size: default** | Default size | Same | $0.036/h: 4 vCPU / 8 GB / 51 GB | P |
| 3 | **Size: large** | `--type large`. Not available on the trial | Same | $0.072/h: 8 vCPU / 16 GB / 111 GB | P, M |
| 4 | **Size: xlarge** (plan-gated) | Needs the $100+ plan. Self-serve, no contact needed | Same | $0.200/h: 16 vCPU / 32 GB / 251 GB. This is **5.56x** default for 4x the resources, so $0.0125/vCPU-h, a **39% per-vCPU premium** | P, M |
| 5 | **Trial** | First plan of a person (organizations get none). Card required | One-time free hours, then Stripe charges the plan after 7 days unless cancelled | 25 h, 2 at once, small/default only, auto-stop required (2 h max), 5/25/75 starts per min/h/day, no new saved snapshots (about $0.90 of default time) | T |
| 6 | **Plan $20/mo** | Paid, 100 at once | Price = VM time for that month, expires at period end; overage from the wallet | $20 (555 h default); included starts 12/min, 60/h, 200/day | P, L |
| 7 | **Plan $100/mo** | 101–300 at once, or xlarge | Same | $100; 300 at once; 30/210/840 starts | P, L |
| 8 | **Plan $500/mo** | 301–1,000 at once | Same | $500; 1,000 at once; 65/420/1,680 starts | P, L |
| 9 | **Plan $2000/mo** | 1,001–2,000 at once | Same | $2,000; 2,000 at once; 90/600/2,400 starts | P, L |
| 10 | **Above the $2,000 plan** | Custom plan | By agreement | unpublished | P, L |
| 11 | **Wallet (overage)** | Usage beyond the plan's included time | Prepaid wallet at list rates, or auto top-up | Wallet money never expires. Payments of $200+ get a 2–25% bonus | P, B, F |
| 12 | **Extra starts** | Starts above the included per-minute, hour or day limit | From the wallet (or the invoice, off by default) | $0.03 up to 1.5x, $0.05 up to 2x, $0.07 up to 6x the included limit (3x per minute). Above that: 429. On $20 that is 1,200 starts/day maximum. Starts are never queued | L |
| 13 | **Organization seats** | Org with N seats | Plan price per seat; each seat adds the included time | Extra seats add **20%** of the limits on $20/$100/$500 (never above the next plan's limits), the full limits on $2,000 | O |
| 14 | **Running (busy or idle)** | From `provisioned` until stop | Full size rate, regardless of CPU/RAM use | e.g. default 24/7 = 730 h × $0.036 = $26.28 | P, concepts |
| 15 | **Stopped** | After `boat stop`, auto-stop, or balance cutoff | $0 compute, $0 for the automatic snapshot | Disk kept **at least 14 days**, then eligible for deletion; resume then fails with 409. Cleanup is report-only in production today | P, S, L |
| 16 | **Always-on** | Auto-stop off (paid plans only), or TTL up to 30 d | Same as running. **No commit discount and no monthly cap** | $26.28/month per default sandbox | A, P |
| 17 | **Saved snapshots** | `boat snapshot <id> <name>` | Included count, then per snapshot per day | 10 per $20 of plan per seat included; then $0.056/day ($1.68 per 30 days) each, charged also while sandboxes are stopped. No scheduled expiry. Not on the trial | P, L |
| 18 | **AI credentials proxy** | Optional, off until turned on | Wallet, also while sandboxes are stopped | $1 per UTC day it is on + $1 per 1,000 proxied requests | K, P |
| 19 | **Hosts** | Every sandbox | Same price on every host | Full VM on bare-metal hosts dedicated to boat: AMD Ryzen 7 9700X and Ryzen 9 9950X. vCPUs are shared. The benchmark (26.69 runs/s) ran on a 9950X host; 9700X hosts were not benchmarked. `/dev/kvm` on every sandbox | V, M |
| 20 | **Egress** | All traffic | Not billed | No published cap | P |
| 21 | **IP address** | Every sandbox | Included | Public IPv6 + outbound IPv4. Some sandboxes have no IPv4 of their own (SSH via a shared IPv4 host:port, HTTPS URLs over IPv4, raw ports IPv6-only). No dedicated IPv4. The IP changes at each resume | F, P |
| 22 | **Out of balance** | Wallet empty | 24 h grace, still running. Then snapshot and stop; earlier if new debt passes 25% of the plan price ($50 min) | Disks are kept | B |
| 23 | **Refused stop** | Final snapshot fails | Sandbox keeps running; boat retries up to 3 days, then forces the stop | | S |
| 24 | **Plan change** | Upgrade | Applies at once, prorated | Downgrade terms: read B | P, B |
| 25 | **Account closure** | Close account | 30-day recoverable window, then purge | $0 | data-retention |
| 26 | **Region** | Germany, Finland, France | No regional multiplier. No region choice. No US or Asia option. Snapshot copies can be stored outside the EU | 100–200 ms RTT from the Americas | C, F |
Things **not** offered (so no regime exists): GPU, Windows/macOS VMs (Windows apps run through Wine), spot/preemptible, reserved/commit discounts, memory snapshots (pause with RAM), extra disk beyond the size preset, separate volumes, region choice, dedicated IPv4.
## Gotchas
1. **The $20 plan is a $20/month minimum.** The price comes back as VM time, but that time **expires at period end**. A light month (e.g. $6 of usage) still costs $20. Wallet money, by contrast, never expires.
2. **Auto-stop counts from creation or resume, not from idle, and the default is 1 h.** A sandbox stops mid-work at 1 h unless you set a TTL or turn auto-stop off. A running agent prompt moves the deadline. Forks get 1 h unless you set their TTL.
3. **There is no idle auto-stop.** An idle but running sandbox bills the full rate. With auto-stop off, a forgotten default sandbox costs $26.28/month until you stop it.
4. **Start limits can force a higher plan or extra-start fees before concurrency does.** Create, fork and resume each count (a resume onto the kept machine does not). Example: 50 sandboxes resumed 8× a day = 400 starts/day on the $20 plan: 200 free, 100 at $0.03, 100 at $0.05 = $8/day, or the $100 plan (840/day included). Above 6x the included limit (1,200/day on $20), starts fail with 429; boat does not queue them.
5. **xlarge is poor value per vCPU.** It is 5.56x the default price for 4x the vCPU/RAM, 39% more per vCPU than small/default/large. Two `large` sandboxes cost $0.144/h against $0.200/h for one xlarge.
6. **Disk only grows by upsizing.** No extra-disk purchase exists. Needing more than 51 GB forces `large` ($0.072/h, 111 GB) even if 4 vCPU is enough.
7. **Host class varies.** The fleet has 9700X and 9950X hosts and the user cannot pick. The CPU benchmark ran on a 9950X. Disk flush (fsync) latency differs by host class; boat publishes no per-class number.
8. **vCPUs are shared**, not dedicated physical cores.
9. **No dedicated IPv4**, and the IP changes on resume. Anything that needs a stable public IPv4 cannot rely on it; use the HTTPS public URL.
10. **A stopped disk is kept at least 14 days, not forever.** Save a saved snapshot to keep it longer (10 per $20 of plan included, then $0.056/day each).
11. **Snapshots are filesystem only.** Resume is a reboot. `/tmp`, most of `~/.cache`, the journal, the Docker build cache and untagged images are not saved. A machine failure loses writes after the last 1-minute snapshot.
12. **Seats add only 20% of the limits below the $2,000 plan.** A bigger plan always gives more limits than the same money in seats.
13. **Not EU data residency.** Machines are in Germany, Finland and France, but snapshot copies can be stored outside the EU. No US region at any price.
14. **Trial is hours, not dollars, and needs a card.** 25 h, 2 at once, 2 h TTL cap, 75 starts/day. You cannot run the worked example below on it.
## Worked example
Workload: 4 vCPU/8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU util, 50 GiB snapshots retained, 100 GiB egress.
The size is `default` (exact fit). CPU utilisation is irrelevant because billing is flat. The automatic snapshots are free while each sandbox is stopped less than 14 days. The 100 GiB of egress is free.
| Regime | Compute | Snapshots | Egress | Plan / wallet | **Monthly total** |
|---|---|---|---|---|---|
| $20 plan + wallet, stop between sessions (TTL 8 h) | 8,800 × $0.036 = $316.80 | $0 | $0 | $20 included + $296.80 from the wallet | **$316.80** |
| $100 plan + wallet | $316.80 | $0 | $0 | $100 included + $216.80 from the wallet | **$316.80** |
| $500 plan (no wallet use) | $316.80 | $0 | $0 | $500 price, $183.20 of VM time expires unused | **$500** |
| Same fleet but never stopped (always-on / forgotten auto-stop off) | 50 × 730 × $0.036 = $1,314 | $0 | $0 | $100 plan + wallet, or $2000 plan | **$1,314** |
| Upsized to `large` (e.g. to get >51 GB disk) | 8,800 × $0.072 = $633.60 | $0 | $0 | $20 + wallet | **$633.60** |
| `xlarge` (overkill; needs $100 plan) | 8,800 × $0.200 = $1,760 | $0 | $0 | $100 + wallet | **$1,760** |
| Trial | Not applicable: 2 at once, 2 h TTL, 25 h total | | | | n/a |
Plan choice: 50 at once fits the $20 plan (100). Daily resumes are 50 starts/day, under 200/day, but 12/min means about 5 min to bring the fleet up (a refused start must be sent again). If each sandbox restarts more than 4× a day, the $20 plan pays extra starts ($0.03–$0.07 each) or the $100 plan is needed; the compute total is unchanged.
