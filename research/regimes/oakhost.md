# OakHost: pricing regimes (as of 2026-09-28)
OakHost (Estonia, data center in Germany) rents whole dedicated Mac minis **monthly**, cancellable any time. Every Mac includes:
- KVM remote management and an external firewall
- 1 IPv4 + /64 IPv6
- 10 TB traffic/month (verified on the M4.S page)
Prices are EUR excl. VAT (the site shows +20% VAT for the viewer region). USD at 1.17 USD/EUR. **Every configuration was "Out of Stock" on 2026-09-28**, and the M6 / M5 Pro models are "Coming Soon".
## Regime table
| # | Regime | When it applies | How billed | Numbers (EUR → USD) | Source |
|---|---|---|---|---|---|
| 1 | Monthly dedicated Mac mini | When in stock | Monthly renewal, cancel any time | M1.S 8 GB/256 GB €70 ($81.90) · M1.M 16/256 €80 ($93.60) · M1.L 16/1 TB €85 ($99.45) · M2.S 8/256 €85 ($99.45) · M2.M 16/512 €95 ($111.15) · M2.L 24/1 TB €115 ($134.55) · M4.S 16/512 €115 ($134.55) · M2PRO.S 16/512 €130 ($152.10) · M4.M 32/1 TB €135 ($157.95) · M2PRO.L 32/1 TB €180 ($210.60) · M4PRO.L 64/1 TB €245 ($286.65) | https://www.oakhost.com/mac-mini-hosting, https://www.oakhost.com/product/mac-mini-hosting-m4-16gb |
| 2 | "Try macOS for a week" | One-off, no auto-renewal | Pay once for 7 days | **€30** ($35.10) for an M2, 8+ GB, 256+ GB. "Currently Unavailable" | https://www.oakhost.com/try-macos |
| 3 | M6 / M5 Pro | Coming soon | – | TBA | mac-mini-hosting |
| 4 | Traffic | Per Mac | 10 TB/month included. Overage not published | – | M4.S product page |
## Gotchas
1. **Nothing is orderable today** (all out of stock).
2. **VAT:** listed prices exclude VAT (20% shown for EU consumers; B2B reverse charge likely).
3. The Customer API manages power and firewall only. There is no agent API.
4. Monthly minimum: part-time use still pays the full month.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h × 22 days, 50 GiB snapshots (no product), 100 GiB egress (within 10 TB).
| Regime | Maths | Monthly |
|---|---|---|
| Card/engine: 50 × M1.S (8 GB) | 50 × $81.90 | **$4,095** (if stock existed) |
| 2 VMs per Mac: 25 × M4.M 32 GB | 25 × $157.95 | $3,948.75 |
| Egress | inside 10 TB | $0 |
Sources: https://www.oakhost.com/mac-mini-hosting · https://www.oakhost.com/product/mac-mini-hosting-m4-16gb · https://www.oakhost.com/try-macos · https://www.oakhost.com/tos · https://docs.oakhost.com