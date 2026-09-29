# Tart + Orchard (Cirrus Labs): pricing regimes (as of 2026-09-28)
Tart is a macOS/Linux VM manager built on Apple's Virtualization.framework, and Orchard is its orchestrator. Both are **software you run on your own Macs** under a Fair Source licence. It is free up to a threshold, then licensed per year by host CPU cores. All performance and efficiency cores count. There is no hosted compute: add the Mac rental (Scaleway, MacStadium, AWS EC2 Mac, ...) yourself.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Free Tier | ≤ 100 host CPU cores (Tart) and ≤ 4 Orchard workers per organization. Personal workstations always royalty-free | – | $0 | https://tart.run/licensing/ |
| 2 | Gold | Above Free Tier, up to 500 cores / 20 workers | Yearly licence (email licensing@cirruslabs.org) | **$12,000/year** | same |
| 3 | Platinum | Up to 3,000 cores / 200 workers | Yearly | **$36,000/year** | same |
| 4 | Diamond | Above Platinum, unlimited workers | Per core per year | **$12 per CPU core per year** | same |
| 5 | Priority support | All paid tiers | Included | Sev-1 first response 30 min, 24×7 | same |
## Gotchas
1. **The licence counts every host core, not VM vCPUs.** 13 Mac minis × 8 cores already exceeds the free tier.
2. **Apple limits apply to your Macs:** 2 macOS VMs per Mac and a 24 h minimum lease if you rent them.
3. **Company status:** OakHost's blog (third party) says Cirrus Labs is shutting down after joining OpenAI. The licensing page is unchanged, so the future of the paid tiers is unverified.
4. The card has a single `alt` mode with $0 compute.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent, 8 h × 22 days.
| Setup | Licence | Macs | Monthly |
|---|---|---|---|
| 25 × Scaleway M2-M (8c/16 GB), 2 VMs each, monthly commitment | 200 cores → Gold $1,000/mo | 25 × $134.55 = $3,363.75 | **$4,363.75** |
| 50 × Scaleway M1-M (8c/8 GB), 1 VM each | 400 cores → Gold $1,000/mo | 50 × $87.75 = $4,387.50 | $5,387.50 |
| ≤ 12 Mac minis (≤ 100 cores) | Free | – | licence $0 |
Sources: https://tart.run/licensing/ · https://tart.run/ · https://www.oakhost.com/blog/migrating-from-cirrus-runner