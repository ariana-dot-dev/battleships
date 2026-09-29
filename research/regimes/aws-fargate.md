# AWS Fargate — pricing regimes (as of 2026-09-28)
Fargate bills allocated vCPU and GB per second (1-minute minimum Linux, 5-minute Windows) from the start of
the image pull until the task stops. No platform fee. Rates below come from the **AWS Price List API**
(AmazonECS offer, publication 2026-09-11) unless marked otherwise; Spot comes from the JSON feed that
aws.amazon.com/fargate/pricing renders (point-in-time, 2026-09-28); Savings Plans from the
AWSComputeSavingsPlan offer (publication 2026-09-25).
Reference shape 4 vCPU / 8 GB: x86 us-east-1 = 4 x 0.04048 + 8 x 0.004445 = **$0.19748/h**; ARM = **$0.15800/h**.
## Regime table
| Regime | When it applies | How billed | Numbers (per vCPU-h / per GB-h) | Source |
|---|---|---|---|---|
| Linux x86 on-demand, us-east-1 | Default | Allocated, per second, 1-min min | $0.04048 / $0.004445 | Price List API USE1-Fargate-vCPU-Hours:perCPU, USE1-Fargate-GB-Hours |
| Same, eu-west-1 (cheapest EU) | Region pin EU | Same | $0.04048 / $0.004445 (identical to us-east-1; eu-central-1 $0.04656/$0.00511, eu-north-1 $0.0445/$0.0049) | Price List API |
| Same, ap-south-1 (cheapest Asia) | Region pin Asia | Same | $0.04256 / $0.004655 (ap-northeast-1/ap-southeast-1 $0.05056/$0.00553) | Price List API |
| Linux ARM64 (Graviton) on-demand | ARM task definitions, ECS only | Same | us-east-1 = eu-west-1: $0.03238 / $0.00356 (-20%); ap-south-1: $0.02383 / $0.00261 | Price List API |
| Fargate Spot x86 | FARGATE_SPOT capacity provider (ECS), interruptible, 2-min notice | Floating price | us-east-1 $0.01288871 / $0.00141527 (-68%); eu-west-1 $0.01224056 / $0.0013441; ap-south-2 $0.012768 / $0.0013965 | https://dftu77xade0tc.cloudfront.net/fargate-spot-prices.json |
| Fargate Spot ARM64 | Same | Floating | us-east-1 $0.01030969 / $0.00113349; eu-west-1 $0.00979124 / $0.00107649; ap-south-2 $0.007149 / $0.000783 | same feed |
| Compute Savings Plan 1y | $/h commitment for 1 year, shared with EC2 and Lambda | Discounted rate up to the commitment; unused commitment still billed | No-upfront x86 $0.032384 / $0.003556 (-20%); ARM $0.0255 / $0.0028; all-upfront x86 vCPU $0.0295504 | AWSComputeSavingsPlan us-east-1 |
| Compute Savings Plan 3y | 3-year commitment | Same | No-upfront x86 $0.022264 / $0.00244475 (-45%); ARM $0.01749 / $0.00192; all-upfront x86 vCPU $0.0194304 (-52%), ARM $0.01587 | AWSComputeSavingsPlan us-east-1 |
| Windows Server (x86 only) | Windows task definitions, 1-4 vCPU, max 30 GB | Per second, **5-minute minimum**; OS licence per vCPU | vCPU $0.046552 + OS $0.046 = $0.092552/vCPU-h; GB $0.00511175 | Price List API (conflicts with pricing-page example, see Gotchas) |
| Ephemeral storage | Beyond 20 GB free per task (max 200 GB per ECS docs) | Per GB-hour while task runs | $0.000111/GB-h (~$0.081/GB-month) | Price List API USE1-Fargate-EphemeralStorage-GB-Hours |
| EBS volumes attached to tasks | Optional persistent/seeded storage | EBS rates | gp3 $0.08/GB-month; snapshots $0.05/GB-month (us-east-1) | AmazonEC2 price list |
| Public IPv4 per task ENI | awsvpc task with public IP | Per hour, in-use or idle | $0.005/h ($3.65/month) | AmazonVPC price list USE1-PublicIPv4:InUseAddress |
| NAT gateway | Tasks in private subnets | Per hour + per GB processed | $0.045/h + $0.045/GB (us-east-1) | AmazonEC2 price list NatGateway-Hours/Bytes |
| Internet egress | All tasks | Tiered, account-wide | 100 GB/month free (all services), then $0.09 / $0.085 / $0.07 / $0.05 per GB | AWSDataTransfer price list |
| Free tier | New AWS accounts | Credits | Up to $200 one-time (generic AWS; earlier research, not re-verified); no always-free Fargate | https://aws.amazon.com/free/ |
## Gotchas
1. **Billing starts at image pull**, not at container start; big images add paid seconds to every task.
2. **1-minute minimum (Linux), 5 minutes (Windows)** per task; many sub-minute tasks cost far more than their runtime.
3. **Spot is ECS-only**, not available on EKS or Windows, and the price floats (the 2026-09-28 snapshot is ~68% off, not the marketed "up to 70%" in every region).
4. **Savings Plans bill every hour of the term.** A fleet that runs 8 h/day wastes ~76% of a commitment sized for peak; size SPs to the 24/7 baseline only.
5. **Windows price conflict:** the Price List API (vCPU $0.046552 + OS $0.046, GB $0.00511175) is about half the pricing-page example ($27.45 for 300 vCPU-h = $0.0915; $6.00 for 600 GB-h = $0.01). We use the API.
6. **Public IPv4 is $0.005/h per task**, and private subnets need a NAT gateway ($32.85/month per AZ + $0.045/GB on top of egress). Many teams pay more for networking than for small tasks.
7. **No HTTPS URL out of the box**: an ALB or API Gateway is extra.
8. **No pause/resume or snapshots**; state lives only on attached EBS/EFS.
9. **Allowed CPU:memory pairs are fixed** (e.g. 4 vCPU needs 8-30 GB); memory can't go below 2 GB per vCPU.
10. **Region spread**: ap-south-1 ARM is 26% below us-east-1 ARM; sa-east-1 x86 is 72% above us-east-1.
## Worked example
4 vCPU / 8 GB, 50 concurrent x 8 h/day x 22 days = **8,800 task-hours**, 30% CPU (irrelevant: allocated billing),
50 GiB retained state (as EBS snapshots), 100 GiB egress (inside the 100 GB free tier, assuming no other AWS egress).
Fixed extras: public IPv4 50 x 176 h x $0.005 = $44.00; EBS snapshots 50 x $0.05 = $2.50.
| Regime | Compute | Total / month |
|---|---|---|
| x86 on-demand us-east-1 | 8,800 x 0.19748 = $1,737.82 | **$1,784.32** |
| ARM on-demand us-east-1 / eu-west-1 | 8,800 x 0.15800 = $1,390.40 | **$1,436.90** |
| ARM on-demand ap-south-1 | 8,800 x 0.11620 = $1,022.56 | **$1,069.06** |
| Spot x86 us-east-1 (interruptible) | 8,800 x 0.062877 = $553.32 | **$599.82** |
| Spot ARM us-east-1 | 8,800 x 0.050307 = $442.70 | **$489.20** |
| Compute SP 3y no-upfront sized for 50 tasks 24/7 | 50 x 730 x 0.108614 = $3,964.41 | **$4,010.91** (worse: commitment idle 16 h/day) |
| Private subnets + 1 NAT gateway instead of IPv4 | +$32.85 + 100 x $0.045 = $37.35 instead of $44.00 | x86: **$1,777.67** |
| Windows (4 vCPU max) | 8,800 x (4 x 0.092552 + 8 x 0.00511175) = $3,617.70 | **$3,664.20** |