# Google Agent Platform Sandbox (Computer Use) — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Agent Runtime idle-between-turns exception must not be generalized to sandbox CPU utilization. Sandbox compute billed on allocated resources.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| On-demand | Allocated sandbox resources | $0.085/vCPU-h + $0.009/GiB-h; nearest second. | https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing |
| Commitment discount | Consumption model eligibility | Displayed alternative Agent Compute $0.0765/$0.068; corresponding memory and commitment selection not verified, excluded from numeric modes. | https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing |
## Gotchas
- Agent Runtime idle-between-turns exception must not be generalized to sandbox CPU utilization. Sandbox compute billed on allocated resources.
- ENGINE_CARD cannot apply all independent free CPU/RAM/storage/request allowances exactly. Do not subtract them twice.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Assuming a 4-vCPU/8-GiB template is supported and C=50 granted: 8,800×(4×.085+8×.009) = $3,625.60. Fully available monthly free pools remove 50×.085+100×.009=$5.15 → $3,620.45, before storage, egress and model calls. Shape/session/snapshot feasibility must be confirmed; this is not a guaranteed bill.
## Sources
- https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing
- https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sandbox/computer-use
- https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sandbox/manage-sandboxes