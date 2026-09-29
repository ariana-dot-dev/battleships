# Ferr — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Hobby | Prototype | Monthly allowance | $0, up to 50 hours,3 concurrent | https://ferr.dev/ |
| Pro | Production | Monthly allowance | $99,1,000 hours,50 concurrent | https://ferr.dev/ |
| Scale / dedicated IP | Larger or custom fleet | Quote | Overage, dedicated IP and custom rates unpublished | https://ferr.dev/ |
| Hobby | Account plan | Monthly fee / commitment | $0; concurrency 3; Up to 50 browser hours/month; replay/logs. | https://ferr.dev/ |
| Pro | Account plan | Monthly fee / commitment | $99; concurrency 50; 1,000 included hours; stealth/profiles; dedicated IP add-on price unpublished. | https://ferr.dev/ |
| Scale | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Custom volume rate; unlimited concurrency advertised; SLA/self-hosting option. | https://ferr.dev/ |
## Gotchas
- Official landing provides pricing/features, but docs.ferr.dev failed DNS and /docs returned 404. These marketing claims were not independently provisioned.
- Open-source and self-host options are advertised; no evidence of zero managed overage. Hourly rate stays null rather than extrapolating $99/1000.
- Storage, snapshot GiB-month and public IPv 4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
50 concurrency fits Pro, but 8,800 hours exceed 1,000 included. Overage price is unknown, so $99 is only the entry fee, not a bill. Network/proxy, CAPTCHA, recording storage, OS and 4/8 hardware unknown.
## Sources
- https://ferr.dev/
- https://docs.ferr.dev
- https://ferr.dev/docs