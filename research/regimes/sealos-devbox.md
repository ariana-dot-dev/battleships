# Sealos DevBox — pricing regimes (as of 2026-09-28)
Sealos Cloud (labring) is a Kubernetes PaaS. DevBox is its cloud dev-environment product. Everything in the account
(DevBoxes, deployed apps, managed databases, object storage) draws from **one flat monthly resource package**:
vCPU, RAM, disk, traffic, NodePorts and AI credits. There is **no metered or overage billing**. If you need more,
you upgrade manually. The bill is fixed however many hours DevBoxes run.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free trial | New users, no card | 7 days | 4 vCPU, 4 GB, 5 GB storage, 500 MB bandwidth, 100 AI credits | https://sealos.io/pricing/ |
| Starter | Small experiments | Flat/mo | $34 (new user **$7**): 2 vCPU, 2Gi, 10Gi disk, 10GB traffic, 4 NodePorts, 100 AI credits | same |
| Hobby | Side projects | Flat/mo | $70 (new user **$25**): 4 vCPU, 4Gi, 20Gi, 50GB, 8 NodePorts, 300 AI credits | same |
| Standard | Production | Flat/mo | $128: 8 vCPU, 16Gi, 50Gi, 300GB, 16 NodePorts, 800 AI credits, priority support, 99.99% SLA | same |
| Pro | Scale | Flat/mo | $512: 16 vCPU, 32Gi, 200Gi, 1TB | same |
| Team | Scale | Flat/mo | $2,030: 64 vCPU, 128Gi, 500Gi, 3TB | same |
| Enterprise package | Scale | Flat/mo | $12,451: 256 vCPU, 1024Gi, 1024Gi, 10TB | same |
| Custom | Bespoke package + support | Contact sales | null | same |
| New-user price | "First paid plan purchase · Eligibility confirmed in Cost Center" | Discounted package | Starter −79%, Hobby −64%; recurrence not stated | same |
| Overage | Allocating beyond the package | **Not possible**. Upgrade required ("Your plan price covers the resources listed") | $0 | same |
| DevBox running vs sleeping | Normal shutdown | No separate charge (flat). Sleeping box **keeps its NodePort** against quota | — | https://sealos.io/blog/ssh-gateway-kubernetes-nodeport-solution/ |
| Cold shutdown | Release NodePort | Port returned to pool, new port on restart | — | same |
| Releases (OCI images) | Versioned snapshot of a DevBox | Storage cost not stated | null | https://sealos.io/docs/guides/devbox/release/ |
| Custom domain + SSL | All paid plans | Included | $0 | pricing FAQ |
| Self-hosted Sealos | Own cluster | Sealos Sustainable Use License (source-available, no third-party cloud resale) | licence fee n/a | https://github.com/labring/sealos |
Hourly equivalents (price / 730 h): Starter $0.0466, Hobby $0.0959, Standard $0.1753, Pro $0.7014, Team $2.7808, Enterprise $17.056.
### Dated notes
- Older third-party material cites pay-as-you-go "from $0.01 per CPU hour". It is no longer on the pricing page and no current metered rates are published.
- **Correction:** search snippets saying "Sealos pricing: CPU $40, RAM $20, Volume $3, Egress $2.50" are the **Railway** rates from Sealos's comparison calculator (verified 2026-08-21 on the page), not Sealos prices.
## Gotchas
1. **RAM is thin on the cheap plans** (1 GiB per vCPU on Starter/Hobby). Any 2 GiB-per-vCPU workload jumps to Standard or higher.
2. **Resources are pooled across everything** in the plan (DBs, apps, object storage), not per DevBox.
3. **Idle time is not rewarded.** The package costs the same at 1% or 100% usage. Sealos's own calculator puts break-even vs Railway at about 16% average utilisation.
4. **NodePorts are a hidden cap** (4/8/16 on the small plans). Sleeping DevBoxes still hold theirs unless cold-shut-down.
5. Traffic caps are hard package limits, and no per-GB overage price is published.
6. Package stacking (e.g. 4 × Team instead of Enterprise) is not documented.
## Worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days, 30% CPU, 50 GiB snapshots, 100 GiB egress.
Peak allocation = 50 × (4 vCPU, 8 GiB) = **200 vCPU / 400 GiB** plus 50 GiB storage and 100 GB traffic.
| Regime | Fits? | Monthly total |
|---|---|---|
| Team ($2,030: 64 vCPU / 128Gi) | No (200 vCPU needed) | — |
| Enterprise package (256 vCPU / 1024Gi / 1024Gi / 10TB) | Yes | **$12,451** flat (≈ $1.41 per sandbox-hour at 8,800 h) |
| 4 × Team, if stacking is allowed (unverified) | 256 vCPU / 512Gi | $8,120 |
| Custom (sales) | Yes | unpublished |
| Only if DevBoxes can share CPU (30% util, overcommit not documented) | — | not modeled |
CPU utilisation, hours, snapshot GiB (within disk) and egress (within 10TB) do not change the bill.