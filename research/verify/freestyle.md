# Verify: freestyle (2026-09-28)
Sources re-fetched: https://www.freestyle.sh/pricing, https://www.freestyle.sh/docs/vms/pricing-and-limits, https://www.freestyle.sh/docs/vms/lifecycle
| Item | Result |
|---|---|
| vCPU $0.04032/h, RAM $0.0129/GiB-h, storage $0.000086/GiB-h, transfer $0.02/GB | confirmed (both pages) |
| disk_gib_month 0.06278 (= 0.000086 x 730) | confirmed (arithmetic) |
| Billing on allocation, per second ("a reserved core is yours whether or not the guest is busy") | confirmed (docs) |
| Monthly allowances 200 vCPU-h / 400 GiB-h / 60,000 GiB-h storage, all plans; "Monthly Reset" | confirmed (pricing + docs) |
| Transfer 50 GB Free / 500 GB Hobby+Pro; counted both directions | confirmed (docs) |
| monthly_credit 18.38 = 8.064 + 5.16 + 5.16 | confirmed (arithmetic); non-fungibility is a modelling caveat |
| Order: allowances applied before the Hobby/Pro fee credit | unverifiable - docs say both exist, not the order. Engine applies monthly_credit after max(fee, usage), which only differs when usage < fee |
| Hobby $50 / Pro $500 = usage credit ("fees are a usage credit, not a surcharge") -> fee_is_credit true | confirmed (docs) |
| Free is hard cap, no overage | confirmed (docs) |
| Concurrency 10/40/400; saved VMs 10/200/4,000; snapshots 10/1,000/12,000 | confirmed |
| Per-VM max 4/8/32 GB, 8/16/64 GiB... (vCPU 4/8/32, RAM 8/16/64 GiB, disk 32/64/256 GB) | confirmed |
| Account totals 40/800/16,000 vCPU; 80 GiB/1.56 TiB/31.25 TiB; 320/3,125/62,500 GB | confirmed (docs) |
| Free: no persistent VMs / snapshots / custom sizing (pricing page) | confirmed on pricing page; docs contradiction claim unverifiable in this fetch |
| Paused bills storage only ("holds no compute reservation, so it bills only for storage") | confirmed (docs) |
| Paused VM does not count toward concurrency but counts as saved VM | confirmed (lifecycle) |
| No default idle timeout; idleTimeoutSeconds configurable (-1 removes) | confirmed (lifecycle shows no default) |
| Ephemeral (autoDeleteSeconds 0) deleted on stop | confirmed |
| $1 card verification refunded | confirmed (docs) |
| Enterprise active-CPU / node-based / commitment options, rates unpublished | confirmed |
| Snapshot storage price unpublished | confirmed (not on either page) |
| Historical daily allowance (apis.io mirror) | unverifiable (third-party mirror, not re-checked) |
| No dedicated IPv4 / shared outbound IPv4, regions 'us' | unverifiable from pricing pages (feature research) |
| Worked example (all rows A-H, always-on $193.07, Hobby 97 VMs) | confirmed (recomputed) |
Corrections: none.