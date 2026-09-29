# Kedge — preview estimates, product scope matters
As of 2026-09-28. [Public preview launch July 29 2026](https://news.ycombinator.com/item?id=49099434). [Billing docs](https://kedge.dev/docs/billing) publish estimates; launch author said paid billing was not live. No paid invoice validated.
| Regime | Applies when | Meter / numbers | Source |
|---|---|---|---|
| Active resource use | Running VM | CPU 15 USD/vCPU-month ÷730 = 0.0205479452/vCPU-h; RAM 5 USD/GiB-month ÷730 = 0.0068493151/GiB-h; actual CPU and working-set RAM | [Billing](https://kedge.dev/docs/billing) |
| Suspended / scaled-zero | Persistent machine or app idle | No compute; stored bytes continue | [Runtime](https://kedge.dev/docs/runtime) |
| Storage | Retained written data |0.05 USD/GiB-month; VM memory snapshot price unknown | [Billing](https://kedge.dev/docs/billing), [volumes](https://kedge.dev/docs/volumes) |
| Egress | Outbound |0.01 USD/GiB | [Billing](https://kedge.dev/docs/billing) |
| Preview allowance | Every account |5 USD/month resource credit; separate 2 USD agent-model allowance | [Billing](https://kedge.dev/docs/billing) |
| Disposable sandbox | One-shot or held execution |5-minute idle expiry; held TTL at most 1 hour;10-minute command limit | [Sandboxes](https://kedge.dev/docs/sandboxes) |
## Gotchas
Rates are preview estimates, not timeless list prices. Hypervisor unnamed. Sizes and concurrency ceilings unpublished. CPU caps are not reservations; RAM uses working set. App deploy snapshots do not establish billable snapshot storage at the volume price.
## Required worked example
50 ×8 h/day ×22 days =8,800 hours,4 vCPU/8 GiB,30% CPU. Disposable sandbox cannot remain held for 8 hours. For the **alternative persistent workspace**, assuming 8 GiB billable working set and sufficient capacity, compute is `8800 × (4×.30×15/730 +8×5/730)` = **$699.178082**.100 GiB egress adds$1. Retained 50 GiB ordinary volume would add$2.50, but is not a price for 50 GiB memory snapshots.5 USD monthly resource credit may be deducted once if applicable; models/unknown snapshot cost remain outside. No complete confirmed bill.