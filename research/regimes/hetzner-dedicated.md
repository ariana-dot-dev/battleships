# Hetzner Dedicated AX / EX — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| AX physical server hourly with monthly cap | On demand; Native USD catalogue; one physical server per selected size. vCPU uses hardware-thread proxy. PrimaryIPv 4 removed from bundle and charged once in network. Setup varies by model; not per guest start. | AX42: $0.1877/h; cap 117.1 | https://www.hetzner.com/dedicated-rootserver/ |
| EX physical server hourly with monthly cap | On demand; Native USD catalogue; one physical server per selected size. vCPU uses hardware-thread proxy. PrimaryIPv 4 removed from bundle and charged once in network. Setup varies by model; not per guest start. | EX44: $0.1155/h; cap 72.1 | https://www.hetzner.com/dedicated-rootserver/ |
## Billing details
- **granularity_seconds**: 3600
- **minimum_billed_seconds**: 3600
- **setup_fee_usd**: Unknown; not assumed zero.
- **api**: True
- **cli**: Unknown; not assumed zero.
- **ipv 6**: True
- **ingress_usd**: 0
- **minimum_term**: Hourly capped monthly, no minimum contract term on inspected AX42/EX44; cancel to end billing.
- **cpu**: Dedicated physical host. AX hardware threads withSMT; EX hybridP/E cores are not equal performance per thread.
- **backup**: No managed VM snapshots on bare metal; DIY images to local disks or Storage Box. BX11 1 TB $4/month extra.
- **provisioning**: Availability-dependent delivery, not agent-microVM startup; Robot administration/order automation differs from cloud API.
- **discounts**: LTD/auction offers vary by inventory and configuration; not assumed baseline.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- Headline EX44 $74/month inclIPv 4, no setup; AX42 $119 inclIPv 4 +$59 setup; AX102 $304 +$149 setup; AX162 $724 +$359 setup. Native USD API, no FX needed.
- Base server withoutIP is headline minus$1.90/month. PrimaryIPv 4 hourly$0.003/monthcap$1.90. Monthly caps reach around 624 billed server hours for these products, not assumed 672/730.
- 1 Gbps uplink unmetered under product policy. 10 Gbps add-on instead has 20 TB outgoing allowance and overage; not priced here.
- You rent the whole server; using 4 vCPU/8 GB does not turn the physical-server tariff into a proportional slice. Use self-host card for a customer-operated multi-guest fleet.
- Setup fees are per physical order and are not amortized automatically in this provider card. Daily destroy/reorder creates repeated setup costs and capacity risk.
- No managed snapshot feature; requested 50 GB snapshots require your own virtualization/storage stack. Provider card is deliberately not a turnkey snapshot sandbox.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| AX physical server hourly with monthly cap | $1,651.76 | $5,855.00 |
| EX physical server hourly with monthly cap | $1,016.40 | $3,605.00 |
Snapshot subtotal: unknown; rate $None/GiB-month. Egress: see allowances, pooling/accrual and rate $0/GiB; not every mode has the same allowance.
Powered-off compute billed: True. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://www.hetzner.com/dedicated-rootserver/
- https://www.hetzner.com/dedicated-rootserver/ax42/
- https://www.hetzner.com/dedicated-rootserver/ex44/
- https://website-price-api.hetzner.com/api/v1/products/ROBOT_1719
- https://docs.hetzner.com/general/billing-and-account-management/billing-at-hetzner/billing-system-hetzner
- https://docs.hetzner.com/robot/dedicated-server/ip/faq-primary-ipv4/