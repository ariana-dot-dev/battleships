# PandaStack — hosted sandbox regimes
As of 2026-09-28. USD public list rates, independently matched between the [pricing page](https://www.pandastack.ai/pricing/), [billing docs](https://docs.pandastack.ai/docs/getting-started/billing/) and [live rate-card API](https://api.pandastack.ai/v1/pricing). Discovery was a [July 8 2026 comparison article](https://www.pandastack.ai/blog/best-e2b-alternatives-2026/), not proof of the exact original launch date.
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Running | Hosted sandbox, app or database | Active CPU-seconds plus resident working-set GiB-seconds | $0.054/active-vCPU-hour; $0.0162/working-set-GiB-hour; per-second | [Live API](https://api.pandastack.ai/v1/pricing) |
| Burstable | All first-party templates | Same usage rate, no separately priced burst credits found | 8 exposed vCPU; Free up to2 sustained cores, Pro/Team up to8 with fair-share contention | [Templates](https://docs.pandastack.ai/docs/templates/overview/), [pricing](https://www.pandastack.ai/pricing/) |
| Paused | Guest CPU frozen on host | CPU inactive; RAM billing unclear | Do not apply zero-cost full-hibernation assumption | [Lifecycle](https://docs.pandastack.ai/docs/sandboxes/lifecycle/) |
| Hibernated | Memory+disk saved and VM released | No CPU/RAM billing; state currently included per pricing FAQ | $0 compute; $0 retained hibernation state on current pricing page | [Pricing FAQ](https://www.pandastack.ai/pricing/), [lifecycle](https://docs.pandastack.ai/docs/sandboxes/lifecycle/) |
| Free plan | 5 concurrent, max4GiB RAM,1-hour lifetime | Monthly grant, then pause; no surprise overage | $0 base + $5.40 credit/month;60 creates/hour | [API](https://api.pandastack.ai/v1/pricing) |
| Pro plan | Up to50 concurrent,16GiB RAM,600 creates/hour | Fee converts to usage credit | $20/month minimum spend; not $20 added to full compute bill | [API](https://api.pandastack.ai/v1/pricing) |
| Team plan | Up to500 concurrent,64GiB RAM,6,000 creates/hour | Fee converts to usage credit | $99/month minimum spend | [API](https://api.pandastack.ai/v1/pricing) |
| Volume storage | Provisioned block volumes above account plan quota | GiB-month | $0.15; included Free1GiB, Pro100GiB, Team2,500GiB | [Volume docs](https://docs.pandastack.ai/docs/volumes/overview/) |
| Network | Ingress and egress | Not billed subject to fair use | $0/GB | [API](https://api.pandastack.ai/v1/pricing), [pricing](https://www.pandastack.ai/pricing/) |
| Enterprise / self-host | Dedicated/BYOC contract or Apache2 software on own machines | Negotiated / external infrastructure | Unknown, not free hosted compute | [Pricing](https://www.pandastack.ai/pricing/), [self-host](https://docs.pandastack.ai/docs/self-host/overview/) |
## Gotchas
- RAM is fixed in template; **all first-party templates expose8vCPU**. Team's API quota of16vCPU and Enterprise's64 do not prove a supported larger create size. Use conservative actual template limits. [Templates](https://docs.pandastack.ai/docs/templates/overview/).
- CPU and RAM both track use, not just CPU. Need resident GiB over time; 30% CPU gives no memory-utilization assumption. [Billing](https://docs.pandastack.ai/docs/getting-started/billing/).
- Hibernation pricing conflicts with lifecycle prose saying retained state costs storage. The explicit pricing FAQ currently says included. Recheck before relying on free retained state. [Pricing](https://www.pandastack.ai/pricing/), [lifecycle](https://docs.pandastack.ai/docs/sandboxes/lifecycle/).
- Plain fork is filesystem-only; fork-tree preserves RAM+disk. Warm single-child fork brings the parent down. [Fork docs](https://docs.pandastack.ai/docs/sandboxes/snapshots-and-forks/).
- Volumes are **host-local**, readonly multi-attach or exclusive writer. Quota docs describe hard limits despite price-page overage language. Cross-host staging not shipped. [Volumes](https://docs.pandastack.ai/docs/volumes/overview/).
- Current official compliance docs expressly disclaim SOC2, ISO27001 and HIPAA attestations. SAML plan presentation also differs between live API and pricing page. [Compliance](https://docs.pandastack.ai/docs/security/compliance/).
## Required worked example
4 vCPU /8GiB requested;50 concurrent ×8h/day ×22days = **8,800 sandbox-hours**;30%CPU;50GiB-month hibernation state;100GiB egress. Pro permits50 and has800GiB account memory plus400vCPU capacity. Build an8GiB template. Mandatory8vCPU affects utilization interpretation:
1. **Same absolute work as 4vCPU at30%** =1.2 active cores, or15% of the8-core template. Assume all8GiB remain resident (RAM utilization not supplied):
   - CPU `8,800 × 4 × .30 × .054 = $570.24`.
   - RAM `8,800 × 8 × .0162 = $1,140.48`.
   - Total compute **$1,710.72**. Pro credit-converting minimum: `max($20,$1,710.72) = $1,710.72`.
2. This represents twice the absolute CPU work of case1.
Current pricing FAQ gives50GiB hibernation state $0 and100GiB egress $0, subject to stated conflict/fair-use caveats. No one-time/Free-plan grant applied to Pro. Unknown startup/minimum charges and capacity availability can still affect a real invoice. Optional persistent-volume charges are separate; do not turn all retained VM state into provisioned volume storage.