# Hugging Face Jobs (hf-sandbox backend) — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Public Jobs rates, not Spaces free hardware. Harbor hf-sandbox wraps Jobs; an interactive wrapper does not change underlying job billing. Jobs bill Starting and Running, per minute; builds free. Exposed ports add $0.01/job-hour.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| CPU Jobs | Starting/Running billed per minute | 2/16 $0.01/h; 8/32 $0.03/h; 16/124 $1/h; 32/256 $1.90/h. | https://huggingface.co/docs/hub/en/jobs-pricing |
| Ports | One or more public exposed ports | $0.01/job-hour extra, not per port. | https://huggingface.co/docs/hub/en/jobs-pricing |
| GPU Jobs | Alternative hardware, not CPU price additive | T4-small $0.40/h, T4-medium $0.60/h, L4 $0.80/h, A10G-small $1/h, A100-80GB $2.50/h, H200 $5/h; whole machine rates. | https://huggingface.co/docs/hub/en/jobs-pricing |
## Gotchas
- Public Jobs rates, not Spaces free hardware. Harbor hf-sandbox wraps Jobs; an interactive wrapper does not change underlying job billing. Jobs bill Starting and Running, per minute; builds free. Exposed ports add $0.01/job-hour.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
Cheapest adequate CPU preset is 8 vCPU/32 GB at $0.03/h: $264 for 8,800h. Exposed-port surcharge if required adds $88 → $352. This overprovisions resources; 30% CPU does not discount wall-clock price. Ephemeral jobs do not establish 50GiB retained snapshots; C=50 needs quota validation.
## Sources
- https://huggingface.co/docs/hub/en/jobs-pricing
- https://huggingface.co/docs/hub/en/jobs-overview
- https://pypi.org/project/hf-sandbox/