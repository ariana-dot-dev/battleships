# Hyperbolic: GPU regimes
As of 2026-09-28. GPU marketplace VMs/bare metal and reserved clusters.
Old hyperbolic.xyz/pricing returns 404. New official marketplace has weekly refreshed starting prices. No charges for failed instances. Reservations paid upfront; <1 year reserved and >1 year Private Cloud.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand  | H100 SXM; count None; Region/availability must be checked at launch. | unknown; min unknowns | 3.19; list-from; per_gpu_hour | [source](https://www.hyperbolic.ai/marketplace) |
| on-demand  | H200 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | 3.99; list-from; per_gpu_hour | [source](https://www.hyperbolic.ai/marketplace) |
| on-demand  | B200 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | 5.99; list-from; per_gpu_hour | [source](https://www.hyperbolic.ai/marketplace) |
## Gotchas
- Old hyperbolic.xyz/pricing returns 404. New official marketplace has weekly refreshed starting prices. No charges for failed instances. Reservations paid upfront; <1 year reserved and >1 year Private Cloud.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
No fixed single-full-GPU USD quote suitable for a numeric example was verified. Compute = 8,800 × selected offer $/hour, or required node count × node price; keep the estimate null until the offer/FX/commitment is resolved.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.