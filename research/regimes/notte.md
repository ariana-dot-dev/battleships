# Notte — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Session | Browser only | Runtime | $0/hour | https://www.notte.cc/pricing |
| Function | Hosted agent/function code | Runtime | $0.05/hour | https://www.notte.cc/pricing |
| Residential proxy | Enabled traffic | GB | $10/GB | https://www.notte.cc/pricing |
| LLM | Managed inference | Token cost | No markup; BYOK Startup+ per pricing | https://www.notte.cc/pricing |
| Credits | Monthly subscription or purchased top-up | Shared dollar balance | Plan credits expire each cycle; top-up/signup never expire | https://www.notte.cc/pricing |
| Free | Account plan | Monthly fee / commitment | $0; concurrency 5; $10 once; 5 vaults/personas; features included per current pricing. | https://www.notte.cc/pricing |
| Developer | Account plan | Monthly fee / commitment | $20; concurrency 25; $20 monthly credits; 25 agents/functions; 50 vaults/personas. | https://www.notte.cc/pricing |
| Startup | Account plan | Monthly fee / commitment | $100; concurrency 100; $100 monthly credits; BYOK/BYOP; 200 vaults/personas. | https://www.notte.cc/pricing |
| Enterprise | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Custom limits, BYOC/on-prem, SSO, HIPAA, SLA. | https://www.notte.cc/pricing |
## Gotchas
- Current pricing page materially conflicts with docs: docs retains 100 forever/100 monthly/500 monthly hours, Free concurrency 2 in limits vs 5 pricing, Developer 30 min vs 120 min, Startup 3 h vs 5 h, and free feature gates. Use current pricing page for offered plans but require account confirmation.
- Free browser time is not free proxies/inference/serverless functions. No 4/8 resource guarantee and no general snapshots.
- Included monthly fees are credits, not fee+full usage. Top-ups and signup $10 never expire; monthly balances do.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Fifty concurrent browsers require Startup ($100/month as usage credit). Browser time alone is $0 for 8,800 hours. If 100 GB is managed residential traffic, usage is **$1,000**, not $1,100. Running browser functions for all 8,800 hours adds $440; model tokens are extra. Startup allows only five-hour sessions on the current pricing page, so eight-hour workdays need segmentation or Enterprise. Older docs have shorter limits: confirm account entitlements.
## Sources
- https://www.notte.cc/pricing
- https://docs.notte.cc/llms-full.txt
- https://docs.notte.cc/pricing
- https://docs.notte.cc/rate-limits