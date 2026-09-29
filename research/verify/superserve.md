# Verify: superserve (2026-09-28)
Sources re-fetched: https://superserve.ai/pricing, https://api.superserve.ai/billing/pricing/public (JSON),
https://docs.superserve.ai/templates/build-spec, https://docs.superserve.ai/sandbox/lifecycle, https://docs.superserve.ai/errors,
| Item | Result |
|---|---|
| vCPU $0.000014/s = $0.0504/h, memory $0.0000045/GiB-s = $0.0162/GiB-h, effective 2026-06-17 | confirmed (billing API) |
| Storage $3e-8/GiB-s = $0.000108/GiB-h, billable:false | confirmed (billing API: tracked true, billable false); pricing page still lists $0.000108/h "Paused sandboxes are billed only for storage" |
| Memory "Allocated memory, billed per second of active runtime" -> alloc basis | confirmed |
| "No credit card to start", Startup up to $50k credits, Enterprise on-prem + dedicated support | confirmed (pricing page) |
| Template limits vcpu 1-4, memoryMib 256-4096, diskMib 1024-8192; new teams 2 vCPU / 2048 MiB | confirmed (build-spec) -> max_vcpu 4 / max_ram 4 correct; 4 vCPU/8 GiB correctly ineligible |
| Auto-pause via timeoutSeconds after active time, off unless set | confirmed (lifecycle) ; auto_stop_idle false correct |
| Paused sandboxes kept forever by default; autoDeleteSeconds max 30 days | confirmed |
| too_many_sandboxes 429, value unpublished | confirmed (errors page) |
| Free credit $5 signup + $95 activation (Stripe checkout), one redemption per user/identity | confirmed (PR #454 "Enforce durable $5 signup and $95 activation entitlements", merged 2026-09-25T20:06Z). Not on pricing page; PR notes enforcement rolled out with canonical enforcement off initially |
| one_time_credit 100 | confirmed as code-derived (caveated) |
| Only vcpu / memory_gib / storage_gib meters; egress null | confirmed |
| Auto-pause max 7 d, OpenAPI 10 vCPU / 20 GiB | unverifiable this pass (OpenAPI not re-read) |
| Worked example (0.2664/h, 2,344.32; 2,914.56; paused +35.90; anti-pattern 7,032.96) | confirmed arithmetic |
No corrections needed.