# Jarvislabs — pricing regimes (checked 2026-11-08)
GPU cloud. Added by the missing-providers audit (single-H100 SKUs).
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand | default | per minute, per GPU | H200 SXM $4.59, H100 SXM $3.49 (16 vCPU/200 GB), RTX Pro 6000 $2.19, A100 80GB $1.49, A100 40GB $0.89, L4 $0.44, A30 $0.41 | https://jarvislabs.ai/pricing |
| Spot | GPU containers (Templates), may be interrupted | per minute, per GPU | H200 $2.29, H100 $1.54, RTX Pro 6000 $1.15, A100 80GB $0.89, A100 40GB $0.79, L4 $0.29, A30 $0.29 | https://jarvislabs.ai/pricing |
| CPU VM | India only | per minute | $0.012/vCPU-h + $0.0032/GB-h (2 vCPU/8 GB = $0.05/h) | https://jarvislabs.ai/pricing |
| Reserved | 1-12 months | discount | 2-9% | https://jarvislabs.ai/pricing |
| Storage | always, also while paused | per GB-month | $0.10 ($0.00014/GB-h) | https://jarvislabs.ai/pricing |
## Gotchas
- Rates rose 2026-10-05 for H200/H100/RTX PRO 6000.
- Pause stops GPU billing but storage continues.
- Minimum top-up: $25 (products/vm) or $5 (FAQ); the two official pages differ.
- New instances: India (IN1, IN2) only. EU1 accepts no new instances.
## Worked example
1x H100: 250 h x $3.49 = $872.50 + 100 GB x $0.10 = $10.
Sources: https://jarvislabs.ai/pricing, https://jarvislabs.ai/products/vm, https://docs.jarvislabs.ai/faqs/
