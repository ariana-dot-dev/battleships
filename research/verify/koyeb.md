# Verify: koyeb (2026-09-28)
https://www.koyeb.com/docs/reference/instances, https://www.koyeb.com/docs/sandboxes. Scale-to-zero / volumes / FAQ docs not re-fetched.
| Item | Result |
|---|---|
| Standard ladder nano $0.0036 ... 5xlarge $1.8432/h with vCPU/RAM/disk as in card | confirmed (catalog `price_hourly`, docs per-second $0.000001 ... $0.000512). Docs say nano disk 2.5 GB vs card 2 GB (immaterial) |
| Standard regions fra, par, was, sfo, sin, tyo (+ AWS/other) | confirmed |
| Eco ladder eco-nano $0.0022 ... eco-2xlarge $0.1152, 2 GB/vCPU, disk max 20 GB | confirmed |
| **Eco availability** (hot spot) | confirmed: status AVAILABLE, regions fra/was/sin only, `require_plan` includes starter, pro, scale (so still orderable on the current paid plans), `volumes_enabled: false`. Sandbox eligibility of eco still undocumented (unverifiable) |
| Eco and Light Sleep | **corrected** (added): catalog `light_sleep_enabled: false` for every eco type (standard types true). Eco note now says eco scales to zero via deep sleep only |
| GPU prices RTX-4000 0.50, L4 0.70, A6000 0.75, L40S 1.20, A100 1.60, A100 SXM 2.15, RTX PRO 6000 2.20, H100 2.50, H200 3.00, B200 5.50; bundles (H100 15 vCPU/180 GB/320 GB etc.); multi-GPU linear | confirmed |
| GPU regions us/eu/asia | **corrected** -> ["us","eu"]: catalog lists every available GPU in "na" only except RTX-4000-SFF-ADA (fra/eu) |
| L4, B200 priced as available | **corrected**: catalog status RESTRICTED with empty regions (also 4x H200 and all 8x types); removed L4 and B200 from the priced gpu map, kept in note |
| Pro $29 + $10 included compute, 10 users, 100 services, CPU concurrency 100, GPU 20, 5 builds | confirmed |
| Scale $299 + $100 included, 50 users, 1,000 services, CPU concurrency 1,000, GPU 40, AWS regions, 99.9% SLA | confirmed |
| Enterprise "starting at $1000/mo", $500 included, 50 regions, BYOC, SSO/RBAC, ISO27001/SOC2, 99.99% | confirmed |
| Plan fees not full credit (fee + usage above included) | confirmed ("$29/mo +compute", "Included Usage $10") |
| Savings plans "up to 50% off" | confirmed |
| Bandwidth 1 TB/mo included, then $0.02/GB EU/US, $0.04/GB Asia | confirmed; FAQ still says $0.04/GB and "ten custom domains free ... $0.20/month" (older text) |
| Per-second, "rounded up to the nearest unit", billed end of calendar month | confirmed |
| Startup program up to $30k credits | confirmed |
| Free instance 0.1 vCPU / 512 MB / 2 GB, fra/was, sleeps after 1 h | confirmed |
| Sandboxes available on Starter, Pro, Scale | confirmed (docs); Starter closed to new signups since ~2026-02-26 unverifiable this pass (card flags it legacy) |
| Light Sleep free during preview; volume/snapshot preview pricing; $0.08/GB-month snippet | unverifiable this pass |