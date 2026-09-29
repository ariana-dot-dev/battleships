# Scaleway Apple silicon: pricing regimes (as of 2026-09-28)
Scaleway rents whole physical Mac minis (M1, M2, M2 Pro, M4, M4 Pro) in Paris (PAR-1). You pay hourly with a **24-hour minimum** for macOS ("due to licensing restrictions"), or take a **monthly commitment** at a lower price. You pay "as long as it is assigned to your account" (idle or not) until you delete it. Prices are EUR excl. VAT; USD at 1.17 USD/EUR.
## Regime table
| # | Regime | When it applies | How billed | Numbers (EUR → USD) | Source |
|---|---|---|---|---|---|
| 1 | Hourly, no commitment | Default | Per hour, **minimum 24 h** for macOS. No monthly cap | M1-M 8c/8 GB/256 GB €0.11/h ($0.129) · M2-M 8c/16/256 €0.17 ($0.199) · M2-L M2 Pro 10c/16/512 €0.21 ($0.246) · M4-S 10c/16/256 €0.22 ($0.257) · M4-SP 10c/16/512 €0.24 ($0.281) · M4-M 10c/32/1 TB €0.29 ($0.339) · M4-XL M4 Pro 14c/64/2 TB €0.49 ($0.573) | https://www.scaleway.com/en/pricing/apple-silicon/, https://www.scaleway.com/en/docs/apple-silicon/faq/ |
| 2 | Monthly commitment | Chosen at creation or later | 1-month initial term, **auto-renews monthly**. Deletion takes effect on the anniversary date. Cannot switch back to hourly | M1-M €75 ($87.75) · M2-M €115 ($134.55) · M2-L €139 ($162.63) · M4-S €149 ($174.33) · M4-SP €165 ($193.05) · M4-M €199 ($232.83) · M4-XL €335 ($391.95) | https://www.scaleway.com/en/docs/apple-silicon/how-to/manage-commitment-plan/ |
| 3 | Asahi Linux variant | M2-L-ASAHI | Hourly with **no** minimum | €0.21/h, €139/mo | pricing, FAQ |
| 4 | Private Network option | VPC for Apple silicon | Monthly or hourly | €9.99/mo (1 Gbps) or €19.99/mo (10 Gbps) | pricing |
| 5 | Egress / IPv4 | – | Not stated on the Apple silicon pricing page | null | – |
## Gotchas
1. **24 h floor per Mac.** A Mac created for a 1-hour job costs 24 h (M1: €2.64). You can enable auto-delete after 24 h.
2. **Commitment is sticky.** It renews monthly, deletion only takes effect at the anniversary, and you cannot go back to hourly.
3. **Hourly × 730 is always above the monthly commitment** (M1: €80.30 vs €75). Keep Macs that run all month on commitment.
4. **One whole Mac per server.** Packing two 4 vCPU / 8 GiB macOS VMs on one Mac (UTM/Tart) is allowed by the Apple SLA (2 VMs), but is DIY.
5. SIP cannot be disabled and there is no Recovery access. FileVault is impractical.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (1,100 sessions), 50 GiB snapshots, 100 GiB egress (unpriced).
| Regime | Maths | Monthly |
|---|---|---|
| Card/engine: 1 M1-M per session, hourly, 24 h floor | 1,100 × 24 × $0.1287 | **$3,397.68** |
| 50 × M1-M monthly commitment (always-on) | 50 × $87.75 | $4,387.50 |
| 2 VMs/Mac: 25 × M2-M (16 GB) hourly, 24 h per working day | 25 × 22 × 24 × $0.1989 | $2,625.48 (RAM too tight for two 8 GiB VMs) |
| 2 VMs/Mac: 25 × M4-M (32 GB) monthly commitment | 25 × $232.83 | $5,820.75 |
Snapshots have no native price (back up to Object Storage). CPU utilisation does not matter.
Sources: https://www.scaleway.com/en/pricing/apple-silicon/ · https://www.scaleway.com/en/docs/apple-silicon/faq/ · https://www.scaleway.com/en/docs/apple-silicon/how-to/manage-commitment-plan/