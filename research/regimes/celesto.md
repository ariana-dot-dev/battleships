# Celesto Cloud — Hosted sandboxed computers
As of 2026-11-08. Current dedicated pricing page publishes live USD usage rates. Homepage and cloud docs still describe older Free/Nano/Builder/Growth subscription sizes; conflict is preserved instead of combining them.
## Regimes
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Current paid sizes | Native product usage | Micro 1 CPU 2 GB 20 GB disk $0.015/h; Small 1/4/25 $0.02; Standard 2/4/30 $0.03; Memory 2/8/40 $0.04; Large 4/16/60 $0.08; XL 8/32/100 $0.16. Rates apply to newly created sandboxes; existing sandboxes keep their original rates. | [Primary pricing](https://celesto.ai/pricing) |
| Stopped | Native product usage | No runtime fee; included root disk retained free 30 days. | [Primary pricing](https://celesto.ai/pricing) |
| Conflicting older homepage catalogue | Native product usage | Free 30 Nano-hours; Nano$5/750 Nano-hours; Builder$29/300 standard-hours+$0.10 overage; Growth$199/2,500 standard-hours+$0.08 overage. Availability and mappings conflict with dedicated pricing; not auto-ranked. | [Primary pricing](https://celesto.ai/pricing) |
| Usage-based paid | Account plan | $0/month; No platform fee or minimum spend; up to 10 running computers, subject to capacity. | [Primary pricing](https://celesto.ai/pricing) |
| Trial | Account plan | $0/month; One retained Micro sandbox, 5 USD runtime credit for 30 days, no card; a top-up unlocks other sizes and unused trial credit lasts until its original deadline. | [Primary pricing](https://celesto.ai/pricing) |
## Gotchas
- Live pricing page and homepage/docs conflict: current Large 4 vCPU 16 GB versus older docs Large 4 vCPU 12 GB; old Builder/Growth subscriptions are not assumed purchasable alongside newPAYG.
- Published paid offer caps running computers at 10;50 concurrency unsupported without separately confirmed terms.
- All CPU sizes marked shared, not dedicated.
- Cloud stop/start preserves files; local SmolVM full-memory snapshot capability does not prove identical hosted semantics.
- Root disk retained free for 30 days stopped; charge/availability after 30 days and egress price unknown.
- Billing increment and per start minimum not published on pricing page.
- Trial 5 USD valid 30 days; unused credit lasts until its original deadline after a top-up; taxes/currency conversion extra.
- Root or sudo in every hosted computer. Docker is not preinstalled: the official guide installs it with sudo on a Standard or larger computer (https://celesto.ai/docs/celesto/features/docker.md).
- Browser and desktop need the browser-agent template (https://celesto.ai/docs/cloud/features/browser-and-display.md).
## Required worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU, 50 GiB retained snapshots and 100 GiB egress.
**No admissible 50-concurrent quote:** paid limit 10. Ignoring that constraint solely to verify arithmetic,8,800 Large 4 CPU 16 GB hours × $0.08 = **$704**. It is not a 4/8 SKU and not a confirmed 50-session deployment. CPU 30% does not reduce wall time price. Retained root disk 30 days free, but 50 GiB memory snapshots/egress unknown.
## Feature evidence
- https://celesto.ai/
- https://docs.celesto.ai/llms-full.txt
- https://docs.celesto.ai/cloud/computers
- https://docs.celesto.ai/cloud/features/resources
- https://github.com/CelestoAI/celesto
- https://celesto.ai/docs/cloud/overview.md
- https://celesto.ai/docs/celesto/features/docker.md
- https://celesto.ai/docs/cloud/features/browser-and-display.md