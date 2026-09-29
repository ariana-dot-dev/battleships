# TensorDock: GPU regimes
As of 2026-09-28. KVM GPU VMs, independent-host marketplace.
Full root OS control, dedicated passthrough GPU, Linux/Windows and Docker templates. Host sets GPU, CPU, RAM and disk prices. $5 deposit; zero balance automatically deletes servers.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand  | H100 SXM5; count None; Region/availability must be checked at launch. | unknown; min unknowns | 2.25; list-from; per_gpu_hour | [source](https://www.tensordock.com/) |
| on-demand  | A100 SXM4, VRAM unverified; count None; Region/availability must be checked at launch. | unknown; min unknowns | 1.8; list-from; per_gpu_hour | [source](https://www.tensordock.com/) |
| on-demand  | RTX4090 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | 0.35; list-from; per_gpu_hour | [source](https://www.tensordock.com/) |
| spot  | H100 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | unknown; dynamic-bid; per_gpu_hour | [source](https://docs.tensordock.com/virtual-machines/spot-instances.md) |
| spot  | A100 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | unknown; dynamic-bid; per_gpu_hour | [source](https://docs.tensordock.com/virtual-machines/spot-instances.md) |
| spot  | RTX4090 ; count None; Region/availability must be checked at launch. | unknown; min unknowns | unknown; dynamic-bid; per_gpu_hour | [source](https://docs.tensordock.com/virtual-machines/spot-instances.md) |
## Gotchas
- Full root OS control, dedicated passthrough GPU, Linux/Windows and Docker templates. Host sets GPU, CPU, RAM and disk prices. $5 deposit; zero balance automatically deletes servers.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
No fixed single-full-GPU USD quote suitable for a numeric example was verified. Compute = 8,800 × selected offer $/hour, or required node count × node price; keep the estimate null until the offer/FX/commitment is resolved.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.