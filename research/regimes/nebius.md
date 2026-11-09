# Nebius: GPU regimes
As of 2026-11-08. GPU VMs and preemptible VMs.
Rates in effect from October 1, 2026. Preemptible B300/B200/H200/H100/RTX PRO 6000 use a dynamic spot price from October 8, 2026 (updated every 15 min, from $0.79 for H100/H200/RTX PRO 6000 and $0.99 for B200/B300, ceiling one cent below on-demand). Spot rows show the last fixed price (until 2026-10-07) for history only. L40S preemptible stays flat. L40S separately bills CPU/RAM; other GPU platform reference bundles include them. GB300 NVL72 and GB200 NVL72 are listed at a contact-sales price ([source](https://nebius.com/prices)).
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand  | B300 ; count None; uk-south1/eu-west2/us-north1 | per-second; min unknowns | 9.5; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | B300 ; count None; uk-south1/eu-west2/us-north1 | per-second; min unknowns | dynamic from 2026-10-08 (fixed 4.3 until 2026-10-07); list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| on-demand  | B200 ; count None; us-central1/me-west1 | per-second; min unknowns | 8.5; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | B200 ; count None; us-central1/me-west1 | per-second; min unknowns | dynamic from 2026-10-08 (fixed 3.95 until 2026-10-07); list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| on-demand  | H200 ; count None; eu-north1/eu-north2/eu-west1/us-central1 | per-second; min unknowns | 5.4; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | H200 ; count None; eu-north1/eu-north2/eu-west1/us-central1 | per-second; min unknowns | dynamic from 2026-10-08 (fixed 2.45 until 2026-10-07); list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| on-demand  | H100 ; count None; eu-north1 | per-second; min unknowns | 4.5; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | H100 ; count None; eu-north1 | per-second; min unknowns | dynamic from 2026-10-08 (fixed 2.15 until 2026-10-07); list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| on-demand  | RTX-PRO-6000 ; count None; us-central1/uk-south2/eu-south1 | per-second; min unknowns | 1.8; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | RTX-PRO-6000 ; count None; us-central1/uk-south2/eu-south1 | per-second; min unknowns | dynamic from 2026-10-08 (fixed 0.95 until 2026-10-07); list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| on-demand  | L40S Intel; count None; eu-north1 | per-second; min unknowns | 1.35; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | L40S Intel; count None; eu-north1 | per-second; min unknowns | 0.65; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| on-demand  | L40S AMD; count None; eu-north1 | per-second; min unknowns | 1.35; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | L40S AMD; count None; eu-north1 | per-second; min unknowns | 0.65; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
## Gotchas
- On-demand B300/B200/H200/H100 rose on 2026-10-01 (from 7.85/7.15/4.5/3.85). Spot for these GPUs and RTX PRO 6000 is dynamic since 2026-10-08 and stays unpriced.
- Default quota per region: 2 regular VMs and 2 preemptible VMs (0 in private eu-north2), 8 GPUs per type, 200 non-GPU vCPUs (0 in eu-north1, us-central1, eu-north2). Quotas can rise automatically from usage history or on request ([source](https://docs.nebius.com/compute/resources/quotas-limits), checked 2026-11-08).
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
No fixed single-full-GPU USD quote suitable for a numeric example was verified. Compute = 8,800 × selected offer $/hour, or required node count × node price; keep the estimate null until the offer/FX/commitment is resolved.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.
