# Manus Cloud Computer — pricing regimes
As of 2026-11-08. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Standard | Persistent server | Month | $30;2 vCPU,4 GB,70 GBdisk; dedicatedpublic IP | https://help.manus.im/en/articles/15392078-understanding-cloud-computer-plans-and-billing |
| Advanced | Persistent server | Month | $50;2 vCPU,8 GB,120 GBdisk; dedicatedpublic IP | https://help.manus.im/en/articles/15392078-understanding-cloud-computer-plans-and-billing |
| Cancellation | Subscription ends | Destructive lifecycle | Server shut down and working files/tools/databases deleted; chat outputs retained | https://help.manus.im/en/articles/15392078-understanding-cloud-computer-plans-and-billing |
| Basic | Named in the Manus blog ("for simple Python scripts") | Not published | Specs and price not published; the billing article lists only Standard and Advanced | https://manus.im/blog/manus-cloud-computer |
| Location and storage | At setup | Not published | You select a location and configure storage capacity; the location list and extra-storage price are not published | https://help.manus.im/en/articles/15392128-how-to-set-up-and-access-your-cloud-computer |
| Cloud Computer add-on eligibility | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; Server rental is $30/$50; required Manus membership fee/number of instances not publicly verified from live pricing shell. | https://help.manus.im/en/articles/15392078-understanding-cloud-computer-plans-and-billing |
## Gotchas
- The billing article prices Standard and Advanced. The blog also names Basic, with no published specs or price; the card does not price it.
- The docs say the machine is command-line only (web terminal or SSH), with no graphical desktop.
- The published plans top out at 2 vCPU, so a 4 vCPU request is a size compromise. Membership requirement and fleet limit are not published.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
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