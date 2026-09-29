# Verify: tenki (2026-09-28)
Sources re-fetched: https://tenki.cloud/pricing (HTML incl. FAQ JSON), https://tenki.cloud/docs/pricing.md,
https://tenki.cloud/docs/runners/sizes.md, https://tenki.cloud/llms-full.txt (billing, changelog, sandbox sections).
| Item | Result |
|---|---|
| Sandbox vCPU $0.000014/s ($0.0504/h), memory $0.0000045/GiB-s ($0.0162/GiB-h) | confirmed (pricing page + docs) |
| Sandbox disk $0.00000003/GiB-s, 5 GiB free | confirmed |
| Storage $0.20/GiB-month from first byte ($0.000000076/GiB-s on pricing page), one pool per workspace | confirmed |
| "No minimums or per-seat fees" | confirmed (pricing page) |
| Starter $0, $100 sign-up credit, 5 members, 5 concurrent, 100 GiB, 4 cores / 8 GB | confirmed (pricing page plan card now also shows "$100 sign-up credit") |
| Team $250/mo monthly vs $200/mo billed yearly ("20% Saved") | confirmed (docs: "$200/mo billed yearly, $250/mo billed monthly"; pricing page shows $200 on yearly toggle) |
| Team (annual) plan flags [] | corrected: [] -> ["sales"] (12-month $2,400 commitment; ENGINE_CARD lists annual commit under "sales"; matches lightning-ai annual plans). Default estimate now uses $250 monthly |
| Team $100/month credits, no rollover, 50 members, 100 concurrent, 1,000 GiB, 16 cores / 64 GB, priority support | confirmed |
| Upgrading drains Starter credits | confirmed (pricing FAQ) |
| Fee not credit (fee_is_credit false, included_usd 100) | confirmed ("+ Usage beyond monthly credits") |
| Sign-up credit one-time per account, first workspace, no card; legacy $10/month discontinued | confirmed (llms-full billing section) |
| Pricing-page FAQ still says "Starter's $10/month goes to your oldest workspace" | confirmed still present (stale); caveat reworded to note the plan card itself now says $100 |
| Top-up minimum $20 | confirmed (docs "minimum top-up is $20") |
| Purchased credits never expire; daily spending limit | unverifiable this pass (not found in re-fetched text) |
| $10 share reward, one per user/workspace | confirmed |
| Startup program up to $50K | unverifiable this pass (not in fetched pricing text) |
| x64 runners $0.002/core-min; sizes 2c/4g/86 GB, 4c/8g/150 GB, 8c/16g/200 GB, 16c/32g/300 GB | confirmed; hour prices 0.24/0.48/0.96/1.92 arithmetic OK |
| macOS runners $0.020/core-min (M4 Pro), macOS 26 sizes 2c/4g, 4c/8g, 6c/16g, 8c/32g, 140 GB | confirmed; 2.4/4.8/7.2/9.6 arithmetic OK |
| Code reviews $1.00 | confirmed |
| --idle-timeout removed (never had any effect); sticky runs until terminated; --max-duration cap | confirmed (changelog, CLI docs). Note: docs text for sticky sessions says non-sticky ones may be "paused for looking idle"; auto_stop_idle left false (ambiguous) |
| Default SSH gateway region US | confirmed (changelog "Legacy SSH gateway discovery defaults to the US region") |
| Runner modes flagged alt, sizes pricing; sandbox mode alloc basis | confirmed engine interpretation correct |
| Worked example: 8,800 x 0.3312 = 2,914.56; Team monthly 3,074.56; annual 3,024.56; anti-pattern 8,893.68 | confirmed arithmetic |
Corrections: Team (annual) flagged "sales"; stale-FAQ caveat reworded; regime table row notes the flag.