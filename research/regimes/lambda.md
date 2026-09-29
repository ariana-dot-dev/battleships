# Lambda: GPU regimes
As of 2026-09-28. On-Demand GPU Cloud instances and 1-Click Clusters.
CPU/RAM/local SSD included. Billing one-minute increments from launch health-check success to termination, including idle. Per-GPU price changes with node count. No spot list found.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand  | B200 SXM6; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 6.99; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | GH200 ; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 2.29; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | H100 SXM; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 4.29; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | H100 PCIe; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 3.29; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | A100-40GB SXM; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 1.99; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | A100-40GB PCIe; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 1.99; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | A10 ; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 1.29; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | RTX-A6000 ; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 1.09; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | RTX6000 Quadro; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 0.69; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | B200 SXM6; count [2]; Region/availability must be checked at launch. | per-minute; min 60s | 6.89; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | H100 SXM; count [2]; Region/availability must be checked at launch. | per-minute; min 60s | 4.19; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | A100-40GB PCIe; count [2]; Region/availability must be checked at launch. | per-minute; min 60s | 1.99; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | RTX-A6000 ; count [2]; Region/availability must be checked at launch. | per-minute; min 60s | 1.09; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | B200 SXM6; count [4]; Region/availability must be checked at launch. | per-minute; min 60s | 6.79; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | H100 SXM; count [4]; Region/availability must be checked at launch. | per-minute; min 60s | 4.09; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | A100-40GB PCIe; count [4]; Region/availability must be checked at launch. | per-minute; min 60s | 1.99; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | RTX-A6000 ; count [4]; Region/availability must be checked at launch. | per-minute; min 60s | 1.09; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | B200 SXM6; count [8]; Region/availability must be checked at launch. | per-minute; min 60s | 6.69; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | H100 SXM; count [8]; Region/availability must be checked at launch. | per-minute; min 60s | 3.99; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | A100-80GB SXM; count [8]; Region/availability must be checked at launch. | per-minute; min 60s | 2.79; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | A100-40GB SXM; count [8]; Region/availability must be checked at launch. | per-minute; min 60s | 1.99; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| on-demand  | V100 16GB; count [8]; Region/availability must be checked at launch. | per-minute; min 60s | 0.79; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| reserved  | H100 ; count [16]; Region/availability must be checked at launch. | weekly-increments; min unknowns | 6.16; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| reserved  | H100 ; count [64]; Region/availability must be checked at launch. | weekly-increments; min unknowns | 5.85; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| reserved  | H100 ; count [256]; Region/availability must be checked at launch. | weekly-increments; min unknowns | 5.54; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| reserved  | B200 ; count [16]; Region/availability must be checked at launch. | weekly-increments; min unknowns | 9.86; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| reserved  | B200 ; count [64]; Region/availability must be checked at launch. | weekly-increments; min unknowns | 9.36; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
| reserved  | B200 ; count [256]; Region/availability must be checked at launch. | weekly-increments; min unknowns | 8.87; list; per_gpu_hour | [source](https://lambda.ai/pricing) |
## Gotchas
- CPU/RAM/local SSD included. Billing one-minute increments from launch health-check success to termination, including idle. Per-GPU price changes with node count. No spot list found.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
Explicit GPU sensitivity example: add **1 × B200** to each of those 50 workers at the B200 quoted shape. Compute component = 8,800 × $6.99 = **$61,512.0000**. CPU/RAM are included in that SKU (not independently resizable).
This is compute-only, before platform fees, storage, egress, setup, minimum rounding, cold-start/idle tails and capacity quotas. 50 concurrent GPUs are not promised by a unit rate.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.