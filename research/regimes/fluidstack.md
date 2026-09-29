# Fluidstack: GPU regimes
As of 2026-09-28. Dedicated GPU infrastructure / clusters.
Current site is enterprise AI infrastructure, no public self-serve GPU tariff. Historic $1.99 H100 claims not accepted as current. Sandbox-like on-demand product availability not verified.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| reserved  | H100 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://fluidstack.io/) |
| reserved  | H200 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://fluidstack.io/) |
| reserved  | B200 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://fluidstack.io/) |
| reserved  | GB200 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://fluidstack.io/) |
## Gotchas
- Current site is enterprise AI infrastructure, no public self-serve GPU tariff. Historic $1.99 H100 claims not accepted as current. Sandbox-like on-demand product availability not verified.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
No fixed single-full-GPU USD quote suitable for a numeric example was verified. Compute = 8,800 × selected offer $/hour, or required node count × node price; keep the estimate null until the offer/FX/commitment is resolved.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.