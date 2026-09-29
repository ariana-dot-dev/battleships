# AWS Lambda (functions) — pricing regimes (as of 2026-09-28)
Lambda sells **memory x wall-clock duration** (CPU scales with memory, ~1 vCPU per 1,769 MB, 6 vCPU at 10,240 MB),
rounded up to **1 ms**, plus **$0.20 per 1M requests**. Max 15 minutes per invocation. All rates below are from the
**AWS Price List API** (AWSLambda offer, publication 2026-09-19) and the AWSComputeSavingsPlan offer (2026-09-25).
Reference: 8 GB function (~4.6 vCPU) = x86 **$0.48/h**, Arm **$0.384/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| x86 duration tier 1 | Default, first 6B GB-s/month per region | Per GB-s, 1 ms rounding | $0.0000166667/GB-s = $0.06/GB-h | Price List API Lambda-GB-Second Tier-1 |
| x86 tier 2 / tier 3 | 6B-15B GB-s / >15B GB-s in a month (automatic) | Same | $0.000015 / $0.0000133334 per GB-s | Price List API Tier-2/3 |
| Arm (Graviton) tier 1 | arm64 functions, first 7.5B GB-s | Same | $0.0000133334/GB-s = $0.048/GB-h (-20%) | Price List API Lambda-GB-Second-ARM |
| Arm tier 2 / tier 3 | 7.5B-18.75B / >18.75B GB-s | Same | $0.0000120001 / $0.0000106667 | Price List API |
| Requests | Every invocation (x86 and Arm) | Per request | $0.20 per 1M (most regions; up to $0.28/M in ap-east-1) | Price List API Request |
| Regions | us-east-1, eu-west-1, eu-central-1, eu-north-1, ap-south-1, ap-northeast-1, ap-southeast-1 ... | Same tier-1 rate | $0.0000166667 everywhere major; af-south-1 $0.0000221, ap-east-1 $0.00002292, eu-south-1 $0.0000195172, me-south-1 $0.0000206667 | Price List API (all 36 regions) |
| Always-free tier | Every account, monthly, x86 + Arm combined | Deducted from usage | 1M requests + 400,000 GB-s (~$6.87/month at x86 rates) | Price List API Global-Request / Global-Lambda-GB-Second |
| Compute Savings Plan | 1y or 3y $/h commitment | Discounted duration | No-upfront (1y = 3y): x86 $0.0000147, Arm $0.0000117 per GB-s (-12%); all-upfront $0.0000138 / $0.0000111 (-17%) | AWSComputeSavingsPlan us-east-1 |
| Provisioned concurrency | Pre-warmed environments configured | PC fee for every configured second (5-min min) + reduced duration | x86: $0.0000041667 + $0.0000097222 per GB-s ($0.015 + $0.035 /GB-h); Arm $0.0000033334 + $0.0000077778; SP: $0.00000367 / $0.00000856; free tier does not apply | Price List API |
| Ephemeral /tmp storage | Beyond 512 MB, up to 10,240 MB | Per GB-s of configured extra, during execution | $0.0000000309/GB-s | Price List API Lambda-Storage-GB-Second |
| Lambda Managed Instances | Capacity-provider functions on EC2 in your account | EC2 on-demand + 15% management fee + $0.20/M requests | c7i.xlarge fee $0.026775/h (EC2 $0.1785), c7g.xlarge $0.02175/h | Price List API Lambda-Managed-Instances-*-Management-Hours |
| SnapStart | Java/Python/.NET snapshots | Cache per GB-s (3 h min) + restore per GB | $0.0000015046/GB-s + $0.0001397998/GB | Price List API |
| Response streaming | Streamed bytes beyond free | Per GB | $0.008/GB beyond 100 GiB/month free | Price List API |
| Durable functions | Durable execution API | Per op + written + stored | $0.000008/operation, $0.25/GB written, $0.15/GB-month | Price List API |
| Tenant isolation mode | New tenant-isolated environment | Per GB of memory created | $0.000166667/GB (x86), $0.000133333 (Arm) | Price List API |
| Event poller units | Provisioned ESM pollers | Per unit-hour | $0.185/h (SQS $0.00925/h) | Price List API |
| Egress | Internet data out | EC2 data-transfer tiers | 100 GB/month free then $0.09/GB | AWSDataTransfer price list |
## Gotchas
1. **Not a sandbox**: 15-minute hard cap, stateless, no inbound shell; long agent sessions must be chained.
2. **You pay wall-clock, not CPU**: an invocation waiting on an LLM for 30 s pays 30 s of full memory.
3. **CPU is bought through memory**: 4 vCPU needs ~7 GB; you cannot buy CPU without RAM (or vice versa).
4. **Provisioned concurrency bills while idle** and the free tier doesn't cover it; break-even vs on-demand is ~60% utilisation.
5. **VPC functions need a NAT gateway** for internet ($0.045/h + $0.045/GB) — often the largest line item for low-traffic functions.
6. **Volume tiers are per region per account** and need 6B GB-s/month (1.67M GB-hours) before they kick in.
7. Previous research had the x86 tier 2/3 prices wrong (tier 2 is $0.000015, not $0.0000133334).
## Worked example
4 vCPU / 8 GiB x 50 concurrent x 8 h/day x 22 days = 8,800 hours. Lambda can't hold an 8 h session; assume
work is split into back-to-back 15-min invocations (35,200 invocations) with state externalised. 30% CPU saves
nothing (duration billing). No snapshots exist (50 GiB state must live in S3/EFS, not priced here).
Egress 100 GiB inside the free 100 GB.
| Regime | Calculation | Total / month |
|---|---|---|
| x86 on-demand | 8,800 h x 8 GB x $0.06 = $4,224.00; 35,200 requests are inside the 1M free; minus 400k free GB-s ($6.67) | **$4,217.33** |
| Arm on-demand | 8,800 x 8 x $0.048 = $3,379.20 minus 400k free GB-s at Arm rate ($5.33) | **$3,373.87** |
| Arm + Compute SP (all-upfront) | 8,800 x 8 x 3,600 x $0.0000111 = $2,813.18 (commitment must also cover idle hours) | **~$2,813** (+ unused commitment) |
| Provisioned concurrency x86 (50 x 8 GB configured 8 h/day, fully busy) | 8,800 x 8 x ($0.015 + $0.035) = $3,520.00 (free tier doesn't apply) | **$3,520.00** |
| Managed Instances c7g.xlarge | 8,800 x $0.16675 = $1,467.40 (+ EBS, IPv4, requests) | **~$1,467** |