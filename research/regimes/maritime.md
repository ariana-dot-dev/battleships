# Maritime — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Base subscription | Retained agent or Computer slots | Monthly; no seconds/messages/actions meter | Free/Starter/Growth/Scale 3/20/100/500 slots; awake limits 1/5/25/60 | https://maritime.sh/pricing |
| Extra slots | Beyond retained count | Prorated purchase through cycle end | 1.50/1.25/1.00 dollars per month; deletion does not refund the purchased slot | https://maritime.sh/docs/billing |
| Resource add-ons | RAM >2 GB, disk >5 GB | Daily prorated monthly price | RAM $3/$2.50/$2 per GB; SSD $2/$1.50/$1 per 5 GB; ceilings 8 GB/100 GB | https://maritime.sh/docs/billing |
| Always-on | Opt out of sleep | Daily prorated monthly add-on | $20/machine-month | https://maritime.sh/docs/billing |
| Sleeping | Computer idle 5 minutes or close +30 seconds | No compute-time charge | $0 incremental; disk retained; memory retained seven days | https://maritime.sh/docs/computers |
| Student/startup promotions | Eligibility required | Not normal list pricing | 4 months Starter free for students; up to $10,000 startup credits | https://maritime.sh/pricing |
| Free agents only | Account plan | Monthly fee / commitment | $0; concurrency 1; 3 retained agents, not Computers. | https://maritime.sh/pricing |
| Starter | Account plan | Monthly fee / commitment | $20; concurrency 5; 20 retained machines; extra $1.50/machine-month; Computers allowed. | https://maritime.sh/pricing |
| Growth | Account plan | Monthly fee / commitment | $100; concurrency 25; 100 retained machines; extra $1.25/machine-month. | https://maritime.sh/pricing |
| Scale | Account plan | Monthly fee / commitment | $500; concurrency 60; 500 retained machines; extra $1/machine-month. | https://maritime.sh/pricing |
| Enterprise | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Custom limits, add-on rates and fleet. | https://maritime.sh/pricing |
## Gotchas
- The $1/machine headline assumes fully occupied plan slots, not 24×7 concurrency for every retained machine. Base CPU is 1; CLI documents --cpu overrides but no price or public ceiling for 4 CPU.
- No active-CPU discount: hosting is flat. Always-on adds $20 even though busy workloads already avoid automatic sleep.
- Documentation inconsistency: billing prose says all 3 free agents can run, while pricing and limits tables say 1; use table limit 1 and confirm. Computers are early access and require a paid plan.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
The exact 4-CPU workload is not verifiably offered at a published rate. At the published **1 CPU / 8 GB** substitute, 50 awake machines require Scale: $500 + 50×6×$2 = **$1,100/month**, before any disk expansion. Keeping all 50 explicitly always-on adds $1,000/month. This is not a 4/8 equivalent. 50 GiB of additional named snapshots and 100 GiB egress have no separate published tariff; built-in sleeping state is included.
## Sources
- https://maritime.sh/pricing
- https://maritime.sh/llms.txt
- https://maritime.sh/docs/billing
- https://maritime.sh/docs/computers
- https://maritime.sh/docs/configuration
- https://maritime.sh/docs/limits
- https://maritime.sh/docs/how-it-works
- https://maritime.sh/docs/frameworks
- https://maritime.sh/docs/web-apps