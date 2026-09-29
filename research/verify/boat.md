# Verify: boat.dev (2026-09-28)
Sources re-fetched: https://docs.boat.dev/pricing, https://docs.boat.dev/billing, https://boat.dev, https://docs.boat.dev/faq.md, https://docs.boat.dev/snapshots.md, https://docs.boat.dev/long-running-tasks.md, plus the boat CLI tier data supplied in the task.
## Card (cards/boat.json)
| Item | Result |
|---|---|
| Sizes small 2/4/12 $0.018, default 4/8/50 $0.036, large 8/16/125 $0.072, xlarge 16/32/251 $0.200 | confirmed (pricing page; CLI multipliers 0.5x/1x/2x) |
| xlarge needs the $100+ plan and operator allocation | confirmed (pricing page footnote, CLI) |
| Billing is per second, running only; stopped = $0 | confirmed ("per second, only while a sandbox runs. A stopped sandbox costs nothing") |
| No per-start minimum or boot billing published | unverifiable (not documented; card assumes 0) |
| Plans $20/$100/$500/$2000; concurrency 100/300/1000/2000 | confirmed (pricing page, CLI) |
| fee_is_credit=true (fee = included time, expires monthly) | confirmed ("Granted each month and expires at the end of it"; billing: "not carried forward"). Engine max(fee, usage) models this correctly |
| Included time 555/2,777/13,888/55,555 h of default | confirmed ($20 / $0.036 = 555.6 h) |
| Starts/min-h-day 12/60/200, 30/210/840, 65/420/1680, 90/600/2400 | confirmed (pricing page, CLI); not modelled by the engine, already a caveat |
| Packs $20 = 2,000,000 s, never expire, spent after plan time | confirmed (billing page) |
| Trial: 25 h, 2 concurrent, small/default, TTL <= 2 h, auto-stop can't be disabled | confirmed (pricing, long-running-tasks). trial_only=true, so the engine skips it (correct) |
| free.one_time_credit 0.9 (= 25 h x $0.036) | confirmed arithmetic |
| Plan max_vcpu 8 on $20 (blocks xlarge), 16 on $100+ | confirmed; this is how the engine enforces the xlarge gate (plan max_ram_gib is not checked by the engine, but max_vcpu suffices) |
| max_session_h null on paid plans (--no-auto-stop; numeric TTL max 30 d) | confirmed (long-running-tasks) |
| Egress 2 TB per sandbox per month included; price beyond is unpublished | confirmed (FAQ) |
| IPv4: "dedicated IPv6 or IPv4", no charge; ipv4_available null | confirmed (FAQ) |
| Snapshots free; latest per sandbox kept (up to the size's data disk); up to 10 named, no expiry | confirmed (FAQ, snapshots) |
| Filesystem-only snapshots (snapshot "fs") | confirmed (snapshots: no running processes) |
| Shared vCPUs | confirmed (FAQ: "Sandboxes have shared vCPUs") |
| Regions EU only (DE/FI/FR) | confirmed (homepage, FAQ) |
| No idle auto-stop; TTL counts from creation/resume, default 1 h; forks reset to 1 h | confirmed (FAQ, long-running-tasks) |
| Seats multiply concurrency/start limits as one pool; seat price unpublished | confirmed (pricing, billing); price unverifiable |
| 24 h grace period at zero balance | confirmed (billing: applies "whether or not auto-pay is on") |
| Homepage "dedicated 4 vCPU / 8 GB VM-time" wording | unverifiable (not present on the homepage fetched today; the homepage now says "$20 minimum per month") |
| perf 27.67 runs/s (standard machines, default) / 8.88 runs/s (temporary Hetzner capacity fallback) | benchmark not re-run (vendor-run). Placement verified 2026-09-28: a live VM runs on an AMD Ryzen 9 9950X standard host ("baremetal" class, still a full VM) with /dev/kvm. Card perf is 27.67 |
## Regimes (regimes/boat.md)
All numbers confirmed. Worked-example arithmetic checked: 8,800 x $0.036 = $316.80; $20 + 15 packs = $320 cash with $3.20 carried over; $100 + 11 packs likewise; always-on 50 x 730 x $0.036 = $1,314 ($100 + 61 packs); large $633.60; xlarge $1,760; 316.80 x 27.67/8.88 = $987 (fallback worst case).
Corrections: 2026-09-28, the placement framing was fixed. Standard machines are the default (not a coin flip with Hetzner); the Hetzner cloud VM is only a temporary capacity fallback. Regime rows 17/18 and gotcha #7 rewritten accordingly.