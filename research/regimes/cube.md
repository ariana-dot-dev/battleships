# Cube Computer — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Compute running | Selected CPU/RAM | Prepaid running-hour meter | Underlying calculator cost $0.0292/CPU-h + $0.00695/GB-h, then size-based subsidy | https://cube.computer/ |
| Disk | Running OR paused | Monthly retained disk | Underlying $0.15/GB-month before same subsidy | https://cube.computer/ |
| Nonlinear subsidy | Full-month configured cost C < $1,000 | Discount basis points floor(8000×(1000-C)/1000) | C=730×(CPU×.0292+RAM×.00695)+disk×.15; not driven by actual run hours | https://cube.computer/ |
| Configuration | Self-serve calculator | Size-dependent rates | CPU even 2–16; RAM even 2×CPU to 8×CPU; disk 10–500 GB in 10 GB increments | https://cube.computer/ |
| Prepaid usage | Account plan | Monthly fee / commitment | $0; concurrency unpublished/custom; No subscription amount advertised in current calculator; hardware selection and prepaid credit. Starter-credit eligibility/amount unpublished. | https://cube.computer/ |
## Gotchas
- Rates are derived from public calculator implementation and verified by changing its controls in real Chrome. They are displayed calculator quotes, not a separately documented binding tariff. Raw unsubsidized costs must not be advertised as actual small-size retail prices.
- Cube is a Linux cloud computer, not a cloud Mac: the macOS requirement refers to the client application. Fly.io hosts machines per privacy policy; dedicated CPU is vendor terminology.
- All estimator modes pin disk to 50 GB. Storage charges are size-dependent, so card storage rate stays null; modes only estimate compute. Disk changes alter the subsidy on both compute and disk.
- Public terms/privacy still mention subscriptions; current homepage says prepaid compute and disk. Starter credit amount, region, egress, free pause retention limits and billing increment are unverified. Privacy says machine contents retained until requested deletion, even when subscription lapses.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Calculator at 4 CPU / 8 GB / 50 GB disk: C=$133.352; subsidy=69.33%; compute=$0.052875/h; disk=$2.30025/machine-month. For 50 retained machines ×176 h: **$580.3125/month** = 8,800×.052875 +50×2.30025 (UI rounds each machine to $11.61). This includes 2,500 GB machine disk, not a separate 50 GiB snapshot allowance. Concurrency 50 is not verified, and egress/snapshot additions remain unknown. CPU utilization 30% does not affect this meter. Paused all month costs disk only.
## Sources
- https://cube.computer/
- https://cube.computer/terms/
- https://cube.computer/privacy/
- https://cube.computer/licenses/