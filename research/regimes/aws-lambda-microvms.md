# AWS Lambda MicroVMs — pricing regimes (as of 2026-09-28)
Stateful Firecracker microVMs (AWS's E2B/Daytona-style product). You configure a **baseline** (memory with a fixed
2 GB : 1 vCPU ratio; default 1 vCPU / 2 GB, max baseline 4 vCPU / 8 GB). Baseline is billed **per second while
running**; the VM bursts vertically up to 4x baseline (16 vCPU / 32 GB) and the extra is billed only for seconds
actually consumed ("baseline-plus-consumption"). Suspended VMs pay only snapshot storage. Rates below are from the
**AWS Price List API** (AWSLambda offer, publication 2026-09-19); the pricing page text describes only Graviton.
Reference 4 vCPU / 8 GB baseline: Arm us-east-1 = 4 x 0.0997 + 8 x 0.0132 = **$0.5044/h**; x86 = **$0.59476/h**.
## Regime table
| Regime | When it applies | How billed | Numbers (per vCPU-h / per GB-h) | Source |
|---|---|---|---|---|
| Arm baseline, us-east-1 / us-east-2 / us-west-2 / ap-south-1 | Running VM | Per second, allocated baseline | $0.0000276944/vCPU-s = $0.0997; $0.0000036667/GB-s = $0.0132 | Price List API Lambda-MicroVM-vCPU-Second-ARM |
| Arm baseline, eu-north-1 (cheapest EU) | Region pin EU | Same | $0.09975 / $0.013208 | Price List API EUN1 |
| Arm baseline, eu-west-1 / eu-central-1 | | Same | $0.10497 / $0.013897; $0.12599 / $0.016679 | Price List API |
| Arm baseline, ap-northeast-1 / ap-southeast-1 / ap-southeast-2 | | Same | $0.11607 / $0.015368; $0.12481 / $0.016524; $0.10079 / $0.013345 | Price List API |
| x86 baseline, us-east-1/2, us-west-2, ap-south-1 | x86 MicroVMs (SKU exists in API) | Same | $0.0000326557/vCPU-s = $0.11756; $0.0000043235/GB-s = $0.015565 | Price List API Lambda-MicroVM-vCPU-Second |
| x86 baseline, eu-north-1 | | Same | $0.117954 / $0.015617 | Price List API |
| Burst above baseline | Automatic, up to 4x baseline | Only seconds consumed, same unit rates | as above | https://aws.amazon.com/lambda/pricing/ |
| Suspended | `suspend` or auto-suspend (default after 5 min idle) | No compute; snapshot storage | $0.0001111111/GB-h = $0.0811/GB-month | Price List API Lambda-MicroVM-Snapshot-Storage-GB-Hour |
| Snapshot write / read | Each suspend (write) and start/resume (read) | Per GB | write $0.0037977138/GB; read $0.0015467699/GB | Price List API |
| MicroVM image storage | Custom images | Snapshot storage rate, **1-week minimum retention** | $0.0811/GB-month | pricing page |
| Egress / VPC | Outbound internet default on; Lambda Network Connector to VPC | Standard AWS data transfer | 100 GB/month free then $0.09/GB | AWSDataTransfer |
| Free tier / Savings Plans | — | Not stated | assumed none | — |
## Gotchas
1. **Baseline is billed on allocation, idle or not**; only the burst above baseline is usage-billed. A low baseline + burst is the cost lever, but burst capacity is best-effort.
2. **Snapshot I/O is metered**: an 8 GB suspend/resume cycle costs ~$0.043 in write+read fees on top of storage.
3. **eu-west-1 is 5% dearer than eu-north-1** and eu-central-1 is 26% dearer than us-east-1.
4. The "$0.0000291572/vCPU-s" rate quoted by a secondary source is the **eu-west-1 Arm** rate, not x86.
5. Max lifetime is configurable (launch example 28,800 s = 8 h); the true cap isn't published. Min billed duration and launch fee aren't published either.
6. Same unit rates as the announced AgentCore Runtime v2 committed baseline.
## Worked example
4 vCPU / 8 GB baseline x 50 concurrent x 8 h/day x 22 days = **8,800 VM-hours**, 30% CPU, 50 GiB snapshots
retained, 100 GiB egress (free tier).
| Regime | Calculation | Total / month |
|---|---|---|
| Arm, 4 vCPU/8 GB baseline, us-east-1 | 8,800 x 0.5044 = $4,438.72 + snapshots 50 x $0.0811 = $4.06 | **$4,442.78** |
| + snapshot I/O (suspend/resume 8 GB per VM-day) | 1,100 cycles x 8 GB x ($0.0037977 + $0.0015468) = $47.03 | **$4,489.81** |
| Arm, 1 vCPU/2 GB baseline + burst (optimistic: 0.2 vCPU avg burst, 6 GB burst memory held) | 8,800 x (0.1261 + 0.2 x 0.0997 + 6 x 0.0132) = 8,800 x 0.22524 = $1,982.11 + $4.06 | **~$1,986** |
| x86, 4/8 baseline, us-east-1 | 8,800 x 0.59476 = $5,233.89 + $4.06 | **$5,237.95** |
| Arm eu-north-1 | 8,800 x (4 x 0.09975 + 8 x 0.013208) = 8,800 x 0.504664 = $4,441.04 + $4.06 | **$4,445.10** |
| Anti-pattern: left running 24 h/day | 50 x 730 x 0.5044 = $18,410.60 | **$18,414.66** |