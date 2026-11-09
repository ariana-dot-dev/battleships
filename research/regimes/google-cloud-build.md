# Google Cloud Build — pricing regimes (re-checked 2026-11-08)
CI runner product (job-scoped). Each build gets a fresh VM that Google destroys after the build.
| Regime | When it applies | How billed | Numbers (Iowa, us-central1) | Source |
|---|---|---|---|---|
| Default pool | default | per build-minute, per-second partials | e2-medium $0.003, e2-standard-2 $0.006, e2-highcpu-8 $0.0156, e2-highcpu-32 $0.0624 /min; SSD first 100 GB free, then $0.17/GiB-month | https://cloud.google.com/build/pricing |
| Private pool E2 | VPC/isolation | per build-minute + SSD | e2-standard-2..32 $0.006..$0.096/min; e2-highcpu-2..32 $0.0039..$0.0624/min; e2-highmem-2..16 $0.0088..$0.0704/min; SSD $0.000232877/GiB-h | https://cloud.google.com/build/pricing |
| Private pool N2D / C3 | VPC, faster CPUs | per build-minute + SSD | n2d-highcpu-2 $0.004916/min; c3-highcpu-4 $0.013944/min (more sizes on the page) | https://cloud.google.com/build/pricing |
| Free | per billing account | 2,500 min/month e2-standard-2, default pool | $15 | https://cloud.google.com/build/pricing |
## Gotchas
- Free tier is promotional and only for e2-standard-2 in the default pool.
- Since 2025-11-01 e2 prices differ per region for both pools. e2-standard-2 stays $0.006/min everywhere. e2-highcpu-8 is $0.0156 in Iowa, $0.017628 in South Carolina and Las Vegas, $0.02184 in Hong Kong. Source: https://cloud.google.com/build/pricing-update
- Concurrency: default pool 10-30 builds and 5-100 E2 vCPU per project, not increasable. Private pools have no build cap; a per-region vCPU quota (E2/N2D 0-2400, C3 0-300) limits them and can be increased. Source: https://docs.cloud.google.com/build/quotas
- Nothing on the worker survives a build. Copy directories to Cloud Storage and back to reuse them (https://docs.cloud.google.com/build/docs/optimize-builds/speeding-up-builds).
## Worked example
4 vCPU / 8 GiB: default pool has no 4-vCPU type -> e2-highcpu-8 $0.0156/min x 528,000 = $8,237; private pool e2-standard-4 $0.012/min = $6,336 (Iowa prices).
Sources: https://cloud.google.com/build/pricing, https://cloud.google.com/build/pricing-update
