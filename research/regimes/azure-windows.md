# Azure Virtual Machines (Windows Server): pricing regimes (as of 2026-09-28)
Azure Windows VMs cost the Linux price **plus a Windows Server licence**:
- D-series and F-series: the surcharge is **$0.046 per vCPU-hour**.
- B-series (burstable): the surcharge is only $0.004 per vCPU-hour.
Billing is **per full minute**. All numbers were re-queried from the official Retail Prices API (eastus, Consumption) on 2026-09-28.
## Regime table
| # | Regime | When it applies | How billed | Numbers (East US, Linux → Windows $/h) | Source |
|---|---|---|---|---|---|
| 1 | Pay-as-you-go D/F-series | Default | Full minutes while running ("6 min 45 s → billed 6 min") | D2s_v5 2/8 0.096 → 0.188; **D4s_v5 4/16 0.192 → 0.376**; D8s_v5 0.384 → 0.752; D2as_v5 0.086 → 0.178; D4as_v5 0.172 → 0.356; F2s_v2 2/4 0.0846 → 0.177; **F4s_v2 4/8 0.169 → 0.354**; F8s_v2 0.338 → 0.708 | https://prices.azure.com/api/retail/prices, https://azure.microsoft.com/en-us/pricing/details/virtual-machines/windows/ |
| 2 | B-series burstable | B-family | Same billing, CPU credits | B2s 2/4 0.0416 → 0.0496; B2ms 2/8 0.0832 → 0.0912; B4ms 4/16 0.166 → 0.182 (+$0.004/vCPU-h) | same |
| 3 | Stopped (not deallocated) | OS-level shutdown | **Cores still billed** (licence not) | full compute rate | Azure Windows pricing FAQ |
| 4 | Stopped (deallocated) | Stop from the portal/API | Compute $0. Disks and static IPs still bill | | same |
| 5 | Managed disks | OS + data disks | Per provisioned tier per month | Standard SSD E10 (128 GiB) $9.60 → ~$0.075/GiB-month; Premium SSD P10 $19.71 | Retail Prices API (Storage) |
| 6 | Snapshots | Managed-disk snapshots | GB-month | $0.05 (Standard HDD), $0.132 (SSD) | same |
| 7 | Egress | Internet | First 100 GB/month free, then tiered | $0.087/GB (Microsoft routing) or $0.08/GB (Internet routing) first 10 TB | Retail Prices API (Bandwidth) |
| 8 | Public IPv4 | Standard static IP | Per hour | $0.005/h ($3.65/month) | Retail Prices API (Virtual Network) |
| 9 | Azure Hybrid Benefit | You bring Windows Server licences | Licence removed, pay Linux-equivalent compute | -$0.046/vCPU-h | Azure Windows pricing page |
| 10 | Free account | New accounts | $200 credit for 30 days + 750 h/month of B2ts/B2pts/B2ats v2 for 12 months | | same |
## Gotchas
1. **Shutting down from inside Windows is not deallocation.** Cores keep billing until you deallocate.
2. The default Windows OS disk (127 GiB) is billed as a full E10/P10 tier **even when deallocated**.
3. F-series v2 Windows prices differ from Linux + 0.046 × vCPU by up to $0.002/h. The card adjusts the base so the Windows totals are exact.
4. The licence roughly doubles D/F-series prices. B-series is almost licence-free but throttles to baseline under sustained CPU.
5. Windows 11 client is not available on plain VMs (only through AVD multi-session / Windows 365).
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress.
Assumptions: VMs are deallocated nightly; each keeps an E10 OS disk and a Standard static IP all month.
| Regime | Compute | Disks (50 × E10) | Snapshots | Egress | IPv4 | **Monthly** |
|---|---|---|---|---|---|---|
| F4s_v2 Windows ($0.354) | $3,115.20 | $480.00 | $2.50 | $0 (100 GB free) | $182.50 | **$3,780.20** |
| D4s_v5 Windows 4/16 ($0.376) | $3,308.80 | $480.00 | $2.50 | $0 | $182.50 | **$3,973.80** |
| B4ms Windows 4/16 ($0.182); 30% util must stay under the B4ms baseline (not verified) | $1,601.60 | $480.00 | $2.50 | $0 | $182.50 | **$2,266.60** |
| F4s_v2 with Hybrid Benefit ($0.169) | $1,487.20 | $480.00 | $2.50 | $0 | $182.50 | $2,152.20 |
Sources: https://azure.microsoft.com/en-us/pricing/details/virtual-machines/windows/ · https://prices.azure.com/api/retail/prices (Virtual Machines, Storage, Bandwidth, Virtual Network; eastus)