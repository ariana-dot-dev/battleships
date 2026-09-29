# Jarvislabs — pricing regimes (2026-09-28)
GPU cloud. Added by the missing-providers audit (single-H100 SKUs).
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand | default | per minute, per GPU | H100 SXM $2.69 (16 vCPU/200 GB), H200 $3.99, A100 80GB $1.49, L4 $0.44 | https://jarvislabs.ai/pricing |
| Spot | spot | per minute | up to 56% off (no numbers) | https://jarvislabs.ai/pricing |
| Reserved | 1-12 months | discount | 2-9% | https://jarvislabs.ai/pricing |
| Storage | always | per GB-month | $0.10 | https://jarvislabs.ai/pricing |
## Gotchas
- Rates change 2026-10-05 for H200/H100/RTX PRO 6000.
- Pause stops GPU billing but storage continues.
## Worked example
1x H100: 250 h x $2.69 = $672.50 + 100 GB x $0.10 = $10.
Sources: https://jarvislabs.ai/pricing