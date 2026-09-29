# Google Compute Engine: GPU regimes
As of 2026-09-28. Accelerator-optimized A2/A3/G2 GPU VMs.
VM rate includes predefined CPU/RAM/GPU and bundled SSD if applicable. 60-second minimum then second billing. The selected default region was verified in HTML aria-selected/data-value: Iowa (us-central1). Rates are regional, not global. A3 1/2/4 GPU require Spot/Flex-start, not ordinary on-demand.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand  | a2-highgpu-1g ; count [1]; us-central1 (Iowa), verified selected region in source HTML. | per-second; min 60s | 3.673385; list; per_gpu_hour | [source](https://cloud.google.com/products/compute/pricing/accelerator-optimized) |
| on-demand  | a2-ultragpu-1g ; count [1]; us-central1 (Iowa), verified selected region in source HTML. | per-second; min 60s | 5.06879789; list; per_gpu_hour | [source](https://cloud.google.com/products/compute/pricing/accelerator-optimized) |
| on-demand  | a3-highgpu-8g ; count [8]; us-central1 (Iowa), verified selected region in source HTML. | per-second; min 60s | 11.0612500149; list; per_gpu_hour | [source](https://cloud.google.com/products/compute/pricing/accelerator-optimized) |
| on-demand  | a3-megagpu-8g ; count [8]; us-central1 (Iowa), verified selected region in source HTML. | per-second; min 60s | 11.6750891009; list; per_gpu_hour | [source](https://cloud.google.com/products/compute/pricing/accelerator-optimized) |
| on-demand  | a3-ultragpu-8g ; count [8]; us-central1 (Iowa), verified selected region in source HTML. | per-second; min 60s | 10.6008635616; list; per_gpu_hour | [source](https://cloud.google.com/products/compute/pricing/accelerator-optimized) |
| on-demand  | g2-standard-4 ; count [1]; us-central1 (Iowa), verified selected region in source HTML. | per-second; min 60s | 0.706832276; list; per_gpu_hour | [source](https://cloud.google.com/products/compute/pricing/accelerator-optimized) |
| spot  | a2-highgpu-1g ; count [1]; us-central1 (Iowa), verified selected region in source HTML. | per-second; min 60s | 2.20401; dynamic-snapshot; per_gpu_hour | [source](https://cloud.google.com/products/compute/pricing/accelerator-optimized) |
| spot  | a2-ultragpu-1g ; count [1]; us-central1 (Iowa), verified selected region in source HTML. | per-second; min 60s | 3.041237534; dynamic-snapshot; per_gpu_hour | [source](https://cloud.google.com/products/compute/pricing/accelerator-optimized) |
| spot  | a3-highgpu-8g ; count [8]; us-central1 (Iowa), verified selected region in source HTML. | per-second; min 60s | 6.6202870685; dynamic-snapshot; per_gpu_hour | [source](https://cloud.google.com/products/compute/pricing/accelerator-optimized) |
| spot  | a4-highgpu-8g ; count [8]; us-central1 (Iowa), verified selected region in source HTML. | per-second; min 60s | 4.9542; dynamic-snapshot; per_gpu_hour | [source](https://cloud.google.com/products/compute/pricing/accelerator-optimized) |
| spot  | g2-standard-4 ; count [1]; us-central1 (Iowa), verified selected region in source HTML. | per-second; min 60s | 0.424056; dynamic-snapshot; per_gpu_hour | [source](https://cloud.google.com/products/compute/pricing/accelerator-optimized) |
## Gotchas
- VM rate includes predefined CPU/RAM/GPU and bundled SSD if applicable. 60-second minimum then second billing. The selected default region was verified in HTML aria-selected/data-value: Iowa (us-central1). Rates are regional, not global. A3 1/2/4 GPU require Spot/Flex-start, not ordinary on-demand.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
Explicit GPU sensitivity example: add **1 × A100-40GB** to each of those 50 workers at the a2-highgpu-1g quoted shape. Compute component = 8,800 × $3.673385 = **$32,325.7880**. CPU/RAM are included in that SKU (not independently resizable).
This is compute-only, before platform fees, storage, egress, setup, minimum rounding, cold-start/idle tails and capacity quotas. 50 concurrent GPUs are not promised by a unit rate.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.