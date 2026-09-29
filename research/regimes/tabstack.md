# Tabstack — Managed browser automation / web data API
As of 2026-09-28. Public USD list plans; browser/model/orchestration bundled. HN launch 2026-01-14 (item 46620358). Monthly credits are action units, not dollar credits.
## Regimes
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Endpoint credits/action | Native product usage | Extract Markdown 10; Extract JSON 50; Generate 100; Automate 100; Research Fast 250; Balanced 350. Variable actions/task. | [Primary pricing](https://tabstack.ai/) |
| Overage | Native product usage | Starter/Team $0.30/1,000 credits; Pro $0.25/1,000. E.g. one 100-credit automate action is $0.03 or $0.025 at marginal overage; not a per-task guarantee. | [Primary pricing](https://tabstack.ai/) |
| Starter | Account plan | $10/month; 100,000 credits/month; $0.30/1,000 overage; Fast research. | [Primary pricing](https://tabstack.ai/) |
| Team | Account plan | $99/month; 500,000 credits/month; $0.30/1,000 overage; Fast+Balanced. | [Primary pricing](https://tabstack.ai/) |
| Pro | Account plan | $499/month; 3,000,000 credits/month; $0.25/1,000 overage. | [Primary pricing](https://tabstack.ai/) |
| Enterprise | Account plan | Unpublished / sales; Custom API quotas, support and SLA. | [Primary pricing](https://tabstack.ai/) |
## Gotchas
- No vCPU/RAM SKU or hourly browser rental offered on reviewed pricing; unsuitable as raw VM substitute.
- Automate and Research charge per action; one task may execute many actions.
- Exact plan-specific concurrency/requests-per-minute not established here.
- 10,000 trial credits cannot be represented as $10 of compute credit; do not monetize without specifying endpoint mix.
## Required worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU, 50 GiB retained snapshots and 100 GiB egress.
**Not estimable for this product**: no documented comparable CPU/RAM capacity and unit compute rate. Do not convert a browser-hour, action, subscription credit, or external Kubernetes bill into a VM-hour. Snapshot and egress unknowns remain unknown.
## Feature evidence
- https://docs.tabstack.ai/llms.txt
- https://docs.tabstack.ai/pricing/index.md
- https://github.com/mozilla/pilo