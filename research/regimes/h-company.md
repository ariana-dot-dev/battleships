# H Company / Surfer / H Agents API — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Hosted Agents API | Managed cloud browser | Included model dollars then 20% markup | Builder $20 /10 concurrency, Startup $200 /100 concurrency | https://www.hcompany.ai/pricing |
| Models API | Bring environment | Tokens | Input/output per million: .40/3; .30/2; .25/1.80; .40/3 across displayed models | https://www.hcompany.ai/pricing |
| Local desktop/browser | User machine | No cloud VM included | Holo Desktop CLI, HoloTab, open weights; inference separate | https://www.hcompany.ai/pricing |
| Surfer-H benchmark | Research evaluation | Not a purchasable tariff | $0.13/task was benchmark cost; do not use as cloud list price | https://www.hcompany.ai/surfer-h |
| Free | Account plan | Monthly fee / commitment | $0; concurrency 3; ~60 sessions/month, token fair-use cap, datacenter proxy. | https://www.hcompany.ai/pricing |
| Builder | Account plan | Monthly fee / commitment | $20; concurrency 10; First $20 at model cost (~1,000 illustrative sessions); top-ups model cost +20%; residential proxy. | https://www.hcompany.ai/pricing |
| Startup | Account plan | Monthly fee / commitment | $200; concurrency 100; First $200 at model cost (~10,000 illustrative sessions); top-ups +20%; residential proxy. | https://www.hcompany.ai/pricing |
| Enterprise | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Negotiated markup/token cost, uncapped/custom concurrency, workflow orchestration. | https://www.hcompany.ai/pricing |
## Gotchas
- Quoted session counts are estimates dependent on model and task complexity, not fixed session-hour entitlements. Credits cover model work, not a normalized resource-hour rate.
- Current hosted product is H Agents API. Local desktop support must not be represented as a hosted Windows/macOS VM SKU; docs distinguishes cloud browser from own desktop.
- Holo 3.1 free model tier 10 RPM appears on Models tab; not the same as free hosted agent concurrency. Model rates captured with actual tab click.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
50 simultaneous managed agents fits Startup ($200 monthly entry). Total depends on model token usage T: first $200 at model cost, then approximately $200+1.2×max(0, T−200), subject to plan terms. 8,800 browser-hours provides no T. Do not multiply hours by historical $0.13 benchmark task cost; machine sizing/storage/network unknown.
## Sources
- https://www.hcompany.ai/pricing
- https://hub.hcompany.ai/llms-full.txt
- https://www.hcompany.ai/surfer-h