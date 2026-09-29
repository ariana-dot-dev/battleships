# Google Compute Engine (Windows Server): pricing regimes (as of 2026-09-28)
A Windows VM on GCE costs the machine price **plus a Windows Server image licence of $0.046 per visible vCPU-hour** (f1-micro / g1-small: $0.023/h flat). The licence has a 1-minute minimum, then per-second billing.
## Regime table
| # | Regime | When it applies | How billed | Numbers (us-central1) | Source |
|---|---|---|---|---|---|
| 1 | E2 custom + Windows licence | Custom shape | Per second after 1 min | vCPU $0.02290217/h, memory $0.003069707/GiB-h, + $0.046/vCPU-h licence. **4 vCPU/8 GiB = $0.1162 + $0.184 = $0.3002/h** | https://cloud.google.com/products/compute/pricing/general-purpose, https://cloud.google.com/compute/disks-image-pricing |
| 2 | E2 predefined + licence | Predefined type | Same | e2-highcpu-2 $0.04947; e2-standard-2 $0.06701; e2-highmem-2 $0.09040; e2-highcpu-4 $0.09894; e2-standard-4 $0.13402; e2-highcpu-8 $0.19788; e2-standard-8 $0.26805 (+ $0.046/vCPU-h) | same |
| 3 | Licence rule | Every Windows Server image | Per visible vCPU. Sustained-use, committed-use and Spot discounts do **not** apply to the licence | $0.046/vCPU-h ($0.184/h for 4 vCPU) | https://cloud.google.com/compute/disks-image-pricing |
| 4 | Persistent disk | Boot + data | Per GiB-hour provisioned, also while stopped | Balanced PD $0.000136986/GiB-h (~$0.10/GiB-month); SSD PD ~$0.17 | same |
| 5 | Snapshots | Standard snapshots | Compressed incremental GiB-hours | $0.000068493/GiB-h (~$0.05/GiB-month) | same |
| 6 | Egress (Premium Tier, default) | Internet | Tiered per GiB | 0-1 GiB free, then $0.12/GiB to 1 TiB, $0.11 to 10 TiB (NA/EU). Standard Tier: 200 GiB/month free | https://cloud.google.com/vpc/network-pricing |
| 7 | External IPv4 | In-use address | Per hour | $0.005/h | same |
| 8 | Free trial | New customer | $300 credit (Windows licences are not in Always Free) | | https://cloud.google.com/free |
| 9 | BYOL | Sole-tenant nodes | Your own licences (including Windows client) | not encoded | https://docs.cloud.google.com/compute/docs/instances/windows/ms-licensing |
## Gotchas
1. The licence ($0.184/h for 4 vCPU) costs **more than the E2 machine itself** ($0.116/h).
2. Committed-use and sustained-use discounts don't reduce the licence.
3. Premium-tier egress at $0.12/GiB is the priciest of the three hyperscalers. Standard Tier is cheaper but must be selected explicitly.
4. Windows client (10/11) is only available BYOL on sole-tenant nodes.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress.
Assumptions: 50 GiB balanced boot disk per VM (Windows images need ~50 GB, unverified), kept all month; ephemeral IPv4 while running.
| Regime | Compute + licence | Disks | Snapshots | Egress (99 GiB × $0.12) | IPv4 | **Monthly** |
|---|---|---|---|---|---|---|
| E2 custom 4/8 ($0.30017/h) | $2,641.46 | $250.00 | $2.50 | $11.88 | $44.00 | **$2,949.84** |
| e2-standard-4 4/16 ($0.31802/h) | $2,798.60 | $250.00 | $2.50 | $11.88 | $44.00 | $3,106.98 |
The licence alone is 8,800 × $0.184 = **$1,619.20** (identical to AWS and Azure).
Sources: https://cloud.google.com/compute/disks-image-pricing · https://cloud.google.com/products/compute/pricing/general-purpose · https://cloud.google.com/vpc/network-pricing · https://docs.cloud.google.com/compute/docs/instances/windows/ms-licensing