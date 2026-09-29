# DigitalOcean: GPU regimes
As of 2026-09-28. GPU Droplets.
Per-second with 5 minute minimum; powered-off Droplets STILL bill until destroyed; GPU Droplets have no CPU Droplet monthly cap. August 1 2026 price revision. Bundled CPU/RAM and local disks; transfer allowance included.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand  | MI325X ; count [1]; Region/availability must be checked at launch. | per-second; min 300s | 3.8; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| on-demand  | MI325X ; count [8]; Region/availability must be checked at launch. | per-second; min 300s | 3.8; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| on-demand  | MI300X ; count [1]; Region/availability must be checked at launch. | per-second; min 300s | 2.59; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| on-demand  | MI300X ; count [8]; Region/availability must be checked at launch. | per-second; min 300s | 2.59; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| on-demand  | H200 ; count [1]; Region/availability must be checked at launch. | per-second; min 300s | 4.47; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| on-demand  | H200 ; count [8]; Region/availability must be checked at launch. | per-second; min 300s | 4.47; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| on-demand  | H100 ; count [1]; Region/availability must be checked at launch. | per-second; min 300s | 4.41; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| on-demand  | H100 ; count [8]; Region/availability must be checked at launch. | per-second; min 300s | 4.41; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| on-demand  | RTX-4000-ADA ; count [1]; Region/availability must be checked at launch. | per-second; min 300s | 0.76; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| on-demand  | RTX-6000-ADA ; count [1]; Region/availability must be checked at launch. | per-second; min 300s | 1.57; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| on-demand  | L40S ; count [1]; Region/availability must be checked at launch. | per-second; min 300s | 1.57; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| reserved  | B300 ; count None; Region/availability must be checked at launch. | per-second; min unknowns | 7.94; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| reserved  | H200 ; count None; Region/availability must be checked at launch. | per-second; min unknowns | 3.4; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| reserved  | H100 ; count None; Region/availability must be checked at launch. | per-second; min unknowns | 3.26; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| reserved  | MI350X ; count None; Region/availability must be checked at launch. | per-second; min unknowns | 4.76; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| reserved  | MI325X ; count None; Region/availability must be checked at launch. | per-second; min unknowns | 2.88; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| reserved  | MI300X ; count None; Region/availability must be checked at launch. | per-second; min unknowns | 1.91; list; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| spot  | B300 ; count None; Region/availability must be checked at launch. | per-second; min 300s | 8; dynamic-snapshot; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| spot  | MI355X ; count None; Region/availability must be checked at launch. | per-second; min 300s | 2.97; dynamic-snapshot; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
| spot  | MI350X ; count None; Region/availability must be checked at launch. | per-second; min 300s | 2.46; dynamic-snapshot; per_gpu_hour | [source](https://www.digitalocean.com/pricing/gpu-droplets) |
## Gotchas
- Per-second with 5 minute minimum; powered-off Droplets STILL bill until destroyed; GPU Droplets have no CPU Droplet monthly cap. August 1 2026 price revision. Bundled CPU/RAM and local disks; transfer allowance included.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
Explicit GPU sensitivity example: add **1 × MI325X** to each of those 50 workers at the MI325X quoted shape. Compute component = 8,800 × $3.8 = **$33,440.0000**. CPU/RAM are included in that SKU (not independently resizable).
This is compute-only, before platform fees, storage, egress, setup, minimum rounding, cold-start/idle tails and capacity quotas. 50 concurrent GPUs are not promised by a unit rate.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.