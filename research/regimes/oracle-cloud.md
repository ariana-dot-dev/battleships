# Oracle Cloud Infrastructure — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| E4 Flex x 86 | On demand; Allocated flexible resources, no monthly cap; boot disk extra. One x 86 OCPU=two hardware threads/vCPUs. | CPU $0.0125/vCPU-h + RAM $0.0015/GiB-h | https://www.oracle.com/cloud/compute/pricing/ |
| E5/E6 Flex x 86 | On demand; Allocated flexible resources, no monthly cap; boot disk extra. One x 86 OCPU=two hardware threads/vCPUs. | CPU $0.015/vCPU-h + RAM $0.002/GiB-h | https://www.oracle.com/cloud/compute/pricing/ |
| Intel Standard 3 Flex | On demand; Allocated flexible resources, no monthly cap; boot disk extra. One x 86 OCPU=two hardware threads/vCPUs. | CPU $0.02/vCPU-h + RAM $0.0015/GiB-h | https://www.oracle.com/cloud/compute/pricing/ |
| Ampere A1 Arm | On demand; Allocated flexible resources, no monthly cap; boot disk extra. ARM only: flagged alt to avoid engine treating it as x 86. A1 one OCPU=one core; A2/A4 one OCPU=two Arm cores. | CPU $0.01/vCPU-h + RAM $0.0015/GiB-h | https://www.oracle.com/cloud/compute/pricing/ |
| Ampere A2 Arm | On demand; Allocated flexible resources, no monthly cap; boot disk extra. ARM only: flagged alt to avoid engine treating it as x 86. A1 one OCPU=one core; A2/A4 one OCPU=two Arm cores. | CPU $0.007/vCPU-h + RAM $0.002/GiB-h | https://www.oracle.com/cloud/compute/pricing/ |
| Ampere A4 Arm | On demand; Allocated flexible resources, no monthly cap; boot disk extra. ARM only: flagged alt to avoid engine treating it as x 86. A1 one OCPU=one core; A2/A4 one OCPU=two Arm cores. | CPU $0.0069/vCPU-h + RAM $0.0027/GiB-h | https://www.oracle.com/cloud/compute/pricing/ |
| E4 50% baseline burstable | On demand; 50% CPU baseline purchased, not equivalent to full dedicated performance. Memory charged in full; 12.5% baseline also exists. | CPU $0.00625/vCPU-h + RAM $0.0015/GiB-h | https://www.oracle.com/cloud/compute/pricing/ |
| E4 preemptible | On demand; 50% list discount, interruptible; no capacity guarantee. | CPU $0.00625/vCPU-h + RAM $0.00075/GiB-h | https://www.oracle.com/cloud/compute/pricing/ |
| Universal Credits commitment | On demand; Negotiated commitment rates unpublished. | Rate unavailable; null (not free) | https://www.oracle.com/cloud/compute/pricing/ |
## Billing details
- **granularity_seconds**: 1
- **minimum_billed_seconds**: 60
- **setup_fee_usd**: 0
- **api**: True
- **cli**: True
- **ipv 6**: True
- **ingress_usd**: 0
- **cpu**: OCPU conversions are family-specific; A2/A4 OCPU contains two physical Arm cores, A1 contains one.
- **backup**: Boot/block volumes extra; balanced 10VPU storage $0.0425/GB-month. Backup rate not treated as proven merely because stored in Object Storage.
- **minimum_term**: Per second 60s minimum; no cap.
- **free**: $300/30-day trial. Always Free A1 resource allowance contradicts between official pages; not fungible $57 credit.
- **provisioning**: Unknown; not assumed zero.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- First-party conflict: Always Free resource page says all tenancies 1500 OCPU-h/9000 GB-h (2 cores/12 GB); Arm/pricing pages retain 3000/18000 (4/24). No blanket guarantee of the larger tier.
- Card deliberately does not subtract a generic $57 monthly credit: free CPU/RAM buckets only apply to A1, and cannot pay for x 86 compute, egress or disks.
- Always Free home-region capacity can be exhausted and idle resources reclaimed. Free micro-VMs are not 50 full 4/8 machines.
- Standard flexible VMs generally stop compute billing when stopped; DenseIO/bare-metal exceptions exist. Root disks and public network allocations have independent lifecycle.
- A1 free fleet of 2/12 or 4/24 cannot satisfy the requested 200 vCPU/400 GB peak, regardless of monthly allowance.
- Egress default shown for supported North America/Europe rate category; other regional tiers differ.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| E4 Flex x 86 | $545.60 | $2,263.00 |
| E5/E6 Flex x 86 | $668.80 | $2,774.00 |
| Intel Standard 3 Flex | $809.60 | $3,358.00 |
| Ampere A1 Arm | $457.60 | $1,898.00 |
| Ampere A2 Arm | $387.20 | $1,606.00 |
| Ampere A4 Arm | $432.96 | $1,795.80 |
| E4 50% baseline burstable | $325.60 | $1,350.50 |
| E4 preemptible | $272.80 | $1,131.50 |
| Universal Credits commitment | Unknown / unavailable | Unknown / unavailable |
Snapshot subtotal: unknown; rate $None/GiB-month. Egress: see allowances, pooling/accrual and rate $0.0085/GiB; not every mode has the same allowance.
Powered-off compute billed: False. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://www.oracle.com/cloud/compute/pricing/
- https://apexapps.oracle.com/pls/apex/cetools/api/v1/products/?currencyCode=USD
- https://www.oracle.com/cloud/price-list/
- https://www.oracle.com/cloud/free/
- https://www.oracle.com/cloud/free/faq/
- https://www.oracle.com/cloud/compute/faq/
- https://www.oracle.com/cloud/networking/virtual-cloud-network/faq/
- https://www.oracle.com/assets/paas-iaas-universal-credits-3940775.pdf
- https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm
- https://docs.oracle.com/en-us/iaas/Content/Compute/References/burstable-instances.htm
- https://docs.oracle.com/en-us/iaas/Content/Compute/Concepts/preemptible.htm
- https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm
- https://docs.oracle.com/en-us/iaas/Content/Compute/Concepts/computeoverview.htm
- https://docs.oracle.com/en-us/iaas/Content/General/Concepts/servicelimits.htm
- https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingpublicIPs.htm
- https://docs.oracle.com/en-us/iaas/Content/Block/Concepts/blockvolumebackups.htm
- https://docs.oracle.com/en-us/iaas/Content/Block/Concepts/blockvolumeperformance.htm
- https://blogs.oracle.com/linux/kvm-nested-virtualization-in-oci
- https://hn.algolia.com/api/v1/items/49183750
- https://www.cnelecar.com/blog/oracle-always-free-arm-limits-cut-2026/