# Magnitude — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Current Magnitude | Local inference application | Own machine | Apache 2.0, no managed browser price | https://magnitude.run/ |
| Earlier browser automation SDK | Agent framework using external browser | Third-party browser + model | Kernel integration creates a Kernel browser; charge Kernel separately | https://docs.magnitude.run/integrations/kernel |
| Open source local software | Account plan | Monthly fee / commitment | $0; concurrency unpublished/custom; Own machine/compute required; NOT free managed hosting. | https://magnitude.run/ |
## Gotchas
- Domain now advertises local open-model inference for macOS/Linux/Windows, not agent VM rental. Historical browser docs are search-indexed but current docs hostname did not resolve in direct fetch.
- Client OS support is not cloud OS availability. Excluded from automatic hourly comparison; retained as an adjacent card to avoid mistaking framework license for free infrastructure.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Not independently priceable. Choose the actual browser/VM provider (e.g. Kernel) and inference provider; their tariffs apply to the 8,800 h workload, not a Magnitude cloud-hour rate.
## Sources
- https://magnitude.run/
- https://docs.magnitude.run/integrations/kernel
- https://magnitude.run