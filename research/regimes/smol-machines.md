# smol machines — regimes (2026-09-28)
YC: Spring 2026; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/smol-machines
Ship software faster with portable, self contained virtual machines.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Active usage plus running-instance fee | Not representable: $0.04/machine-h plus $0.05/active-vCPU-h + $0.0162/active-RSS-GB-h. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://smolmachines.com/pricing |
| Standard | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$0; concurrent=None; max session h=None | https://smolmachines.com/pricing |
| Pro | Plan limits apply | Monthly fee; credits only as stated | fee=20; included usage=$0; concurrent=None; max session h=None | https://smolmachines.com/pricing |
| Startup | Plan limits apply | Monthly fee; credits only as stated | fee=150; included usage=$0; concurrent=None; max session h=None | https://smolmachines.com/pricing |
| Enterprise | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://smolmachines.com/pricing |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | $0.073 | https://smolmachines.com/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://smolmachines.com/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | $0.05 | https://smolmachines.com/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://smolmachines.com/pricing |
## Verified billing facts and gotchas
1. Bills a $0.04 per running-machine-hour base PLUS $0.05 per active vCPU-hour and $0.0162 per active RSS GB-hour; base is not reserved resources.
2. One-minute minimum initially at requested size; longer lifetimes use sampled CPU/RSS and second-level metering. Fork fanout pays minimum once, not per clone.
3. Card deliberately has null CPU/RAM rates to prevent underpricing. Native rates are retained in provider extras.
4. Disk is used bytes at $0.0001/GB-hour, including stopped state; scale-to-zero removes base and CPU/RAM. Beta discount: 10% only on spend above $2,000/month; threshold may change.
5. Pro/Startup are pure fees, not credits. Standard 20 stored machines, Pro 100, Startup 1000; limits need not equal running concurrency.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
Assuming 100% of 8 GiB remains resident and 30% of 4 vCPU consumed: 8,800×($0.04+4×0.3×$0.05+8×$0.0162)=$2,020.48. Pro adds $20. Fifty GiB retained storage adds $3.65 and 100 GiB egress $5: $2,049.13 before the conditional beta discount and any running disks. Memory utilization is not specified by the workload, so this is an explicit full-RSS scenario; snapshot-specific storage semantics remain unverified.
## Sources and coverage
- https://www.ycombinator.com/companies/smol-machines
- https://smolmachines.com/pricing
- https://smolmachines.com/faq
- https://smolmachines.com/docs/
- https://smolmachines.com/
- https://smolmachines.com/llms.txt
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.