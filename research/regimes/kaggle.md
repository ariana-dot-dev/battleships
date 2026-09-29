# Kaggle Notebooks — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Datalayer registry supports Kaggle interactive notebook/batchjobs withKaggle credentials. Notebookquota is not purchasableunlimited cloudcompute. Publicdocs page could not yield exact current quotas.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Notebook quota | User-account limits | No guaranteed priceable4/8/C50machine tier. | https://www.kaggle.com/docs/notebooks |
## Gotchas
- Datalayer registry supports Kaggle interactive notebook/batchjobs withKaggle credentials. Notebookquota is not purchasableunlimited cloudcompute. Publicdocs page could not yield exact current quotas.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
The requested50concurrent8hcloudVMs with50GiBsnapshots is not a documented purchasableKaggle offering. No normalized bill.
## Sources
- https://www.kaggle.com/docs/notebooks
- https://github.com/datalayer/code-sandboxes/blob/d9c39925d87447dab5f3f7f1bdf9451ec4ebca2a/code_sandboxes/providers.py