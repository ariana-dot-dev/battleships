# Google Cloud Build — pricing regimes (2026-09-28)
CI runner product (job-scoped, ephemeral). Added by the missing-providers audit.
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Default pool | default | per build-minute, per-second partials | e2-medium $0.003, e2-standard-2 $0.006, e2-highcpu-8 $0.0156, e2-highcpu-32 $0.0624 /min | https://cloud.google.com/build/pricing |
| Private pool | VPC/isolation | per build-minute + SSD | e2-standard-2..32 $0.006..$0.096/min; SSD $0.000232877/GiB-h | https://cloud.google.com/build/pricing |
| Free | per billing account | 2,500 min/month e2-standard-2 | $15 | https://cloud.google.com/build/pricing |
## Gotchas
- Free tier is promotional and only for e2-standard-2 in the default pool.
## Worked example
4 vCPU / 8 GiB: default pool has no 4-vCPU type -> e2-highcpu-8 $0.0156/min x 528,000 = $8,237; private pool e2-standard-4 $0.012/min = $6,336.
Sources: https://cloud.google.com/build/pricing