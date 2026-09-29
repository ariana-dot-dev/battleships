# Green Mini host: pricing regimes (as of 2026-09-28)
Green Mini host (Amsterdam, founded 2009) rents whole dedicated Macs (Mac mini M2/M2 Pro/M4/M4 Pro/M5 Pro/M6, Mac Studio M3 Ultra/M4 Max/M5 Max) in two Dutch data centers. Every plan includes:
- full root access
- unlimited traffic (fair use)
- public IPv4 + IPv6
- remote reboot
Prices are EUR per month excl. VAT; USD at 1.17 USD/EUR.
## Regime table
| # | Regime | When it applies | How billed | Numbers (EUR/mo → USD) | Source |
|---|---|---|---|---|---|
| 1 | Dedicated Mac mini | Portal order | Monthly figure shown. Cycle unclear (see gotcha 1) | M2 8c/8 GB/256 GB €59 ($69.03) · M4 16/256 from €74 ($86.58) · M4 16/512 €87 · M4 16/1 TB €93 · M6 12c 16/256 €85 · M6 16/512 €96 · M6 24/512 €107 · M2 Pro 10c 16/512 €119 · M2 Pro 12c 16/512 €139 · 12c 16/1 TB €155.67 · M5 Pro 15c 24/512 €148 · M4 Pro 12c 24/1 TB €161.50 | https://portal.greenmini.host/checkout/order, https://www.greenmini.nl/products/ |
| 2 | Dedicated Mac Studio | Portal | Same | M4 Max 14c 36 GB/512 €230 · 16c 48/1 TB €273.33 · 16c 64/2 TB €313.33 · M5 Max 18c 36/512 €295 · M3 Ultra 28c 96/1 TB €360 | portal |
| 3 | Yearly billing | Compare page | Annual | "EUR 74/mo is the Apple M4 plan billed annually (EUR 84 monthly)"; "From EUR 69/mo billed yearly" | https://www.greenmini.nl/compare/macincloud-alternative/ |
| 4 | Colocation | Bring your own Mac | Monthly | Mac mini €34, Mac Studio €69 | portal |
| 5 | Dedicated firewall | Add-on | Monthly | €45 | portal |
| 6 | Volume | Contact | Quote | null | products |
## Gotchas
1. **Billing cycle is ambiguous.** The portal shows "/mo" without a cycle, while the compare page says €74 is the *annual* rate for M4 (€84 monthly). Monthly billing may add about €10.
2. Delivery ranges from "<24 hr" to "~7 business days" depending on the config.
3. There is no provisioning or agent API.
4. VAT is not charged outside the EU or with a valid VAT ID.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h × 22 days, 50 GiB snapshots (no product), 100 GiB egress (free).
| Regime | Maths | Monthly |
|---|---|---|
| Card/engine: 50 × M2 8 GB | 50 × $69.03 | **$3,451.50** |
| 2 VMs per Mac: 25 × M4 16 GB (tight) | 25 × $86.58 | $2,164.50 |
| 2 VMs per Mac: 25 × M6 24 GB | 25 × $125.19 | $3,129.75 |
| If monthly billing is ~€10 more on M4 (€84) | 25 × $98.28 | $2,457 |
Sources: https://portal.greenmini.host/checkout/order · https://www.greenmini.nl/products/ · https://www.greenmini.nl/compare/macincloud-alternative/