# Vultr: GPU regimes
As of 2026-09-28. Cloud GPU virtual machines and GPU bare metal.
Website blocked (403), use public Vultr plans API. Fractional GPU slices not equivalent to a full GPU. Listed plan may have no currently offered regions. API hourly vs monthly costs retained without assuming a cap policy.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand  | vcg-a16-2c-8g-2vram ; count [1]; ewr,ord,atl,fra,sjc,nrt,sgp,blr | per-hour; min unknowns | 0.059; list; per_slice_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-a16-2c-16g-4vram ; count [1]; ewr,sjc,nrt,sgp,blr | per-hour; min unknowns | 0.118; list; per_slice_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-a40-1c-5g-2vram ; count [1]; ewr,lax | per-hour; min unknowns | 0.075; list; per_slice_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-a16-3c-32g-8vram ; count [1]; sjc,sgp,blr | per-hour; min unknowns | 0.236; list; per_slice_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-a40-2c-10g-4vram ; count [1]; No available locations returned | per-hour; min unknowns | 0.144; list; per_slice_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-a40-4c-20g-8vram ; count [1]; No available locations returned | per-hour; min unknowns | 0.288; list; per_slice_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-a40-6c-30g-12vram ; count [1]; lax | per-hour; min unknowns | 0.432; list; per_slice_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-a16-12c-128g-32vram ; count [2]; sjc | per-hour; min unknowns | 0.471; list; per_gpu_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-a40-8c-40g-16vram ; count [1]; No available locations returned | per-hour; min unknowns | 0.575; list; per_slice_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-a40-12c-60g-24vram ; count [1]; No available locations returned | per-hour; min unknowns | 0.856; list; per_slice_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-l40s-16c-180g-48vram ; count [1]; No available locations returned | per-hour; min unknowns | 1.671; list; per_gpu_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-a16-24c-256g-64vram ; count [4]; No available locations returned | per-hour; min unknowns | 0.471; list; per_gpu_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-a16-48c-496g-128vram ; count [8]; No available locations returned | per-hour; min unknowns | 0.470875; list; per_gpu_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-l40s-32c-375g-96vram ; count [2]; No available locations returned | per-hour; min unknowns | 1.671; list; per_gpu_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vcg-l40s-64c-750g-192vram ; count [4]; No available locations returned | per-hour; min unknowns | 1.671; list; per_gpu_hour | [source](https://api.vultr.com/v2/plans?type=vcg) |
| on-demand  | vbm-48c-1024gb-4-a100-gpu NVIDIA_A100; count [4]; No available locations returned | per-hour; min unknowns | 2.39725; dynamic-snapshot; per_gpu_hour | [source](https://api.vultr.com/v2/plans-metal) |
| spot  | vbm-48c-1024gb-4-a100-gpu NVIDIA_A100; count [4]; No available locations returned | per-hour; min unknowns | 2.39725; dynamic-snapshot; per_gpu_hour | [source](https://api.vultr.com/v2/plans-metal) |
| spot  | vbm-112c-2048gb-8-h100-gpu NVIDIA_H100; count [8]; No available locations returned | per-hour; min unknowns | 2.3; dynamic-snapshot; per_gpu_hour | [source](https://api.vultr.com/v2/plans-metal) |
| spot  | vbm-112c-2048gb-8-a100-gpu NVIDIA_A100_SXM; count [8]; ewr | per-hour; min unknowns | 1.49; dynamic-snapshot; per_gpu_hour | [source](https://api.vultr.com/v2/plans-metal) |
| spot  | vbm-64c-2048gb-8-l40-gpu NVIDIA_L40S; count [8]; No available locations returned | per-hour; min unknowns | 1.49; dynamic-snapshot; per_gpu_hour | [source](https://api.vultr.com/v2/plans-metal) |
| spot  | vbm-72c-480gb-gh200-gpu NVIDIA_GH200; count [1]; No available locations returned | per-hour; min unknowns | 1.99; dynamic-snapshot; per_gpu_hour | [source](https://api.vultr.com/v2/plans-metal) |
| spot  | vbm-256c-2048gb-8-mi300x-gpu AMD_MI300X; count [8]; No available locations returned | per-hour; min unknowns | 1.85; dynamic-snapshot; per_gpu_hour | [source](https://api.vultr.com/v2/plans-metal) |
| spot  | vbm-256c-3072gb-8-mi325x-gpu AMD_MI325X; count [8]; No available locations returned | per-hour; min unknowns | 2.0; dynamic-snapshot; per_gpu_hour | [source](https://api.vultr.com/v2/plans-metal) |
| spot  | vbm-256c-3072gb-8-b200-gpu NVIDIA_B200; count [8]; No available locations returned | per-hour; min unknowns | 3.2; dynamic-snapshot; per_gpu_hour | [source](https://api.vultr.com/v2/plans-metal) |
| spot  | vbm-256c-3072gb-8-mi355x-gpu AMD_MI355X; count [8]; No available locations returned | per-hour; min unknowns | 2.59; dynamic-snapshot; per_gpu_hour | [source](https://api.vultr.com/v2/plans-metal) |
## Gotchas
- Website blocked (403), use public Vultr plans API. Fractional GPU slices not equivalent to a full GPU. Listed plan may have no currently offered regions. API hourly vs monthly costs retained without assuming a cap policy.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
Explicit GPU sensitivity example: add **1 × L40S** to each of those 50 workers at the vcg-l40s-16c-180g-48vram quoted shape. Compute component = 8,800 × $1.671 = **$14,704.8000**. CPU/RAM are included in that SKU (not independently resizable).
This is compute-only, before platform fees, storage, egress, setup, minimum rounding, cold-start/idle tails and capacity quotas. 50 concurrent GPUs are not promised by a unit rate.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.