# Run Cloud — pricing regimes (as of 2026-09-28)
**Status: Linux microVM sandboxes are DEPRECATED and closed to new organizations** (banner on every sandbox doc page;
removal date not published). run.cloud's live product is now remote iOS simulators / Android emulators and Xcode builds.
Everything below describes what existing orgs still pay for sandboxes; a new customer cannot buy them.
No rate card is published for sandboxes. The only number is a docs worked example: a 0.125 vCPU sandbox bursting to
1 vCPU for 10 min ≈ $0.0005 floor (75 vCPU-s) + $0.0034 burst (525 vCPU-s) ≈ $0.004 → **≈ $0.0233/vCPU-h**
(derived; rounding band $0.0230–0.0237). **Memory is billed on reservation but its rate is unpublished.**
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Reserved CPU floor | Sandbox running | Reserved vCPU billed per second for the whole run, regardless of use | ≈$0.0233/vCPU-h (derived); default reservation 0.125 vCPU / 128 MiB; max 32 vCPU / 112 GiB | https://docs.run.cloud/sandboxes/index.md |
| CPU burst (auto-scaling) | CPU consumed above the reservation | Separate "CPU (burst)" invoice line, measured per second from the VM cgroup, same rate as reserved CPU; always on, "not a premium" | ≈$0.0233/vCPU-h; burst ceiling undocumented | https://docs.run.cloud/sandboxes/index.md |
| Memory | Sandbox running | Billed on reservation (= hard ceiling; VM cannot grow RAM) | rate **null** (unpublished) | https://docs.run.cloud/sandboxes/index.md |
| Paused / stopped | `pause`, `idlePauseSeconds` auto-pause (0 = off), stop | Keeps the org capacity slot (sandbox count, reserved vCPU, reserved RAM) until destroyed; billing ambiguous ("billed per second of runtime" vs "billing stops when the sandbox is destroyed") | null | https://docs.run.cloud/sandboxes/run-sandbox.md, https://docs.run.cloud/limits.md |
| Destroyed | `destroy` / `rm` | Billing stops, capacity released | $0 | https://docs.run.cloud/sandboxes/run-sandbox.md |
| Snapshots (filesystem) | `snapshot create`; restore forks a NEW sandbox | Storage "not metered today"; each restored sandbox billed for its own reservation and counts toward concurrency | $0/GiB-month | https://docs.run.cloud/sandboxes/snapshots.md |
| Disk | Writable quota per create (`disk`, GiB) | Price unpublished | null | computesdk run-cloud README |
| Free: no card | New org without payment method | Unpaid-usage ceiling | $5 of usage | https://run.cloud/pricing/, https://docs.run.cloud/limits.md |
| Free: monthly grant | Payment method on file | First $15 of usage free every month (applies to sandbox burst too) | $15/month | https://run.cloud/pricing/, sandboxes/index.md |
| Credit ceiling / spend limit | Accrued unpaid usage | Default $500 backstop with card; prepaid credit raises it; owner can set lower limit. Hitting it **stops active sandboxes** and returns 402 on create | $500 default | https://docs.run.cloud/limits.md |
| Org capacity caps | Always | 100 sandboxes (incl. paused/stopped), 100 reserved vCPU (burst excluded), 400 GiB reserved RAM, 100 tunnels (8/sandbox); raisable on request | — | https://docs.run.cloud/limits.md |
| Tunnels / inbound | Expose a port | Random bearer HTTPS hostname, default TTL 1 h; no public IPv4; egress price unpublished | null | computesdk README, run-sandbox.md |
| Mobile simulators (current product, not a sandbox) | iOS simulator / Android emulator session | Per active minute from create until release or inactivity timeout | $0.02/min ($1.20/h); $15 grant = 750 min | https://run.cloud/pricing/ |
| Xcode builds | Cloud archive/sign/IPA export | Free during beta | $0 | https://run.cloud/pricing/ |
Dated changes: sandboxes (and secrets, CI, boxes, desktops, custom images) marked deprecated/closed to new orgs;
exact deprecation date and removal date not published (seen 2026-09-28).
## Gotchas
1. **You can't sign up for it.** New orgs get only simulators. The card flags every sandbox mode and the plan `legacy`.
2. **Reserve small, burst big.** Because burst costs the same as reservation, the cheapest play is the 0.125 vCPU default
   floor + auto-burst, which bills ≈ actual CPU used. Reserving full CPU buys nothing except guaranteed capacity.
3. **But RAM must be reserved up front** (hard ceiling) and its price is unknown, so any estimate is CPU-only.
4. **Reserved-vCPU cap bites fast**: 100 reserved vCPU org-wide means 25 sandboxes at 4 reserved vCPU. Burst doesn't count, another reason to reserve the floor.
5. **Paused/stopped sandboxes eat quota** (count, vCPU, RAM) until destroyed; billing while paused is ambiguous.
6. **Spend ceiling kills running work**: at the $500 default unpaid ceiling (or your own lower limit), active sandboxes are stopped.
7. **"Not metered today"** on snapshot storage signals a possible future charge.
8. **Worst benchmark in the set**: burst TTI median 15.8 s (p99 33 s) at 100 concurrency; DAX never succeeded.
9. Misattribution alert: a web-search summary quoted $0.01667/vCPU-h + $0.00833/GB-h "for run.cloud"; those are Northflank's rates.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = 8,800 sandbox-hours, 30% CPU, 50 GiB snapshots, 100 GiB egress.
(Existing orgs only.)
| Regime | Feasible? | Monthly total |
|---|---|---|
| Floor 0.125 vCPU + burst | Yes: 50 × 0.125 = 6.25 reserved vCPU; RAM 50 × 8 = 400 GiB = exactly the default RAM cap (no headroom) | CPU ≈ 8,800 × 4 × 0.30 × $0.0233 = **$246.05** + floor (8,800 × 0.125 × 0.0233 = $25.63 only to the extent CPU drops below the floor) − $15 grant ≈ **$231 + unknown RAM** |
| Full 4 vCPU reserved | **No** by default: 200 reserved vCPU > 100 cap (needs an operator raise) | 8,800 × 4 × $0.0233 = $820.16 − $15 = **$805 + unknown RAM** |
| Snapshots 50 GiB | — | $0 (unmetered today) |
| Egress 100 GiB | — | unknown (unpublished) |
| Paused between shifts instead of destroyed | Capacity still consumed; charge ambiguous | + unknown |
The RAM line (8 GiB × 8,800 h = 70,400 GiB-h) is almost certainly the largest item and is unpriced.