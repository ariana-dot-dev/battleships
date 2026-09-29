# MacStadium: pricing regimes (as of 2026-09-28)
MacStadium rents whole dedicated Macs (Mac mini M2/M4, Mac Studio M1 Max/M2 Ultra) on **monthly subscriptions** prepaid on the first day of the calendar month. Every Mac includes root access, a dedicated IPv4 and unlimited 1 Gbps bandwidth. Orka (macOS VM orchestration for CI, 2 VMs per Mac), bare-metal fleets and VDI are contact-sales.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Individual hosted Mac | Buy online (portal) | Monthly prepay. USD. No free trial | M2.S M2 8c/8 GB/256 GB **$109** · M4.S M4 10c/16/256 **$149** · M2.M 8c/16/1 TB $199 · M4.M 10c/24/512 $249 · M2.L M2 Pro 10c/16/1 TB $249 · M4.L M4 Pro 12c/48/1 TB $349 · M2.XL M2 Pro 12c/32/2 TB $349 · S1.M Studio M1 Max 10c/64/2 TB $249 · S2.M M2 Ultra 24c/64/2 TB $369 · S2.L M2 Ultra 24c/128/2 TB $449 | https://www.macstadium.com/pricing |
| 2 | Annual / multi-year / AWS Marketplace | Via sales engineers | Prepaid invoices | null | pricing FAQ |
| 3 | Orka for DevOps / Mac Cloud Compute / VDI | Enterprise | Contact sales | null (the ~$79/node figure in the research file is third-party, not used) | pricing |
| 4 | Bandwidth / IPv4 | All Macs | Included | Unlimited (1 Gbps), 1 dedicated IPv4 | pricing |
## Gotchas
1. **Monthly minimum:** a Mac used for one day still costs the month. That is fine for the Apple 24 h rule but poor for bursty agents.
2. **Net-15 invoicing only above $1,000.** Otherwise the card is charged up front.
3. **Snapshots and cloning come only with Orka (sales).** Bare hosted Macs have none.
4. The M4.S 16 GB is the cheapest way to host two 8 GB-class macOS VMs, but host overhead makes 2 × 8 GiB tight.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent, 8 h/day × 22 days, 50 GiB snapshots, 100 GiB egress (free).
| Regime | Maths | Monthly |
|---|---|---|
| Card/engine: 50 × M2.S (8c/8 GB) always-on | 50 × $109 | **$5,450** |
| 2 VMs per Mac (Orka/Tart): 25 × M4.S 16 GB | 25 × $149 | $3,725 (RAM tight) |
| 2 VMs per Mac: 25 × M4.M 24 GB | 25 × $249 | $6,225 |
| Egress | unlimited | $0 |
Hours and CPU do not change the bill.
Sources: https://www.macstadium.com/pricing · https://docs.macstadium.com/orka/orka-overview/orka-overview