# OVHcloud: GPU regimes
As of 2026-09-28. Public Cloud GPU instances.
International USD page, ex VAT. Bundled CPU/RAM/storage. Region selection affects rate/availability. IPv4 starts billing separately October 1, 2026; not yet applicable on research date. Page mislabels multiple GPU memory technologies: do not copy HBM2 claims for L4/H100.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand  | l40s-90 ; count [1]; International USD price page default; select region before purchase. | per-hour; min unknowns | 1.8; list; per_gpu_hour | [source](https://www.ovhcloud.com/en/public-cloud/prices/) |
| on-demand  | a10-45 ; count [1]; International USD price page default; select region before purchase. | per-hour; min unknowns | 1; list; per_gpu_hour | [source](https://www.ovhcloud.com/en/public-cloud/prices/) |
| on-demand  | a100-180 ; count [1]; International USD price page default; select region before purchase. | per-hour; min unknowns | 3.07; list; per_gpu_hour | [source](https://www.ovhcloud.com/en/public-cloud/prices/) |
| on-demand  | h100-380 ; count [1]; International USD price page default; select region before purchase. | per-hour; min unknowns | 2.99; list; per_gpu_hour | [source](https://www.ovhcloud.com/en/public-cloud/prices/) |
| on-demand  | h200-1920 ; count [8]; International USD price page default; select region before purchase. | per-hour; min unknowns | 6.195; list; per_gpu_hour | [source](https://www.ovhcloud.com/en/public-cloud/prices/) |
| on-demand  | l4-90 ; count [1]; International USD price page default; select region before purchase. | per-hour; min unknowns | 1; list; per_gpu_hour | [source](https://www.ovhcloud.com/en/public-cloud/prices/) |
| on-demand  | rtx5000-28 ; count [1]; International USD price page default; select region before purchase. | per-hour; min unknowns | 0.6; list; per_gpu_hour | [source](https://www.ovhcloud.com/en/public-cloud/prices/) |
| on-demand  | t1-45 ; count [1]; International USD price page default; select region before purchase. | per-hour; min unknowns | 0.77; list; per_gpu_hour | [source](https://www.ovhcloud.com/en/public-cloud/prices/) |
## Gotchas
- International USD page, ex VAT. Bundled CPU/RAM/storage. Region selection affects rate/availability. IPv4 starts billing separately October 1, 2026; not yet applicable on research date. Page mislabels multiple GPU memory technologies: do not copy HBM2 claims for L4/H100.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
Explicit GPU sensitivity example: add **1 × L40S** to each of those 50 workers at the l40s-90 quoted shape. Compute component = 8,800 × $1.8 = **$15,840.0000**. CPU/RAM are included in that SKU (not independently resizable).
This is compute-only, before platform fees, storage, egress, setup, minimum rounding, cold-start/idle tails and capacity quotas. 50 concurrent GPUs are not promised by a unit rate.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.