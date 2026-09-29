# Crusoe: GPU regimes
As of 2026-09-28. GPU virtual machines and reserved capacity.
GPU VM bundle includes matching CPU/RAM; billing per second in running state including lifecycle scripts. Stopped VM compute free, retained 128GiB OS disk $0.08/GiB-month until deletion. Reserved commitment bills in every state. Spot quote via sales. No network transfer charges currently.
| Regime | When applicable | Billing | Numbers ($/GPU-hour unless slice) | Source |
|---|---|---|---|---|
| on-demand  | H100 SXM; count [8]; us-east1-a/us-southcentral1-a/eu-iceland1-a | per-second; min unknowns | 3.9; list; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| spot  | H100 SXM; count [8]; us-east1-a/us-southcentral1-a/eu-iceland1-a | per-second; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | H200 SXM; count [8]; eu-iceland1-a | per-second; min unknowns | 4.29; list; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| spot  | H200 SXM; count [8]; eu-iceland1-a | per-second; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | A100-80GB SXM; count [8]; us-east1-a | per-second; min unknowns | 2.3; list; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| spot  | A100-80GB SXM; count [8]; us-east1-a | per-second; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | MI300X ; count [8]; us-east1-a | per-second; min unknowns | 3.45; list; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| spot  | MI300X ; count [8]; us-east1-a | per-second; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | MI355X ; count [8]; us-east2-a | per-second; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| spot  | MI355X ; count [8]; us-east2-a | per-second; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | B200 SXM; count [8]; eu-iceland1-a/eu-norway1-a/us-west1-a | per-second; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| spot  | B200 SXM; count [8]; eu-iceland1-a/eu-norway1-a/us-west1-a | per-second; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | B300 SXM; count [8]; eu-iceland1-a | per-second; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| spot  | B300 SXM; count [8]; eu-iceland1-a | per-second; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | GB200 NVL; count [4]; eu-iceland1-a | per-second; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| spot  | GB200 NVL; count [4]; eu-iceland1-a | per-second; min unknowns | unknown; sales-unpublished; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | A100-80GB PCIe; count [1]; us-east1-a; L40S also us-southcentral1-a | per-second; min unknowns | 2; list; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | A100-80GB PCIe; count [2]; us-east1-a; L40S also us-southcentral1-a | per-second; min unknowns | 2; list; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | A100-80GB PCIe; count [4]; us-east1-a; L40S also us-southcentral1-a | per-second; min unknowns | 2; list; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | A100-80GB PCIe; count [8]; us-east1-a; L40S also us-southcentral1-a | per-second; min unknowns | 2; list; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | L40S PCIe; count [1]; us-east1-a; L40S also us-southcentral1-a | per-second; min unknowns | 1.5; list; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | L40S PCIe; count [2]; us-east1-a; L40S also us-southcentral1-a | per-second; min unknowns | 1.5; list; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | L40S PCIe; count [4]; us-east1-a; L40S also us-southcentral1-a | per-second; min unknowns | 1.5; list; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | L40S PCIe; count [8]; us-east1-a; L40S also us-southcentral1-a | per-second; min unknowns | 1.5; list; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
| on-demand  | L40S PCIe; count [10]; us-east1-a; L40S also us-southcentral1-a | per-second; min unknowns | 1.5; list; per_gpu_hour | [source](https://www.crusoe.ai/cloud/pricing) |
## Gotchas
- GPU VM bundle includes matching CPU/RAM; billing per second in running state including lifecycle scripts. Stopped VM compute free, retained 128GiB OS disk $0.08/GiB-month until deletion. Reserved commitment bills in every state. Spot quote via sales. No network transfer charges currently.
- Any null count, CPU/RAM, billing increment or minimum is unverified, not unlimited/free.
- This is GPU-product research, not a claim that every feature of the entire vendor documentation was audited. Unverified features are null.
- GPU multi-count bundles, variant/region selection and fractional slices require a SKU-aware estimator; unsupported rows remain unpriced in strict cards.
## Worked example (required protocol workload)
4 vCPU / 8 GiB, 50 concurrent × 8 hours/day × 22 days = **8,800 instance-hours/month**. 30% CPU utilization does not reduce allocated GPU uptime. 50 GiB snapshots and 100 GiB egress are additional. The requested CPU-only workload has no GPU type/count, so its full GPU-provider total is **null**, not a fictitious CPU equivalent.
Explicit GPU sensitivity example: add **1 × A100-80GB** to each of those 50 workers at the A100-80GB quoted shape. Compute component = 8,800 × $2 = **$17,600.0000**. CPU/RAM are included in that SKU (not independently resizable).
This is compute-only, before platform fees, storage, egress, setup, minimum rounding, cold-start/idle tails and capacity quotas. 50 concurrent GPUs are not promised by a unit rate.
## Evidence scope
Sources read are listed in the provider/features JSON. All unknown feature toggles remain null.