# LangSmith Sandboxes — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public list rates are expressed in LCU and LSU. $1.50/LCU and $1/LSU; CPU 0.0384 LCU/vCPU-h, RAM 0.0123 LCU/GiB-h, storage 0.000123 LSU/GiB-h. Credits are separate compute and storage pools, not fungible dollars.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Developer | One free seat, max 10 sandboxes | No fee; separate included 5 LCU / 1 LSU sandbox allowances. | https://www.langchain.com/pricing |
| Plus | 50-concurrent example requires paid quota confirmation | $39/seat/month; same sandbox resource rates. | https://www.langchain.com/pricing |
| Enterprise | Self-host/hybrid/custom quotas | Sales quote plus own infrastructure where applicable. | https://www.langchain.com/pricing |
## Gotchas
- Public list rates are expressed in LCU and LSU. $1.50/LCU and $1/LSU; CPU 0.0384 LCU/vCPU-h, RAM 0.0123 LCU/GiB-h, storage 0.000123 LSU/GiB-h. Credits are separate compute and storage pools, not fungible dollars.
- Storage meter scope versus retained filesystem snapshot pricing needs invoice confirmation.
- Plus concurrency and maximum sandbox size not stated on pricing page.
- ENGINE_CARD cannot apply all independent free CPU/RAM/storage/request allowances exactly. Do not subtract them twice.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Before allowances and plan: 35,200×$0.0576 + 70,400×$0.01845 = $3,326.40. Plus one seat adds $39. Compute allowance subtracts $7.50 → $3,357.90 before storage/egress. A 50 GiB storage meter held 730h costs $4.4895 less $1 storage allowance = $3.4895, but snapshot applicability is unverified. Developer 10-sandbox cap cannot serve C=50; Plus quota needs confirmation.
## Sources
- https://www.langchain.com/pricing
- https://docs.langchain.com/langsmith/sandboxes
- https://docs.langchain.com/langsmith/sandbox-snapshots
- https://docs.langchain.com/langsmith/sandbox-mounts
- https://docs.langchain.com/langsmith/sandbox-auth-proxy