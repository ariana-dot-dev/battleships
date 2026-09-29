# zipbox — Cloud computer for AI agents
As of 2026-09-28. Official USD list fixed VM sizes, metered per second while running. Show HN 2026-08-05 item 49187992. Monthly display is illustrative, not a verified cap.
## Regimes
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Tiny | Native product usage | 1 vCPU/2 GB/20 GB at$0.0068/hour. | [Primary pricing](https://zipbox.ai/pricing) |
| Small | Native product usage | 2 vCPU/4 GB/80 GB at$0.0137/hour. | [Primary pricing](https://zipbox.ai/pricing) |
| Medium | Native product usage | 4 vCPU/8 GB/160 GB at$0.0274/hour. | [Primary pricing](https://zipbox.ai/pricing) |
| Large | Native product usage | 6 vCPU/16 GB/320 GB at$0.0548/hour. | [Primary pricing](https://zipbox.ai/pricing) |
| Paused | Native product usage | $0; disk saved; explicit free pause. | [Primary pricing](https://zipbox.ai/pricing) |
| Prepaid pay as you go | Account plan | $0/month; Positive balance to boot; card top-ups; optional/automatic saved-card top-up; no published monthly subscription fee. | [Primary pricing](https://zipbox.ai/pricing) |
## Gotchas
- Displayed $5/$10/$20/$40 monthly equivalents are not stated as billing caps or always-on discounts; use hourly rates.
- Pause saves disk; does not establish full running-memory snapshot retention.
- 50 concurrent capacity, max session length, egress charge and public IPv 4 pricing not published.
- LLM/API calls using platform keys draw the same credit balance and are additional; own model subscriptions separate.
- Credits prepaid/nonrefundable; signup 25 USD requires human verification.
- No independent runtime/account test or performance measurement performed.
## Required worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU, 50 GiB retained snapshots and 100 GiB egress.
Known compute subtotal: `8,800 × $0.0274 = $241.12`. CPU 30% does not reduce wall-clock billing. Paused retained disk is advertisedfree;100 GiB egress and 50-concurrency capacity are unverified, so **complete workload total remains unknown**. No signup credit, model usage or taxes applied.
## Feature evidence
- https://zipbox.ai/
- https://zipbox.ai/docs/quick-start
- https://zipbox.ai/docs/pricing
- https://zipbox.ai/docs/how-things-work
- https://zipbox.ai/docs/access
- https://zipbox.ai/docs/security