# Verify: declaw (2026-09-28)
Sources re-fetched: https://docs.declaw.ai/platform/billing (and .md), https://docs.declaw.ai/platform/plans,
https://docs.declaw.ai/features/sandboxes, https://docs.declaw.ai/features/snapshots, https://declaw.ai/startups.
| Item | Result |
|---|---|
| vCPU 14.0 µ$/s ($0.0504/h), memory 4.5 µ$/GB-s ($0.0162/h), overlay disk 0.0424 µ$/GB-s ($0.110/GB-mo) on provisioned resources | confirmed |
| 30 s metering ticks, each capped at 90 s billable | confirmed |
| Pause/kill stops metering; "Paused sandbox time" listed as not billed | confirmed |
| Not billed: list/get/kill, health checks, template/snapshot metadata, failed requests, regex scans | confirmed |
| One-time $100 sandbox + $200 guardrails credits, never refilled | confirmed |
| Guardrails per-scan prices (PII/injection $0.0006, toxicity $0.0004, code $0.0003, language $0.0002, invisible $0.0001) | confirmed |
| 402 on create/command/filesystem once balance is exhausted | confirmed |
| Plans: Free 25 conc / 1 h / 4 vCPU / 4 GB / 10 GB disk / 50 egress conns / 2 creates/s / 10 templates / deposits $5-$100 | confirmed |
| Pro 500 conc / 72 h / 16 vCPU / 16 GB / 50 GB / 200 conns / 10 creates/s / 50 templates / deposits $10-$5,000 / $100 minimum monthly total deposit, grace then downgrade | confirmed |
| Enterprise custom; 7-day max session | confirmed, but the source is features/sandboxes, not the snapshots doc -> corrected note ("snapshots doc" -> "features/sandboxes doc") |
| on_timeout default kill; paused sandboxes kept until resume/kill; pause re-arms the timeout | confirmed |
| Firecracker isolation | confirmed (sandboxes doc) |
| Startup program $10,000 credits for 6 months | confirmed |
| Snapshot/volume storage price, egress price, regions | confirmed unpublished (null) |
| Free is a real long-term PAYG tier (deposits allowed), not trial_only | confirmed |
| Pro fee_is_credit=true (deposit spent on usage) | confirmed as a reasonable engine mapping; rollover not modelled (caveat present) |
| Engine gap: plan max_ram_gib is not enforced by engine.js (only max_vcpu, concurrency, max_session_h). A <=4 vCPU / >4 GB workload with <=1 h sessions and <=25 concurrent would be priced on Free although Free caps RAM at 4 GB | flagged for engine owner; card is correct |
| ComputeSDK perf numbers | unverifiable this pass (fetch blocked by a session limit) |
Corrections: 1 (Enterprise note source).