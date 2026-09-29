# Verify: miosa (2026-09-28)
Sources re-fetched: https://miosa.ai/pricing (HTML incl. plan comparison table + FAQ), https://miosa.ai/llms-full.txt (sandboxes, computers, regions, limits docs).
| Item | Result |
|---|---|
| Rate card vCPU 4.536 cr/h, RAM 1.458 cr/GB-h, disk running 0.06147 cr/GB-h, cold 0.00243 cr/GB-h, egress 5 cr/GB, GPU 175 cr/h, builds 2 cr/min, tokens cost +15%, 1 credit = $0.01 | confirmed |
| Page rounding $0.0454 / $0.0146 | confirmed |
| Sandbox sizes xs 1/2/10, small 2/4/10 (default), medium 4/8/20, large 8/16/40, xl 16/32/80 | confirmed (sandboxes docs) |
| Computer sizes xs 10, small 20 (default), medium 50, large 100, xl 200 GB disk | confirmed (computers overview) |
| Size hourly prices (sandbox 0.080667/0.155187/0.310374/0.620748/1.241496; computer 0.080667/0.161334/0.328815/0.65763/1.31526) | confirmed arithmetic from rate card |
| BYOC 45% of managed rate (xs 0.0363 ... xl 0.558673) | confirmed; cloud bill excluded (caveat) |
| Cold storage $0.0000243/GB-h = $0.017739/GB-month (snapshot_gib_month) | confirmed |
| Developer $0, $10 one-time (1,000 credits), no card to start, 3 computers / 10 sandboxes / 2 concurrent, hard stop at $0, no auto-recharge | confirmed |
| Developer usable beyond the grant? | confirmed: FAQ "Once it's used, add a card to keep going at the same published rates, or move to Business"; top-ups $1-$5,000 -> a real PAYG plan, correctly NOT trial_only |
| Business $500/mo minimum, 50,000 credits, overage with spend controls, 100/250/50, cancel end of period | confirmed |
| Enterprise $1,000/mo, 100,000 credits, 200/500/200, SSO/SCIM, cancellation per agreement | confirmed |
| fee_is_credit (monthly minimum credited 1:1) | confirmed ("Your plan sets a minimum monthly spend"; included credits $500/$1000) |
| Enterprise flagged "sales" | kept (CTA "Request Enterprise"; price is published, so fee 1000 retained) |
| Per-computer caps Dev 2/4/10, Business 8/16/40, Enterprise 16/32/80 (plan max_vcpu / sizes_allowed) | unverifiable: absent from the live page (only in the earlier raw capture); kept with caveat |
| Docs default 10 concurrent sandboxes per tenant | confirmed (limits table) |
| timeout_sec 1-86,400 default 3,600; idle_timeout_sec default 0 | confirmed |
| Metered continuously, settles ~every 5 min | confirmed (FAQ) |
| Regions us-west-la (default), us-east-ny, us-mia | confirmed |
| Stopped computers "pause billing (or charges at the stopped rate, depending on your plan)" | confirmed |
| Stale credits doc model | not re-checked (irrelevant, ignored by card) |
No corrections needed.