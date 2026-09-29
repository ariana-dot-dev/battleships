# Alibaba Cloud ECS International — regimes (2026-09-28)
DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
Prices below are public list prices unless a row explicitly says promotion/commitment. USD; taxes excluded unless noted.
| Regime | When / billing | Captured prices | Source |
|---|---|---|---|
| economy | On demand; US East Virginia Linux original list rate, not discounted trade price. No monthly cap. 4+vCPU minimum 2 minutes per billing cycle; smaller sizes have longer minima. CPU credits/burst are separate for t 6. | ecs.e-c 1m 2.xlarge: $0.0838/h; cap None | https://www.alibabacloud.com/en/product/ecs/pricing |
| compute-c 9i | On demand; US East Virginia Linux original list rate, not discounted trade price. No monthly cap. 4+vCPU minimum 2 minutes per billing cycle; smaller sizes have longer minima. CPU credits/burst are separate for t 6. | ecs.c 9i.xlarge: $0.1463/h; cap None | https://www.alibabacloud.com/en/product/ecs/pricing |
| burstable-t 6 | On demand; US East Virginia Linux original list rate, not discounted trade price. No monthly cap. 4+vCPU minimum 2 minutes per billing cycle; smaller sizes have longer minima. CPU credits/burst are separate for t 6. | ecs.t 6-c 1m 4.xlarge: $0.143/h; cap None | https://www.alibabacloud.com/en/product/ecs/pricing |
| Monthly subscription | 1 month prepaid; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | ecs.e-c 1m 2.xlarge: $38.54/month rental | https://www.alibabacloud.com/en/product/ecs/pricing |
| One-year subscription, observed trade discount | 12 months prepaid; promotional trade price, not guaranteed renewal rate; Estimator-only encoding: sizes.hour and month_cap both equal full monthly rent, with a one-hour synthetic minimum. This is NOT a vendor hourly tariff. For valid workloads with sessions >= peak concurrency it charges one monthly rental per concurrent machine, including off-hours. Setup/term cash outlays are caveated separately. | ecs.e-c 1m 2.xlarge: $32.76/month rental | https://www.alibabacloud.com/en/product/ecs/pricing |
| Spot instances | On demand; Market-dependent price and interruption policy; no static discount invented. | Rate unavailable; null (not free) | https://www.alibabacloud.com/en/product/ecs/pricing |
| Reserved instances / savings plans | On demand; Discount instruments applied to eligible PAYG compute; do not conflate with nonrefundable instance subscriptions. | Rate unavailable; null (not free) | https://www.alibabacloud.com/en/product/ecs/pricing |
## Billing details
- **granularity_seconds**: 1
- **minimum_billed_seconds**: 120
- **setup_fee_usd**: 0
- **api**: True
- **cli**: True
- **ipv 6**: Unknown; not assumed zero.
- **ingress_usd**: 0
- **cpu**: Economy shared vs enterprise c 9i; t 6 CPU credits, not equivalent sustained dedicated performance.
- **minimum_term**: PAYG second-metered hourly settlement; minimum 10/5/2 minutes for 1/2/4+ vCPU each hour cycle. Snapshot minimum 1h.
- **backup**: ESSD PL0 Virginia 100 GB $0.01055/hour or $6.33/month subscription. Snapshot regional rate unresolved.
- **provisioning**: Unknown; not assumed zero.
- **free**: Eligible CDT BGP pay-by-traffic: 200 GB/month outside mainland plus separate 20 GB mainland; activation/switch timing applies.
## Gotchas
- DIY infrastructure rather than an agent-managed sandbox: guest installation, HTTPS/domain setup, abuse controls and operations are customer responsibilities. Linux guest administrative capabilities are not preinstalled agent features. 30% guest CPU utilization does not reduce allocated-compute charges. Unknowns remain null; a partial subtotal is not a complete invoice.
- ECS economy 4/8 $0.0838/h; C9i 4/8 $0.1463/h. Monthly subscription $38.54/$76.67 respectively; not automatic caps.
- International USD catalog, Virginia region, Linux, disk/network excluded. Trade arrays include promotions; original-price arrays are the default source.
- ECS economical stop mode may stop vCPU/RAM/public-bandwidth charge, releases capacity/IP and restart may fail if stock exhausted. Ordinary stop can continue billing; disks/snapshots still cost.
- Public bandwidth can be bought per Mbps or transferred GB; no double addition. $0.076/GB Virginia source is ECS bandwidth catalog; CDT tiers may differ; 200 GB free requires eligible CDT billing.
- EIP ownership/idle charges and backup prices remain unknown, not zero.
## Worked example
4 vCPU / 8 GiB; 50 concurrent × 8 h/day × 22 days = **8,800 guest-hours**; 30% CPU busy; **50 GiB-month total snapshots**, **100 GiB total egress**. 50 GiB retained state is total, not 50 GiB per VM. Compute-only subtotals below exclude unknown components and tax.
| Mode | Delete/recreate / active-window compute | 50 retained hosts, 730-hour month |
|---|---:|---:|
| economy | $737.44 | $3,058.70 |
| compute-c 9i | $1,287.44 | $5,339.95 |
| burstable-t 6 | $1,258.40 | $5,219.50 |
| Monthly subscription | $1,927.00 | $1,927.00 |
| One-year subscription, observed trade discount | $1,638.00 | $1,638.00 |
| Spot instances | Unknown / unavailable | Unknown / unavailable |
| Reserved instances / savings plans | Unknown / unavailable | Unknown / unavailable |
Snapshot subtotal: unknown; rate $None/GiB-month. Egress: see allowances, pooling/accrual and rate $0.076/GiB; not every mode has the same allowance.
Powered-off compute billed: None. A retained-host column is the always-running upper scenario when this is false; powered-off storage/IP still accrue.
Monthly caps attach to instance identities, not to a pool of replacement instances. The active-window column requires deleting/releasing billable compute between shifts for products that bill while off. Restoring from disk is not memory resume.
## Sources
- https://www.alibabacloud.com/en/product/ecs/pricing
- https://g.alicdn.com/aliyun/ecs-price-info-intl/2.0.421/price/js_price/filter_price/instanceTypePrice_2.js
- https://g.alicdn.com/aliyun/ecs-price-info-intl/2.0.421/price/js_price/disk_price/diskPrice.js
- https://g.alicdn.com/aliyun/ecs-price-info-intl/2.0.421/price/js_price/bandwidth_price/bandWidthPrice.js
- https://www.alibabacloud.com/help/en/ecs/pay-as-you-go-1
- https://www.alibabacloud.com/help/en/ecs/user-guide/economical-mode
- https://www.alibabacloud.com/help/en/cdt/internet-data-transfers/