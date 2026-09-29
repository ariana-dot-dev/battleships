# CoreWeave: GPU regimes
As of 2026-09-28. GPU nodes on Kubernetes / virtual servers.
Current node tables bundle CPU/RAM. Do not reuse obsolete per-resource A100 prices. Spot rates are regional point-in-time quotes. Multi-GPU node minimum makes divided rate unsuitable for a single-GPU sandbox.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand  | B200 HGX; count [8]; US table; region-dependent availability and spot prices. | unknown; min unknowns | 8.6; list; per_gpu_hour | [source](https://www.coreweave.com/pricing) |
| on-demand  | H100 HGX; count [8]; US table; region-dependent availability and spot prices. | unknown; min unknowns | 6.155; list; per_gpu_hour | [source](https://www.coreweave.com/pricing) |
| on-demand  | H200 HGX; count [8]; US table; region-dependent availability and spot prices. | unknown; min unknowns | 6.305; list; per_gpu_hour | [source](https://www.coreweave.com/pricing) |
| on-demand  | L40S ; count [8]; US table; region-dependent availability and spot prices. | unknown; min unknowns | 2.25; list; per_gpu_hour | [source](https://www.coreweave.com/pricing) |
| on-demand  | L40 ; count [8]; US table; region-dependent availability and spot prices. | unknown; min unknowns | 1.25; list; per_gpu_hour | [source](https://www.coreweave.com/pricing) |
| on-demand  | A100-80GB ; count [8]; US table; region-dependent availability and spot prices. | unknown; min unknowns | 2.7; list; per_gpu_hour | [source](https://www.coreweave.com/pricing) |
| on-demand  | RTX-PRO-6000 High Memory; count [8]; US table; region-dependent availability and spot prices. | unknown; min unknowns | 2.5; list; per_gpu_hour | [source](https://www.coreweave.com/pricing) |
| on-demand  | GH200 ; count [1]; US table; region-dependent availability and spot prices. | unknown; min unknowns | 6.5; list; per_gpu_hour | [source](https://www.coreweave.com/pricing) |
| spot  | B300 ; count [8]; US table snapshot; another combined/default table shows H100 $19.71 and H200 $20.93 per node. Not a guaranteed quote. | unknown; min unknowns | 4.5875; dynamic-snapshot; per_gpu_hour | [source](https://www.coreweave.com/pricing) |
| spot  | B200 ; count [8]; US table snapshot; another combined/default table shows H100 $19.71 and H200 $20.93 per node. Not a guaranteed quote. | unknown; min unknowns | 4.35875; dynamic-snapshot; per_gpu_hour | [source](https://www.coreweave.com/pricing) |
| spot  | H100 ; count [8]; US table snapshot; another combined/default table shows H100 $19.71 and H200 $20.93 per node. Not a guaranteed quote. | unknown; min unknowns | 2.43875; dynamic-snapshot; per_gpu_hour | [source](https://www.coreweave.com/pricing) |
| spot  | H200 ; count [8]; US table snapshot; another combined/default table shows H100 $19.71 and H200 $20.93 per node. Not a guaranteed quote. | unknown; min unknowns | 2.58; dynamic-snapshot; per_gpu_hour | [source](https://www.coreweave.com/pricing) |
| spot  | RTX-PRO-6000 ; count [8]; US table snapshot; another combined/default table shows H100 $19.71 and H200 $20.93 per node. Not a guaranteed quote. | unknown; min unknowns | 1.37625; dynamic-snapshot; per_gpu_hour | [source](https://www.coreweave.com/pricing) |
## Gotchas
- Current node tables bundle CPU/RAM. Do not reuse obsolete per-resource A100 prices. Spot rates are regional point-in-time quotes. Multi-GPU node minimum makes divided rate unsuitable for a single-GPU sandbox.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
Explicit GPU sensitivity example: add **1 × GH200** to each of those 50 workers at the GH200 quoted shape. Compute component = 8,800 × $6.5 = **$57,200.0000**. CPU/RAM are included in that SKU (not independently resizable).
This is compute-only, before platform fees, storage, egress, setup, minimum rounding, cold-start/idle tails and capacity quotas. 50 concurrent GPUs are not promised by a unit rate.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.