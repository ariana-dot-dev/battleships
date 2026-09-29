# Baseten: GPU regimes
As of 2026-09-28. Dedicated model deployments and training containers.
Bundled CPU/RAM; billed by minute. Deployment/load/scale time billed; scale-to-zero is not free warm replicas. H100 MIG is 3/7 compute and 1/2 memory, not half a full H100. Custom model packaging via Truss; not a general secure code-exec sandbox.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| serverless  | T4 ; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 0.6312; list; per_gpu_hour | [source](https://docs.baseten.co/deployment/resources) |
| serverless  | L4 ; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 0.8484; list; per_gpu_hour | [source](https://docs.baseten.co/deployment/resources) |
| serverless  | A10G ; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 1.2072; list; per_gpu_hour | [source](https://docs.baseten.co/deployment/resources) |
| serverless  | A100-80GB ; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 4.0002; list; per_gpu_hour | [source](https://docs.baseten.co/deployment/resources) |
| serverless  | H100 ; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 6.4998; list; per_gpu_hour | [source](https://docs.baseten.co/deployment/resources) |
| serverless  | H200 ; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 7.5; list; per_gpu_hour | [source](https://docs.baseten.co/deployment/resources) |
| serverless  | B200 ; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 9.9798; list; per_gpu_hour | [source](https://docs.baseten.co/deployment/resources) |
| serverless  | RTX-PRO-6000 ; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 4.0002; list; per_gpu_hour | [source](https://docs.baseten.co/deployment/resources) |
| serverless  | H100 MIG 40GB; count [1]; Region/availability must be checked at launch. | per-minute; min 60s | 3.75; list; per_slice_hour | [source](https://docs.baseten.co/deployment/resources) |
## Gotchas
- Bundled CPU/RAM; billed by minute. Deployment/load/scale time billed; scale-to-zero is not free warm replicas. H100 MIG is 3/7 compute and 1/2 memory, not half a full H100. Custom model packaging via Truss; not a general secure code-exec sandbox.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
Explicit GPU sensitivity example: add **1 × T4** to each of those 50 workers at the T4 quoted shape. Compute component = 8,800 × $0.6312 = **$5,554.5600**. CPU/RAM are included in that SKU (not independently resizable).
This is compute-only, before platform fees, storage, egress, setup, minimum rounding, cold-start/idle tails and capacity quotas. 50 concurrent GPUs are not promised by a unit rate.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.