# Verify: mosaic (2026-09-28)
Sources re-fetched: https://sandbox.mosaicos.com/, https://sandbox.mosaicos.com/pricing, https://sandbox.mosaicos.com/docs/,
https://sandbox.mosaicos.com/llms.txt, https://sandbox.mosaicos.com/start/.
| Item | Result |
|---|---|
| $0.05/hour active compute, includes RAM and storage, $0 while hibernated | confirmed (homepage + pricing page) |
| 1 unit = 2 vCPU / 4 GiB (previously an assumption) | confirmed: pricing page "$0.00001389 / second, at 2 vCPU / 4 GB. The 4 vCPU guest bills as two of those; the 1 vCPU guest still bills as one"; docs "one SKU, priced per hour at 4096 MB / 2 vCPU" |
| Sizes 2/4 $0.05, 4/8 $0.10, 8/16 $0.20, 16/32 $0.40 (8/16 and 16/32 base template only; non-default = cold boot) | confirmed (2x/4x/8x units) |
| 1 vCPU / 2 GiB shape unit count unpublished | corrected: added size 1/2 at $0.05 (bills as 1 unit, pricing page) |
| Metered on awake_seconds (per second) | confirmed; added caveat: wall-clock fallback if host awake record unreachable |
| Hibernation after 3 quiet seconds; running process / SSH prevents pause | confirmed (docs) |
| Guest disk 2.0 GB root filesystem (included_disk_gib 2) | confirmed |
| No per-org sandbox limit (429 capacity_unavailable) | confirmed |
| Billing: hosted Stripe checkout, requires_checkout, billing_model metered_active_compute; no free tier/plans | confirmed; no free credit found |
| Regions silicon-valley + northern-virginia, no EU | confirmed |
| SSO | corrected: null -> true (pricing page "RBAC, SSO, and audit logs included") |
| Archived (7-day), named environments (~30 d), volumes pricing | unverifiable (no price published; assumed $0) |
| Egress price | confirmed unpublished (null) |
| Engine: sizes picks 4/8 at $0.10 for a 4/8 workload; awake_pct hours_factor | confirmed correct interpretation |
Corrections: added 1/2 size, sso true, unit caveat changed from assumption to confirmed, pricing page added to sources, regime md updated.