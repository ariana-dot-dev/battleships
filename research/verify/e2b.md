# Verify: E2B (2026-09-28)
Sources re-fetched: https://e2b.dev/pricing, https://docs.e2b.dev/billing.
## Card (cards/e2b.json)
| Item | Result |
|---|---|
| vCPU $0.000014/s -> $0.0504/h | confirmed |
| RAM $0.0000045/GiB-s -> $0.0162/GiB-h | confirmed |
| Allocation basis, per second, no start fee or minimum | confirmed (rates only; minimum is unpublished) |
| Storage free; Hobby 10 GiB, Pro 20+ GiB (included_disk_gib 20) | confirmed |
| Hobby: $0 fee, $100 one-time credit, 20 concurrent, 1 h max session, 8 vCPU / 8 GiB, 1 create/s, account blocked when credit runs out | confirmed (docs/billing) |
| Pro: $150 fee, no credit (fee_is_credit false), 100 concurrent, 24 h, 5 creates/s | confirmed ("does not grant additional credits") |
| Pro+ $650 / 600 concurrent and Pro++ $1,150 / 1,100 concurrent | numbers confirmed. **Corrected** flags `["addon"]` -> `[]` and renamed the plans "Pro+ (600 concurrent)" / "Pro++ (1,100 concurrent)". The engine never prices `addon` plans, so >100 concurrent had no self-serve option; https://e2b.dev/pricing lists both as self-serve plans |
| Enterprise $3,000/mo minimum, sales flag | confirmed ("$3,000 monthly minimum applies"). The 1-year commit and usage-floor reading are unverifiable (pricing page says only "minimum") |
| Pro CPU 1-8 vCPU, RAM 1-8 GiB | confirmed (pricing page) |
| Hobby "Default sandbox CPU and RAM" conflict | unverifiable (the pricing-page text no longer shows it; docs/billing say 8 vCPU / 8 GiB for both plans) |
| Egress/snapshot/pause not billed | confirmed that no price is published (pricing page lists none) |
| Billing monthly in arrears | confirmed ("charged automatically at the start of the month for the previous month's usage") |
| Startup/Research $20k, BYOC, volumes | not re-checked (unverifiable today) |
| Creation-rate limits | added caveat: not modelled by the engine |
## Regimes (regimes/e2b.md)
Numbers confirmed. Arithmetic: 0.2016 + 0.1296 = $0.3312/h; 8,800 h = $2,914.56; Pro $3,064.56; idle 24 h = $8,893.68; $100 ≈ 302 h. No text corrections needed. The table already calls the add-ons self-serve, and only the card flag was wrong.