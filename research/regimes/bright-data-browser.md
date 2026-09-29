# Bright Data Browser API — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| PAYG | No monthly commitment | Network GB | $8/GB | https://brightdata.com/pricing/scraping-browser |
| Committed Scale | Slider tiers | Monthly package + selected GB rate | $499/71 GB/$7; $999/166 GB/$6; $1,999/399 GB/$5 | https://brightdata.com/pricing/scraping-browser |
| Bundled capabilities | Browser API | Included in bandwidth | Proxies, CAPTCHA, fingerprinting, retries, JS and managed browser | https://brightdata.com/pricing/scraping-browser |
| First deposit match | Promotion | Conditional credit | Match up to $500 on initial deposit ≥$500; not permanent list discount | https://brightdata.com/pricing/scraping-browser |
| Free tier | Account plan | Monthly fee / commitment | $0; concurrency unpublished/custom; 5,000 credits/month; page says 1 GB included/month; no card. | https://brightdata.com/pricing/scraping-browser |
| Pay as you go | Account plan | Monthly fee / commitment | $0; concurrency unpublished/custom; $8/GB, no monthly commitment, unlimited concurrent sessions. | https://brightdata.com/pricing/scraping-browser |
| Scale $499 | Account plan | Monthly fee / commitment | $499; concurrency unpublished/custom; 71 GB included; $7/GB rate in page slider data. | https://brightdata.com/pricing/scraping-browser |
| Scale $999 | Account plan | Monthly fee / commitment | $999; concurrency unpublished/custom; 166 GB included; $6/GB rate. | https://brightdata.com/pricing/scraping-browser |
| Scale $1999 | Account plan | Monthly fee / commitment | $1999; concurrency unpublished/custom; 399 GB included; $5/GB rate. | https://brightdata.com/pricing/scraping-browser |
| Enterprise | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Custom package, SLA, SSO, audit logs. | https://brightdata.com/pricing/scraping-browser |
## Gotchas
- Rendered currency widgets returned empty prices; exact USD recovered from public data-usd and data-tiers attributes in saved HTML. These are primary-page values, not guessed from the headline from-$5/GB.
- Network meters browser/proxy traffic, not necessarily customer-facing VM egress.
- Unlimited concurrency is a marketing entitlement, not verified load testing. Session lifetime/profile retention, CPU/RAM, resolution and separate recording prices remain unverified.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
For 100 GB of billed Browser API traffic (not generic VM egress), PAYG **$800** before any confirmed free allowance. The $499 package with 71 GB included and $7/GB overage would cost **$702**; $999 package costs $999 within its 166 GB allowance. Treat overage arithmetic as conditional on package rules at checkout. 8,800 hours itself has no separate advertised meter; it does not establish 4/8 capacity or 50 GiB snapshots.
## Sources
- https://brightdata.com/pricing/scraping-browser
- https://docs.brightdata.com/llms.txt
- https://docs.brightdata.com/scraping-automation/scraping-browser/introduction