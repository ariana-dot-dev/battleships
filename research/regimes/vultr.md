# Vultr Cloud Compute — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| Cloud Compute Regular (vc 2, shared vCPU), hourly with 672 h monthly cap | On demand; Hourly billing, minimum 1 h, capped at the monthly price after 672 h/month. hour = monthly/672 (matches vultr.com/pricing, e.g. $40/mo = $0.060/h). The public API's hourly_cost field shows monthly/730 instead (e.g. 0.055) - see caveats. vc 2 = previous-gen Intel, local SSD. Billed while stopped until destroyed. | vc 2-4c-8gb (Cloud Compute Regular, shared): $0.0595/h; cap 40 | https://www.vultr.com/pricing/ |
| Cloud Compute High Performance (vhp, AMD EPYC or Intel Xeon, NVMe, shared vCPU), hourly with 672 h cap | On demand; AMD and Intel variants list identical prices; AMD list used. vhp-4c-8gb $48/mo = $0.0714/h. Max 12 vCPU / 24 GB. | vhp-4c-8gb-amd (High Performance AMD, shared): $0.0714/h; cap 48 | https://www.vultr.com/pricing/ |
| Cloud Compute High Frequency (vhf, 3 GHz+ Intel, NVMe, shared vCPU), hourly with 672 h cap | On demand; No 4 vCPU/8 GB shape (vhf-3c-8gb, vhf-4c-16gb $96/mo). | vhf-4c-16gb (High Frequency Intel 3GHz+, shared): $0.1429/h; cap 96 | https://www.vultr.com/pricing/ |
| Optimized Cloud Compute (voc, dedicated AMD EPYC vCPU: General / CPU / Memory / Storage Optimized), hourly with 672 h cap | On demand; Dedicated vCPU. CPU Optimized voc-c-4c-8gb-75s $80/mo = $0.119/h; General Purpose voc-g-4c-16gb $120/mo = $0.1786/h. | voc-c-4c-8gb-75s-amd (Optimized Cloud Compute CPU Optimized, dedicated): $0.119/h; cap 80 | https://www.vultr.com/pricing/ |
| VX1 Cloud Compute (dedicated AMD vCPU, hourly, NOT capped: billed on actual hours) | On demand; VX1 (docs published 2025-10-17): dedicated CPU with virtualization support, 'instant provisioning in under 15 seconds' (vendor claim), billed on actual hours each month and NOT capped at 672 h (month_cap null). Plans without '-###s' boot from high-perf NVMe block storage billed separately (~$0.10/GB-month, disk_gib 0 here so the engine adds block storage); '-###s' plans include local NVMe. No automatic backups, no Windows. 9-11 locations (NA/EU/Sydney/Tokyo). | vx 1-g-4c-16g (VX1 General Purpose, dedicated, boot from block storage (billed separately)): $0.12/h; cap None | https://www.vultr.com/pricing/ |
| Bare Metal (single-tenant, hourly with 672 h cap) | On demand; Single-tenant physical servers, vcpu = hardware threads. Hourly at monthly/672 (e.g. vbm-4c-32gb E3-1270 $120/mo = $0.179/h), minimum 1 h, capped at the monthly price; billed while stopped. No snapshots on bare metal. Provisioning takes longer than VMs (not quantified). GPU bare metal (H100/B200/MI300X/MI325X/MI355X...) is mostly preemptible/contract-only in the API and not modelled. | vbm-4c-32gb (Bare Metal Intel E3-1270, 4c/8t, 2x 240 GB SSD): $0.1786/h; cap 120 | https://www.vultr.com/pricing/ |
## Billing details
- **granularity_seconds**: 3600
- **minimum_billed_seconds**: 3600
- **setup_fee_usd**: 0
- **cpu**: Cloud Compute regular/high-performance/high-frequency shared; Optimized dedicated; VX1 dedicated; bare metal physical server.
- **backup**: Automatic backups add 20% of instance cost; compressed VM snapshots $0.05/GB-month; not available on bare metal.
- **api**: True
- **cli**: True
- **ipv 6**: True
- **ingress_usd**: 0
- **minimum_term**: One started hour; destroy to stop billing.
- **provisioning**: No independently measured deployment timing; VM and physical provisioning differ.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- Hourly price discrepancy: vultr.com/pricing (Wayback 2026-09-26) and the billing doc imply hour = monthly/672 with a 672 h cap ($40/mo -> $0.060/h), but the public /v 2/plans API returns hourly_cost = monthly/730 (e.g. vc 2-4c-8gb 0.055). The card uses monthly/672 (the documented billing rule); if Vultr actually bills the API rate, part-time costs are ~8% lower.
- Minimum billing unit is 1 hour (every started hour billed). Stopped instances and stopped bare metal bill in full until destroyed.
- GPU instances bill on 730 h (actual hours) since 2024-10-01; VX1 bills actual hours with no 672 h cap.
- Snapshots $0.05/GB-month on compressed size, usable in any region; deploy new instances from a snapshot to clone (fs only, no memory). No snapshots for bare metal.
- One public IPv 4 per instance is included; Reserved IPs cost $3/month; additional instance IPv 4 price not captured.
- Pricing may vary by location (e.g. Sao Paulo is 1.5x on many plans in the API location_cost field).
- Nested virtualization: documented for VX1 ('support for virtualization') and inherent on bare metal; not documented for vc 2/vhp/vhf/voc (null).
- Vultr Firewall filters inbound only (egress filtering must be done in the guest).
- No published commitment/reserved discounts; free-tier plan vc 2-1c-0.5gb-free (1 vCPU/0.5 GB, $0) exists in SEA/FRA/MIA per API; promo-code credits not captured.
- Default account instance limit not published; 50 concurrent instances likely needs a limit increase.
- vultr.com is Cloudflare-protected; website figures come from the Wayback snapshot of 2026-09-26 and docs.vultr.com; plan specs from the unauthenticated API on 2026-09-28.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| Cloud Compute Regular (vc 2, shared vCPU), hourly with 672 h monthly cap | $523.60 | $2,000.00 |
| Cloud Compute High Performance (vhp, AMD EPYC or Intel Xeon, NVMe, shared vCPU), hourly with 672 h cap | $628.32 | $2,400.00 |
| Cloud Compute High Frequency (vhf, 3 GHz+ Intel, NVMe, shared vCPU), hourly with 672 h cap | $1,257.52 | $4,800.00 |
| Optimized Cloud Compute (voc, dedicated AMD EPYC vCPU: General / CPU / Memory / Storage Optimized), hourly with 672 h cap | $1,047.20 | $4,000.00 |
| VX1 Cloud Compute (dedicated AMD vCPU, hourly, NOT capped: billed on actual hours) | $1,056.00 | $4,380.00 |
| Bare Metal (single-tenant, hourly with 672 h cap) | $1,571.68 | $6,000.00 |
Snapshot subtotal: $2.5000; rate $0.05/GiB-month. Egress: see allowances, pooling/accrual and rate $0.01/GiB; not every mode has the same allowance.
Powered-off compute billed: True. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://www.vultr.com/pricing/
- https://api.vultr.com/v2/plans
- https://api.vultr.com/v2/plans-metal
- https://api.vultr.com/v2/regions
- https://web.archive.org/web/20260926221221/https://www.vultr.com/pricing/
- https://docs.vultr.com/support/platform/billing/how-am-i-billed-for-my-servers
- https://docs.vultr.com/support/platform/billing/are-stopped-instances-still-billed-on-vultr
- https://docs.vultr.com/support/platform/billing/do-stopped-bare-metal-servers-incur-charges
- https://docs.vultr.com/support/platform/billing/how-are-bandwidth-caps-calculated
- https://docs.vultr.com/support/platform/billing/what-is-the-bandwidth-overage-rate
- https://docs.vultr.com/support/platform/billing/how-is-bandwidth-usage-calculated
- https://docs.vultr.com/support/platform/billing/does-vultr-charge-for-stored-snapshots
- https://docs.vultr.com/support/platform/billing/how-much-does-it-cost-to-enable-automatic-backups
- https://docs.vultr.com/support/platform/billing/how-are-gpu-products-billed-differently
- https://docs.vultr.com/support/platform/billing/is-pricing-the-same-in-all-data-center-locations
- https://docs.vultr.com/support/platform/billing/how-much-does-ddos-protection-cost
- https://docs.vultr.com/support/platform/billing/how-can-i-increase-my-account-limits
- https://docs.vultr.com/support/platform/billing/what-happens-when-i-upgrade-my-server
- https://docs.vultr.com/support/platform/billing/is-a-windows-license-included-in-the-monthly-price
- https://docs.vultr.com/support/products/network/are-reserved-ips-free
- https://docs.vultr.com/support/products/network/does-vultr-firewall-filter-outgoing-traffic-from-my-instance
- https://docs.vultr.com/support/products/compute/how-do-i-clone-or-make-a-copy-of-a-vultr-compute-instance
- https://docs.vultr.com/products/storage/snapshots/faq
- https://docs.vultr.com/products/storage/backups/faq
- https://docs.vultr.com/platform/billing/manage-account-limits
- https://docs.vultr.com/platform/billing/faq
- https://docs.vultr.com/vultr-vx1-cloud-compute
- https://docs.vultr.com/products/compute/instances/vx1-cloud-compute/management/stop
- https://docs.vultr.com/products/compute/instances/cloud-compute/networking/ipv4
- https://web.archive.org/web/20260621045803/https://www.vultr.com/servers/windows/