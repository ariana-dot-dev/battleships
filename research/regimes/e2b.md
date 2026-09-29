# E2B — pricing regimes (as of 2026-09-28)
E2B has one compute rate card (per-second, allocated vCPU + allocated RAM, identical on Hobby and Pro) but many
regimes that change what the same workload costs: plan fee that is *not* credit, concurrency add-ons, an Enterprise
usage minimum with a 1-year commit, one-time credit programmes, and lifecycle modes (running vs paused vs killed)
whose default is destructive. Storage, snapshots and egress are not billed per official docs.
Base rates: vCPU $0.000014/s = **$0.0504/vCPU-h**; RAM $0.0000045/GiB-s = **$0.0162/GiB-h**.
4 vCPU / 8 GiB = 0.2016 + 0.1296 = **$0.3312/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Hobby (free) | Default for new accounts | No fee; usage paid from one-time credit; account **blocked** (not auto-charged) when credit runs out until a card is added | $0 fee; $100 one-time credit (~302 h of 4/8); 20 concurrent; 1 h max continuous run; 1 create/s; 8 vCPU / 8 GiB / 10 GiB disk max; 20 concurrent builds | https://e2b.dev/pricing, https://docs.e2b.dev/billing |
| Pro | Need >20 concurrent, >1 h continuous run, >10 GiB disk, EU/Asia region | $150/mo **pure fee — no credit** ("Upgrading to Pro does not grant additional credits") + per-second usage, billed monthly in arrears | $150/mo; 100 concurrent; 24 h max continuous; 5 creates/s; "8+" vCPU/GiB (higher via support); 20 GiB ("20+") disk | https://docs.e2b.dev/billing |
| Pro + concurrency add-on(s) | >100 concurrent self-serve | +$500/mo per add-on of 500 slots, on top of usage; monthly, no long-term commit; immediate | 600 concurrent = $650/mo total fixed; 1,100 = $1,150/mo total fixed (self-serve ceiling) | https://docs.e2b.dev/faq/increase-concurrency, pricing calculator |
| Enterprise (committed usage) | >1,100 concurrent, custom sizes, >24 h continuous, BYOC, "better rates" | Minimum monthly usage committed **for a year**; custom rates; custom billing | "$3,000/mo minimum" (pricing calculator); rates not published | https://e2b.dev/pricing, https://docs.e2b.dev/faq/increase-concurrency |
| BYOC | Enterprise only, AWS or GCP (Azure not yet) | E2B-managed deployment in customer VPC; customer pays own cloud compute; E2B fee unpublished | null | https://docs.e2b.dev/byoc |
| E2B for Startups | <$5M raised, founded <3 y, first-time E2B user; acceptance not guaranteed | One-time usage credit + Pro tier membership | $20,000 one-time credit | https://e2b.dev/startups |
| E2B for Research | University / public research / non-profit, first-time user | One-time usage credit + Pro tier membership | $20,000 one-time credit | https://e2b.dev/research |
| Running (active or idle) | Sandbox state = running | Allocated vCPU + allocated RAM per second, regardless of CPU/RAM utilisation; no published minimum or start fee | $0.0504/vCPU-h + $0.0162/GiB-h | https://docs.e2b.dev/faq/calculate-sandbox-price |
| Paused (memory + filesystem) | `pause()` or `onTimeout:'pause'` | Not billed; not counted toward concurrency; retained indefinitely (no TTL) | $0 | https://docs.e2b.dev/faq/paused-sandboxes-concurrency, https://docs.e2b.dev/faq/sandbox-lifetime |
| Paused filesystem-only (`keepMemory:false`) | Faster/lighter pause; reboot on resume | Not billed | $0 | https://docs.e2b.dev/sandbox/filesystem-only-snapshots |
| Named snapshots / forks | `createSnapshot`, `fork(count<=100)` | Snapshots: no billing documented; source sandbox is "briefly paused" during snapshot; each fork is a new running sandbox billed at full rate | $0 storage (not documented as billed) | https://docs.e2b.dev/sandbox/snapshots, https://docs.e2b.dev/sandbox/fork |
| Timeout (default) | No activity config; default timeout 5 min | Default `onTimeout` = **kill** (deletes state); billing stops | $0 after | https://docs.e2b.dev/faq/sandbox-lifetime |
| Disk | Per template, set by plan | Included; cannot buy more self-serve | 10 GiB Hobby / 20+ GiB Pro; "Storage: Free" | https://docs.e2b.dev/billing |
| Volumes | Private beta, US/EU | Price unpublished | null | https://docs.e2b.dev/volumes |
| Template builds | Building custom templates | Billing not documented; 1 h build timeout; 20 concurrent builds | null | https://docs.e2b.dev/faq/build-limits |
| Regions | us-west1 default; EU (Pro+ via support); Asia (Pro+ per features research) | No regional multiplier published; separate project/API key; templates rebuilt per region | multiplier assumed 1 (unverified) | https://docs.e2b.dev/faq/eu-region |
| Egress / ingress | All traffic | No network charge documented anywhere in docs or pricing page | null (appears unmetered) | https://docs.e2b.dev/network/internet-access |
Dated changes: billing enabled 2024-02-23; custom CPU/RAM (1–8 vCPU, 128 MiB–8 GiB) for Pro 2024-03-03;
self-serve concurrency add-on units in dashboard 2026-08-17. No rate change announced since. No upcoming
price change found (https://docs.e2b.dev/changelog).
## Gotchas
1. **Pro $150 is a pure fee.** It buys limits only; at low usage E2B costs $150 + usage, unlike boat/Daytona-style credit fees.
2. **Idle = full price.** CPU and RAM are billed on allocation while running. A sandbox left running and idle costs the same as one at 100% CPU. Pausing is the only way to stop the meter.
3. **Default timeout is destructive.** `onTimeout` defaults to `kill` after 5 min; people who expect "auto-stop" lose state. People who instead raise the timeout to 24 h to avoid the kill keep paying for idle hours. `Sandbox.connect()` never shortens and only extends the timeout (min 5 min from now), so reconnect loops can keep sandboxes alive.
4. **CPU/RAM are fixed per template, not per sandbox.** To change size you rebuild the template. Default base template is 2 vCPU / 512 MiB; a rebuild without parameters defaults to 2 vCPU / 1 GiB.
5. **Hobby is hard-stopped, not auto-charged**: when the $100 credit runs out the account is blocked. Pricing page says Hobby gets "Default sandbox CPU and RAM"; the billing docs say Hobby max 8 vCPU / 8 GiB (conflict — unresolved).
6. **Concurrency add-ons are steep and step-shaped**: going from 100 to 101 concurrent costs +$500/mo. Paused sandboxes don't count, so aggressive pausing is a cost lever.
7. **1 h continuous-run cap on Hobby / 24 h on Pro** resets on pause+resume; the "session cap" is not a lifetime cap.
8. **Enterprise needs $3,000/mo minimum and a 1-year commitment**; the minimum is described as a usage minimum (likely credited against usage, unverified).
9. **Third-party misinformation**: some blogs (Morph, Matrix OS) claim Pro "includes 500 hours" or that snapshot storage is billed. Official docs (2026-09) say Pro includes no credits and paused sandboxes/snapshots are not billed. "Template storage may be priced in future" was noted in earlier research, so watch for a change.
10. **No egress, IPv4, or volume prices are published.** Volumes are private beta with unpublished price; no static egress IP on any plan.
11. **Pause is not instant**: about 4 s per GiB RAM (8 GiB ≈ 32 s). Whether that pause window is billed is not documented.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU util,
50 GiB snapshots retained, 100 GiB egress. Sandboxes paused (not killed) between shifts.
Usage at list: 8,800 × $0.3312 = **$2,914.56** (vCPU $1,774.08 + RAM $1,140.48). CPU util 30% changes nothing (allocated billing).
Snapshots: $0 (paused state not billed). Egress: $0 (none documented, unverified).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Hobby | No: 50 concurrent > 20; 8 h runs > 1 h cap (pause/resume every hour works around the cap but not concurrency) | n/a (the $100 credit covers ~0.3 h per sandbox-day of this load) |
| Pro on-demand | Yes (50 ≤ 100, 8 h ≤ 24 h) | **$3,064.56** = $150 + $2,914.56 |
| Pro + 600 add-on | Yes but unnecessary | $3,564.56 |
| Enterprise commit | Yes | ≥ **$3,000** (if the $3k minimum is a usage floor credited against usage and list rates apply; negotiated rates unknown; 1-year commit) |
| BYOC | Enterprise | unknown E2B fee + own AWS/GCP compute |
| Startup / Research credits | If accepted | $20k one-time covers ~6.9 months of usage; whether the $150 Pro fee is waived is not stated |
| Anti-pattern: left running idle 24 h/day instead of pausing | Yes | $150 + 50×24×22×0.3312 = **$8,893.68** |
| Anti-pattern: default onTimeout kill | — | Same $ as Pro but state is destroyed between shifts |