# Gologin Cloud Browser — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Cloud subscription | Browser API, not desktop-profile product | Monthly+overage | $4.50/50 h/$.09; $8/100 h/$.08; $14/200 h/$.07 | https://gologin.com/cloud-browser/ |
| Extra concurrency | Beyond included 1/2/3 | Slot-month | $2 per additional simultaneous session | https://gologin.com/cloud-browser/ |
| Traffic overage | Beyond unquantified allowance | GB | $1/GB homepage; docs says $1.99/GB: conflict | https://gologin.com/cloud-browser/ |
| ISP IP | Separate proxy product in docs | IP | Docs says $5/IP unlimited traffic; applicability and period must be confirmed | https://gologin.com/docs/api-reference/cloud-browser/what-is-gologin-cloud-browser |
| Trial | Google signup | One-time | 15 minutes,3 parallel, no card | https://gologin.com/cloud-browser/ |
| Professional | Account plan | Monthly fee / commitment | $4.5; concurrency 1; 50 included hours;1 included concurrent browsers. Additional concurrency $2/slot-month, not automatically modeled. | https://gologin.com/cloud-browser/ |
| Business | Account plan | Monthly fee / commitment | $8; concurrency 2; 100 included hours;2 included concurrent browsers. Additional concurrency $2/slot-month, not automatically modeled. | https://gologin.com/cloud-browser/ |
| Enterprise | Account plan | Monthly fee / commitment | $14; concurrency 3; 200 included hours;3 included concurrent browsers. Additional concurrency $2/slot-month, not automatically modeled. | https://gologin.com/cloud-browser/ |
| Custom | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Custom volume, SSO, SLA, dedicated account manager. | https://gologin.com/cloud-browser/ |
## Gotchas
- Cloud Browser has its own tariff, not the main local antidetect profile subscription. A client OS fingerprint is not a hosted OS SKU.
- Official docs conflict with landing page: docs says.048/hour,20–200 included hours,1–4 parallel, proxy $1.99/GB versus current displayed 50/100/200 hours,1/2/3 slots and $1/GB. Favor current landing offer but obtain binding account rate.
- Additional concurrency is an add-on, not a requirement to buy 50 separate subscriptions.
- Storage, snapshot GiB-month and public IPv 4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
At landing-page Enterprise tariff and assuming 47 extra slots can be bought: $14+(8800−200)×$.07+47×$2=**$710** native runtime+concurrency. Traffic adds max(0,100−included_GB)×$1; allowance unknown and docs conflicts at $1.99. Four-vCPU/8 GiB and snapshots not guaranteed.
## Sources
- https://gologin.com/cloud-browser/
- https://gologin.com/docs/llms-full.txt
- https://gologin.com/docs/api-reference/cloud-browser/what-is-gologin-cloud-browser
- https://gologin.com/docs/ai-agents