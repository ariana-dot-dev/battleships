# Prized — regimes (2026-09-28)
YC: Summer 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/prized
A cloud devbox that feels local
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand | Public listed mode | sizes; CPU alloc, memory alloc | Nano: 2 vCPU/2 GiB $0.0136986301369863/h; Micro: 2 vCPU/4 GiB $0.03424657534246575/h; Extra Small: 2 vCPU/8 GiB $0.0684931506849315/h; Small: 4 vCPU/16 GiB $0.136986301369863/h; Medium: 8 vCPU/32 GiB $0.3424657534246575/h; Large: 16 vCPU/64 GiB $0.684931506849315/h; Extra Large: 32 vCPU/128 GiB $1.36986301369863/h | https://prized.dev/docs/billing |
| Paid credit plan | Plan limits apply | Monthly fee; credits only as stated | fee=10; included usage=$0; concurrent=100; max session h=None | https://prized.dev/docs/billing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://prized.dev/docs/billing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://prized.dev/docs/billing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://prized.dev/docs/billing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://prized.dev/docs/billing |
## Verified billing facts and gotchas
1. Plan is prepaid credit ($10–$1000 plus custom fleet-sized rungs), not an extra fee. Credit rollover capped at two months; long cycles receive proportional extra credit.
2. Exact awake rate is monthly size price/730; visible hourly numbers are rounded. Monthly size cap is explicitly documented.
3. Sleep charges the entire retained allocated disk at $0.0001/GB-hour; included running disk is NOT free while paused.
4. Free $30 is once; trial permits 1 box, no auto-pause, max Small, and pauses workspace after >30 minutes full-CPU saturation. Paid workspace max 100 boxes.
5. Nano/Micro are burstable EC2 t3a; larger m6a VMs. No GPU/arm64/nested KVM. Only workspace-authenticated shared URLs; not public web hosting.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Small is the smallest fitting 4/8 (actually 4 vCPU/16 GB/300 GB). Awake 8,800×100/730=$1,205.48. Retain 50 disks during 730−176=554 asleep hours each: 50×300×554×$0.0001=$831.00. Subtotal $2,036.48 before snapshots/unknown network; monthly credit plan is a spend floor, not added twice. 30% CPU does not discount allocated running price.
## Sources and coverage
- https://www.ycombinator.com/companies/prized
- https://prized.dev/docs/billing
- https://prized.dev/docs/machines.md
- https://prized.dev/docs/snapshots
- https://prized.dev/docs/limits
- https://prized.dev/pricing
- https://prized.dev/
- https://prized.dev/docs
- https://prized.dev/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.