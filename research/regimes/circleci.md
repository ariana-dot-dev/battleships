# CircleCI (macOS / Windows executors): pricing regimes (as of 2026-09-28)
CircleCI bills **credits per minute** per resource class. The pricing page states the credit price for Performance-plan top-ups: **"$15 for every 25,000 credits" = $0.0006/credit**. That confirms the sweep's conversion.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Free plan | Default | Up to 6,000 build minutes/month on small Docker, 5 active users, 30x concurrency. **No macOS**; Windows/Linux/Arm included | $0 | https://circleci.com/pricing/ |
| 2 | Performance plan | Paid self-serve | From $15/month with 30,000 credits included. 5 active users, then $15/seat. 80x concurrency. Extra credits $15 per 25,000 (roll over) | $15/month + usage | same |
| 3 | macOS M4 Pro | Performance+ | Credits per minute | m4pro.medium 6 CPU/28 GB **200 cr/min = $0.12/min**; m4pro.large 12/56 400 cr = $0.24/min | https://circleci.com/pricing/price-list/ |
| 4 | Windows | All plans | Credits per minute | medium 4/16 **40 cr = $0.024/min**; large 8/32 120 cr = $0.072; xlarge 16/64 210 cr = $0.126; 2xlarge 32/128 500 cr = $0.30 | same |
| 5 | Linux (reference) | All | Credits per minute | medium 2 CPU/7.5 GB 10 cr = $0.006/min | same |
| 6 | Network / storage overage | Beyond plan thresholds | 420 credits/GB | $0.252/GB (thresholds not captured) | https://circleci.com/pricing/ |
| 7 | Scale plan | Annual, sales | Custom credit price, unlimited concurrency, GPU | custom | same |
## Gotchas
1. macOS needs a paid plan. Windows costs 4x Linux medium per minute. macOS costs 20x.
2. USD values assume the list credit price. Annual/Scale contracts are negotiated.
3. Jobs only; not a general sandbox.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress. Illustrative.
| Regime | Compute | Plan | Included credits | **Monthly** |
|---|---|---|---|---|
| macOS m4pro.medium ($7.20/h) | $63,360.00 | $15 | -$18 | **$63,357.00** |
| Windows medium 4/16 ($1.44/h) | $12,672.00 | $15 | -$18 | **$12,669.00** |
Network/storage overage at $0.252/GB could add up to about $25 for 100 GB if all of it counts as over-threshold (thresholds unknown). Seats beyond 5 cost $15 each.
Sources: https://circleci.com/pricing/ · https://circleci.com/pricing/price-list/