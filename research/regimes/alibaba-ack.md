# Alibaba Cloud ACK (Harbor backend) — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Harbor ACK is customer-managed Alibaba Kubernetes, distinct from Alibaba AgentRun/FC sandbox. Platform and underlying worker node/storage/network billing must be combined.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| ACK | User cluster | Cluster tier plus ECS/ECI worker capacity, disks and networking. No fixed sandbox4/8 rate established. | https://www.alibabacloud.com/product/kubernetes |
## Gotchas
- Harbor ACK is customer-managed Alibaba Kubernetes, distinct from Alibaba AgentRun/FC sandbox. Platform and underlying worker node/storage/network billing must be combined.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
A numerical total is not defensible from the public evidence. Need an eligible4/8 machine rate, C50 and8h limits, snapshot retention/price and network tariff. Resource template:35,200×CPU_rate×(0.30 if active else1)+70,400×RAM_rate+plan+50×snapshot_rate+max(0,100−free_egress)×egress_rate. Unknown inputs stay unknown, not zero.
## Sources
- https://www.alibabacloud.com/product/kubernetes
- https://github.com/laude-institute/harbor/blob/main/src/harbor/environments/ack.py