# CloudAxis — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Current list | Effective 1 September 2026 | Subscription hard caps | $29/$59/$199 Growth/Pro/Max | https://cloudaxis.ai/pricing/ |
| Founding users | Existing Stripe rate | Grandfathered | Retain previous amount through 1 March 2027; previous amount not verified | https://cloudaxis.ai/pricing/ |
| Bonus credits | Optional top-up | AIcredit pack | $5/100 bonus credits; does not establish browser-minute overage | https://cloudaxis.ai/docs/account/credits-and-plans/ |
| Free | Account plan | Monthly fee / commitment | $0; concurrency unpublished/custom; 50 AIcredits,10 browser minutes,10 searches monthly;2 specialist slots. | https://cloudaxis.ai/pricing/ |
| Growth | Account plan | Monthly fee / commitment | $29; concurrency unpublished/custom; 2,500 AIcredits,500 browser minutes,120 searches;5 specialist slots. | https://cloudaxis.ai/pricing/ |
| Pro | Account plan | Monthly fee / commitment | $59; concurrency unpublished/custom; 5,000 AIcredits,1,000 browser minutes,240 searches;10 specialist slots. | https://cloudaxis.ai/pricing/ |
| Max | Account plan | Monthly fee / commitment | $199; concurrency unpublished/custom; 18,000 AIcredits,3,500 browser minutes,800 searches;50 specialist slots. | https://cloudaxis.ai/pricing/ |
## Gotchas
- Specialist slots are not a documented simultaneous-browser limit. Keep browser concurrency null, rather than 50 on Max.
- Persistent workspace UI and code execution do not prove a dedicated 4/8 VM or full OS desktop. Runtime/browser and AI/search quotas are separate hard caps.
- Current Auto Mode model selection is bundled; underlying token costs cannot be replaced by a flat browser-hour equivalent.
- Storage, snapshot GiB-month and public IPv 4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
8,800 hours=528,000 browser minutes, far beyond Max 3,500 minutes. Plans hard-stop with no browser overage, so no published eligible plan. Fifty specialist slots are not evidence of 50 browser sessions. Total null.
## Sources
- https://cloudaxis.ai/pricing/
- https://cloudaxis.ai/llms.txt
- https://cloudaxis.ai/docs/account/credits-and-plans/
- https://cloudaxis.ai/docs/apps/