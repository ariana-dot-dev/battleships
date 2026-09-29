# Verify: runloop (2026-09-28)
Sources re-fetched: https://www.runloop.ai/pricing, https://docs.runloop.ai/docs/devboxes/configuration/sizes, https://docs.runloop.ai/docs/overview/your-runloop-trial, https://docs.runloop.ai/docs/devboxes/lifecycle
| Item | Result |
|---|---|
| CPU $0.108/CPU-h = $0.00003/CPU-s; memory $0.0252/GB-h = $0.000007/GB-s | confirmed (both columns on page; conversion exact) |
| Devbox storage $0.00034236/GB-h ($0.0000000951/GB-s) -> $0.2499/GB-mo | confirmed |
| Blueprint / snapshot / object storage $0.000072/GB-h -> $0.05256/GB-mo | confirmed |
| Blueprint build $0.252/h; Active Axon $0.006/axon-h; inactive Axon storage $0.20/GB-mo | confirmed |
| "No minimums", billed separately from plan | confirmed |
| Compute billed in initializing / running / suspending / resuming | confirmed (sizes + lifecycle docs) |
| Suspended: no CPU/RAM, storage continues; only disk state kept, processes restart; same devbox ID | confirmed (pricing FAQ + lifecycle) |
| Presets X_SMALL..XX_LARGE and $/h (0.0806 ... 1.676) | confirmed (docs table; X_LARGE and MEDIUM recomputed) |
| Custom: CPU min 0.5, max 16, "multiple of 2"; RAM 1-64 GiB even; disk 2-64 even, default 16 | confirmed; whether 1 vCPU is allowed is ambiguous in docs ("multiple of 2, min 0.5") - unverifiable |
| Basic $0 + usage, 100 GB free storage, "1st month FREE", snapshots included, no suspend | confirmed |
| Pro $250/month + usage (not credit), 1 TB free storage, suspend/resume, repo connections, beta, Slack | confirmed |
| Enterprise: RFT, priority support, Deploy to VPC, custom free storage | confirmed |
| Trial: $50 credit, no card, all Pro features, 3 running devboxes, 5 blueprints, 10 snapshots, 3 objects, X_SMALL/SMALL/MEDIUM, 1 h max keep-alive, no auto-charge | confirmed |
| Trial plan could be auto-picked by engine as a permanent $0 plan | **corrected**: added `"trial_only": true` (engine skips trial_only plans; the $50 is already in free.one_time_credit) |
| keep_alive default 1 h / max 48 h; Flex tier; AWS Marketplace billing type | unverifiable this pass (OpenAPI not re-fetched) |
| Concurrency Basic/Pro unpublished | confirmed (page only says Pro "higher concurrency") |
| Egress / IPv4 / regions unpublished | confirmed (nothing on pricing page) |
| SOC2 Type II | confirmed (FAQ) |
| Worked example A-E (5,626.51; 6,028.25; 5,876.51; 7,400.79; 78 h) | confirmed (recomputed) |
JSON validated.