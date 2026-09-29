# Flow Swiss Mac Bare Metal: pricing regimes (as of 2026-09-28)
Flow Swiss rents whole Mac minis and Mac Studios in Switzerland. Prices are in **CHF, excluding VAT**.
**Conversion:** 1 CHF = **1.2085 USD** (1 USD = 0.8275 CHF on 2026-09-26, Wise).
- The sweep assumed 1.25 USD/CHF.
- Flow's own documentation says "1 CHF is usually equal to 1 USD", which is out of date.
## Regime table
| # | Regime | When it applies | How billed | Numbers (CHF per hour / per month; USD per hour) | Source |
|---|---|---|---|---|---|
| 1 | Hourly, 24 h minimum | Default | Per hour. **24-hour minimum allocation**. Billing **continues while the Mac is switched off** | M1 8c/16 GB/512 GB 0.27 / 199 (**$0.3263/h**); M2 8c/24/512 0.34 / 249 ($0.4109); M2 Pro 12c/32/4 TB 0.62 / 449 ($0.7493); M4 Pro 12c/48/2 TB 0.75 / 549 ($0.9064); M4 Pro 14c/48/2 TB 0.82 / 599 ($0.9910); M5 Pro 18c/64/2 TB 1.02 / 749 ($1.2327); Mac Studio M4 Max 16c/128/2 TB 1.34 / 979 ($1.6194); Intel i7 6c/16/256 0.27 / 199; 6c/32/512 0.55 / 399; 6c/64/1 TB 0.68 / 499 | https://doc.flow.swiss/platform/pricing/mac-bare-metal |
| 2 | Monthly figure | Shown next to the hourly price | About 737 h × hourly, so **not a discount** versus running 730 h | e.g. M1 CHF 199 ($240.49) | same |
| 3 | 2 macOS VMs per Mac (DIY) | Tart/Lume on the host | Host price / 2 per VM (Apple SLA cap of 2) | M1 half: $0.1631/h | https://www.apple.com/legal/sla/docs/macOS27.pdf |
| 4 | Network | Included | Free elastic public IPv4 per Mac. 20 TB/month outbound per organisation | $0 (overage price not published) | doc.flow.swiss |
## Gotchas
1. The 24 h minimum plus "billed while off" means **any use costs at least 24 h**, and a Mac you keep costs 730 h/month.
2. Currency: prices exclude VAT, and USD figures move with CHF (the sweep's 1.25 overstated them by about 3%).
3. The M4/M5 Pro and M4 Max machines are new on the price list; the provider file said "no M4 models listed", which is now corrected.
4. Switzerland only. No agent API.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress.
Assumption: M1 8c/16 GB is the smallest fit.
| Regime | Mac-hours | **Monthly** |
|---|---|---|
| 50 Macs kept all month | 50 × 730 × $0.326295 | **$11,909.77** |
| 50 Macs, 24 h per workday (released nightly after 24 h) | 50 × 528 × $0.326295 | **$8,614.19** |
| 2 VMs per Mac, 25 Macs all month | 25 × 730 × $0.326295 | **$5,954.88** |
Snapshots (local disk), egress (within 20 TB) and IPv4 are all $0.
Sources: https://doc.flow.swiss/platform/pricing/mac-bare-metal · https://flow.swiss/mac-bare-metal · https://wise.com/us/currency-converter/usd-to-chf-rate/history · https://www.apple.com/legal/sla/docs/macOS27.pdf