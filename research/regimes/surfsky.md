# Surfsky — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| On-demand | Running session | Minute-metered hours | $.35/.30/.25/.20 PAYG/Starter/Base/Advanced; no session time limit | https://surfsky.io/pricing |
| Premium proxy | Residential/mobile | GB | $10/$9/$8/$7 by tier | https://surfsky.io/pricing |
| Shared proxy traffic | Paid tiers | Monthly allowance | 5/15/50 GB Starter/Base/Advanced; not the premium allowance | https://surfsky.io/pricing |
| Reserved capacity | Sustained fleet | Custom commitment | From $.03/hour; Custom plans from $399/month | https://surfsky.io/pricing |
| CAPTCHA / human emulation | All plans | Included per current price page | Separate docs overview still mentions usage billing; confirm | https://surfsky.io/pricing |
| PAYG | Account plan | Monthly fee / commitment | $0; concurrency 10; Monthly fee converts to usage credit. 0 GB shared proxy traffic;0 persistent profiles, or one-time only on PAYG. | https://surfsky.io/pricing |
| Starter | Account plan | Monthly fee / commitment | $29; concurrency 15; Monthly fee converts to usage credit. 5 GB shared proxy traffic;10 persistent profiles, or one-time only on PAYG. | https://surfsky.io/pricing |
| Base | Account plan | Monthly fee / commitment | $99; concurrency 50; Monthly fee converts to usage credit. 15 GB shared proxy traffic;100 persistent profiles, or one-time only on PAYG. | https://surfsky.io/pricing |
| Advanced | Account plan | Monthly fee / commitment | $199; concurrency 199; Monthly fee converts to usage credit. 50 GB shared proxy traffic;400 persistent profiles, or one-time only on PAYG. | https://surfsky.io/pricing |
| Custom | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Starts from $399/month; reserved fleet from $.03/hour; no binding scale tariff. | https://surfsky.io/pricing |
## Gotchas
- Quoted up-to 90/390/990 hours do not precisely equal fee divided by rate (29/.30=96.67 etc.). Use explicit fee and dollar rates; do not invent a second included-hours allowance.
- Fingerprint cpu/ram/OS/GPU values are browser identity fields, not server hardware or actual Windows/macOS guests.
- CAPTCHA is included on pricing page, but docs overview mentions usage-billed solving. Record conflict rather than silently guaranteeing unlimited solves. Shared and premium proxies are distinct.
- Storage, snapshot GiB-month and public IPv 4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
50 concurrency fits Base, but Advanced can be cheaper at volume. Fully running 8,800 h:Base $2,200; Advanced $1,760 (fees are credit minimums).100 GB premium proxy adds $800/$700 => **$3,000 Base /$2,460 Advanced**, excluding unpriced extras. Do not subtract shared proxy allowance from premium traffic. Dedicated from $.03/h would be $264 usage but requires custom terms, so not an eligible self-serve quote.
## Sources
- https://surfsky.io/pricing
- https://docs.surfsky.io/llms-full.txt
- https://docs.surfsky.io/intro-to-surfsky.md
- https://docs.surfsky.io/sessions.md
- https://docs.surfsky.io/proxies.md