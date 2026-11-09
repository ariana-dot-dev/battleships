# Samsung SDS Cloud Platform
As of 2026-11-08. Price basis: official USD list in the service portal price data, VAT excluded.
Virtual Server is a general-purpose IaaS VM, not a dedicated AI sandbox API. The card prices the s2v4m8 (2nd Gen, 4 vCPU / 8 GB) size for the 4/8 example.
## Currency, VAT and residency
- Catalog: USD and KRW for KR_WEST and KR_WEST_2 (USD list = KRW / 1150). KR_SOUTH lists KRW only, about 20% above KR_WEST; not modelled ([price data](https://cloud.samsungsds.com/serviceportal/assets/js/data/price/virtualServerPrice.js)).
- Tax: the pricing page says "All prices exclude VAT".
- Residency: the self-serve price data covers three Korean regions (KR_WEST, KR_WEST_2, KR_SOUTH).
## Regimes
| Regime | When it applies | How billed | s2v4m8 (4 vCPU / 8 GB) USD/h | Source |
|---|---|---|---|---|
| virtual-server | Virtual Server, no contract | "Charge by used hour" while the VM is on; granularity not published | 0.193 | https://cloud.samsungsds.com/serviceportal/pricing.html |
| reserved-1y | Planned Compute 1 year | fixed monthly fee per committed instance type; 50% early-cancellation penalty | 0.12544 (monthly / 730) | https://cloud.samsungsds.com/serviceportal/pricing.html |
| reserved-3y | Planned Compute 3 years | same as 1 year | 0.11578 (monthly / 730) | https://cloud.samsungsds.com/serviceportal/pricing.html |
## Gotchas
- The OS disk is a Block Storage volume ($0.1043/GB-month SSD). It bills while the VM is off. The whole disk stays until you terminate the server.
- Public IPv4 is billed while reserved. The product page says the basic offering includes one public IP.
- Planned Compute savings need a fixed type, quantity and term. The headline "up to 55%" is not an unconditional discount.
- Billing granularity below one hour is not published.
## Required worked example
4 vCPU / 8 GiB; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization of 30% does not reduce allocated-resource charges.
- virtual-server compute: 8,800 × $0.193 = **$1,698.40**.
- reserved-1y and reserved-3y: fixed monthly fees per committed instance, billed for the full term; not comparable to an 8 h/day pattern without a commitment plan.
- Root disk, snapshots and egress: see the card (storage, network). Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM; default quotas are not published.
## Sources
- https://cloud.samsungsds.com/serviceportal/pricing.html
- https://cloud.samsungsds.com/serviceportal/assets/js/data/price/virtualServerPrice.js
- https://www.samsungsds.com/ap/compute-virtualserver/virtualserver.html
