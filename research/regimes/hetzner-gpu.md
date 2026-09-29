# Hetzner: GPU regimes
As of 2026-09-28. GEX dedicated root servers, not Hetzner Cloud VMs.
Dedicated bare-metal GEX, separate from CPU Hetzner Cloud. Browser price widget was blank; official website-price-api resolves USD hourly/monthly/setup. One GPU per server; monthly cap is not an on-demand hourly discount. API lists more locations than marketing matrix; check configurator stock.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand  | GEX45 Blackwell SFF 24GB; count [1]; API: HEL1/FSN1/NBG1, active; order availability may differ. Prices ex VAT. | per-hour; min unknowns | 0.399; list; per_gpu_hour | [source](https://website-price-api.hetzner.com/api/v1/products/ROBOT_1768%2BROBOT_1266) |
| on-demand  | GEX131 Blackwell Max-Q 96GB; count [1]; API: HEL1/FSN1/NBG1, active; order availability may differ. Prices ex VAT. | per-hour; min unknowns | 2.2419; list; per_gpu_hour | [source](https://website-price-api.hetzner.com/api/v1/products/ROBOT_1747%2BROBOT_1266) |
## Gotchas
- Dedicated bare-metal GEX, separate from CPU Hetzner Cloud. Browser price widget was blank; official website-price-api resolves USD hourly/monthly/setup. One GPU per server; monthly cap is not an on-demand hourly discount. API lists more locations than marketing matrix; check configurator stock.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
Explicit GPU sensitivity example: add **1 × RTX-PRO-4000** to each of those 50 workers at the GEX45 quoted shape. Compute component = 8,800 × $0.399 = **$3,511.2000**. CPU/RAM are included in that SKU (not independently resizable).
This is compute-only, before platform fees, storage, egress, setup, minimum rounding, cold-start/idle tails and capacity quotas. 50 concurrent GPUs are not promised by a unit rate.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.