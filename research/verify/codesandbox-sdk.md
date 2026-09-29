# Verify: codesandbox-sdk (2026-09-28)
codesandbox.io returns 403 to plain fetchers (Cloudflare). Pages were rendered fresh (18:48-18:49 VM time) in headless Chrome on the
Pages: https://codesandbox.io/pricing,
https://codesandbox.io/docs/sdk/pricing, https://codesandbox.io/docs/learn/credit-usage/credits,
https://codesandbox.io/docs/learn/plans/subscriptions, https://codesandbox.io/docs/learn/plans/pricing-faq.
| Item | Result |
|---|---|
| Credit price $0.01486 (SDK docs, credits doc, pricing FAQ) vs $0.015 (pricing page FAQ) | confirmed conflict; card uses $0.01486 |
| Size table credits/h: Pico 5, Nano 10, Micro 20, Small 40, Medium 80, Large 160, XLarge 320; $/h 0.0743 ... 4.7552 | confirmed (docs); page shows $0.075 ... $4.8 |
| Specs Nano 2c/4 GB, Micro 4/8, Small 8/16, Medium 16/32, Large 32/64, XLarge 64/128 | confirmed |
| Pico conflict: docs 2 cores/1 GB vs pricing page 1 core/2 GB | confirmed |
| Per-started-minute billing (3m25s -> 4 min) | confirmed (SDK docs) |
| Two components: VM credits + VM concurrency | confirmed |
| Build: $0, 5 members, VM up to 4 vCPU/8 GiB, 10 concurrent, 20 new SDK sandboxes/h, 1,000 req/h, 20 GB storage | confirmed |
| Build 400 credits/month, no rollover, VMs frozen when credits run out | confirmed (credits + subscriptions docs, FAQ) |
| Pro (legacy editor): 1,000 base credits, add-on packs "with savings included", mandatory spending limit, 20 members, 10 concurrent, 20 new/h, 1,000 req/h, 16 vCPU/32 GiB; fee not on pricing page | confirmed |
| Small/Medium "Available from Pro" | confirmed |
| Scale "From $170 per month per workspace", up to 20 members, "160 hours of monthly VM credits", "on-demand VM credits priced at $0.15 per hour", 1,000 new/h, 250 concurrent, 10,000 req/h, 16 vCPU/32 GiB | confirmed |
| Scale included credits: 160 h read as 1,600 credits ($23.78) vs SDK docs example "1100 free VM credits" and "up to 100 concurrent VMs" (stale) | confirmed conflict; unverifiable which is current; card keeps 1,600 (current pricing page) |
| On-demand credits billed at end of cycle, "not subject to discount" | confirmed |
| Scale fee is not credit | confirmed (docs bill example: $170 base + credits beyond included) |
| Enterprise: custom, unlimited members, up to 50% off bulk packs, bespoke concurrency, 64 vCPU/128 GiB, SSO + dedicated cluster extras, SOC 2 Type II | confirmed |
| Storage 20 GB/VM, "more on demand" on Pro/Scale (price unpublished) | confirmed |
| Session length unlimited | confirmed |
| Education/OSS/non-profit discounts | confirmed |
| Hibernation free / archived after ~7 days / idle tail | unverifiable in this pass (hibernate/lifecycle docs not re-rendered) |
| Egress / IPv4 / regions | unverifiable (not published) |
| Build plan encoding (fee 0, included_usd 5.944, non-spec `usage_cap_usd`) | **corrected**: removed non-spec `usage_cap_usd`; Build marked `trial_only: true` because it has no on-demand credits (hard freeze), so the engine was pricing e.g. a $100 workload on Build as $94. Caveat rewritten. |