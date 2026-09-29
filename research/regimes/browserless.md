# Browserless — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Browser connection | Each new connection and reconnect | Ceil(seconds/30) units | 120 units/hour; reconnect starts a new unit | https://www.browserless.io/pricing |
| Residential / datacenter proxy | Transferred MB | Shared units | 6 / 2 units per MB | https://www.browserless.io/pricing |
| CAPTCHA | Successful solve | Shared units | 10 units per successful solve | https://www.browserless.io/pricing |
| Annual commitment | All paid tiers | Fee paid yearly | 25/140/350 dollars monthly-equivalent vs 35/200/500 monthly; concurrency 10/40/100 vs 5/30/80 | https://www.browserless.io/pricing |
| Recording / BYOP | Prototyping+ | Plan-gated | Screen recording and external proxy available; separate GiB price not published | https://www.browserless.io/pricing |
| Free | Account plan | Monthly fee / commitment | $0; concurrency 2; 1,000 units/month; 1-day persisted sessions/replays; 8 h logs. | https://www.browserless.io/pricing |
| Prototyping monthly | Account plan | Monthly fee / commitment | $35; concurrency 5; 20,000 shared units/mo. 0.002/unit overage. Max session 15 min. Proxy and solves consume same units. | https://www.browserless.io/pricing |
| Starter monthly | Account plan | Monthly fee / commitment | $200; concurrency 30; 180,000 shared units/mo. 0.0017/unit overage. Max session 30 min. Proxy and solves consume same units. | https://www.browserless.io/pricing |
| Scale monthly | Account plan | Monthly fee / commitment | $500; concurrency 80; 500,000 shared units/mo. 0.0015/unit overage. Max session 60 min. Proxy and solves consume same units. | https://www.browserless.io/pricing |
| Prototyping annual | Account plan | Monthly fee / commitment | $25; concurrency 10; Annual commitment $300/year. Same 20,000 units/month. Annual adds concurrency; not a separate extra fee. | https://www.browserless.io/pricing |
| Starter annual | Account plan | Monthly fee / commitment | $140; concurrency 40; Annual commitment $1680/year. Same 180,000 units/month. Annual adds concurrency; not a separate extra fee. | https://www.browserless.io/pricing |
| Scale annual | Account plan | Monthly fee / commitment | $350; concurrency 100; Annual commitment $4200/year. Same 500,000 units/month. Annual adds concurrency; not a separate extra fee. | https://www.browserless.io/pricing |
| Enterprise | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Dedicated / commercial self-host; GPUs/custom OS/cloud; warm browsers, custom sessions, SSO. | https://www.browserless.io/pricing |
## Gotchas
- One unit is connection-time, not one API call regardless of duration. Reconnection is a new minimum block.
- Included_usd is the included unit quota valued at that tier overage rate (not cash and not model credits); deduct once. Network block stays unknown because proxy bytes consume plan-dependent shared units.
- Annual is self-serve but marked sales/commit opt-in in estimator per card-spec annual-commit convention. GPU type and custom OS pricing are quote-only.
- No plan below Enterprise permits an uninterrupted eight-hour session (Scale cap 1 h). Splitting may preserve profile but is not equivalent to uninterrupted processes.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
If sessions are split into ≤1 h segments, 50 concurrency requires Scale monthly ($500, 80 slots). Time units=8,800×120=1,056,000; bill=$500+(1,056,000−500,000)×.0015=**$1,334**. At 100 GB=100,000 MB assumption, residential adds 600,000 units=$900 => **$2,234**; datacenter adds 200,000 units=$300 => **$1,634**. Annual Scale base reduces by $150/month equivalent. CAPTCHA adds $.015/success on Scale. Eight-hour uninterrupted sessions, 4/8 hardware and arbitrary snapshots still require a quote.
## Sources
- https://www.browserless.io/pricing
- https://docs.browserless.io/llms-full.txt