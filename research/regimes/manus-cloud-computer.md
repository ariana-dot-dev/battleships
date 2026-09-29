# Manus Cloud Computer — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Standard | Persistent server | Month | $30;2 vCPU,4 GB,70 GBdisk; dedicatedpublic IP | https://help.manus.im/en/articles/15392078-understanding-cloud-computer-plans-and-billing |
| Advanced | Persistent server | Month | $50;2 vCPU,8 GB,120 GBdisk; dedicatedpublic IP | https://help.manus.im/en/articles/15392078-understanding-cloud-computer-plans-and-billing |
| Cancellation | Subscription ends | Destructive lifecycle | Server shut down and working files/tools/databases deleted; chat outputs retained | https://help.manus.im/en/articles/15392078-understanding-cloud-computer-plans-and-billing |
| Historical Basic | Search-cached older article | Not current live offer | $10/2 CPU/1 GB/35 GB no longer listed in live article | https://help.manus.im/en/articles/15392078-understanding-cloud-computer-plans-and-billing |
| Cloud Computer add-on eligibility | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Server rental is $30/$50; required Manus membership fee/number of instances not publicly verified from live pricing shell. | https://help.manus.im/en/articles/15392078-understanding-cloud-computer-plans-and-billing |
## Gotchas
- Live English article now offers only Standard and Advanced. Search index and old translations still show $10 Basic; do not normalize cachedBasic as current purchasable price.
- Setup docs explicitly say no graphical desktop interface; this is Ubuntu Server via command line/SSH, not the temporary browser computer used in ordinary Manus tasks.
- All public tiers have 2 vCPU, so 50 machines cannot satisfy requested 4 CPUeach by combining machines. Membership and fleet limit unknown.
- Storage, snapshot GiB-month and public IPv 4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
No published 4 vCPU tier: exact workload infeasible. As a non-equivalent 2 CPU/8 GB substitute,50 Advanced servers would cost $2,500/month in server rentals, if fleet quantity is allowed, plus any required membership/model charges. Cancellation deletes disk; no snapshot or 100 GiB egress price published.
## Sources
- https://help.manus.im/en/articles/15392078-understanding-cloud-computer-plans-and-billing
- https://help.manus.im/en/articles/15392128-how-to-set-up-and-access-your-cloud-computer
- https://manus.im/pricing