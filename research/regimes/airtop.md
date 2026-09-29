# Airtop — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Credit bundles | All account tiers | Subscription allowance | Selectable tiers captured in real Chrome; 30 k–1.5 m monthly credits | https://www.airtop.ai/pricing |
| Annual | Annual commitment | 10% advertised discount | Marketing says credits upfront; docs says all plans refresh monthly | https://www.airtop.ai/pricing |
| Usage | API/browser/agent work | Credits; sessions rounded to 30 s | Dollar/hour or credits/GB unpublished | https://docs.airtop.ai/guides/how-to/creating-a-session |
| More credits | Exhausted quota | Upgrade only | No one-off purchases; prorated upgrade, monthly unused credits expire | https://www.airtop.ai/help/billing/billing |
| Free | Account plan | Monthly fee / commitment | $0; concurrency 3; 1,000 monthly credits; 1 agent; bonus conflict 10 k pricing/30 k billing docs. | https://www.airtop.ai/pricing |
| Starter 30,000 credits | Account plan | Monthly fee / commitment | $29; concurrency 3; 30,000 credits/month. 10 deployed agents, integrated proxy. | https://www.airtop.ai/pricing |
| Starter 50,000 credits | Account plan | Monthly fee / commitment | $48; concurrency 3; 50,000 credits/month. 10 deployed agents, integrated proxy. | https://www.airtop.ai/pricing |
| Starter 80,000 credits | Account plan | Monthly fee / commitment | $77; concurrency 3; 80,000 credits/month. 10 deployed agents, integrated proxy. | https://www.airtop.ai/pricing |
| Starter 100,000 credits | Account plan | Monthly fee / commitment | $99; concurrency 3; 100,000 credits/month. 10 deployed agents, integrated proxy. | https://www.airtop.ai/pricing |
| Starter 150,000 credits | Account plan | Monthly fee / commitment | $149; concurrency 3; 150,000 credits/month. 10 deployed agents, integrated proxy. | https://www.airtop.ai/pricing |
| Professional 225,000 credits | Account plan | Monthly fee / commitment | $189; concurrency 30; 225,000 credits/month. 30 deployed agents, BYO proxy, Mark included. | https://www.airtop.ai/pricing |
| Professional 375,000 credits | Account plan | Monthly fee / commitment | $300; concurrency 30; 375,000 credits/month. 30 deployed agents, BYO proxy, Mark included. | https://www.airtop.ai/pricing |
| Professional 500,000 credits | Account plan | Monthly fee / commitment | $380; concurrency 30; 500,000 credits/month. 30 deployed agents, BYO proxy, Mark included. | https://www.airtop.ai/pricing |
| Enterprise 775,000 credits | Account plan | Monthly fee / commitment | $558; concurrency 100; 775,000 credits/month. Unlimited deployed agents; SOC 2 report. | https://www.airtop.ai/pricing |
| Enterprise 1,000,000 credits | Account plan | Monthly fee / commitment | $680; concurrency 100; 1,000,000 credits/month. Unlimited deployed agents; SOC 2 report. | https://www.airtop.ai/pricing |
| Enterprise 1,500,000 credits | Account plan | Monthly fee / commitment | $999; concurrency 100; 1,500,000 credits/month. Unlimited deployed agents; SOC 2 report. | https://www.airtop.ai/pricing |
| Custom | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Custom credits/concurrency/volume rates. | https://www.airtop.ai/pricing |
## Gotchas
- Do not divide monthly fee by credits and invent a browser-hour price: browser/AI/proxy credit consumption is not publicly defined in reviewed current docs.
- Free signup bonus conflict: marketing 10,000 vs billing guide 30,000 (31,000 initial total), first-cycle only. Annual credit timing also conflicts; preserve both.
- Default idle termination 10 minutes; changing timeout is documented. Persistent profiles preserve cookies/local storage, not arbitrary VM RAM. Integrated residential proxy and CAPTCHA features are not evidence that traffic is unmetered.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Fifty simultaneous sessions require Enterprise, starting at **$558/month for 775,000 credits**. The 8,800-hour workload cannot be translated to required credits from published evidence, so $558 is only an entry fee, not a workload estimate. 4/8 resources, 50 GiB snapshot storage and 100 GiB transfer tariff are unknown.
## Sources
- https://www.airtop.ai/pricing
- https://docs.airtop.ai/llms.txt
- https://docs.airtop.ai/guides/how-to/creating-a-session
- https://docs.airtop.ai/guides/how-to/saving-a-profile
- https://docs.airtop.ai/guides/how-to/recording-a-session
- https://www.airtop.ai/help/llms-full.txt
- https://www.airtop.ai/help/billing/billing
## Annual selector evidence
Actual Chrome selection displayed monthly equivalents: Starter 30k/50k/80k/100k/150k credits at **$26/$43/$69/$89/$134**; Professional 225k/375k/500k at **$170/$270/$342**; Enterprise 775k/1m/1.5m at **$502/$612/$899**. These are rounded website labels; exact annual invoice amounts were not verified. Runtime credit conversion remains unknown.