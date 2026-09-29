# boat.dev: pricing regimes
Sources:
- B = https://docs.boat.dev/billing.md
- F = https://docs.boat.dev/faq.md
- M = https://docs.boat.dev/machines.md
- S = https://docs.boat.dev/snapshots.md
- L = https://docs.boat.dev/long-running-tasks.md
- D = https://docs.boat.dev/data-retention.md
## Core model in one line
A flat price per size, per second, **only while running**. CPU and RAM are not metered separately. Utilisation has no effect on the bill. Stopped sandboxes, snapshots, IPv4/IPv6 and up to 2 TB/sandbox/month of egress are free. The monthly plan fee is 100% usage credit.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | **Size: small** | `--type small` | Flat $/h, per second while running | $0.018/h: 2 vCPU / 4 GB / 12 GB disk (= $0.009/vCPU-h, RAM included) | P |
| 2 | **Size: default** | Default size | Same | $0.036/h: 4 vCPU / 8 GB / 50 GB | P |
| 3 | **Size: large** | `--type large`. Not available on the trial | Same | $0.072/h: 8 vCPU / 16 GB / 125 GB | P, L |
| 4 | **Size: xlarge** (plan-gated) | Needs the $100+ plan **and** an operator to allocate capacity on request | Same | $0.200/h: 16 vCPU / 32 GB / 251 GB. This is **5.56x** default for 4x the resources, so $0.0125/vCPU-h, a **39% per-vCPU premium** | P |
| 5 | **Trial** | New account, until the first payment | One-time free hours | 25 h, 2 concurrent, small/default only, TTL ≤ 2 h, auto-stop cannot be disabled (about $0.90 of default time) | P, L |
| 6 | **Plan $20/mo** | Paid, 100 concurrent | Fee = usage credit that expires at month end; overage from packs/auto-refill | $20 credit (555 h default); starts 12/min, 60/h, 200/day | P |
| 7 | **Plan $100/mo** | 101–300 concurrent, or xlarge | Same | $100 credit; 300 concurrent; 30/210/840 starts | P |
| 8 | **Plan $500/mo** | 301–1,000 concurrent | Same | $500 credit; 1,000 concurrent; 65/420/1,680 starts | P |
| 9 | **Plan $2000/mo** | 1,001–2,000 concurrent | Same | $2,000 credit; 2,000 concurrent; 90/600/2,400 starts | P |
| 10 | **> 2,000 concurrent** | Enterprise | "By agreement" | unpublished | H |
| 11 | **Credit packs** | Usage beyond monthly plan time | Prepaid $20 packs at list rates, drawn after plan time | $20 = 2,000,000 default-seconds. Packs **never expire**. Auto-refill is optional | P, B |
| 12 | **Organization seats** | Org wallet with N seats | Concurrency and start limits × seats, as one pooled budget | Seat price **not published**. Per-member usage and concurrency caps are available | P, B |
| 13 | **Running (busy or idle)** | Any time the VM is up | Full size rate, regardless of CPU/RAM use | e.g. default 24/7 = 730 h × $0.036 = $26.28 | P |
| 14 | **Stopped** | After `boat stop`, TTL expiry, or balance cutoff | $0 compute, $0 disk, $0 snapshot | Latest snapshot kept for the life of the sandbox, no expiry | F, S |
| 15 | **Always-on** | `--no-auto-stop` (paid plans only), or TTL up to 30 d | Same as running. **No commit discount and no monthly cap** | $26.28/month per default sandbox | L, P |
| 16 | **Named snapshots (templates)** | `boat snapshot save` | Free | Up to 10, no expiry. Backing data is freed at least 6 h after deletion | S, D |
| 17 | **Standard machine (default)** | Where sandboxes normally run: dedicated AMD Ryzen 9 9950X (Zen 5) hosts. "baremetal" is only the internal class name; each sandbox is still a full VM with its own kernel | Same price | Node build loop 27.67 runs/s ($0.36/1M runs); `/dev/kvm` present, so nested virtualisation works | M, BM |
| 18 | **Capacity fallback (temporary)** | Only when standard capacity is temporarily exhausted: a new sandbox falls back to an older Hetzner cloud VM (older AMD CPU) | Same price | 8.88 runs/s (about 3.1x slower, $1.13/1M runs); **no `/dev/kvm`** | M, BM |
| 19 | **Egress ≤ 2 TB/sandbox/month** | Normal use | Included | 2 TB per sandbox per month. Ingress is free | F |
| 20 | **Egress > 2 TB/sandbox/month** | Heavy transfer | **Unpublished** | null | F |
| 21 | **IP address** | Every sandbox | Included | "Dedicated IPv6 **or** IPv4". IPv4 is not guaranteed and the IP changes on resume | F, M |
| 22 | **Out of balance** | Balance reaches 0 without auto-pay | 24 h grace, still running. Then snapshot and stop | No data loss | B |
| 23 | **Refused stop** | Final snapshot fails | Billing is paused while the stop is refused | "time past a refused stop is excluded" | llms-full |
| 24 | **Plan change** | Upgrade | Prorated, immediate. Moving a personal plan into an org refunds the unused share | Downgrade terms not stated | P, B |
| 25 | **Account closure** | Close account | 30-day recoverable window, then purge | $0 | D |
| 26 | **Region** | EU only (DE/FI/FR) | No regional multiplier. No US or Asia option | 100–200 ms RTT from the Americas | F |
Things **not** offered (so no regime exists): GPU, Windows/macOS, spot/preemptible, reserved/commit discounts, memory snapshots (pause with RAM), extra disk beyond the size preset, separate volumes, region choice.
## Gotchas
1. **The $20 plan is really a $20/month minimum.** The fee is fully credited, but the credit **expires monthly**. A light month (e.g. $6 of usage) still costs $20. Credit packs, by contrast, never expire.
2. **TTL counts from creation or resume, not from idle, and the default is 1 h.** A sandbox stops mid-work at 1 h unless you pass `--ttl`/`--no-auto-stop`. Forks do **not** inherit the source TTL; they default to 1 h again. This is safe for the bill but surprising for long jobs.
3. **There is no idle auto-stop.** An idle but running sandbox bills the full rate. With `--no-auto-stop`, a forgotten sandbox costs $26.28/month (default) until you stop it. Utilisation-based providers would charge less for an idle box; boat charges the same.
4. **Start-rate ceilings can force a higher plan before concurrency does.** Create, fork and resume each count. Example: 50 sandboxes resumed 8× a day = 400 starts/day, above the $20 plan's 200/day. That needs the $100 plan (840/day) even though 50 concurrent fits in $20. A burst of 50 creates takes about 5 min at 12/min.
5. **xlarge is poor value per vCPU.** It is 5.56x the default price for 4x the vCPU/RAM, 39% more per vCPU than small/default/large. It is also gated behind the $100 plan plus manual allocation. Two `large` sandboxes cost $0.144/h against $0.200/h for one xlarge.
6. **Disk only grows by upsizing.** No extra-disk purchase exists. Needing 100 GB forces `large` ($0.072/h) even if 4 vCPU is enough.
7. **The capacity fallback is slower and has no KVM.** Sandboxes normally run on boat.dev's standard machines (dedicated AMD Ryzen 9 9950X hosts; "baremetal" is only the internal class name, every sandbox is still a full VM): 27.67 runs/s, `/dev/kvm` present, $0.36 per 1M Node tooling runs. That was 85% of prod assignments over the 7 days to 2026-09-28 and ~95% over the last 3. Only when standard capacity is temporarily exhausted does a new sandbox fall back to an older Hetzner cloud VM at the same price: 8.88 runs/s (about 3.1x slower, $1.13/1M runs) and no `/dev/kvm`, so nested virtualisation (QEMU/KVM, Firecracker, Android emulator) is unavailable there. During a capacity crunch two weeks earlier the fallback took up to ~60% of assignments.
8. **"Dedicated" vs "shared" wording conflicts.** The homepage says "dedicated 4 vCPU / 8 GB VM-time". The FAQ says "Sandboxes have shared vCPUs" and advises dedicated compute for sustained 100% CPU.
9. **IPv4 is not guaranteed** ("IPv6 or IPv4"), and the IP changes on resume. Anything that needs a stable public IPv4 cannot rely on it.
10. **Egress beyond 2 TB/sandbox/month is unpublished.** It is also unclear whether heavy egress is throttled.
11. **Snapshot size is bounded by the size's data disk** ("up to your sandbox type's data size"). Snapshots are filesystem-only, so resume means a reboot and running processes are lost.
12. **Seat price is unpublished.** Seats multiply the concurrency and start ceilings, and the whole org shares one pool.
13. **EU-only.** There is no US region at any price.
14. **Trial is hours, not dollars.** It gives 25 h with 2 concurrent and a 2 h TTL cap. You cannot run the worked example below on it.
## Worked example
Workload: 4 vCPU/8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU util, 50 GiB snapshots retained, 100 GiB egress.
The size is `default` (exact fit). CPU utilisation is irrelevant because billing is flat. The 50 GiB of snapshots is free (≈1 GiB per sandbox, well under the 50 GB data size). The 100 GiB of egress is free (≪ 2 TB/sandbox).
| Regime | Compute | Snapshots | Egress | Plan / packs | **Monthly total** |
|---|---|---|---|---|---|
| $20 plan + packs, stop between sessions (TTL 8 h) | 8,800 × $0.036 = $316.80 | $0 | $0 | $20 credit + 15 packs ($300); $3.20 of pack credit carries over | **$316.80** effective ($320 cash) |
| $100 plan + packs | $316.80 | $0 | $0 | $100 + 11 packs ($220), $3.20 carries over | **$316.80** effective ($320 cash) |
| $500 plan (no packs) | $316.80 | $0 | $0 | $500 fee, $183.20 of credit expires unused | **$500** |
| Same fleet but never stopped (always-on / forgotten `--no-auto-stop`) | 50 × 730 × $0.036 = $1,314 | $0 | $0 | $100 plan + 61 packs, or $2000 plan | **$1,314** |
| Upsized to `large` (e.g. to get >50 GB disk) | 8,800 × $0.072 = $633.60 | $0 | $0 | $20 + packs | **$633.60** |
| `xlarge` (overkill; needs $100 plan + allocation) | 8,800 × $0.200 = $1,760 | $0 | $0 | $100 + packs | **$1,760** |
| Performance-adjusted, CPU-bound, whole fleet on the temporary capacity fallback (3.1x runtime; only during a standard-capacity shortage) | ≈ $316.80 × 27.67/8.88 ≈ $987 (upper bound, same work) | $0 | $0 | | **≈ $987** (fallback worst case, not typical) |
| Trial | Not applicable: 2 concurrent, 2 h TTL, 25 h total | | | | n/a |
Plan choice: 50 concurrent fits the $20 plan (100). Daily resumes are 50 starts/day, under 200/day, but 12/min means about 5 min to bring the fleet up. If each sandbox restarts more than 4× a day, the $100 plan is needed for its start-rate ceiling; the dollar total is unchanged.