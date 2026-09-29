# NeevCloud Agent Sandbox — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public product; per-hour price shown inside creation flow, no sandbox list amount published on reviewed public page. General NeevCloud CPU VM INR monthly rates are a different product and are not reused.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Running | Configured CPU/RAM/storage | Per-hour price shown before launch; public rate unavailable. | https://neevcloud.com/agent-sandbox |
| Paused | Disk state retained | Product says billing stops; clarify whether any retained-storage fee applies. | https://neevcloud.com/agent-sandbox |
## Gotchas
- Public product; per-hour price shown inside creation flow, no sandbox list amount published on reviewed public page. General NeevCloud CPU VM INR monthly rates are a different product and are not reused.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
A numerical total is not defensible from the public evidence. Need an eligible4/8 machine rate, C50 and8h limits, snapshot retention/price and network tariff. Resource template:35,200×CPU_rate×(0.30 if active else1)+70,400×RAM_rate+plan+50×snapshot_rate+max(0,100−free_egress)×egress_rate. Unknown inputs stay unknown, not zero.
## Sources
- https://neevcloud.com/agent-sandbox
- https://neevcloud.com/agentic-studio
- https://github.com/computesdk/computesdk/blob/81c7153a4a367672468967e89b9719ab0eb17b52/packages/neevcloud/README.md
- https://www.npmjs.com/package/@neevcloud/sdk