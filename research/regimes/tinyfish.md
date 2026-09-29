# TinyFish — Cloud Browser and Web Agent
As of 2026-09-28. Public USD list rates; prepaid Wallet. Browser capacity and Agent actions are distinct meters. Show HN 2026-02-12 item 46991520.
## Regimes
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Browser | Native product usage | $0.002/browser-minute = $0.12/browser-hour; 5 default concurrent. | [Primary pricing](https://www.tinyfish.ai/pricing) |
| Agent | Native product usage | $0.016/step; 2 default concurrent; LLM included. | [Primary pricing](https://www.tinyfish.ai/pricing) |
| Search / Fetch | Native product usage | Free within Search 30/min and 500/hour; Fetch 150 URLs/min and 1,000/day. Different products, not free browsers. | [Primary pricing](https://www.tinyfish.ai/pricing) |
| Included infrastructure | Native product usage | Residential proxies, anti-bot handling, screenshot/log/source storage included; duration/size terms not established. | [Primary pricing](https://www.tinyfish.ai/pricing) |
| Pay as you go | Account plan | $0/month; Browser 5 concurrent; Agent 2 concurrent; no subscription/minimum monthly spend. | [Primary pricing](https://www.tinyfish.ai/pricing) |
| Enterprise | Account plan | Unpublished / sales; Custom concurrency and rate limits; VPC, SSO, audit logs and contractual SLA. | [Primary pricing](https://www.tinyfish.ai/pricing) |
## Gotchas
- A browser has no published vCPU/RAM allocation; $0.12/browser-hour is not a 4/8 VM.
- Default browser concurrency 5 cannot meet 50; custom sales limits required.
- Model inference is included with Agent steps; do not add it again.
- Per-minute price does not establish rounding increment or minimum session bill.
- Existing Agent run finishes when Wallet reaches zero, so zero balance is not an immediate kill guarantee.
## Required worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU, 50 GiB retained snapshots and 100 GiB egress.
**No valid VM total.** A separate browser-only arithmetic scenario is `8,800 × $0.12 = $1,056` before any contract changes, but 50 concurrency exceeds the public limit of 5. $1,056 is neither a sales quote nor a 4/8-VM estimate. Agent steps, snapshot retention and general egress cannot be inferred from these hours.
## Feature evidence
- https://docs.tinyfish.ai/llms-full.txt
- https://docs.tinyfish.ai/browser-api
- https://docs.tinyfish.ai/agent-api