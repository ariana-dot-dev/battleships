# Verda (ex-DataCrunch) — pricing regimes (2026-09-28)
GPU cloud. Added by the missing-providers audit (single-H100 SKUs).
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand | default | per GPU-hour | 1x H100 SXM5 $3.56 (30 CPU/120 GB), H200 $4.64, A100 80GB $1.80 | https://verda.com/pricing |
| Spot | spot | per GPU-hour | H100 $1.78, H200 $2.32 | https://verda.com/pricing |
| Reserved | 1m..2y | discount on on-demand | 2%..25% | https://verda.com/pricing |
| Storage | always | per GiB-month | $0.20 | https://verda.com/pricing |
## Gotchas
- No included disk: boot volume billed at $0.20/GiB-month.
## Worked example
1x H100: 250 h x $3.56 = $890 (+100 GiB x $0.20 = $20).
Sources: https://verda.com/pricing