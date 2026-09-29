# Declaw — pricing regimes (as of 2026-09-28)
Declaw runs Firecracker sandboxes behind a security proxy. It bills per second in microdollars from a prepaid **wallet**.
The wallet drains in a waterfall: a one-time $100 sandbox credit first (plus a separate $200 guardrails credit), then the paid balance.
Compute has the same rates as E2B: $0.0504/vCPU-h + $0.0162/GB-h on provisioned resources, plus overlay disk at $0.110/GB-month
while running. Rates are the same on every tier. The tiers change only limits and the deposit rules; Pro carries a $100/month minimum deposit
that is spent on usage, not a fee. `declaw.ai/pricing` now redirects to the docs billing page.
4 vCPU / 8 GB = 0.2016 + 0.1296 = **$0.3312/h** (+ disk: 10 GB = $0.0015264/h).
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free tier | Default | Draws the one-time credits, then paid deposits (no auto-refill); returns 402 once credits and balance hit 0 | $0 fee; $100 sandbox + $200 guardrails one-time credit; 25 concurrent; **1 h** max session; max 4 vCPU / **4 GB** / 10 GB disk; 2 creates/s; deposits $5–$100 | https://docs.declaw.ai/platform/plans, /platform/billing |
| Pro | Need >4 GB RAM, >1 h sessions, >25 concurrent | **$100 minimum total deposit per calendar month** into the wallet, consumed by usage at the same rates, unused balance carries over; grace period, then downgrade if missed | 500 concurrent; 72 h session; 16 vCPU / 16 GB / 50 GB; 10 creates/s; deposits $10–$5,000 | https://docs.declaw.ai/platform/plans |
| Enterprise | Custom limits, on-prem / customer-cloud | Negotiated recharge commitment; Declaw-operated install | Custom; 7-day max session | /platform/plans, /features/snapshots |
| Running | Sandbox running | Provisioned vCPU + memory + overlay disk; 30 s metering ticks at second resolution, each tick capped at 90 s billable | vCPU 14.0 µ$/s = $0.0504/h; mem 4.5 µ$/GB-s = $0.0162/h; disk 0.0424 µ$/GB-s = $0.00015264/GB-h ($0.110/GB-mo) | https://docs.declaw.ai/platform/billing |
| Paused (memory + filesystem) | `pause()` or `on_timeout='pause'` | "Paused sandbox time" explicitly not billed: compute metering stops, and disk is part of the same meter | $0 | /platform/billing, /features/sandboxes |
| Timeout default | No lifecycle config | `on_timeout` defaults to **kill** (state destroyed) | $0 after | /features/sandboxes |
| Named snapshots / volumes | `create_snapshot`, Volumes (64 GiB cap per file-granular volume) | Storage price not published; "snapshot storage" is listed as a tier-limited dimension | null | /features/snapshots, /features/volumes, /platform/errors |
| Guardrails ML scans | Security proxy dispatches ML scans | Per scan from the wallet (after the $200 guardrails credit); regex scans free | PII $0.0006, injection $0.0006, toxicity $0.0004, code security $0.0003, language $0.0002, invisible text $0.0001 | /platform/billing |
| Not billed | — | list/get/kill, health checks, template/snapshot metadata, failed 400/401/403/429 requests, paused time | $0 | /platform/billing |
| Startup program | Early-stage AI startups (application) | Credits for compute + guardrails over the first 6 months | $10,000 | https://declaw.ai/startups |
| Egress / ingress | All traffic | Not published; per-sandbox egress connection cap 50 (Free) / 200 (Pro) | null | /platform/plans |
No dated price changes found.
## Gotchas
1. **Free tier is capped at 4 GB RAM and 1 h sessions.** Anything like 4 vCPU / 8 GB needs Pro.
2. **Pro's $100 is a minimum deposit, not a fee.** It is usage credit that rolls over. Miss it and you get a grace period, then a downgrade to Free, and Free rejects >4 GB sandboxes.
3. **Hard wallet stop.** When credits plus balance reach 0, creates, commands and filesystem calls return 402. There is no auto-refill, so production can stall.
4. **Idle = full price.** Billing is on provisioned vCPU/RAM/disk and ignores utilisation. Only pause or kill stops the meter.
5. **The default timeout kills.** Set `on_timeout='pause'` to keep state. Paused sandboxes are kept indefinitely and are free per the docs.
6. **The 30 s tick with a 90 s cap** is protective, not punitive. The docs name no per-start minimum.
7. **The docs say "GB"**, not GiB. The rates match E2B's per-GiB rates.
8. **The 72 h session cap on Pro** resets on pause/resume.
9. **Guardrails scans are a second meter** that can dominate on chatty agents: 1M PII scans = $600.
10. **Snapshot, volume and egress prices are unpublished.**
## Worked example
Workload: 4 vCPU / 8 GB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots,
100 GiB egress, 10 GB overlay disk each, paused between shifts.
- Compute: 8,800 × $0.3312 = **$2,914.56** (vCPU $1,774.08 + RAM $1,140.48). 30% CPU changes nothing.
- Disk: 8,800 h × 10 GB × $0.00015264 = **$13.43**.
- Snapshots: paused state $0. Named-snapshot storage price unpublished, so null.
- Egress: unpublished (null).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Free | No: 8 GB > 4 GB cap, 8 h > 1 h cap, 50 > 25 concurrent | n/a |
| Pro | Yes (50 ≤ 500, 8 h ≤ 72 h, 8 GB ≤ 16 GB) | **$2,927.99** (the $100 commitment is absorbed by usage); first month $2,827.99 after the $100 credit |
| Enterprise | Yes | unknown (negotiated) |
| Startup credits | If accepted | $10k covers ~3.4 months of this load (credits expire after 6 months) |
| Anti-pattern: left running idle 24 h/day | Only if re-created every 72 h | 26,400 h × $0.3327264 = **$8,783.98** |