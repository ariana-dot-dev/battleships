# RentaMac: pricing regimes (as of 2026-09-28)
RentaMac (WLF Digital Solutions) rents a whole dedicated **Mac mini M4 (10-core, 16 GB, 256 GB)** with full admin, DeskIn remote desktop, SSH and 1 Gbps, in Cyprus (EU), Texas (US) or India. Billing is daily, weekly, monthly, or 3/6-month prepaid. The same prices are shown for all three locations.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Daily | Billing cycle "Daily" | Per 24 h | **$19/day** ($0.79/h) | https://rentamac.io/pricing |
| 2 | Weekly | "Weekly" | Per 7 days | **$59/week** ("$8.43/day") | same |
| 3 | Monthly | "Monthly" (popular) | Monthly, cancel anytime | **$119/month** ("$3.97/day") | same |
| 4 | 3 months | Prepay | Every 3 months | **$339** ("$3.77/day, Save 5%") = $113/mo | same |
| 5 | 6 months | Prepay | Every 6 months | **$639** ("$3.55/day, Save 10%") = $106.50/mo, includes SIP customization | same |
| 6 | Storage add-on | 512 GB / 768 GB (external disk) | Per billing period (not stated) | +$9.90 / +$14.90 | same |
| 7 | Enterprise volume | 15+ instances / 12 months | Quote | up to "10% OFF" | same |
## Gotchas
1. **The research file is stale.** It had $3.30/day, $49/week and $99/month from the vendor's comparison blog. The live page (after JavaScript) shows $19/day, $59/week and $119/month. The server-rendered HTML still says "$99 billed monthly".
2. **Daily is 4.8× monthly** per day. Only use it for ≤ 6 days/month.
3. There is no API. Access is remote desktop (DeskIn) and SSH, and provisioning is by checkout.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days, 50 GiB snapshots (no product), 100 GiB egress (not metered as far as published).
| Regime | Maths | Monthly |
|---|---|---|
| Daily rental per working day (engine: 1,100 × 24 h × $0.7917) | 50 × 22 × $19 | $20,900 |
| 50 × monthly (card always-on) | 50 × $119 | $5,950 |
| 50 × 6-month prepay | 50 × $106.50 | **$5,325** |
| 2 VMs per Mac: 25 × monthly (16 GB, tight) | 25 × $119 | $2,975 |
Sources: https://rentamac.io/pricing · https://rentamac.io/