# Apoxy — regimes (2026-09-28)
YC: Summer 2023; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/apoxy
Edge workers and CLRK agent runtime
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Native product; see regime notes | Incomplete or non-resource economics: rates remain null, never interpreted as free. | resource; CPU alloc, memory alloc | Unknown or native-unit billing; see facts below | https://apoxy.dev |
| Platform Free | Plan limits apply | Monthly fee; credits only as stated | fee=0; included usage=$None; concurrent=None; max session h=None | https://apoxy.dev |
| Platform Standard | Plan limits apply | Monthly fee; credits only as stated | fee=80; included usage=$None; concurrent=None; max session h=None | https://apoxy.dev |
| Premium annual | Plan limits apply | Monthly fee; credits only as stated | fee=None; included usage=$None; concurrent=None; max session h=None | https://apoxy.dev |
| Retained disk / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://apoxy.dev |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://apoxy.dev |
| Egress / GiB | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://apoxy.dev |
| IPv4 / month | Lifecycle/scope must be checked | Native add-on | unverified, not $0 | https://apoxy.dev |
## Verified billing facts and gotchas
1. Edge JS/TS/Wasm workers bundled with routing: Free 100GB traffic, Standard $80/mo including 1TB then $0.05/GB; TCP/UDP +$20/gateway. CLRK is gVisor-isolated agent runtime: free 1 connected worker; paid Standard $80 and Enterprise displayed coming-soon. BYOC Premium annual from $2k/mo, per-vCPU price unpublished. Do not treat edge traffic tariff as free 4/8 VM.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress. A month is 730 hours only when explicitly used in rate conversion.
**Total: unknown.** This product does not publish a verified complete 4-vCPU/8-GiB tariff and/or the service bills a different unit. Fifty concurrent instances and eight-hour sessions are not automatically supported. Neither 30% utilization nor retained snapshots can be converted into free resources. Use the native plan terms above and request the missing CPU/RAM, retention, egress and concurrency quote.
## Sources and coverage
- https://www.ycombinator.com/companies/apoxy
- https://apoxy.dev/
- https://apoxy.dev/pricing
- https://apoxy.dev/docs/getting-started
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.