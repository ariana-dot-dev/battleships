# fal: GPU regimes
As of 2026-09-28. Serverless custom apps / compute.
GPU time is not interchangeable with model API output pricing. Custom deployment requires contacting support. The as-low-as column is conditional, not generally available on-demand pricing. Serverless CPU/RAM bundles verified in machine-types docs; separate Compute VMs have different shape and unpublished dashboard rates. Billing starts at SETUP and includes IDLE/RUNNING/DRAINING/TERMINATING; PENDING and DOCKER_PULL unbilled. This is not active-request-only pricing.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| serverless  | B300 ; count [1]; Region/availability must be checked at launch. | per-second; min unknowns | 8.5; list; per_gpu_hour | [source](https://fal.ai/pricing) |
| reserved  | B300 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | 4.49; list-from; per_gpu_hour | [source](https://fal.ai/pricing) |
| serverless  | B200 ; count [1]; Region/availability must be checked at launch. | per-second; min unknowns | 6.25; list; per_gpu_hour | [source](https://fal.ai/pricing) |
| reserved  | B200 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | 3.49; list-from; per_gpu_hour | [source](https://fal.ai/pricing) |
| serverless  | H200 ; count [1]; Region/availability must be checked at launch. | per-second; min unknowns | 4.5; list; per_gpu_hour | [source](https://fal.ai/pricing) |
| reserved  | H200 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | 2.1; list-from; per_gpu_hour | [source](https://fal.ai/pricing) |
| serverless  | H100 ; count [1]; Region/availability must be checked at launch. | per-second; min unknowns | 4.5; list; per_gpu_hour | [source](https://fal.ai/pricing) |
| reserved  | H100 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | 1.89; list-from; per_gpu_hour | [source](https://fal.ai/pricing) |
| serverless  | RTX-PRO-6000 ; count [1]; Region/availability must be checked at launch. | per-second; min unknowns | 2.99; list; per_gpu_hour | [source](https://fal.ai/pricing) |
| reserved  | RTX-PRO-6000 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | 1.1; list-from; per_gpu_hour | [source](https://fal.ai/pricing) |
| on-demand dedicated-compute | H100 SXM; count [1]; Dedicated Compute dashboard; region unspecified. | per-hour; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://fal.ai/docs/documentation/compute/pricing.md) |
| on-demand dedicated-compute | H100 SXM; count [8]; Dedicated Compute dashboard; region unspecified. | per-hour; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://fal.ai/docs/documentation/compute/pricing.md) |
## Gotchas
- GPU time is not interchangeable with model API output pricing. Custom deployment requires contacting support. The as-low-as column is conditional, not generally available on-demand pricing. Serverless CPU/RAM bundles verified in machine-types docs; separate Compute VMs have different shape and unpublished dashboard rates. Billing starts at SETUP and includes IDLE/RUNNING/DRAINING/TERMINATING; PENDING and DOCKER_PULL unbilled. This is not active-request-only pricing.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
Explicit GPU sensitivity example: add **1 × B300** to each of those 50 workers at the B300 quoted shape. Compute component = 8,800 × $8.5 = **$74,800.0000**. CPU/RAM are included in that SKU (not independently resizable).
This is compute-only, before platform fees, storage, egress, setup, minimum rounding, cold-start/idle tails and capacity quotas. 50 concurrent GPUs are not promised by a unit rate.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.