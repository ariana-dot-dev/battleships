# boxes.dev — Cloud devboxes for coding agents
As of 2026-09-28. USD list prices. Plans and awake limits are PER PERSON, not whole organization. Models/subscriptions not resold. Show HN 2026-06-04 item 48399358.
## Regimes
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Starter box-hours | Native product usage | $0.75/hour after 40 included hours per paiduser;19 USD/seat/month. | [Primary pricing](https://boxes.dev/) |
| Pro box-hours | Native product usage | $0.60/hour after 250 included hours per paiduser;99 USD/seat/month. | [Primary pricing](https://boxes.dev/) |
| Larger machines | Native product usage | 4 vCPU 16 GiB≈1.39 box-hours/h;8 vCPU 16 GiB 2;8 vCPU 24 GiB≈2.39;8 vCPU 32 GiB≈2.78. | [Primary pricing](https://boxes.dev/) |
| Sleeping | Native product usage | No box-hour charge; unlimited sleeping devboxes advertised. | [Primary pricing](https://boxes.dev/) |
| Trial | Account plan | $0/month; 10 box-hours/user total;2 awake devboxes plus Template;2 projects. | [Primary pricing](https://boxes.dev/) |
| Starter | Account plan | $19/month; Per user/paidseat:40 box-hours/month,4 awake plus Template;5 projects; extra$0.75/box-hour. | [Primary pricing](https://boxes.dev/) |
| Pro | Account plan | $99/month; Per user/paidseat:250 box-hours/month,10 awake plus Template;10 projects; extra$0.60/box-hour. | [Primary pricing](https://boxes.dev/) |
| Teams | Account plan | Unpublished / sales; Custom seats/hour pools, resources/limits and deployment; contact sales. | [Primary pricing](https://boxes.dev/) |
## Gotchas
- Default 4 vCPU/8 GiB 100 GBdisk; larger machines burn weighted box-hours. About 1.39/2.39/2.78 multipliers are approximate.
- Single paidseat does not satisfy 50 awake devboxes. Multiple seats must be assigned to real users; do not buy fake seats solely to bypass limits.
- Template boxes consume box-hours while awake but do not occupy devbox slots; Team Template source maintenance wakes bill admin, ordinary devbox maintenance-onlywakes free.
- Included box-hours are per user, overage draws shared team prepaid balance; unequal usage per person can leave some included hours unused.
- Sleeping devboxes free; snapshot storage andegress rates not separately itemized; 100 GiBegress not assumed free.
- Monthly price not fee-as-credit: 19 includes 40 hours,99 includes 250 hours.
- Exact hypervisor type not established by reviewed docs.
## Required worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU, 50 GiB retained snapshots and 100 GiB egress.
A single self-serve seat cannot meet 50 concurrency. **Conditional 5-person Pro scenario**, each legitimately owns 10 boxes and consumes 1,760 hours/month: fee 5×99=$495; usage 5×(1,760−250)×.60=$4,530; known subtotal **$5,025**. This is not guaranteed organization-pooled billing or an Enterprise quote. Excludes extra Template hours, models, egress and separately unpublished snapshot terms. At 30% CPU wall-time price unchanged; full total unknown.
## Feature evidence
- https://boxes.dev/help/plans-and-box-hours
- https://boxes.dev/help/billing-and-usage
- https://boxes.dev/help/sleep-wake-recover
- https://boxes.dev/help/template-box-snapshots
- https://boxes.dev/llms.txt