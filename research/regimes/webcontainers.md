# StackBlitz WebContainers — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
In-browser Node.js/WebAssembly execution SDK, not a hosted Linux machine. Enterprise embedding/licensing is the purchasable product; end-user local CPU/RAM not billed as cloud vCPU-hours.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| WebContainers API | Local browser execution | Commercial embedding licence; no hosted4/8 runtime rate. | https://webcontainers.io/enterprise |
## Gotchas
- In-browser Node.js/WebAssembly execution SDK, not a hosted Linux machine. Enterprise embedding/licensing is the purchasable product; end-user local CPU/RAM not billed as cloud vCPU-hours.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
The prescribed cloud4/8/50-concurrent workload is not comparable: execution consumes each client browser rather than provisioned Linux VMs. No normalized machine price.
## Sources
- https://webcontainers.io/enterprise
- https://webcontainers.io/