# Verify: sandbox0 (2026-09-28)
Sources re-fetched: https://sandbox0.ai/pricing (full text), https://sandbox0.ai/docs/sandbox/pause-resume.md,
https://sandbox0.ai/docs/sandbox/template/configuration.md, https://sandbox0.ai/managed-agents, https://sandbox0.ai/llms.txt.
| Item | Result |
|---|---|
| Compute $0.015/GiB-hour (~$0.000004167/GiB-s), billed per second on the configured memory limit, no 1 h minimum | confirmed |
| No separate CPU charge; "CPU limits still apply"; CPU "platform-derived from memory", ratio unpublished | confirmed (ratio unpublished, so ram_per_vcpu [2,null] stays an inference, as the caveat says) |
| Vendor comparison row 2 vCPU / 4 GiB = $10.95/GiB-month, checked 2026-09-21 | confirmed |
| Persistent rootfs + rootfs snapshots $0.02/GiB-month byte-time, prorated hourly over 730 h | confirmed |
| Paused sandboxes stop compute; retained state keeps accruing storage | confirmed |
| Network ingress free, egress "free for now", object-store GET/PUT free | confirmed |
| Quotas: 20 running (paused don't count), 5 claims/s (burst 5), 100 API req/s (burst 200); free increase on request, subject to approval | confirmed |
| No plan fee, no free credit, no minimum | confirmed (none on the page) |
| Auto-pause once outstanding usage + debt reach 10% of the latest successful top-up; filesystem-only | confirmed |
| Memory pause experimental (`memory: true`); ttl soft pause / hard_ttl delete | confirmed |
| Rootfs default 8 GiB, 300 MiB-1 TiB | confirmed |
| gVisor isolation (self-host uses stock gVisor runsc) | confirmed (llms.txt) |
| Managed Agents: $0 extra sandbox charge, tokens at provider rates, 5% top-up fee; Codex / Claude Code / Pi / Kimi Code / ZCode | confirmed |
| Engine read: memory-only resource mode (vcpu_h 0), alloc basis, egress 0, plan concurrency 20; Managed Agents flagged alt | confirmed as intended |
| ComputeSDK perf numbers (786.68 ms cold, 14,932.74 ms burst, 128.37 s DAX) | unverifiable this pass (fetch blocked by a session limit) |
No corrections needed.