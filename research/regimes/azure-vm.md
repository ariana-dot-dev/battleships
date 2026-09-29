# Azure Virtual Machines (Linux): pricing regimes (as of 2026-09-28)
These are plain IaaS VMs: full kernel, root and SSH, no sandbox API. A Linux VM is usually usable about 30-60 s after the create call. That is an estimate we did not measure; the card uses `boot_overhead_s` = 45.
Every VM price below comes from the official **Azure Retail Prices API** (`prices.azure.com`, list USD), queried on 2026-09-28. Linux rows are the ones whose productName does not contain "Windows"; Cloud Services and Low Priority rows are excluded.
Regions:
- US: `eastus`.
- EU: `swedencentral`, the cheapest EU region we checked. For D4s_v5: swedencentral $0.204, northeurope $0.214, westeurope $0.23.
## Regime table
| # | Regime | When it applies | How billed | Numbers ($/h, eastus → swedencentral) | Source |
|---|---|---|---|---|---|
| 1 | Pay-as-you-go, x86 D/F v5 | Default | Per full minute while running (Azure FAQ: 6 min 45 s is billed as 6 min) | **F4s_v2 4/8 0.169 → 0.194**; **D4ls_v5 4/8 0.170 → 0.182**; D4as_v5 4/16 0.172 → 0.184; D4s_v5 4/16 0.192 → 0.204; D8s_v5 0.384 → 0.408; D2ls_v5 2/4 0.085 | Retail Prices API (Virtual Machines) |
| 2 | Pay-as-you-go, Arm Dpsv5 | arm64 workloads | same | D2ps_v5 2/8 0.077; D4ps_v5 4/16 0.154 → 0.164; D8ps_v5 0.308 → 0.328 | same |
| 3 | B-series v2 burstable (Basv2) | Low average CPU | Same meter; CPU credits | "l" sizes (2 GiB/vCPU), 30% baseline: B2als_v2 0.0376, **B4als_v2 4/8 0.133 → 0.138**, B8als_v2 0.266. Standard sizes (4 GiB/vCPU), 40% baseline: B2as_v2 0.0752, B4as_v2 4/16 0.150 → 0.156 | same + MS Basv2 size docs |
| 4 | B-series v1 | Legacy burstable | same | B2s 2/4 0.0416; B2ms 2/8 0.0832; B4ms 4/16 0.166 → 0.173; B8ms 0.333. Baselines: B2s 20%, B2ms 30%, B4ms 22.5%, B8ms 17% | same + MS Bv1 docs |
| 5 | Spot | Interruptible work | Variable price, 30 s eviction notice, evicted VMs deallocate or delete | D4s_v5 0.0405 → 0.0377 (−79%); **D4ls_v5 0.0359 → 0.0336**; F4s_v2 0.0372 → 0.0359; D2as_v5 0.0182 | Retail Prices API Spot meters (snapshot) |
| 6 | Reserved VM Instance, 1 year | Always-on | Every hour of the term, used or not | D4s_v5 0.1185 → 0.1259 (−38%); D4ls_v5 0.1049 → 0.1074; D4as_v5 0.1062; B4als_v2 0.0785 | Retail Prices API Reservation (term price ÷ 8,760 h) |
| 7 | Reserved VM Instance, 3 years | Always-on | same | D4s_v5 0.0758 → 0.0806 (−61%); **D4ls_v5 0.0672 → 0.0692**; B4als_v2 0.0506 | same (÷ 26,280 h) |
| 8 | Stopped vs deallocated | Shutdown | OS shutdown leaves the VM "Stopped" and **still billed**; Stop (deallocate) stops compute | — | Azure VM pricing FAQ |
| 9 | Managed disks | OS/data disks | Per provisioned tier per month, also while deallocated | Standard SSD E10 128 GiB $9.60/mo (~$0.075/GiB); Premium SSD P10 $19.71 | Retail Prices API (Storage) |
| 10 | Snapshots | Disk snapshots | GB-month | $0.05 (standard), $0.132 (SSD) | same |
| 11 | Internet egress | Microsoft-routed | First 100 GB/month free, then tiered | $0.087/GB up to 10 TB, $0.083 up to 50 TB, $0.07 up to 150 TB, $0.05 beyond (identical in eastus and swedencentral) | Retail Prices API (Bandwidth, Rtn Preference: MGN) |
| 12 | Public IPv4 | Standard static IP | Per hour | $0.005/h = $3.65/month | Retail Prices API (Virtual Network) |
| 13 | Free account | New subscriptions | $200 credit for 30 days + 750 h/month for 12 months of B1s / B2pts v2 / B2ats v2 (1-2 GiB sizes) | not a 4/8 option | azure.microsoft.com/free |
## Gotchas
1. **An OS-level shutdown does not stop billing.** Deallocate through the portal, API or CLI.
2. **B-series has no paid "unlimited" mode** (unlike AWS t3). Once the banked credits run out, the VM is throttled to its baseline. A 30%-CPU workload on a 30%-baseline B4als_v2 sits exactly at the limit.
3. **Spot on D/F-series is ~80% below PAYG** in these regions. B-series Spot is only ~10% below PAYG.
4. **Reservations bill for the whole term.** They are only cheaper when the VM would run more than ~62% (1y) or ~39% (3y) of the hours.
5. The API returns **no reservation rows for Fsv2 or B v1**. Dlsv5 is the 4 vCPU / 8 GiB size that can be reserved.
6. Microsoft's 2024 docs express the B-series baseline as a percentage of the whole VM (0-100% scale), not per vCPU.
7. Disks keep billing at the provisioned tier while the VM is deallocated. Delete the VM and snapshot the disk to stop paying for it.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 VM-hours), 30% CPU, 50 GiB snapshots, 100 GiB egress. Region: eastus.
Assumptions: VMs are deallocated between sessions. Each VM keeps an E10 OS disk and a Standard static IPv4 all month. Boot overhead is ignored.
| Regime | Compute | Disks (50 × E10) | Snapshots | Egress | IPv4 (50) | **Monthly** |
|---|---|---|---|---|---|---|
| F4s_v2 PAYG ($0.169) | $1,487.20 | $480.00 | $2.50 | $0 (100 GB free) | $182.50 | **$2,152.20** |
| D4ls_v5 PAYG ($0.170) | $1,496.00 | $480.00 | $2.50 | $0 | $182.50 | **$2,161.00** |
| B4als_v2 burstable ($0.133), 30% baseline = workload's 30% CPU | $1,170.40 | $480.00 | $2.50 | $0 | $182.50 | **$1,835.40** |
| D4ls_v5 Spot ($0.035887, snapshot) | $315.81 | $480.00 | $2.50 | $0 | $182.50 | **$980.81** |
| D4ls_v5 1y reserved × 50, all month ($0.10491 × 730 h) | $3,829.22 | $480.00 | $2.50 | $0 | $182.50 | $4,494.22 (reservations do not pay off at 8 h/day) |
Sources: https://prices.azure.com/api/retail/prices (Virtual Machines, Storage, Bandwidth; eastus, swedencentral, westeurope, northeurope) · https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/ · https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/general-purpose/basv2-series · …/bsv2-series · …/bv1-series