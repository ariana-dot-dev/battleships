# Verify: fly-machines (2026-09-28)
| Item | Result |
|---|---|
| Performance vCPU $0.00001196/s = $0.043056/h incl. 2 GB/vCPU | confirmed (docs component constants) |
| Shared vCPU $0.00000075/s = $0.0027/h incl. 256 MB/vCPU | confirmed |
| Extra RAM $0.00000193/GB-s = $0.006948/GB-h (~$5/GB per 30 days) | confirmed |
| Decomposition vcpu_h 0.02916 (perf) / 0.000963 (shared), ram 0.006948 | confirmed arithmetic; reproduces presets (performance-4x 8 GB $0.1722/h, $124/mo; shared-cpu-4x 1 GB $0.0108) as listed on fly.io/pricing |
| RAM ranges: perf 2-8 GB/vCPU (tiers to 128 GB on 16x), shared 0.25-2 GB/vCPU; vCPU options 1,2,4,6,8(,10..16 perf) | confirmed (docs preset tiers) |
| Region multipliers iad/ewr 1.0, ams/arn 1.0385, yyz 1.1154, lhr/cdg 1.1346, fra 1.1538, sjc 1.1923, lax 1.1995, ord/dfw 1.25, sin/syd 1.2692, jnb 1.3029, nrt 1.3077, gru 1.6154 | confirmed (exact `markup` values); applies to the whole started-Machine price incl. extra RAM, not to storage/egress - matches card |
| Month = 30 days (2,592,000 s) on price tables | confirmed |
| Stopped Machines: rootfs only, $0.15/GB per 30 days | confirmed |
| Reservation blocks: 40% off; perf $144/$1,440/$14,400 per year -> $20/$200/$2,000 per month; shared $36/$360/$3,600 -> $5/$50/$500; per region + CPU class; credit monthly, no rollover, CPU + additional RAM only; backdated to 1st of month; self-serve | confirmed (docs). Reserved mode rates = on-demand x 0.6 correct |
| Volumes $0.15/GB-month provisioned, billed even when detached/stopped, pro-rated hourly | confirmed |
| Volume snapshots $0.08/GB-month, first 10 GB free each month, billable from 2026-01-01, charged on stored (incremental) size | confirmed |
| Egress NA/EU $0.02, APAC/Oceania/SA $0.04, Africa/India $0.12; private cross-region $0.006/$0.015/$0.05 | confirmed |
| Dedicated IPv4 $2/mo; shared IPv4 + Anycast IPv6 free; static egress IP $0.005/h (~$3.60/mo) | confirmed |
| TLS certs $0.10/mo (first 10 free), wildcard $1/mo | confirmed |
| Support Standard $29, Premium $199, Enterprise from $2,500; HIPAA package $99/mo; SOC 2 Type II | confirmed |
| Startup program up to $15,000; Custom plan (committed spend, volume discounts) | confirmed |
| Fly Kubernetes $75/month per cluster | confirmed |
| All orgs require a credit card on file (docs) | confirmed; card's plan note also mentions $25 prepaid credits (unverifiable this pass) |
| GPU Machines discontinued after 2026-07-31 | confirmed that the community thread announces full deprecation July 31, 2026 and that fly.io/pricing no longer lists GPUs; one reply quotes an older "we're not getting rid of them" blog line |
| Suspend limited to <= 2 GB RAM; shared CPU 6.25% baseline + 500 s burst; free trial 2 VM-hours / 7 days; legacy Hobby/Scale allowances | unverifiable this pass (docs pages not re-fetched) |
No corrections needed.