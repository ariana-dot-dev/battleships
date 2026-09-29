# AWS EC2 Windows Server: pricing regimes (as of 2026-09-28)
Windows on EC2 is the Linux instance price **plus a licence-included surcharge**. The surcharge is **$0.046 per vCPU-hour** on current general-purpose/compute families (c7i, m7i). Burstable t3 has a smaller, non-linear surcharge. Billing is per second with a 60 s minimum. Every price below was re-read from the official AWS metered price JSON for us-east-1 (Linux and Windows files) on 2026-09-28.
## Regime table
| # | Regime | When it applies | How billed | Numbers (us-east-1) | Source |
|---|---|---|---|---|---|
| 1 | On-Demand c7i/m7i, Windows licence included | Default | Per second, **60 s minimum**, while running | Linux → Windows: c7i.large 2/4 $0.08925 → $0.18125; m7i.large 2/8 $0.1008 → $0.1928; **c7i.xlarge 4/8 $0.1785 → $0.3625**; m7i.xlarge 4/16 $0.2016 → $0.3856; c7i.2xlarge $0.357 → $0.725; m7i.2xlarge $0.4032 → $0.7712; c7i.4xlarge $0.714 → $1.45; m7i.4xlarge $0.8064 → $1.5424. Surcharge exactly **+$0.046/vCPU-h** | https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/ec2/USD/current/ec2-ondemand-without-sec-sel/US%20East%20(N.%20Virginia)/Windows/index.json, /Linux/index.json, https://aws.amazon.com/ec2/pricing/on-demand/ |
| 2 | Burstable t3, Windows | t3 family | Same billing. Baseline CPU plus CPU credits | t3.medium 2/4 $0.06 (+$0.0184 vs Linux); t3.large 2/8 $0.1108 (+$0.0276); t3.xlarge 4/16 $0.24 (+$0.0736); t3.2xlarge 8/32 $0.48 (+$0.1472). The surcharge is **not** a flat per-vCPU rate | same |
| 3 | Stopped | Instance stopped | Compute $0. EBS and any Elastic IP still bill | EBS gp3 $0.08/GB-month | https://aws.amazon.com/ebs/pricing/ |
| 4 | Snapshots | EBS snapshots | GB-month of stored snapshot data | $0.05/GB-month (standard tier) | https://aws.amazon.com/ebs/pricing/ |
| 5 | Public IPv4 | Any public address | Per hour, in use or idle | $0.005/h ($3.65/month) | https://aws.amazon.com/vpc/pricing/ |
| 6 | Internet egress | Account-wide | 100 GB/month free (all services/regions), then tiered | $0.09/GB first 10 TB (list value, not re-fetched) | https://aws.amazon.com/ec2/pricing/on-demand/ |
| 7 | Savings Plans / RIs / Spot | Commitment or interruptible | Discounts apply to compute. The licence part is largely undiscounted | Not encoded | https://aws.amazon.com/ec2/pricing/ |
| 8 | BYOL | Dedicated Hosts only | Your own licences (including Windows 10/11 client) | n/a | AWS docs |
## Gotchas
1. The licence roughly **doubles** a 4-vCPU compute instance: c7i.xlarge goes from $0.1785 to $0.3625/h.
2. **Windows Server only** on shared tenancy. Windows 11 needs BYOL on Dedicated Hosts, or WorkSpaces/Windows 365.
3. The t3 surcharge scales oddly: t3.large pays more per vCPU than t3.medium. Look up the exact size.
4. Windows AMIs need a larger root volume (≥30 GB) and take 2-5 min to be RDP-ready. EC2 Fast Launch can shorten this.
5. No agent API: you drive it over RDP, SSM Run Command, or your own driver.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress.
Assumptions: instances are stopped outside working hours; 50 GiB gp3 root each (persisting all month); auto-assigned public IPv4 only while running.
| Regime | Compute | EBS (50 × 50 GiB) | Snapshots | Egress | IPv4 | **Monthly** |
|---|---|---|---|---|---|---|
| c7i.xlarge Windows ($0.3625) | $3,190.00 | $200.00 | $2.50 | $0 (100 GB free) | $44.00 | **$3,436.50** |
| t3.xlarge Windows 4/16 ($0.24); 30% util is under the 40% baseline, so no surplus credits | $2,112.00 | $200.00 | $2.50 | $0 | $44.00 | **$2,358.50** |
| Same c7i.xlarge on Linux (reference) | $1,570.80 | $200.00 | $2.50 | $0 | $44.00 | $1,817.30 |
The Windows licence alone costs 8,800 × 4 × $0.046 = **$1,619.20/month**.
Sources: https://aws.amazon.com/ec2/pricing/on-demand/ · AWS metered price JSON (us-east-1 Linux/Windows) · https://aws.amazon.com/ebs/pricing/ · https://aws.amazon.com/vpc/pricing/