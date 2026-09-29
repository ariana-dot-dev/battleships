# Verify: Modal (2026-09-28)
Sources re-fetched: https://modal.com/pricing, https://modal.com/docs/guide/network-egress-billing, https://modal.com/docs/guide/region-selection, https://modal.com/docs/guide/sandboxes.
## Card (cards/modal.json)
| Item | Result |
|---|---|
| Sandbox CPU $0.00003942/core-s; 1 core = 2 vCPU -> $0.070956/vCPU-h | confirmed (0.00003942 x 3600 / 2) |
| Sandbox memory $0.00000667/GiB-s -> $0.024012/GiB-h | confirmed |
| Function rates $0.0000131 and $0.00000222 (sandbox = 3x, non-preemptible multiplier already baked in) | confirmed |
| Minimum 0.125 core (min_vcpu 0.25) | confirmed |
| GPU $/s x 3600: T4 0.5904, L4 0.7992, A10 1.1016, L40S 1.9512, A100-40 2.0988, A100-80 2.4984, RTX PRO 6000 3.0312, H100 3.9492, H200 4.5396, B200 6.2496, B300 7.0992 | all confirmed |
| Region multipliers: broad 1.15 (us/eu/ap), narrow 1.75 | confirmed; they apply to GPU too (the docs example includes a T4) |
| Starter $0 fee, $30/mo included, 3 seats, 100 containers, 10 GPU | confirmed |
| Team $250 fee, $100 included (fee_is_credit false, included_usd 100), unlimited seats, 5,000 containers, 50 GPU | confirmed. The engine gives fee + max(0, usage − 100), which is correct |
| free.monthly_credit 30 plus Starter included_usd 30 | the engine skips the free credit when the plan has included_usd, so no double count. Confirmed OK |
| Egress $0.04/GiB beyond Starter 1 TiB / Team 10 TiB / Enterprise 100 TiB; charged from 2026-10-01; counts container-to-container traffic | confirmed. The engine uses only the Starter 1 TiB (already a caveat) |
| Volumes $0.09/GiB-month, 1 TiB free | confirmed |
| Default timeout 5 min, max 24 h, idle_timeout | confirmed |
| Memory-snapshot restrictions (no region pin, 7-day expiry) | unverifiable today (the region docs don't mention it) |
| Snapshot storage price unpublished | confirmed (not on the pricing page) |
| VM sandbox rates = sandbox rates | unverifiable (not re-fetched) |
## Regimes (regimes/modal.md)
Arithmetic checked: $0.47592/h; $4,188.10; Starter $4,158.10; Team $4,338.10; low-request $2,439.74; broad $4,816.31; narrow $7,329.17; Function $0.158256/h -> $1,392.65; egress sensitivity +$40.96.
Corrections: none.