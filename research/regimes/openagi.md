# OpenAGI / Lux — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Model API | Actor/Tasker/Thinker inference | Tokens | $0.10/M input; $0.90/M output, all Lux models | https://developer.agiopen.org/docs/pricing |
| Computer environment | Own desktop or third-party integration | Separate infrastructure | No public hosted-desktop price found | https://developer.agiopen.org/docs/index |
| Lux API | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; All Lux models share $.10/million input and $.90/million output tokens; platform/credit minimum not verified. | https://developer.agiopen.org/docs/pricing |
## Gotchas
- Model Pricing page rendered with real Chrome; static HTML contains only application shell. Do not turn low token prices into browser-hour prices.
- SDK controls screenshots and action handlers; that is not evidence of bundled CPU/RAM, proxy, storage, GPU or OS rental.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Unknown infrastructure bill. For known token counts I and O, Lux model-only charge is .10×I/1 e 6+.90×O/1 e 6; add independently rented computers. 8,800 h alone cannot determine token volume.
## Sources
- https://developer.agiopen.org/docs/pricing
- https://lux.agiopen.org/
- https://developer.agiopen.org/docs/index
- https://developer.agiopen.org/docs/quickstart