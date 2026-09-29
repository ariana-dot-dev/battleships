# Isle — Managed KiCad / FreeCAD computer-use environments
As of 2026-09-28. Public USD list subscriptions; application-specific desktops rather than a general VM API. Show HN 2026-09-07 item 49600473.
## Regimes
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Included environment time | Native product usage | Free 5 hours/month; Developer $29 includes 100 hours/month; overage unpublished. | [Primary pricing](https://www.tryisle.com/) |
| Stopped state | Native product usage | Stop archives environment and pauses compute billing; storage/retention pricing not separately stated. | [Primary pricing](https://www.tryisle.com/) |
| Free | Account plan | $0/month; 5 environment-hours/month; KiCad and FreeCAD. | [Primary pricing](https://www.tryisle.com/) |
| Developer | Account plan | $29/month; 100 environment-hours/month; no per-session runtime cap; priority support. | [Primary pricing](https://www.tryisle.com/) |
| Enterprise | Account plan | Unpublished / sales; Unlimited advertised environment-hours/concurrency; custom applications; contract required. | [Primary pricing](https://www.tryisle.com/) |
## Gotchas
- No CPU/RAM allocation or overage environment-hour price published.
- Developer limit 5 concurrent and 100 included hours does not meet 50 concurrent / 8,800 hours.
- Artifact checkpoint is not evidence of a full memory VM snapshot; state/export support scoped to application workflow.
- Environment containment is not a documented hypervisor isolation type; leave isolation null/unknown.
- Enterprise unlimited claims are contractual, not an entitlement on $29 plan.
## Required worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU, 50 GiB retained snapshots and 100 GiB egress.
**Sales quote required.** Neither 1-concurrent Free nor 5-concurrent Developer satisfies 50. Hardware size, 8,800-hour overage, retained artifacts and egress are not independently priced; do not multiply $29 by ten accounts or imply unapproved account pooling.
## Feature evidence
- https://www.tryisle.com/llms-full.txt
- https://www.tryisle.com/docs