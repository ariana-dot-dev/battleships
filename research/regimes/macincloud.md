# MacinCloud: pricing regimes (as of 2026-09-28)
MacinCloud (Moboware) has three plan families across 8 data centers (LA, NY, Dallas, Sydney, London, Frankfurt, Singapore, Mumbai):
- **Dedicated Server:** a dedicated macOS *instance* with full admin, 4 cores by default. It runs "on a physical Mac server"; third parties describe it as a VM.
- **Managed Server:** a non-admin user account on a shared physical Mac.
- **Pay-as-You-Go:** the same shared managed account, but prepaid by the hour or by the day.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Dedicated Server | Full admin/root needed | Monthly subscription (weekly/quarterly/yearly cycles at checkout). No trial | Intel 4-core/8 GB/120 GB **$59** · M1/8 GB/250 GB **$89** · M2/8 GB/250 GB + RDP $114 · M4/16 GB/250 GB + RDP **$164** per month. CPU 4-core (upgradable to 8), RAM 8 GB (to 32) | https://www.macincloud.com/pages/dedicated.html |
| 2 | Dedicated "starting at" | Checkout plan picker | – | "Dedicated Server starting at US$49/month" (config/cycle not shown) | https://checkout.macincloud.com/select/payg?payg_period=h |
| 3 | PAYG by the hour | Occasional use, no admin | Prepaid credit ("starting from prepaid 25-Hour"; the same page also says "prepay 30 hours"). Daily login time summed and **rounded up to the next hour**. Auto-refill. Non-refundable. Expires after 60 days unused | **$1/hour** | https://www.macincloud.com/pages/payg.html, support article 8000044698 |
| 4 | PAYG by the day | Same | "Each usage has a minimum period of 24 consecutive hours" from first login. 7-day prepaid block | **$4/day** | same |
| 5 | Managed Server | Shared account, monthly | Monthly (weekly/quarterly/yearly options). Hour-daily-limit variants bill **$1 per extra hour**. 24 h trial | M1 from **$25**, M2 from $26, M4 from $29 per month (16 GB listed) | https://www.macincloud.com/pages/managed.html, support article 8000007778 |
| 6 | Add-ons | RAM/storage/network, 4K, eGPU | At checkout | not captured | – |
| 7 | Network | All plans | 100/1000 Mbps port, static IP | egress price not published | checkout |
## Gotchas
1. **"Dedicated" is an instance, not a whole Mac**: 4 cores by default on a physical Mac server.
2. **Managed and PAYG plans are non-admin shared accounts** with no provisioning API. You must log off to stop the meter, because login time is billed. They are unsuitable for agents (flagged `alt` in the card).
3. **Price drift:** the research file had Dedicated M4 at $124.99 (from third-party comparisons). The live Dedicated page says $164.
4. "Starting at" managed prices are for hour-limited plans. Going over the limit bills $1/h.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h × 22 days (8,800 h, 1,100 sessions), 50 GiB snapshots (no snapshot product), 100 GiB egress (unpriced).
| Regime | Maths | Monthly |
|---|---|---|
| Card/engine: 50 × Dedicated Intel 4c/8 GB | 50 × $59 | **$2,950** |
| 50 × Dedicated M1 4c/8 GB | 50 × $89 | $4,450 |
| 50 × Dedicated M4 16 GB | 50 × $164 | $8,200 |
| PAYG hourly (50 shared accounts, no admin) | 8,800 × $1 | $8,800 |
| PAYG daily | 1,100 × $4 | $4,400 |
| Managed M1 (hour-limited, overage $1/h) | ≥ 50 × $25 | ≥ $1,250 + overage |
Sources: https://www.macincloud.com/pages/dedicated.html · https://www.macincloud.com/pages/managed.html · https://www.macincloud.com/pages/payg.html · https://checkout.macincloud.com/select/payg?payg_period=h · https://support.macincloud.com/support/solutions/articles/8000007778-how-is-server-usage-tracked-and-calculated- · https://support.macincloud.com/support/solutions/articles/8000044698-what-is-macincloud-s-pay-as-you-go-server-plan-