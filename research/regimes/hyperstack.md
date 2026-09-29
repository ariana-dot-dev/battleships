# Hyperstack — pricing regimes (2026-09-28)
GPU cloud. Added by the missing-providers audit (single-H100 SKUs).
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand 1x | 1x flavours | per minute | H100 PCIe $2.50, A100 PCIe $1.35, L40 $1.00, A6000 $0.50 /GPU-h | https://www.hyperstack.cloud/gpu-pricing |
| On-demand 8x | SXM/NVLink/H200/B200 | per minute, 8-GPU flavours | H100 SXM $3.20, H100 NVLink $2.60, H200 $3.99, B200 $6.00 /GPU-h | https://www.hyperstack.cloud/gpu-pricing |
| Spot | spot VMs | per minute, interruptible | H100 PCIe $2.00 | https://www.hyperstack.cloud/gpu-pricing |
| Reserved | contract | monthly invoice | H100 PCIe from $1.75 | https://www.hyperstack.cloud/gpu-pricing |
## Gotchas
- SXM H100 only as 8x.
- Storage and IPv4 billed hourly; egress free.
## Worked example
1x H100 PCIe, 500 sessions x 30 min = 250 h x $2.50 = $625/month (+ volume storage).
Sources: https://www.hyperstack.cloud/gpu-pricing, https://docs.hyperstack.cloud/docs/hardware/flavors