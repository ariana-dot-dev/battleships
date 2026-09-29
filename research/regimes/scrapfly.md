# Scrapfly Cloud Browser — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Cloud Browser base | Web Socket connection time + traffic | Credits | max(5, ceil(seconds/30)+ceil(MB)×plan proxy rate + cachedMB); add solves/viewers | https://scrapfly.io/docs/cloud-browser-api/billing |
| Wire bandwidth | All page/assets traffic, no free threshold | Credits/MB; 1024 MB per GB | Discovery DC 7/res 52; Pro 10/78; Startup 8/65; Enterprise 8/65 | https://scrapfly.io/docs/cloud-browser-api/billing |
| CAPTCHA | Successful solve | 5/10/20 credits | 5 interactive; 20 token; 10 default; unsolvable Data Dome token unbilled | https://scrapfly.io/docs/cloud-browser-api/captcha-solver |
| Prepaid effective time rate | Using included credits | Amortized not overage | Discovery $.018/h; Pro/Startup $.012/h; Enterprise $.010909/h | https://scrapfly.io/docs/cloud-browser-api/billing |
| Overflow | Pro+ after shared quota | 10 k-credit batches | $3.50/$2/$1.20 per 10 k Pro/Startup/Enterprise | https://scrapfly.io/pricing |
| Discovery | Account plan | Monthly fee / commitment | $30; concurrency 5; 200,000 shared credits/month; no overage Browser traffic 7 datacenter/52 residential credits/MB. | https://scrapfly.io/pricing |
| Pro | Account plan | Monthly fee / commitment | $100; concurrency 20; 1,000,000 shared credits/month; extra $3.5/10 k, batches of 10 k. Included USD is overage-equivalent valuation. Browser traffic 10 datacenter/78 residential credits/MB. | https://scrapfly.io/pricing |
| Startup | Account plan | Monthly fee / commitment | $250; concurrency 50; 2,500,000 shared credits/month; extra $2.0/10 k, batches of 10 k. Included USD is overage-equivalent valuation. Browser traffic 8 datacenter/65 residential credits/MB. | https://scrapfly.io/pricing |
| Enterprise | Account plan | Monthly fee / commitment | $500; concurrency 100; 5,500,000 shared credits/month; extra $1.2/10 k, batches of 10 k. Included USD is overage-equivalent valuation. Browser traffic 8 datacenter/65 residential credits/MB. | https://scrapfly.io/pricing |
| Custom | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Committed concurrency, dedicated residential pools, contract/SLA. | https://scrapfly.io/pricing |
## Gotchas
- Very low prepaid effective hourly rate excludes bandwidth. Do not use fee/credits as overflow rate: published overage is higher.
- Cloud Browser docs explicitly define GB=1024 MB, unlike default estimator GB≈GiB simplification. MB rounds up; VNC/RTC add-ons and CAPTCHA consume the same quota.
- 5-credit allocation minimum applies to combined time + traffic, not five extra credits on every session. It cannot be exactly represented by card start_fee. Card uses null rather than inventing a time-only minimum.
- Discovery stops at quota. Free grant 1,000 credits once, not $1,000.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Startup fits 50 concurrency. Time=1,056,000 credits. 100 GiB=102,400 MB: datacenter=819,200 credits, total 1,875,200 within 2.5 m => **$250**. Residential=6,656,000 credits, total 7,712,000: Startup overflow ceil((7,712,000−2,500,000)/10,000)×$2+$250=**$1,294**. Enterprise would cost $500+ceil((7,712,000−5,500,000)/10,000)×$1.20=**$766.40**. Excludes viewer/solve credits and arbitrary snapshots; 4/8 hardware not guaranteed.
## Sources
- https://scrapfly.io/pricing
- https://scrapfly.io/llms.txt
- https://scrapfly.io/docs/cloud-browser-api/getting-started
- https://scrapfly.io/docs/cloud-browser-api/billing
- https://scrapfly.io/docs/cloud-browser-api/captcha-solver
- https://scrapfly.io/docs/cloud-browser-api/session-resume
- https://scrapfly.io/docs/billing