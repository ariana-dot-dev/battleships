# Bitrise: pricing regimes (as of 2026-09-28)
Bitrise is a mobile CI/CD platform with macOS (Apple silicon) and Linux build machines and no Windows. It charges a **plan fee sized by builds/month** and publishes a per-minute **"Zero Margin Infra"** machine cost that it says is passed through "without any profit-generating margin".
The sweep flagged $0.0072-0.0096/min as about 10x too low. They are low because the plan fee carries the margin.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Hobby | Free | 300 credits/month (credit value unpublished), 1 private app, 5 concurrent, 90-min timeout | $0 | https://bitrise.io/pricing |
| 2 | Starter | Small teams (≤100 builds/month recommended) | Flat monthly fee, **"Unlimited usage, with up to 4 concurrent builds"**, Medium machines only, 3 private apps, 210-min timeout | $99/month ($89 billed annually) | same |
| 3 | Pro | 250-2,000 builds/month tiers | Plan fee per build tier with 3,000-24,000 "Zero Margin Infra minutes/month". Up to 10 concurrent macOS / 30 Linux | From $218/month ($200 annual) | same |
| 4 | Pro PAYG overage | Above the tier's builds/minutes | "Premium PAYG rate". Extra builds up to +50% of the limit; minutes unlimited | **Rate not published** | same (FAQ) |
| 5 | Extra Build Capacity | Annual Pro | Pre-buy up to 4 months of extra builds/minutes; expires at cycle end | Price not published | same |
| 6 | Per-minute machine cost, macOS | Any plan that allows the machine | Per minute | Medium M4 5 CPU/6 GB (or M2 Pro 4/6) **$0.0072**; Large M4 5/14 **$0.0096**; 4Large M4 Pro 7/27 $0.0144; X Large M4 10/28 $0.0192; 4X Large M4 Pro 14/54 $0.0293 | same ("How much does a minute on different machines cost?") |
| 7 | Per-minute machine cost, Linux | same | Per minute | 2S 2/8 $0.0022; M 4/16 $0.0044; 2M 6/24 $0.0066; L 8/32 $0.0089; 4L 14/56 $0.0154; XL 16/56 $0.0177; 3XL 24/96 $0.0264; 5XL 32/128 $0.0352; 7XL 48/192 $0.0528 | same |
| 8 | Enterprise | 2,000+ builds/month | Custom. Dedicated or self-hosted AWS runners, X Large / M4 Pro machines, up to 4 h builds | Contact sales | same |
| 9 | Remote Dev Environments / Build Hub | Separate products | Monthly base + per-minute up to caps (e.g. macOS overage $0.0288/min Basic, $0.0576/min Pro) | Not encoded | same |
## Gotchas
1. The per-minute figures are a **floor**. The real bill is dominated by the plan fee and by PAYG premium rates, which are not published.
2. Starter's "unlimited usage" is capped by 4 concurrent Medium machines (6 GB RAM each).
3. Builds are workflow runs with a 90-240 min timeout. This is not a general sandbox. No Windows.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h = 528,000 min), 30% CPU, 50 GiB snapshots, 100 GiB egress. Illustrative only: CI jobs, not sessions.
- **Machine cost** (macOS Large, M4 5/14): 8,800 × $0.576 = **$5,068.80/month**.
- 50 concurrent exceeds Pro's 10, and 528,000 min exceeds Pro's 24,000 min/month, so this needs **Enterprise (price unpublished)**.
- **Starter** caps at 4 concurrent Medium builds for $99 flat. It cannot run 50.
- Snapshots and egress are not applicable or not priced.