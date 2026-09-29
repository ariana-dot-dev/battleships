# PaperPod — Agent-native container execution and browser API
As of 2026-09-28. Public API self-description is the complete public product/endpoint guide at root. Show HN 2026-02-09 item 46950654. USD list meters; top-up bonuses are conditional prepaid offers.
## Regimes
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Compute seconds | Native product usage | $0.0001/s = $0.36/execution-hour; code execution and processes. | [Primary pricing](https://www.paperpod.dev/) |
| Browser seconds | Native product usage | $0.0001/s = $0.36/browser-operation-hour; screenshots, PDF, scraping. | [Primary pricing](https://www.paperpod.dev/) |
| AI neurons | Native product usage | $0.02/1,000 neurons; separate model-usage unit. | [Primary pricing](https://www.paperpod.dev/) |
| Prepaid top-up tiers | Native product usage | $1 micro; $5 starter; $20 Pro +10% bonus; $100 Scale +20% bonus. No expiry verified. | [Primary pricing](https://www.paperpod.dev/) |
| Included | Native product usage | Agent Memory 10 MB, preview URLs, file IO included. | [Primary pricing](https://www.paperpod.dev/) |
| Pay per request | Account plan | $0/month; Prepaid via MPP / Tempo / Stripe; no public subscription fee. | [Primary pricing](https://www.paperpod.dev/) |
## Gotchas
- vCPU/RAM, concurrency and session ceilings not published; execution-hour cost is not a 4/8 VM quote.
- Compute processes and browser operations have separate seconds meters; unclear if simultaneous operations share or multiply billed seconds.
- Sandbox filesystem is ephemeral; Agent Memory is persistent but only 10 MB, not 50 GiB snapshots.
- Prepaid 20/100 dollar packs include 10%/20% bonuses; these are credit offers, not permanent unit-rate cuts.
- Browser/session lifecycle overhead, billing minimum and exact paused-retention terms not established.
## Required worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU, 50 GiB retained snapshots and 100 GiB egress.
**4/8 workload cannot be quoted.** If 8,800 billable execution-hours were actually consumed at the undiscounted native rate, compute alone would be `$3,168`; this does not establish hardware capacity,50-way concurrency,50 GiB storage or 100 GiB egress. Browser operations and AI neurons can add separate usage.
## Feature evidence
- https://paperpod.dev/