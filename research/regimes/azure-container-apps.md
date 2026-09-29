# Azure Container Apps (Consumption, Dedicated, Dynamic Sessions) — pricing regimes (as of 2026-09-28)
All rates below are from the **Azure Retail Prices API** (`prices.azure.com/api/retail/prices`, serviceName
"Azure Container Apps", eastus unless noted, fetched 2026-09-28), cross-checked with
https://learn.microsoft.com/en-us/azure/container-apps/billing. ACA Sandboxes are covered in
azure-container-apps-sandboxes.md.
Reference 4 vCPU / 8 GiB Consumption active: 4 x 0.0864 + 8 x 0.0108 = **$0.432/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Consumption, active | Replica starting, serving requests, or above idle thresholds; all jobs | Allocated vCPU-s + GiB-s, per second | $0.000024/vCPU-s ($0.0864/h), $0.000003/GiB-s ($0.0108/h) | Retail API "Standard vCPU/Memory Active Usage" |
| Consumption, idle | Revision at min-replica count, replica <0.01 vCPU, <1,000 B/s, no requests (not GPU, not jobs) | Reduced rate | $0.000003/vCPU-s, $0.000003/GiB-s | Retail API "Idle Usage" |
| Scale to zero | No replicas | Nothing | $0 | billing docs |
| HTTP requests | External requests (health probes free; TCP: 1 connection = 1 request) | Per million | $0.40/M after 2M free (1y SP $0.34, 3y $0.332) | Retail API "Standard Requests" |
| Base vs premium regions | Region choice | Different unit rates | Base ($0.000024/$0.000003): eastus, eastus2, centralus, westus, westus3, northeurope, swedencentral, germanywestcentral, francecentral, polandcentral, norwayeast, switzerlandnorth, japaneast, centralindia, eastasia, koreacentral. Premium ($0.000034/$0.000004, +42% CPU): westeurope, uksouth, westus2, southeastasia, australia*, canada*, italynorth, spaincentral | Retail API (all regions) |
| Savings plan 1y / 3y | Azure savings plan for compute | Discounted meters | 1y $0.0000204 / $0.00000255 (-15%); 3y $0.00001992 / $0.00000249 (-17%); idle 1y/3y $0.00000255 / $0.00000249 | Retail API savingsPlan |
| Dedicated plan (workload profiles) | Dedicated D/E-series profiles; billed per profile instance, not per app | vCPU-h + GiB-h + management fee | $0.057077/vCPU-h, $0.004978/GiB-h; SP 1y $0.04851545 / $0.0042313; 3y $0.04737391 / $0.00413174 | Retail API "Dedicated *" |
| Environment management hour | Any Dedicated profile, private endpoints, or planned maintenance (additive, **even on Consumption**) | Per environment-hour | $0.10/h eastus ($73/month; SP $0.085 / $0.083); westeurope $0.143; new "Environment" meters effective 2026-09-01 | Retail API; billing docs |
| Dynamic sessions: code interpreter | Built-in Python/Node/Shell session pools | Per allocated session, allocation to deallocation, **1-hour increments** | $0.03/session-hour (1y $0.0255, 3y $0.0249); Mexico Central $0.033; Belgium/Spain Central $0.039 | Retail API "Dynamic Sessions"; billing docs |
| Dynamic sessions: custom container | Your image in a session pool | Dedicated plan: pool runs on **E16** instances sized by active + ready sessions | E16 = 16 x 0.057077 + 128 x 0.004978 = $1.5504/h per node + $0.10/h environment | billing docs + Retail API |
| Serverless GPU | GPU apps (always active rate) | Per GPU-second on top of vCPU/RAM | NC T4 v3 $0.000073/s ($0.263/h); NC A100 v4 $0.000529/s ($1.904/h); dedicated GPU profile $4.4076/h | Retail API |
| Hybrid (Arc) | Arc-enabled Kubernetes | Per vCPU-h | $0.18/h | Retail API |
| Free grant | Per subscription per calendar month (Consumption) | Deducted | 180,000 vCPU-s + 360,000 GiB-s + 2M requests (~$5.40 + $0.80) | billing docs |
| Egress | Internet data out (Microsoft Global Network) | Tiered | First 100 GB/month free; $0.087/GB NA/EU (then $0.083 / $0.07 / $0.05); Asia $0.12 first tier | Retail API "Bandwidth" |
| New-account credit | New Azure accounts | Credits | $200 for 30 days (generic Azure, earlier research) | azure.microsoft.com/free |
## Gotchas
1. **West Europe and UK South are +42%** on CPU; North Europe, Sweden Central, Germany West Central and France Central carry US prices.
2. **Idle rate is strict**: any request, >0.01 vCPU or >1 KB/s of traffic flips the replica to the active rate.
3. **Consumption replicas max 4 vCPU / 8 GiB with a fixed 1:2 ratio** (docs knowledge, not re-verified).
4. **Code-interpreter sessions bill in whole hours** per session identifier: 1,000 one-minute sessions = $30, not $0.50.
5. **Custom-container session pools run on E16 dedicated nodes** you pay for whether sessions are busy or not, plus the $73/month environment fee.
6. **Private endpoints or planned maintenance add $0.10/h per environment** even on pure Consumption.
7. Previous research had GPU prices from a different region/page (T4 $0.324, A100 $2.3436); the eastus Retail API shows $0.263 and $1.904.
## Worked example
4 vCPU / 8 GiB, 50 replicas x 8 h/day x 22 days = **8,800 replica-hours** (scale to zero overnight), 30% CPU
(no effect: allocated billing), 50 GiB state (no snapshots; Azure Files not priced), 100 GiB egress (free 100 GB).
| Regime | Calculation | Total / month |
|---|---|---|
| Consumption active, eastus / northeurope | 8,800 x 0.432 = $3,801.60 - free grant $5.40 | **$3,796.20** |
| Consumption, westeurope (premium) | 8,800 x (4 x 0.1224 + 8 x 0.0144) = 8,800 x 0.6048 = $5,322.24 - free grant valued at premium rates ($6.12 + $1.44) | **$5,314.68** |
| Consumption + 3y savings plan, committed 24/7 | 50 x 730 x 0.35856 = $13,087.44 | **$13,087.44** (commit idle 16 h/day) |
| Dedicated D4 profile (4 vCPU/16 GiB) x 50, 176 h | 8,800 x 0.307956 = $2,710.01 + $73 environment | **$2,783.01** |
| Custom-container sessions on E16 (4 sandboxes/node by vCPU) | 13 nodes x 176 h x 1.550416 = $3,547.35 + $73 | **$3,620.35** |
| Code-interpreter sessions (size unpublished) | 50 x 176 h x $0.03 | **$264.00** (not the same machine: session vCPU/RAM unknown) |