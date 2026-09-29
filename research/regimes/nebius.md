# Nebius: GPU regimes
As of 2026-09-28. GPU VMs and preemptible VMs.
Use rates BEFORE October 1, 2026. Pricing landing spot floors differ materially from documented preemptible rates: both retained but not conflated. L40S separately bills CPU/RAM; other GPU platform reference bundles include them. Dynamic spot starts October 8, not September 22 announcement date. As of Sep 28 docs fixed preemptible prices still apply.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand  | B300 ; count None; uk-south1/eu-west2/us-north1 | per-second; min unknowns | 7.85; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | B300 ; count None; uk-south1/eu-west2/us-north1 | per-second; min unknowns | 4.3; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| on-demand  | B200 ; count None; us-central1/me-west1 | per-second; min unknowns | 7.15; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | B200 ; count None; us-central1/me-west1 | per-second; min unknowns | 3.95; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| on-demand  | H200 ; count None; eu-north1/eu-north2/eu-west1/us-central1 | per-second; min unknowns | 4.5; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | H200 ; count None; eu-north1/eu-north2/eu-west1/us-central1 | per-second; min unknowns | 2.45; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| on-demand  | H100 ; count None; eu-north1 | per-second; min unknowns | 3.85; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | H100 ; count None; eu-north1 | per-second; min unknowns | 2.15; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| on-demand  | RTX-PRO-6000 ; count None; us-central1/uk-south2/eu-south1 | per-second; min unknowns | 1.8; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | RTX-PRO-6000 ; count None; us-central1/uk-south2/eu-south1 | per-second; min unknowns | 0.95; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| on-demand  | L40S Intel; count None; eu-north1 | per-second; min unknowns | 1.35; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | L40S Intel; count None; eu-north1 | per-second; min unknowns | 0.65; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| on-demand  | L40S AMD; count None; eu-north1 | per-second; min unknowns | 1.35; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
| spot  | L40S AMD; count None; eu-north1 | per-second; min unknowns | 0.65; list; per_gpu_hour | [source](https://docs.nebius.com/compute/resources/pricing) |
## Gotchas
- Use rates BEFORE October 1, 2026. Pricing landing spot floors differ materially from documented preemptible rates: both retained but not conflated. L40S separately bills CPU/RAM; other GPU platform reference bundles include them. Dynamic spot starts October 8, not September 22 announcement date. As of Sep 28 docs fixed preemptible prices still apply.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
No fixed single-full-GPU USD quote suitable for a numeric example was verified. Compute = 8,800 × selected offer $/hour, or required node count × node price; keep the estimate null until the offer/FX/commitment is resolved.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.