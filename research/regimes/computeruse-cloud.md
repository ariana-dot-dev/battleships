# Computer Use Cloud (computeruse.run) — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Unavailable deployment | Direct fetch and Chrome | Not purchasable as verified | HTTP 404 DEPLOYMENT_NOT_FOUND | https://computeruse.run/ |
| Historical/search-indexed preview | Discovery only | Active seconds, claimedidlefree | Cached official-domain preview: Free 100 active hours/month; Pro $20 for 500; Team $200 for 5,000. Live site unavailable. | https://computeruse.run/ |
| Current availability unverified | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Cached search preview advertised Free 100 activehours, Pro $20/500, Team $200/5000; not verified live, not normalized. | https://computeruse.run/ |
## Gotchas
- The official-domain search result describes Linux desktops and active-second billing, but direct HTTP and real Chrome both return 404 DEPLOYMENT_NOT_FOUND. Preview rates are not verified current offers.
- Active-action time is not CPU utilization. Do not assume a 30% CPU workload is billed for only 30% of its duration.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Unpriceable and availability unverified; do not rank the cached 100 active-hour free allowance as real current compute.
## Sources
- https://computeruse.run/