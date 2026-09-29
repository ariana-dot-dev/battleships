# Firecrawl Interact / Browser Sandbox — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Interact code only | No prompt | Browser minutes | 2 credits/minute; minimum 1 min | https://docs.firecrawl.dev/billing |
| Interact prompt | Session uses natural-language prompt | Browser minutes | 7 credits/minute; minimum 1 min | https://docs.firecrawl.dev/billing |
| Top-ups | Paid tier after quota | Blocks of $5 | Hobby 1000/Standard 2000/Growth 2500/Scale 5000 credits | https://www.firecrawl.dev/pricing |
| Scrape/Crawl/Map | Adjacent API | Per page/call | 1 credit base; JSON +4; other modifiers may stack | https://docs.firecrawl.dev/billing |
| Agent preview | Dynamic agent task | Tokens/credits | 5 free daily runs, then dynamic pricing | https://www.firecrawl.dev/pricing.md |
| Free | Account plan | Monthly fee / commitment | $0; concurrency 2; 1,000 credits/month; no overage. Keyless limited free endpoints also exist. | https://www.firecrawl.dev/pricing |
| Hobby | Account plan | Monthly fee / commitment | $19; concurrency 5; 5,000 shared credits; top-up $5 for 1,000 credits. Included USD is overage-equivalent value, not cash. | https://www.firecrawl.dev/pricing |
| Standard | Account plan | Monthly fee / commitment | $99; concurrency 25; 100,000 shared credits; top-up $5 for 2,000 credits. Included USD is overage-equivalent value, not cash. | https://www.firecrawl.dev/pricing |
| Growth | Account plan | Monthly fee / commitment | $399; concurrency 50; 500,000 shared credits; top-up $5 for 2,500 credits. Included USD is overage-equivalent value, not cash. | https://www.firecrawl.dev/pricing |
| Scale | Account plan | Monthly fee / commitment | $749; concurrency 100; 1,000,000 shared credits; top-up $5 for 5,000 credits. Included USD is overage-equivalent value, not cash. | https://www.firecrawl.dev/pricing |
| Hobby annual | Account plan | Monthly fee / commitment | $15.833333333333334; concurrency 5; $190/year; 5,000 credits refresh monthly. Yearly/monthly label rounds on website. | https://www.firecrawl.dev/pricing |
| Standard annual | Account plan | Monthly fee / commitment | $82.5; concurrency 25; $990/year; 100,000 credits refresh monthly. Yearly/monthly label rounds on website. | https://www.firecrawl.dev/pricing |
| Growth annual | Account plan | Monthly fee / commitment | $332.5; concurrency 50; $3990/year; 500,000 credits refresh monthly. Yearly/monthly label rounds on website. | https://www.firecrawl.dev/pricing |
| Scale annual | Account plan | Monthly fee / commitment | $599.1666666666666; concurrency 100; $7190/year; 1,000,000 credits refresh monthly. Yearly/monthly label rounds on website. | https://www.firecrawl.dev/pricing |
| Enterprise | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Custom concurrency, bulk credits, SLA, ZDR, SSO. | https://www.firecrawl.dev/pricing |
## Gotchas
- Docs distinguish 2 credit code sessions from 7 credit prompt sessions; pricing table omits prompt premium. Never assume 2 credit rate for all agents.
- Page-render concurrency (2/5/25/50/100) is published; browser-sandbox per-endpoint admission may differ. Sessions default TTL 10 min, max 60 min; idleTTL 5 min.
- Plan credits reset monthly even under annual commitment. Rollover docs narrow it to annual Scale 1 month/Enterprise 2 months whereas pricing table omits annual condition.
- Source pricing rendered in EUR by geolocation; canonical pricing.md gives binding USD and yearly totals. Use annual totals rather than rounded $16/$83/$333/$599 headlines.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Code-only Interact consumes 8,800×120 = 1,056,000 credits. Growth: $399+ceil((1,056,000−500,000)/2,500)×$5 = **$1,514**. Scale: $749+ceil(56,000/5,000)×$5 = **$809**; annual Scale equivalent is $7,190/12+$60 = **$659.17/month**, paid annually. Prompted sessions consume 3,696,000 credits; monthly Scale becomes $749+ceil(2,696,000/5,000)×$5 = **$3,449**. These are native usage subtotals, require sessions no longer than one hour, and exclude unverified hardware/storage equivalence.
## Sources
- https://www.firecrawl.dev/pricing
- https://www.firecrawl.dev/pricing.md
- https://docs.firecrawl.dev/llms-full.txt
- https://docs.firecrawl.dev/billing
- https://docs.firecrawl.dev/features/browser
- https://docs.firecrawl.dev/features/interact