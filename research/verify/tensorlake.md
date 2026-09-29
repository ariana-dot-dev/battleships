# Verify: tensorlake (2026-09-28)
Docs pages (billing, lifecycle, snapshots, pools, BYOC blog) not re-fetched; items only sourced there are marked unverifiable.
| Item | Result |
|---|---|
| Free: $0, 1 sandbox at a time, 1 vCPU / 1 GB / 10 GB, up to 2 h per session, unmetered, 7-day retention | confirmed |
| Usage Credits: $5/$10/$20 packs = 500/1,000/2,000 CU, 1 CU = $0.01, up to 10 packs, auto-refill, no postpaid overage, sandboxes stopped at zero | confirmed |
| Usage Credits limits: 100 concurrent, 4 vCPU / 16 GB / 100 GB, 24 h | confirmed |
| Pro $250 per billing cycle (monthly), includes 25,000 CU at Pro rates, overage $0.01/CU (= fee is credit) | confirmed |
| Pro limits: 1,000 concurrent, 16 vCPU / 64 GB / 100 GB, unlimited duration, 24x7 Slack+email, P1 24 h | confirmed |
| Enterprise: custom, unlimited concurrency, SSO/SAML, RBAC, in-VPC/on-prem, P1 1 h, resident SA | confirmed |
| Rates Credits / Pro: active CPU $0.07 / $0.042 per core-h; RAM $0.015 / $0.009 per GB-h; disk $0.0002 / $0.0001 per GB-h; snapshot $0.07 / $0.07 per GB-month | confirmed ("40% lower rates" on Pro) |
| Snapshot billed per GB per fixed 30-day month while suspended | confirmed |
| Active-CPU fallback to allocated vCPU "if an active CPU sample is unavailable or untrustworthy" | confirmed (FAQ) |
| RAM/disk allocation-based while running; egress free; pooled per org, whole CUs | confirmed |
| SOC 2 Type 2 every tier; HIPAA BAA on Pro+ | confirmed |
| Calculator break-even "about 5,661 sessions" | confirmed |
| Plan switching: credits retained, new pack needed to return | confirmed |
| ram_per_vcpu [1, 8], idle timeout default 600 s, named-only suspend, 48 h restart window, warm pools | unverifiable in this pass (docs-only claims, not re-fetched) |
| BYOC 30%->10% CPU, 5%->2% GPU; i7i.metal-24xl $9.06/h example | unverifiable in this pass (blog 2026-07-28, not re-fetched); mode is `sales`+`alt` so not priced by default |
| EU region no price difference | unverifiable (not stated on pricing page) |
| Non-spec keys `requires_plan`, `disk_gib_h` | **corrected**. Removed both. Disk rate lives in `storage.disk_gib_month` = 0.0001 x 730 = $0.073 (was already set). Because the engine picks the cheapest mode independently of the plan, the old card paired Pro rates with the fee-0 "Usage Credits" plan (understating by 40%) and the $0 Free mode with any plan that fit. Now: modes = `pro` + `byoc` only; plans Free and Usage Credits kept but `trial_only: true` with their rates/limits in notes; caveat[0] rewritten to explain that small workloads (< ~$250/month at Pro rates) are overstated (floor $250). Removed modes `usage-credits` and `free`. |
| Engine check | worked example (50 x 4/8, 8,800 h, 30% CPU, 50 GiB snapshots) prices at $1,089.42 on Pro, matching regimes/tensorlake.md |