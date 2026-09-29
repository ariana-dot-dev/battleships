# CloudBrowser AI — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Subscription | Managed browsers | Hours/usage units | Basic $25 for 250 hours and 10 concurrent instances; Premium $90 for 1,000 hours and 25 concurrent instances. | https://cloudbrowser.ai/ |
| Annual | Annual commit | 2 months free | Two months free implies $250/$900 per year; exact checkout totals unverified. | https://cloudbrowser.ai/ |
| Trial | Basic signup | 7 days | Basic seven-day trial; paid plans advertise a 14-day money-back guarantee. | https://cloudbrowser.ai/ |
| Basic | Account plan | Monthly fee / commitment | $25; concurrency 10; 250 browser hours/mo=30,000 units; 3 tabs/instance; premium proxy/live view. | https://cloudbrowser.ai/ |
| Premium | Account plan | Monthly fee / commitment | $90; concurrency 25; 1,000 hours/mo=120,000 units; 3 tabs/instance; premium proxy/live view. | https://cloudbrowser.ai/ |
| Basic annual | Account plan | Monthly fee / commitment | $20.833333333333332; concurrency 10; 2 months free advertised: derived $250/year, confirm checkout; 250 h/mo. | https://cloudbrowser.ai/ |
| Premium annual | Account plan | Monthly fee / commitment | $75.0; concurrency 25; 2 months free advertised: derived $900/year, confirm checkout; 1000 h/mo. | https://cloudbrowser.ai/ |
| Custom | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Custom hours/concurrency; dedicated proxies. | https://cloudbrowser.ai/ |
## Gotchas
- Premium proxies included in plan feature list, but no published bandwidth allowance/overage found. Do not translate to unlimitedGB or $0/GB.
- Saved cookies/local Storage supported; live remote desktop is browser viewing, not proof of full general-purpose Linux desktop. Docs/pricing paths resolved to same homepage.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Fifty concurrent instances exceed the Premium limit of 25, requiring a **Custom quote**. No public overage tariff prices 8,800 hours. Included premium proxies do not establish a 100 GB allowance; machine resources and general snapshot storage are unverified.
## Sources
- https://cloudbrowser.ai/
- https://cloudbrowser.ai/docs
- https://cloudbrowser.ai/pricing