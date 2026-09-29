# Sprites (Fly.io): pricing regimes (as of 2026-09-28)
Sprites are persistent Firecracker microVMs for agents. Each Sprite always has **8 vCPUs** and a **100 GB** filesystem ceiling; memory is platform-managed (8 GB in practice, 16 GB advertised "not available yet"). Billing is **usage-based on what the VM actually consumes while awake**:
- CPU on cumulative CPU time (`cpu.stat`), $0.07/CPU-hour,
- memory on actual usage, $0.04375/GB-hour,
- storage on bytes written: **hot** $0.000683/GB-h while awake, **cold** $0.000027/GB-h for as long as data is kept.
The pricing section says "No plans and no tiers, and nothing charged per Sprite", but the FAQ on the same page and Fly's 2026-09-09 comparison article still describe **optional plans** (Hero $100/mo etc.). The Hero plan still exists (optional). What changes the bill is the lifecycle state, the RAM actually resident, and whether an optional plan bundle is bought.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Pay-as-you-go, running (active) | Command running, session producing output, open TCP connection to URL, service handling traffic, Tasks API hold | CPU on **actual CPU time** (30% of 4 vCPU for 1 h = 1.2 CPU-h); RAM on **actual resident memory**; hot storage on bytes written | $0.07/CPU-h; $0.04375/GB-h; hot $0.000683/GB-h (~$0.50/GB-mo at 730 h) | https://fly.io/pricing, https://fly.io/sprites |
| 2 | Warm (suspended) | ~30 s after last activity; VM suspended with memory frozen, resumes in 100-500 ms | **Not billed** for CPU/RAM/hot storage (FAQ: "warm (not billed)"). Cold storage continues | cold $0.000027/GB-h | https://fly.io/sprites, https://docs.fly.io/sprites/concepts/lifecycle/ |
| 3 | Cold (stopped) | Later, memory dropped; 1-2 s wake, processes restart | Cold storage only | $0.000027/GB-h (~$0.02/GB-mo) | same |
| 4 | Cold storage while awake | All written data, all the time | Pricing example bills cold on the full dataset **and** hot on the awake working set during a session (e.g. "Hot 5 GB × 4 h" + "Cold 10 GB × 4 h") | $0.000027/GB-h always + $0.000683/GB-h while awake | https://fly.io/sprites (examples) |
| 5 | Checkpoints | Automatic (after continuous work, on idle, on shutdown) + manual; copy-on-write, tiered history | No separate price. Presumably counted as stored bytes (cold) | not published separately | https://docs.fly.io/sprites/concepts/checkpoints |
| 6 | Optional plans (Adventurer → Mythic) | Org subscribes (seat-based plans, upgrade immediate, downgrade next period) | **Fee is not credit**: it buys an allowance of CPU-h, RAM GB-h and storage GB-month, plus higher concurrency/creation-rate limits and support. Overage at standard rates. Fly account credits cannot pay the plan fee | Adventurer $20 (450 CPU-h, 1,800 GB-h, 50 GB, 20 running/20 warm); Veteran $50 (800 / 3,200 / 100, 50/50); **Hero $100 (1,200 / 4,800 / 150, 100/100)**; Champion $200 (1,800 / 7,200 / 225, 200); Legend $500 (3,200 / 12,500 / 400, 500); Epic $1,000 (4,800 / 18,750 / 600, 1,000); Mythic $2,000 (7,200 / 28,000 / 900, 2,000); Guild custom | https://community.fly.io/t/more-sprites-plans/26857 (2026-01-16), https://fly.io/sprites FAQ, https://fly.io/learn/ai-sandbox-pricing/ |
| 7 | Concurrency / rate limits | Per org | Hitting a limit returns an error, never an extra charge. Cold Sprites unlimited | PAYG creates 10/min; Adventurer 60/min … Mythic 240/min; running/warm caps = plan table (PAYG cap not published) | https://fly.io/sprites FAQ |
| 8 | Trial credit | New user/org | One $30 grant per user, max one per org (a second org you create gets none) | $30 one-time | https://fly.io/sprites FAQ |
| 9 | Egress / bandwidth | Any | **Not metered** today | $0 | https://fly.io/sprites FAQ |
| 10 | Support | Plans | Hero/Champion/Legend Standard email; Epic/Mythic Premium; PAYG/Adventurer/Veteran community | bundled in plan | https://fly.io/sprites FAQ |
| 11 | Enterprise / huge fleets | "Need a truly wild number of Sprites?" | Talk to sales (Guild plan) | unpublished | https://fly.io/sprites |
| 12 | Historical: Dec 2025 rates | 2025-12-30 release note | CPU $0.07/vCPU-h, RAM **$0.011/GB-h**, storage $0.10/GB-mo. RAM was later raised ~4x to $0.04375 (date not found) and storage split into hot/cold (2026-01-22) | superseded | https://fly.io/sprites/release-notes |
| 13 | Historical: Jan 2026 plan set | 2026-01-22 release note | Recruit (free), Adventurer $20, Legend $200, Mythic $2,000. Conflicts with the 2026-01-16 community table (Legend $500) — the 7-tier table matches the current FAQ names | superseded / conflicting | https://fly.io/sprites/release-notes |
## Gotchas
1. **Memory is the big line item** (FAQ says so). $0.04375/GB-h is ~6x Fly Machines' extra-RAM rate; 8 GB resident for 1 h costs $0.35, more than 4 fully busy CPUs ($0.28). Keeping per-Sprite memory low saves more than any plan.
2. **CPU is truly usage-based**: idle-but-awake Sprites pay near-zero CPU, but RAM still bills while awake. Anything that keeps a Sprite awake (open TCP connection to its URL, a chatty session, stdout output, Tasks API hold) keeps RAM billing.
3. **Plan fee is not a credit.** It buys unit allowances (CPU-h / RAM GB-h / storage). A bigger plan is not automatically cheaper; the FAQ cites a customer near Mythic's 28,000 GB-h for whom $2,000 cost more than the overage it saved. Account credits cannot pay the plan fee.
4. **The pricing page contradicts itself** ("no plans and no tiers" vs a FAQ full of plans). Plans are optional; Hero is still quoted in Sep 2026.
5. Fixed shape: 8 vCPU, ~8 GB RAM cap in practice, 100 GB disk, no custom image, **no region choice**, no public IPv4, no native SSH. Open TCP connections drop on every warm/cold transition.
6. Storage is on bytes written (TRIM-aware), but cold storage bills on everything you keep, forever, until deleted — including while the Sprite is awake.
7. Billing granularity is described as "metered per hour of active use" / "billed hourly, based on actual usage"; the exact rounding is not published.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 awake Sprite-hours**, 30% CPU util, 50 GiB snapshots retained, 100 GiB egress. (Sprite has 8 vCPU; only actual CPU time bills.)
Usage: CPU = 8,800 × 4 × 0.30 = **10,560 CPU-h** ($739.20). RAM assumed fully resident at 8 GB (upper bound) = **70,400 GB-h** ($3,080.00); a 50% (4 GB) resident case is also shown. Storage assumptions: 10 GB written per Sprite, hot while awake 10 × 8,800 × $0.000683 = $60.10; cold on 500 GB all month = $9.86; 50 GiB checkpoints in cold = $0.99 → **storage $70.95** (plan storage allowances not applied, since how they offset hot vs cold is unpublished). Egress $0. Sprites sleep outside hours (warm/cold: not billed).
| Regime | Fee | CPU overage | RAM overage | Storage | **Total (8 GB resident)** | Total (4 GB resident) |
|---|---|---|---|---|---|---|
| Pay-as-you-go | $0 | $739.20 | $3,080.00 | $70.95 | **$3,890.15** | $2,350.15 |
| Adventurer $20 (20 running cap) | invalid: 50 concurrent > 20 | | | | n/a | n/a |
| Veteran $50 (50 running) | $50 | $683.20 | $2,940.00 | $70.95 | **$3,744.15** | $2,204.15 |
| Hero $100 | $100 | $655.20 | $2,870.00 | $70.95 | **$3,696.15** | $2,156.15 |
| Champion $200 | $200 | $613.20 | $2,765.00 | $70.95 | **$3,649.15** | $2,109.15 |
| **Legend $500** (cheapest) | $500 | $515.20 | $2,533.13 | $70.95 | **$3,619.27** | **$2,079.27** |
| Epic $1,000 | $1,000 | $403.20 | $2,259.69 | $70.95 | **$3,733.84** | $2,193.84 |
| Mythic $2,000 | $2,000 | $235.20 | $1,855.00 | $70.95 | **$4,161.15** | $2,621.15 |
| (Historical Dec-2025 RAM rate $0.011, PAYG) | $0 | $739.20 | $774.40 | — | ~$1,514 + storage | — |
Notes: the idle tail is ~30 s before warm (negligible). The $30 trial credit reduces month 1 only. PAYG running-concurrency cap is unpublished (Hero caps at 100 running), so PAYG with 50 concurrent is assumed allowed.
Sources: https://fly.io/pricing · https://fly.io/sprites · https://docs.fly.io/sprites/concepts/lifecycle/ · https://docs.fly.io/sprites/concepts/checkpoints · https://fly.io/sprites/release-notes · https://community.fly.io/t/more-sprites-plans/26857 · https://community.fly.io/t/more-ram-in-sprites/26921 · https://fly.io/learn/ai-sandbox-pricing/