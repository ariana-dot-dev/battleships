# Verda (ex-DataCrunch) — pricing regimes (2026-11-08)
GPU cloud. Added by the missing-providers audit (single-H100 SKUs).
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand | default | per GPU-hour | 1x H100 SXM5 $4.938 (30 CPU/120 GB), H200 $6.44, A100 80GB $2.316 | https://verda.com/pricing |
| Spot | spot | per GPU-hour | H100 $2.469, H200 $3.22 | https://verda.com/pricing |
| CPU instances | default | per vCPU-hour, 4 GB RAM per vCPU | $0.012 on-demand, $0.0048 spot | https://verda.com/pricing |
| Reserved | 1m..2y | discount on on-demand | 2%..25% | https://verda.com/pricing |
| Storage | always | per GiB-month | $0.20 NVMe block; object storage (beta) $0.07 | https://verda.com/pricing, https://verda.com/ |
## Gotchas
- No included disk: boot volume billed at $0.20/GiB-month.
- A shut-down instance keeps billing at the full hourly rate. Only Delete stops the instance charge.
- Balance at zero: instances are discontinued and volumes deleted. Deleted volumes can be restored for up to 96 hours (https://docs.verda.com/welcome-to-verda/pricing-and-billing/).
- GPU prices rose about 20% between 2026-10-14 and 2026-11-08. CPU prices did not change.
## Worked example
1x H100: 250 h x $4.938 = $1,234.50 (+100 GiB x $0.20 = $20).
Sources: https://verda.com/pricing
