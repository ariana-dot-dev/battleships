# Microsoft Azure: GPU regimes
As of 2026-09-28. NC/ND Linux GPU VMs.
Azure Retail Prices API eastus Linux list. Windows excluded. Spot snapshot not guaranteed. Reservations API retailPrice is TOTAL commitment despite 1 Hour unit label, not hourly! VM CPU/RAM bundled; managed disks/network/IP extra.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand  | Standard_ND96isr_H100_v5 ; count [8]; eastus; Linux | per-second; min unknowns | 12.29; list; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| reserved  | Standard_ND96isr_H100_v5 ; count [8]; eastus; Linux | per-second; min unknowns | 7.8655964612; list; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| reserved  | Standard_ND96isr_H100_v5 ; count [8]; eastus; Linux | per-second; min unknowns | 5.3953101218; list; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| reserved  | Standard_ND96isr_H100_v5 ; count [8]; eastus; Linux | per-second; min unknowns | 4.9159988584; list; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| spot  | Standard_NC24ads_A100_v4 ; count [1]; eastus; Linux | per-second; min unknowns | 0.67877; dynamic-snapshot; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| spot  | Standard_ND96amsr_A100_v4 ; count [8]; eastus; Linux | per-second; min unknowns | 1.055194; dynamic-snapshot; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| on-demand  | Standard_NC24ads_A100_v4 ; count [1]; eastus; Linux | per-second; min unknowns | 3.673; list; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| reserved  | Standard_NC24ads_A100_v4 ; count [1]; eastus; Linux | per-second; min unknowns | 2.4010273973; list; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| reserved  | Standard_NC24ads_A100_v4 ; count [1]; eastus; Linux | per-second; min unknowns | 1.3630517504; list; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| spot  | Standard_ND96isr_H100_v5 ; count [8]; eastus; Linux | per-second; min unknowns | 2.271192; dynamic-snapshot; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| on-demand  | Standard_ND96amsr_A100_v4 ; count [8]; eastus; Linux | per-second; min unknowns | 4.09625; list; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| reserved  | Standard_ND96amsr_A100_v4 ; count [8]; eastus; Linux | per-second; min unknowns | 2.6216038813; list; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| reserved  | Standard_ND96amsr_A100_v4 ; count [8]; eastus; Linux | per-second; min unknowns | 1.8023496956; list; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| spot  | Standard_NC4as_T4_v3 ; count [1]; eastus; Linux | per-second; min unknowns | 0.149174; dynamic-snapshot; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| on-demand  | Standard_NC4as_T4_v3 ; count [1]; eastus; Linux | per-second; min unknowns | 0.526; list; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| reserved  | Standard_NC4as_T4_v3 ; count [1]; eastus; Linux | per-second; min unknowns | 0.3092465753; list; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
| reserved  | Standard_NC4as_T4_v3 ; count [1]; eastus; Linux | per-second; min unknowns | 0.1977929985; list; per_gpu_hour | [source](https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20%27Virtual%20Machines%27%20and%20armRegionName%20eq%20%27eastus%27) |
## Gotchas
- Azure Retail Prices API eastus Linux list. Windows excluded. Spot snapshot not guaranteed. Reservations API retailPrice is TOTAL commitment despite 1 Hour unit label, not hourly! VM CPU/RAM bundled; managed disks/network/IP extra.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
Explicit GPU sensitivity example: add **1 × A100-80GB** to each of those 50 workers at the Standard_NC24ads_A100_v4 quoted shape. Compute component = 8,800 × $3.673 = **$32,322.4000**. CPU/RAM are included in that SKU (not independently resizable).
This is compute-only, before platform fees, storage, egress, setup, minimum rounding, cold-start/idle tails and capacity quotas. 50 concurrent GPUs are not promised by a unit rate.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.
## Added 2026-09-28: single H100 (Standard_NC40ads_H100_v5)
1x NVIDIA H100 NVL 94 GB (PCIe), 40 vCPU (AMD EPYC Genoa, no SMT), 320 GiB RAM, 3,576 GiB temp NVMe.
| Regime | When applicable | Billing | $/h (whole VM = per GPU) | Source |
|---|---|---|---|---|
| on-demand | eastus | per full minute | 6.98 | [API](https://prices.azure.com/api/retail/prices?$filter=armRegionName eq 'eastus' and armSkuName eq 'Standard_NC40ads_H100_v5') |
| on-demand | northeurope, cheapest EU checked (swedencentral 9.074, westeurope 9.08) | per full minute | 8.376 | same API, EU regions |
| spot | eastus, snapshot, 30 s eviction | per full minute | 1.289904 | same |
| reserved 1y | eastus, always-on | every hour of term | 5.23505 | same (total / 8,760) |
| reserved 3y | eastus, always-on | every hour of term | 3.839 | same (total / 26,280) |
GPU sensitivity: 50 workers × 176 h with 1x H100 NVL each = 8,800 × $6.98 = **$61424.00**/month compute on-demand (eastus), before disks, IPv4, egress.