# Verify: hopx (2026-09-28)
https://docs.hopx.ai/api/concepts/rate-limits.
| Item | Result |
|---|---|
| vCPU $0.00001400/s -> $0.0504/vCPU-h | confirmed |
| Memory "RAM allocation" $0.00000450/GiB-s -> $0.0162/GiB-h | confirmed |
| Storage $0.00000003/GiB-s -> $0.000108/GiB-h -> $0.0788/GiB-month | confirmed |
| Per-second billing, no subscription, no minimum | confirmed |
| $200 free credits, no card, "~4,000 hours of basic usage" (one-time) | confirmed; expiry not stated (unverifiable) |
| Page example "1 vCPU, 1GB, 10GB, 1 h = $0.05" inconsistent with rates ($0.0677); "8 h, 2 vCPU, 4 GB ~$1.50" ($1.32 + disk) | confirmed (the page still shows these) |
| "Unlimited sandboxes", "no feature gates" | confirmed |
| Enterprise: custom SLAs, dedicated support, volume discounts, contact sales | confirmed |
| Template ranges 1-64 vCPU ("1-64 cores" in docs), 512 MB-64 GB RAM, 1-250 GB disk; "Resource limits depend on your plan" | confirmed. Docs say "cores" while pricing is per vCPU; treated as vCPU (unverifiable). max_ram_gib 62.5 (64,000 MB) kept; docs round to "64GB" |
| Rate limits: 100 control-plane/min, 300 VM-agent/min, 10 builds/h, 20 creates/min; Pro 2x; Enterprise custom | confirmed |
| No explicit concurrency limit | confirmed (none published) |
| Pro plan $29/mo / 100 sandboxes (CLI sample only) | unverifiable - fee stays null |
| Allocation (not active) CPU basis | unverifiable (basis not stated); card's reading consistent with the page examples |
| Paused/stopped storage, snapshot price, egress price | unverifiable (not published) - nulls kept |
| Timeout = wall-clock delete, default 3,600 s; pause stops compute | not re-fetched this pass (docs); unverifiable here |
| us-east / eu-west, no price difference | not re-fetched; unverifiable here |
No corrections needed.