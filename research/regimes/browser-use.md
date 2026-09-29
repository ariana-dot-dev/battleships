# Browser Use Cloud — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Browser | Own automation or agent | Minute rounded upward | $0.02/hour; one-minute minimum | https://browser-use.com/pricing |
| Network | Residential default or direct/BYOP | GB | $5 residential; $0.20 direct/BYOP, external proxy separately | https://browser-use.com/pricing |
| V 4 managed agent | Model-powered runs | Token cost plus markup | 20% on model token list cost + browser + network | https://browser-use.com/pricing |
| V 4 BYOK agent | Own model key | Provider bill + orchestration fee | 20% of published token rates including cached rates + browser/network | https://browser-use.com/pricing |
| Legacy V 2/V 3 | Existing integrations, no active development | V 2 task + step; V 3 tokens | V 2 $.01/task + steps from $.006; V 3 managed 1.2× or BYOK provider+.2×; browser/network separate | https://browser-use.com/pricing/legacy |
| Pay as you go | Account plan | Monthly fee / commitment | $0; concurrency 10; No subscription; $5 minimum top-up; never expires. Spend-tier concurrency separate. | https://browser-use.com/pricing |
| Spend tier 50 | Account plan | Monthly fee / commitment | $0; concurrency 50; Requires $200 qualifying lifetime payments per pricing page ($100 in docs: conflict). Not a monthly $200 fee. | https://browser-use.com/pricing |
| Spend tier 250 | Account plan | Monthly fee / commitment | $0; concurrency 250; $1,000 lifetime qualifying spend. | https://browser-use.com/pricing |
| Spend tier 500 | Account plan | Monthly fee / commitment | $0; concurrency 500; $5,000 lifetime qualifying spend. | https://browser-use.com/pricing |
| Spend tier 1000 | Account plan | Monthly fee / commitment | $0; concurrency 1000; $25,000 lifetime qualifying spend. | https://browser-use.com/pricing |
| Enterprise | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Custom concurrency, SLA, HIPAA/ZDR. | https://browser-use.com/pricing |
## Gotchas
- No current Dev/Business/Scaleup subscriptions offered; older comparisons are obsolete for new buyers. Legacy concurrency grants can be preserved.
- Concurrency is lifetime purchased-credit spend, not monthly fee. Card cannot enforce a historical spend gate; the zero-fee higher tiers must not be auto-selected without checking account qualification.
- Pricing page says $200 lifetime spend unlocks 50 sessions; docs says $100. Keep both and inspect account grant before purchasing solely for concurrency.
- V 4 agent browsers have four-hour hard timeout and roughly 20-minute idle cleanup after inactive runs. An eight-hour single session is not valid for that product; standalone browser limits may differ.
- No 4/8 guarantee; model prices are separate token meters, not compute. Managed token prices already include the 20% fee; do not add it twice.
- Browser create API reserves the full requested runtime amount up front, refunding unused duration at stop proportionally; final billing remains rounded up to whole minutes. A prepaid wallet must cover the initial reservation.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Native browser time: 8,800×.02=**$176**. If 100 GB means actual metered browser traffic: +$20 direct => **$196**, or +$500 residential => **$676**; excludes model fees and snapshot storage. Fifty concurrency needs the verified spend-tier grant ($100 docs/$200 page), not $200 added monthly. Four-hour agent cap means at least 2,200 starts for 8-hour workdays; long-session feasibility must be confirmed.
## Sources
- https://browser-use.com/pricing
- https://docs.browser-use.com/llms-full.txt
- https://docs.browser-use.com/cloud/guides/billing
- https://docs.browser-use.com/cloud/guides/concurrency
- https://docs.browser-use.com/cloud/eu-deployment
- https://browser-use.com/pricing/legacy