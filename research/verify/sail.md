# Verify: sail (2026-09-28)
Sources re-fetched: https://docs.sailresearch.com/pricing (page + raw HTML tooltips), https://docs.sailresearch.com/sailboxes-billing,
https://docs.sailresearch.com/sailboxes-autosleep, https://docs.sailresearch.com/llms-full.txt (CLI reference, plans).
| Item | Result |
|---|---|
| Used vCPU $0.015/h, used RAM $0.008/GiB-h, used NVMe disk $0.0007/GiB-h, volumes $0.000411/GiB-h | confirmed |
| Measurement: guest /proc/stat CPU time; MemTotal - MemAvailable; statfs used bytes on /; "sampled about every 15 s" | confirmed (pricing-page tooltips) |
| cpu_basis/ram_basis active, floor 0 | confirmed ("only charged for observed usage, not capacity") |
| Sizes s 1 vCPU / 16 GiB (2-64) / 32 GiB disk (8-128); m 4 / 32 (8-128) / 128 (32-512); l 8 / 64 (16-256) / 256 (64-1024) | confirmed (billing page + CLI --memory-limit-gib / --disk-limit-gib) ; vcpu_options [1,4,8], max_ram 256 OK |
| Not billed while sleeping, paused, checkpointing, cold-starting | confirmed |
| No minimum billed time / rounding published | confirmed (none stated) |
| Creation fee S $0.005 / M $0.01 / L $0.012, waived on Pro/Enterprise; copies pay it on Free | confirmed. Engine applies start_fee on every plan (cannot waive per plan without forcing Pro); caveat already states this |
| Free: $5/month credits when a payment method is attached; up to 4 seats; 100 concurrent | confirmed |
| Pro $250/month, $100/month included credits, +$150 first month; unlimited seats; 5,000 concurrent | confirmed; fee_is_credit false + included_usd 100 is the right encoding |
| Enterprise custom / volume, HIPAA BAA | confirmed |
| Credits exhausted -> running and sleeping Sailboxes paused, spend blocked | confirmed |
| Autosleep default 30 s, configurable 1 s-1 h; idle = no CPU, no timers, no open connections; outbound reply wait allowed unless request timeout < 5 min; cold wake possible | confirmed |
| Live migration a few times a day, several seconds | confirmed |
| arm64 images, SOC 2 + HIPAA | confirmed (llms-full: debian_arm64; "HIPAA and SOC 2-compliant") |
| free.monthly_credit 5 and Free plan included_usd 5 | engine skips free.monthly_credit when the plan has included_usd, so no double count: confirmed OK |
| Egress price, regions, checkpoint storage price, hypervisor | unverifiable (not published) |
| Worked example (783.20 usage; Free 778.70; Pro 933.20) | confirmed arithmetic |
No corrections needed.