# boxes.dev — Cloud devboxes for coding agents
As of 2026-11-08. USD list prices. Plans and awake limits are PER PERSON, not whole organization. Models/subscriptions not resold. Show HN 2026-06-04 item 48399358.
## Regimes
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Overage box-hours | Native product usage, all paid plans | $0.40 per box-hour after the seat's included hours, from prepaid team credits. Bulk credit discounts: $100 = 5%, $250 = 7.5%, $500+ = 10%. | [Plans](https://boxes.dev/help/plans-and-box-hours), [Billing](https://boxes.dev/help/billing-and-usage) |
| Larger machines | Native product usage | 4 vCPU 16 GiB ≈1.39 box-hours/h; 8 vCPU 16 GiB 2; 8 vCPU 24 GiB ≈2.39; 8 vCPU 32 GiB ≈2.78. | [Plans](https://boxes.dev/help/plans-and-box-hours) |
| Sleeping | Native product usage | No box-hour charge; sleeping devboxes are not limited. | [Primary pricing](https://boxes.dev/) |
| Trial | Account plan | $0; 20 box-hours per user in total; 3 awake devboxes plus Template; 2 projects. | [Plans](https://boxes.dev/help/plans-and-box-hours) |
| Starter | Account plan | $19/seat/month; 50 box-hours per user; 5 awake plus Template; 5 projects; extra $0.40/box-hour. | [Plans](https://boxes.dev/help/plans-and-box-hours) |
| Pro | Account plan | $99/seat/month; 300 box-hours per user; 12 awake plus Template; 10 projects; extra $0.40/box-hour. | [Plans](https://boxes.dev/help/plans-and-box-hours) |
| Max | Account plan | $249/seat/month; 750 box-hours per user; 25 awake plus Template; 20 projects; extra $0.40/box-hour. | [Plans](https://boxes.dev/help/plans-and-box-hours) |
| Teams | Account plan | Volume pricing on request; custom seat and hour pools, concurrency limits, network allowlists, spend limits, audit logs. | [Primary pricing](https://boxes.dev/) |
## Gotchas
- Default 4 vCPU / 8 GiB, 100 GB disk; larger machines burn weighted box-hours (the provider says "about").
- One seat allows at most 25 awake devboxes (Max). Each seat must belong to a different real person.
- Self-serve teams can buy at most $1,000 of credits per calendar month (UTC). More needs an email to boxes.dev or the Teams plan.
- Template boxes consume box-hours while awake but do not occupy devbox slots.
- Included box-hours belong to each user; overage draws from the shared team prepaid balance.
- Sleeping devboxes are free; snapshot storage and egress rates are not itemized.
- Template box snapshots keep memory: Docker containers and system services keep running on each new devbox.
- Hypervisor type is not published.
## Required worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU, 50 GiB retained snapshots and 100 GiB egress.
One seat cannot hold 50 awake devboxes (Max = 25). Two Max seats plus overage (2 × $249 + 7,300 h × $0.40 = $3,418) exceeds the $1,000 monthly self-serve credit cap. **Self-serve scenario: 9 people on Max**, each with up to 25 awake devboxes: fees 9 × $249 = $2,241; included 6,750 h; overage 2,050 h × $0.40 = $820 (about $738 with the 10% bulk discount); known subtotal **about $2,980-$3,060**. 12 Max seats cover all hours for $2,988. Teams volume pricing is not published. Excludes extra Template hours, models, egress and unpublished snapshot terms.
## Feature evidence
- https://boxes.dev/help/plans-and-box-hours
- https://boxes.dev/help/billing-and-usage
- https://boxes.dev/help/sleep-wake-recover
- https://boxes.dev/help/template-box-snapshots
- https://boxes.dev/help/agent-command-reference
- https://boxes.dev/llms.txt
