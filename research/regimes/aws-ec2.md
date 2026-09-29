# AWS EC2 (reference VMs) — pricing regimes (as of 2026-09-28)
Plain VMs, fixed shapes, per-second billing with a 60 s minimum (Linux and Windows). Storage (EBS), public IPv4,
NAT and egress are all separate. On-demand and Reserved Instance rates come from the **AWS Price List API**
(AmazonEC2 index.csv, version 20260925174521, Linux / shared tenancy / no pre-installed software); Savings Plans from
AWSComputeSavingsPlan (2026-09-25); Spot from AWS's own spot feed (website.spot.ec2.aws.a2z.com/spot.js, the data
behind aws.amazon.com/ec2/spot/pricing, fetched 2026-09-28). Earlier research used vantage.sh (third-party); all
figures below are now first-party.
Reference 4 vCPU / 8 GiB = **c7i.xlarge $0.1785/h** (us-east-1); Graviton c7g.xlarge **$0.145/h**.
## Regime table
| Regime | When it applies | How billed | Numbers (xlarge = 4 vCPU) | Source |
|---|---|---|---|---|
| On-demand x86 us-east-1 | Default | Per second, 60 s min | c7i.xlarge (4/8) $0.1785; m7i.xlarge (4/16) $0.2016; ladder is linear (large = /2, 2xlarge = x2 ...) | Price List API |
| On-demand x86 eu-north-1 (cheapest EU checked) | EU pin | Same | c7i.xlarge $0.1911; m7i.xlarge $0.2142 (eu-west-1 $0.19152 / $0.2247; eu-central-1 $0.2037 / $0.2415) | Price List API |
| On-demand x86 ap-south-1 (cheapest Asia checked) | Asia pin | Same | c7i.xlarge $0.1785; m7i.xlarge $0.2121 (ap-southeast-1 $0.2058; ap-northeast-1 $0.2247) | Price List API |
| On-demand Graviton (arm64) | arm64 workloads | Same; 1 vCPU = 1 physical core | c7g.xlarge us-east-1 $0.145, eu-north-1 $0.1547, ap-south-1 **$0.0982**; m7g.xlarge $0.1632 / $0.1734 / $0.1166; c8g.xlarge $0.15952 | Price List API |
| Burstable t3 / t4g | Low average CPU | Baseline per vCPU (t3.xlarge 40%); Unlimited mode surplus credits | t3.xlarge (4/16) $0.1664; t4g.xlarge $0.1344; surplus $0.05/vCPU-h Linux, $0.096 Windows, $0.04 t4g | Price List API CPUCredits:* |
| Standard RI 1y no-upfront (= EC2 Instance SP 1y) | 1-year commitment to a family/region | Every hour of the term | c7i.xlarge $0.11808 (-34%); m7i.xlarge $0.13336; c7g.xlarge $0.0955; eu-north-1 c7i $0.12641; ap-south-1 c7g $0.065 | Price List API Reserved rows; AWSComputeSavingsPlan EC2InstanceSavingsPlans |
| Standard RI 3y no-upfront | 3-year | Same | c7i.xlarge $0.07859 (-56%); m7i.xlarge $0.09145; c7g.xlarge $0.0637 | Price List API |
| Compute Savings Plan | $/h commitment, any family/region/Fargate/Lambda | Same | c7i.xlarge 1y no-upfront $0.12899, 3y $0.08618; 3y all-upfront Instance SP $0.0684 | AWSComputeSavingsPlan |
| Spot | Spare capacity, 2-min interruption notice | Floating hourly price | c7i.xlarge us-east-1 $0.0839, eu-north-1 $0.0698, ap-south-1 $0.0746; c7g.xlarge $0.0682 / $0.0424 / $0.0411; m7i.xlarge $0.0897 / $0.0714 / $0.0814 | spot.js feed |
| Windows licence-included | Windows Server AMIs | Per second, 60 s min; licence per vCPU | +$0.184/h on c7i/m7i.xlarge = **$0.046/vCPU-h** (c7i.xlarge $0.3625, m7i.xlarge $0.3856; same uplift in eu-north-1/ap-south-1 and on RIs); t3.xlarge Windows $0.24; spot c7i.xlarge Windows $0.2546; no Windows on Graviton | Price List API |
| EBS gp3 | Root/data volumes, billed while the volume exists (also when stopped) | GB-month (per second) | $0.08 us-east-1 (eu-north-1 $0.0836, ap-south-1 $0.0912) incl. 3,000 IOPS / 125 MB/s | Price List API EBS:VolumeUsage.gp3 |
| EBS snapshots | Stopped state backups | GB-month | $0.05 (eu-north-1 $0.0475) | Price List API EBS:SnapshotUsage |
| Public IPv4 | Any public address, in-use or idle | Per hour | $0.005/h ($3.65/month); contiguous block $0.008/h | AmazonVPC price list |
| NAT gateway | Private subnets reaching the internet | Per hour + per GB | $0.045/h + $0.045/GB (eu-north-1 $0.046, ap-south-1 $0.056) | Price List API NatGateway-* |
| Internet egress | All services, account-wide | Tiered | 100 GB/month free, then $0.09 (first 10 TB), $0.085, $0.07, $0.05; ap-south-1 $0.1093, ap-northeast-1 $0.114, ap-southeast-1 $0.12 | AWSDataTransfer |
| Free tier | New AWS accounts | Credits | up to $200 (generic, earlier research) | aws.amazon.com/free |
## Gotchas
1. **Commitments bill 24/7.** A c7i RI beats on-demand only above ~66% (1y: 0.11808/0.1785) or ~44% (3y: 0.07859/0.1785) utilisation of the term.
2. **Stopped != free**: EBS volumes and any Elastic IP keep billing; auto-assigned public IPs are released on stop.
3. **Public IPv4 is $3.65/month per address** since 2024 — more than a t4g.nano.
4. **NAT gateway double-dips**: $0.045/GB processed on top of $0.09/GB egress, plus $32.85/month per AZ.
5. **x86 vCPU = hyperthread, Graviton vCPU = core**: c7g often matches c7i per vCPU for less money; ap-south-1 Graviton is 32% below us-east-1.
6. **t3 credits**: flat-out t3.xlarge = $0.1664 + 4 x 0.6 x $0.05 = $0.2864/h, more than c7i.xlarge.
7. **Spot prices are per AZ and move hourly**; the snapshot above can be 2x off next week.
8. Windows licence roughly doubles a c7i (x86 only).
## Worked example
4 vCPU / 8 GiB, 50 instances x 8 h/day x 22 days = **8,800 instance-hours**, stopped between shifts, 30% CPU,
50 GiB snapshots ($2.50), 100 GiB egress (free tier), public IPv4 only while running (50 x 176 h x $0.005 = $44).
Root EBS (e.g. 20 GB gp3 each, kept while stopped) would add 50 x 20 x $0.08 = $80 and is shown separately.
| Regime | Compute | Total / month (excl. root EBS) |
|---|---|---|
| c7i.xlarge on-demand us-east-1 | 8,800 x 0.1785 = $1,570.80 | **$1,617.30** |
| c7g.xlarge on-demand us-east-1 | 8,800 x 0.145 = $1,276.00 | **$1,322.50** |
| c7g.xlarge on-demand ap-south-1 | 8,800 x 0.0982 = $864.16 | **$910.66** |
| c7i.xlarge spot us-east-1 | 8,800 x 0.0839 = $738.32 | **$784.82** |
| c7g.xlarge spot ap-south-1 | 8,800 x 0.0411 = $361.68 | **$408.18** |
| t3.xlarge (4/16) at 30% CPU (< 40% baseline, no surplus) | 8,800 x 0.1664 = $1,464.32 | **$1,510.82** |
| c7i.xlarge 3y RI (must cover 730 h) | 50 x 730 x 0.07859 = $2,868.54 | **$2,915.04** (worse than on-demand at 24% utilisation) |
| c7i.xlarge Windows on-demand | 8,800 x 0.3625 = $3,190.00 | **$3,236.50** |