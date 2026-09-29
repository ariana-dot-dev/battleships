# Paperspace — regimes (2026-09-28)
YC: Winter 2015; directory status **Acquired**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/paperspace
Paperspace Core and Gradient
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Current Core CPU hourly | Public listed mode | sizes; CPU alloc, memory alloc | C1: 1 vCPU/0.5 GiB $0.0045/h; C3: 2 vCPU/2 GiB $0.018/h; C4: 2 vCPU/4 GiB $0.04/h; C5: 4 vCPU/8 GiB $0.08/h; C6: 8 vCPU/16 GiB $0.16/h; C7: 12 vCPU/30 GiB $0.3/h; C8: 16 vCPU/60 GiB $0.6/h; C9: 24 vCPU/120 GiB $0.9/h; C10: 32 vCPU/244 GiB $1.6/h | https://docs.digitalocean.com/products/paperspace/pricing/ |
| Core usage | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://docs.digitalocean.com/products/paperspace/pricing/ |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://docs.digitalocean.com/products/paperspace/pricing/ |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://docs.digitalocean.com/products/paperspace/pricing/ |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | $0 | https://docs.digitalocean.com/products/paperspace/pricing/ |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | $3 | https://docs.digitalocean.com/products/paperspace/pricing/ |
## Verified billing facts and gotchas
1. Public DigitalOcean-acquired VM/GPU platform; Core hourly/monthly, Gradient notebook/deployment plans. Marketing page contains conflicting Pro $8 and $12/mo in separate sections. Keep product-specific compute tables in evidence; do not combine a notebook fee with unrelated Core tariff.
2. Current DigitalOcean docs supersede marketing tables: C5 $0.08/hour, 50GB disk separately $5/mo cap; not free included disk. All compute hourly only while powered on; storage/IP keep billing when off.
3. Windows templates unavailable to new users since 2024-07-01, so card windows=false for new buyers; legacy users may retain Windows access. Marketing Standard $35 Windows offer must not be ranked as current public availability.
4. Pro $8 personal vs $12/team user is resolved by current docs; Gradient subscriptions are not required Core subscription.
5. Current multi-GPU table and prose conflict for V100×8 and A6000×8; verify actual SKU before extrapolating single GPU rates.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Current C5 4/8 hourly: 8,800×$0.08=$704. Fifty minimum 50GB block disks retained all month add 50×$5=$250; one 50GB snapshot adds $1; 100GB egress $0. Subtotal $955, or $1,105 with fifty retained public IPs ($3 each). Fifty machines require account quota approval; price is not availability guarantee.
## Sources and coverage
- https://www.ycombinator.com/companies/paperspace
- https://docs.digitalocean.com/products/paperspace/pricing/
- https://docs.digitalocean.com/products/paperspace/machines/details/machine-types/
- https://docs.digitalocean.com/products/paperspace/machines/details/limits/
- https://www.paperspace.com/pricing
- https://www.paperspace.com/
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.