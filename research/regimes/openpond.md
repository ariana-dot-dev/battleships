# OpenPond Cloud Sandboxes — billing regimes
As of 2026-11-08. Prices are USD. Source type: official published docs, never a fabricated quote.
Hosted sandbox plans with monthly included usage, then per-second resource meters. Since 2026-11, https://openpond.ai/pricing lists GPU training/inference only and sends sandbox capacity to sales; the sandbox plans and rates are on the docs page.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Free | $0 | Limited monthly usage; 1 concurrent, 5 retained sandboxes. | https://openpond.ai/docs/sandbox-sdk/pricing-and-budgets |
| Pro | $20/month | $20 monthly usage; 10 concurrent, 100 retained sandboxes. Then prepaid credit or opt-in metered overage. | https://openpond.ai/docs/sandbox-sdk/pricing-and-budgets |
| Enterprise | Custom | Usage, concurrency and retained sandboxes are contract-defined. | https://openpond.ai/docs/sandbox-sdk/pricing-and-budgets |
| Meters | Every plan | $0.000020/vCPU-s ($0.072/h), $0.0000065/GiB-s memory ($0.0234/h), $0.0000000333/GiB-s VM disk ($0.00012/h), $0.00000002/GiB-s durable volume. Default 1 vCPU / 2 GiB / 10 GiB = $0.12/h. | https://openpond.ai/docs/sandbox-sdk/pricing-and-budgets |
## Gotchas
- No Starter plan is published any more.
- A stopped sandbox keeps its root disk. That disk bills on a separate storage meter whose rate is not published.
- Snapshot storage rate is not published.
- Isolation technology is not published.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**. Self-serve concurrency is 10 on Pro, so 50 needs an Enterprise contract.
## Sources
- https://openpond.ai/docs/sandbox-sdk/pricing-and-budgets
- https://openpond.ai/pricing
- https://github.com/openpond/openpond
