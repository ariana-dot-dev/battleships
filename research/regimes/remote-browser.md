# Remote Browser — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Recurring subscription | Managed sessions | Monthly quota | Free 1 h; Developer $4.90/30 h, first month $.10 promo | https://remote-browser.dev/pricing |
| Top-up | Either tier | One-time hour pack | $4.90/20 h; no subscription needed | https://remote-browser.dev/pricing |
| Runtime | Session alive | Browser-hours | Idle timeout closes sessions; stop to end billing | https://remote-browser.dev/pricing |
| Managed or BYO proxy | Regional egress | Price unpublished | Residential country routing, disabled proxy, BYOP documented | https://remote-browser.dev/documentation/browser/proxies |
| Free | Account plan | Monthly fee / commitment | $0; concurrency 1; 1 browser-hour/month; 1 viewer and profile; 1-day recording retention. | https://remote-browser.dev/pricing |
| Developer | Account plan | Monthly fee / commitment | $4.9; concurrency 10; 30 included hours valued at pack rate; 3 viewers/browser,20 profiles,7-day recording retention. First month $.10 promotion. | https://remote-browser.dev/pricing |
## Gotchas
- Each session is a Kubernetes pod, not a dedicated resource-guaranteed VM. Active browser-hour means alive runtime, not active CPU time.
- Model the top-up as a 20-hour purchase block, not unlimited metered $.245/hour. Credit expiry, proxy bandwidth, CPU/RAM, CAPTCHA fee and storage GiB price not published.
- Storage, snapshot GiB-month and public IPv 4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
50 simultaneous browsers exceeds Developer 10; no eligible public plan. Ignoring that limit, time-only Developer would require ceil((8800−30)/20)=439 packs: $4.90+439×$4.90=$2,156.00, not a valid 50-concurrency quote. Network, hardware and snapshot requirements remain unknown.
## Sources
- https://remote-browser.dev/pricing
- https://remote-browser.dev/llms.txt
- https://remote-browser.dev/architecture
- https://remote-browser.dev/documentation/browser/proxies
- https://remote-browser.dev/documentation/browser/live-preview-recording
- https://remote-browser.dev/documentation/browser/authentication/profiles