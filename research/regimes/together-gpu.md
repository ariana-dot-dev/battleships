# Together AI: GPU regimes
As of 2026-09-28. GPU Clusters and Dedicated Inference; separate from Code Sandbox.
GPU cluster rates not valid for Code Sandbox. H100 dedicated inference $3.99 is a promotion ending 2026-09-30; $5.49 normal list. Cluster reservation windows are not serverless usage rates.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand clusters | H100 HGX/SXM; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 3.99; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| on-demand clusters | H200 HGX/SXM; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 5.99; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| on-demand clusters | B200 HGX/SXM; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 8.19; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| on-demand clusters | B300 HGX/SXM; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 9.99; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| spot clusters | H100 HGX/SXM; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 1.99; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| spot clusters | H200 HGX/SXM; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 2.99; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| spot clusters | B200 HGX/SXM; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 4.09; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| spot clusters | B300 HGX/SXM; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 4.99; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| reserved clusters | H100 ; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 3.69; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| reserved clusters | H200 ; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 4.99; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| reserved clusters | B200 ; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 7.99; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| reserved clusters | H100 ; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 3.45; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| reserved clusters | H200 ; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 4.15; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| reserved clusters | B200 ; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 7.79; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| reserved clusters | H100 ; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 3.19; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| reserved clusters | H200 ; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 3.99; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| reserved clusters | B200 ; count [8]; Region/availability must be checked at launch. | per-hour; min unknowns | 6.79; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| on-demand dedicated-inference | H100 ; count None; Region/availability must be checked at launch. | per-hour; min unknowns | 3.99; promo; per_gpu_hour | [source](https://www.together.ai/pricing) |
| on-demand dedicated-inference-list | H100 ; count None; Region/availability must be checked at launch. | per-hour; min unknowns | 5.49; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
| on-demand dedicated-inference | B200 ; count None; Region/availability must be checked at launch. | per-hour; min unknowns | 8.99; list; per_gpu_hour | [source](https://www.together.ai/pricing) |
## Gotchas
- GPU cluster rates not valid for Code Sandbox. H100 dedicated inference $3.99 is a promotion ending 2026-09-30; $5.49 normal list. Cluster reservation windows are not serverless usage rates.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
No fixed single-full-GPU USD quote suitable for a numeric example was verified. Compute = 8,800 × selected offer $/hour, or required node count × node price; keep the estimate null until the offer/FX/commitment is resolved.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.