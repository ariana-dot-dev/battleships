# Verify: sprites (2026-09-28)
https://community.fly.io/t/more-sprites-plans/26857 (2026-01-16 plan table, replies to 2026-02-09).
| Item | Result |
|---|---|
| CPU $0.07/CPU-hour on cumulative cpu.stat time | confirmed |
| Memory $0.04375/GB-hour on actual usage | confirmed |
| Hot storage $0.000683/GB-h (~$0.50/GB-month), cold $0.000027/GB-h (~$0.02/GB-month) | confirmed |
| "All resources are billed hourly, based on actual usage"; FAQ "metered per hour of active use" | confirmed; rounding unpublished (unverifiable) |
| States running (billed) / warm (not billed) / cold (not billed); storage only when idle | confirmed |
| Idle-timer resets (HTTP request, stdout output, open TCP connection, task max 1 h) | confirmed |
| Page examples (Claude Code session $0.44; web app $1.89/month) | confirmed present; arithmetic consistent with rates |
| 100 GB volume, billed on storage actually used | confirmed |
| Checkpoints copy-on-write, automatic, tiered history; no separate price | confirmed (no price published -> snapshot_gib_month 0.02 remains an assumption) |
| fly.io/pricing Sprites section "No plans and no tiers, and nothing charged per Sprite" vs FAQ describing plans | confirmed contradiction |
| Plan table Adventurer $20 (450 CPU-h / 1,800 GB-h / 50 GB, 20/20) ... Mythic $2,000 (7,200 / 28,000 / 900, 2,000/2,000), Guild custom | confirmed against the 2026-01-16 community post (no later price changes in replies) |
| Hero $100 = 1,200 CPU-h, 4,800 RAM GB-h, 150 GB, 100 running + 100 warm | confirmed on current FAQ |
| Plan fee not credit; overage at standard rates | confirmed (FAQ) |
| included_usd values (110.25 / 196 / 294 / 441 / 770.88 / 1,156.31 / 1,729) = CPU-h x 0.07 + GB-h x 0.04375 | confirmed arithmetic; note the engine treats them as fungible $ (upper bound), caveat already present |
| Creation rate 10/min PAYG, 60/min Adventurer ... 240/min Mythic | confirmed |
| Support: Hero/Champion/Legend Standard, Epic/Mythic Premium, below Hero community | confirmed |
| $30 trial credit, one per user / one per org | confirmed |
| Egress not metered | confirmed |
| Fly account credits don't pay the plan fee | confirmed |
| 8 vCPU per Sprite, ~8 GB RAM cap in practice | unverifiable this pass (not on the pages re-fetched; community thread not re-read) |
| PAYG running-concurrency cap | unverifiable (not published) |
| Non-spec keys (`disk_gib_h_running`, plan `included_cpu_h` etc.) | left as informational; engine ignores them and the card's caveats describe them |
No corrections needed.