# ComputerUse.space — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| 8 GB ThinkCentre | Planned dedicated host | 30-day rental | $24.99; 8 GB installed host RAM; 80 GB planned customer storage | https://computeruse.space/ |
| 16 GB ThinkCentre | Planned dedicated host | 30-day rental | $39.99; 16 GB installed RAM; 150 GB planned customer storage | https://computeruse.space/ |
| Annual | Planned commitment | 20% advertised discount | No active checkout or guaranteed inventory | https://computeruse.space/ |
| Prelaunch reservation terms | Account plan | Monthly fee / commitment | $0; concurrency unpublished/custom; No purchasable inventory or live payments. Rental targets are $24.99/$39.99 every 30 days; annual discount is advertised at 20%. | https://computeruse.space/ |
## Gotchas
- Explicit prelaunch: account/management APIs and a Linux owner pilot exist, but customer rentals, live payments and verified inventory are not open. Modes are beta-only.
- Installed host RAM is not fully available guest RAM. Customers do not receive Proxmox host administration. Windows readiness, editing performance, backups, proxies and storage add-ons need verification.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Arithmetic 50×$24.99=$1,249.50 per 30 days, or 50×$39.99=$1,999.50, is only a **prelaunch target**, not an available 50 computer quote or 4/8 guarantee. AI tokens, paid apps, proxy and optional storage separate.
## Sources
- https://computeruse.space/
- https://computeruse.space/docs