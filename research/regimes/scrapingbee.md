# Scraping Bee — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Request API | Successful fetch / render | Credit-weighted request | Base 1, JS 5, premium 10, JS+premium 25, stealth 75 credits | https://www.scrapingbee.com/documentation/ |
| Trial | New signup | One-time quota | 1,000 free API credits, no card | https://www.scrapingbee.com/pricing/ |
| Custom | Beyond 8 m credits /400 concurrency | Sales | Unpublished | https://www.scrapingbee.com/pricing/ |
| Hobby | Account plan | Monthly fee / commitment | $19; concurrency 25; 75,000 API credits/month; VAT excluded; paid features shared. | https://www.scrapingbee.com/pricing/ |
| Freelance | Account plan | Monthly fee / commitment | $49; concurrency 50; 250,000 API credits/month; VAT excluded; paid features shared. | https://www.scrapingbee.com/pricing/ |
| Startup | Account plan | Monthly fee / commitment | $99; concurrency 100; 1,000,000 API credits/month; VAT excluded; paid features shared. | https://www.scrapingbee.com/pricing/ |
| Business | Account plan | Monthly fee / commitment | $249; concurrency 200; 3,000,000 API credits/month; VAT excluded; paid features shared. | https://www.scrapingbee.com/pricing/ |
| Business+ | Account plan | Monthly fee / commitment | $599; concurrency 400; 8,000,000 API credits/month; VAT excluded; paid features shared. | https://www.scrapingbee.com/pricing/ |
| Custom | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; More credits or concurrency by quote. | https://www.scrapingbee.com/pricing/ |
## Gotchas
- Request API is adjacent to long-lived agent browsers. JS scenarios/screenshots do not establish an eight-hour persistent CDP session product. Browser-hour and 4/8 normalized prices remain null.
- Proxy consumption is packaged into request credits; do not also invent a GB fee. Browser profiles, recording storage and independent GPU/OS tiers are not published.
- Credit allowance divided by fee is not a guaranteed overage rate. Auto-mode can select more expensive request configurations; cap via max_cost parameter.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
8,800 hours does not identify the number of billed HTTP requests or credit multipliers. For illustration only, 1,100 successful JS+premium requests would consume 27,500 credits, but this is NOT the supplied workload. Fifty simultaneous requests needs Freelance or higher ($49,250 k credits); continuous 8 h browser sessions and snapshots are not verified.
## Sources
- https://www.scrapingbee.com/pricing/
- https://www.scrapingbee.com/documentation/