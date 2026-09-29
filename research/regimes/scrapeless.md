# Scrapeless Agent Browser — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Browser/Crawl | Browser runtime | From-rate hourly | .090/.081/.076/.072 Basic/Growth/Scale/Business | https://www.scrapeless.com/en/pricing |
| Proxy products | Usage | GB or IP-month | Residential 1.80/1.62/1.53/1.44; DC.80/.72/.68/.64; IPv 6.40/.36/.34/.32; ISP 2.50/2.25/2.12/2.00 | https://www.scrapeless.com/en/pricing |
| Prepaid commitment | Paid plans | 49/199/399 dollars monthly | FAQ says credited balance then deduction; marketing wording ambiguous | https://www.scrapeless.com/en/pricing |
| Adjacent APIs | Per successfulURL | Separate shared wallet meters | Web Unlocker $1/k base; AI Scraper 1.80–2/k; ScrapingAPI from 3/k; tier discounts apply | https://www.scrapeless.com/en/pricing |
| Basic | Account plan | Monthly fee / commitment | $0; concurrency 50; Monthly prepaid usage per FAQ; unused monthly commitment does not roll over. Residential $1.8/GB; DC $0.8/GB; IPv 6 $0.4/GB; ISP $2.5/IP. | https://www.scrapeless.com/en/pricing |
| Growth | Account plan | Monthly fee / commitment | $49; concurrency 100; Monthly prepaid usage per FAQ; unused monthly commitment does not roll over. Residential $1.62/GB; DC $0.72/GB; IPv 6 $0.36/GB; ISP $2.25/IP. | https://www.scrapeless.com/en/pricing |
| Scale | Account plan | Monthly fee / commitment | $199; concurrency 200; Monthly prepaid usage per FAQ; unused monthly commitment does not roll over. Residential $1.53/GB; DC $0.68/GB; IPv 6 $0.34/GB; ISP $2.12/IP. | https://www.scrapeless.com/en/pricing |
| Business | Account plan | Monthly fee / commitment | $399; concurrency 400; Monthly prepaid usage per FAQ; unused monthly commitment does not roll over. Residential $1.44/GB; DC $0.64/GB; IPv 6 $0.32/GB; ISP $2.0/IP. | https://www.scrapeless.com/en/pricing |
| Custom | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Negotiated rates/concurrency; KYC for higher threads/custom plans. | https://www.scrapeless.com/en/pricing |
## Gotchas
- Pricing header says $49 then consumption but FAQ explicitly says monthly amount is pre-deposited into balance; card models usage minimum, not noncredit fee, and flags ambiguity.
- The Scale rate .076 is displayed rounded while 15% off .09 is .0765. Preserve published .076 and do not silently replace.
- Browser proxy routing may use separate service-specific tariff; listed proxy prices are standalone product prices and not proof every browser mode uses exactly that rate.
- Baked-in CAPTCHA/stealth/fingerprints and profile extensions documented; per-solve rate and replay retention/storage cost not verified.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Published time-only from-rates for 8,800 hours: Basic $792; Growth $712.80; Scale $668.80; Business $633.60. All meet 50 concurrent browsers. If the Business monthly commitment is fully credited as the FAQ says, do not add $399 again. Adding 100 GB at the separately advertised Business residential tariff ($1.44/GB) gives **$777.60**, conditional on that tariff applying to browser traffic. Four-vCPU/8-GiB resources and snapshot prices are unverified.
## Sources
- https://www.scrapeless.com/en/pricing
- https://docs.scrapeless.com/en/docs/browser-crawl/agent-browser/introduction/
- https://docs.scrapeless.com/en/docs/browser-crawl/agent-browser/session-replay/
- https://docs.scrapeless.com/en/docs/browser-crawl/agent-browser/profiles/
- https://docs.scrapeless.com/en/docs/browser-crawl/agent-browser/optimizing-cost/
## Annual selector evidence
Chrome yearly toggle shows Growth **$44/month**, Scale **$179/month**, Business **$359/month** on annual commitment. Hourly and proxy unit rates remain the same displayed tier rates; this is not an additional 10% discount on every runtime rate. Exact annual prepaid balance and invoice totals are unverified.