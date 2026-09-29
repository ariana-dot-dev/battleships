# Lightpanda Cloud — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Cloud | Managed headless browser | Browser hour | Explorer: 10 hours/month free; Builder: $19/month includes 300 hours, then $0.08/hour. | https://lightpanda.io/pricing |
| Self-host | Own environment | Own compute | Open-source browser; not free managed hosting | https://github.com/lightpanda-io/browser |
| Proxy | Bring your own | External bill | No bundled residential GB rate | https://lightpanda.io/pricing |
| Explorer | Account plan | Monthly fee / commitment | $0; concurrency 5; 10 hours/month; BYOP; do not price unlimited usage at free tier. | https://lightpanda.io/pricing |
| Builder | Account plan | Monthly fee / commitment | $19; concurrency 30; 300 hours×$.08=$24 overage-equivalent included value; then $.08/hour. BYOP. | https://lightpanda.io/pricing |
| Enterprise | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Custom limits/volume, on-prem/private cloud, SLA. | https://lightpanda.io/pricing |
## Gotchas
- Resource-footprint and performance marketing comparisons are not CPU/RAM allocation guarantees. Compatibility is a CDP/WebAPI subset, not full Chrome desktop.
- Builder concurrency 30 cannot fulfill 50 simultaneous browsers without Enterprise. Card preserves unknown resources null.
- Cloud docs: metered by the second. CDP connection closes after 15 minutes regardless of quota; MCP idle timeout 5 minutes, active sessions can continue. Channel-specific cap cannot be represented by one max_session_h.
- No graphics rendering pipeline: screenshot CDP returns a placeholder, not actual rendered page pixels. Local PNG/PDF output is text-only per README. This is not a screenshot-driven computer-use desktop substitute.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Fifty concurrent sessions require **Enterprise**, since Builder permits 30. Ignoring that constraint, Builder would be $19+(8,800−300)×$.08=$699, but this is not an eligible quote. CDP sessions also close at 15 minutes, requiring segmentation. No graphics-rendered desktop, 4/8 resource guarantee, or priced general snapshots.
## Sources
- https://lightpanda.io/pricing
- https://lightpanda.io/docs/
- https://github.com/lightpanda-io/browser
- https://lightpanda.io/docs/run-on-lightpanda-cloud/limits-and-billing
- https://lightpanda.io/docs/core-concepts/architecture-overview
- https://raw.githubusercontent.com/lightpanda-io/browser/main/README.md