# Datalayer Runtimes — billing regimes
As of 2026-11-08. Datalayer bills in credits. The docs say "a credit is a cent" and call prices provisional. USD below = credits x $0.01.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| CPU runtime, small | 1 CPU / 2 GiB | 0.0008 credits/s, per second while running (about $0.0288/h). | https://datalayer.ai/docs/environments-user |
| CPU runtime, medium | 4 CPU / 8 GiB | 0.0016 credits/s (about $0.0576/h). | https://datalayer.ai/docs/environments-user |
| CPU runtime, large | 8 CPU / 16 GiB | 0.0032 credits/s (about $0.1152/h). | https://datalayer.ai/docs/environments-user |
| GPU classes | gpu-small / gpu-large | Run on your own Modal or Daytona account; "priced by the provider that runs it". | https://datalayer.ai/docs/environments-user |
| Free | Personal | 50 wallet credits and 500 agent runs/month. | https://datalayer.io/pricing |
| Team | $49/month base | 500 credits / 5,000 runs; organization adds $15/active seat. | https://datalayer.io/pricing |
## Gotchas
- The pricing page is client-rendered and could not be read on 2026-11-08. The older pricing-page row (1 vCPU / 1 GiB at $0.30/h, larger sizes "Unavailable") is not used.
- A runtime runs for a time reserved up front and stops when it runs out. A sandbox can be paused to keep its state. An application can be kept always on under a daily credit limit.
- Runtime pods reach no outside network by default (Shield). Install packages at environment build time.
- Concurrency limits, snapshot storage and Volume prices are not published. Do not treat them as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**.
The medium class matches the shape: 8,800 h × 0.0016 credits/s × 3,600 s = 50,688 credits, about **$507** (provisional). Always-on, one instance: 0.0016 × 3,600 × 730 = 4,205 credits, about **$42/month**. Fifty concurrent runtimes, Volume storage and snapshot retention are unpublished and need a quote.
## Sources
- https://datalayer.ai/docs/environments-user
- https://datalayer.ai/docs/credits
- https://datalayer.io/pricing
- https://github.com/datalayer/agent-runtimes/blob/main/docs/docs/shield/index.mdx
