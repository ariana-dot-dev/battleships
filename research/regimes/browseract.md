# BrowserAct — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Workflow Bot | Cloud deterministic workflow | Executed steps | 3 credits per executed step | https://www.browseract.com/pricing |
| Agent Bot | Build then reuse | Estimated credits | Simple: build 300–500, run 10–20; complex: build 800–1,500, run 20–30 | https://www.browseract.com/pricing |
| Cloud runtime and dynamic proxy | Limited-time promotion | Temporarily included | No permanent zero-dollar hourly promise | https://www.browseract.com/pricing |
| Local CLI | Own machine | Local runtime free | Fingerprint browser 100 credits each; dynamic residential proxy 5,000 credits/GB; static proxy price depends on location/tier | https://www.browseract.com/pricing |
| Trial | New paid subscriber | Seven days | Basic 1,000; Essential 1,500; Advanced 2,000 trial credits | https://www.browseract.com/pricing |
| Free | Account plan | Monthly fee / commitment | $0; concurrency 2; 200 signup credits; 2 agent builds; 5 local browsers. | https://www.browseract.com/pricing |
| Basic monthly displayed promo | Account plan | Monthly fee / commitment | $16; concurrency 10; 10 k monthly credits; crossed-out 20 list; up to 5 static proxies, 10 local browsers. | https://www.browseract.com/pricing |
| Essential monthly displayed promo | Account plan | Monthly fee / commitment | $70; concurrency 20; 50 k credits; crossed-out 100; up to 25 static proxies, 50 local browsers. | https://www.browseract.com/pricing |
| Advanced monthly displayed promo | Account plan | Monthly fee / commitment | $120; concurrency 40; 100 k credits; crossed-out 200; up to 50 static proxies, 100 local browsers. | https://www.browseract.com/pricing |
| Basic annual | Account plan | Monthly fee / commitment | $13; concurrency 10; $156/year; 10 k monthly credits. | https://www.browseract.com/pricing |
| Essential annual | Account plan | Monthly fee / commitment | $56; concurrency 20; $672/year; 50 k monthly credits. | https://www.browseract.com/pricing |
| Advanced annual | Account plan | Monthly fee / commitment | $96; concurrency 40; $1152/year; 100 k monthly credits. | https://www.browseract.com/pricing |
| Custom | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Custom managed-browser usage/concurrency. | https://www.browseract.com/pricing |
## Gotchas
- All paid monthly displayed prices are discounted versus crossed-out values: label as promotional, not unconditional permanent list price. Annual switch captured in Chrome.
- Local browser fees do not buy a hosted computer. Cloud runtime and built-in dynamic proxy are free for a limited time only, while task credits remain billable.
- Agent build/run figures are estimates and percentages, not exact fixed step tariffs. Static proxy price varies by location and tier, not disclosed.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Fifty concurrent tasks exceed Advanced (40), requiring **Custom pricing**. Deterministic workflows consume three credits per executed step; agent builds and runs have estimated credit costs. Neither 8,800 hours nor 30% CPU specifies a step count. Post-promotion runtime/proxy prices and resource equivalence are unknown.
## Sources
- https://www.browseract.com/pricing
- https://docs.browseract.com/llms.txt