# Coasty — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Running Linux / Windows | Managed machine | Minute rounded down | $0.05/$0.09 per hour published defaults | https://coasty.ai/api/pricing |
| Stopped/suspended | Machine parked | Runtime keep-alive | $0.01/hour; creating/error/terminated free | https://coasty.ai/api/pricing |
| Snapshot | Managed VM | Per creation | $0.01, not $/GiB | https://coasty.ai/api/pricing |
| BYOK | Inference with own key | Platform inference exempt | Provider tokens + managed runtime still charged | https://coasty.ai/docs?section=pricing |
| Consumer subscriptions | Dashboard/schedules | Different credit balance | $19/200 cr; $50/600 cr; $99 Unlimited; boosts separate | https://coasty.ai/api/pricing |
| Synthetic test keys | Mock API/VMs | Not real compute | $0; maximum 5 mock machines | https://coasty.ai/docs/llms.txt |
| API pay as you go | Account plan | Monthly fee / commitment | $0; concurrency unpublished/custom; Prepaid USD wallet; $.20 provisioning balance gate, not fee. First $5 advertised. | https://coasty.ai/pricing |
| Developer API | Account plan | Monthly fee / commitment | $19; concurrency unpublished/custom; $25 monthly API credits; same $.05 managed step; consumer credits are separate. | https://coasty.ai/pricing |
## Gotchas
- Public pricing headline says managed machines included, but detailed API docs and machine rate card explicitly charge runtime. Use detailed meter and flag conflict; do not assume step price includes rented VM hours.
- GET /v 1/machines/pricing requires authentication (401 observed); published-default card is available anonymously at /api/pricing. No actual account-specific tariff was verified.
- Stateful inference session is not a VM session and has no per-minute meter; managed machine and scheduled consumer execution are different objects.
- Consumer subscription credits are quota units with variable dollar values, never the API wallet $.01 conversion. Parked-machine hourly charge cannot be encoded as per-GiB snapshot rate.
- Marketing claims of benchmark superiority and comparison prices are not used as pricing evidence.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Using published default Linux rates: **$440** for 8,800 running hours, or **$792** Windows. If all 50 are retained for a 730 h month, stopped hours=50×(730−176)=27,700, adding **$277**, so Linux **$717** / Windows **$1,069** before inference, snapshots and network. 1,100 created snapshots would add $11; 50 GiB storage does not imply 50 snapshots. Fifty live computers and 4/8 capacity need confirmation. Add $.05×managed_steps (or BYOK provider tokens), not 30% CPU.
## Sources
- https://coasty.ai/pricing
- https://coasty.ai/docs?section=pricing
- https://coasty.ai/docs/llms.txt
- https://coasty.ai/api/pricing
- https://coasty.ai/v1/machines/pricing