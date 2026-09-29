# Lapdev — Kubernetes development environment platform (BYOC)
As of 2026-09-28. Current public beta is free PLATFORM SOFTWARE, not free cloud compute. HN launch 2024-03-23 item 39801399; old remote-VM pricing is not current Kubernetes product pricing.
## Regimes
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Beta platform licence | Native product usage | $0 while public beta; external Kubernetes resources excluded. | [Primary pricing](https://lap.dev/pricing/) |
| Post-GA platform fee | Native product usage | Unknown; planned active-environment subscription plus own infrastructure. | [Primary pricing](https://lap.dev/pricing/) |
| Public beta | Account plan | $0/month; No platform fee during beta; own Kubernetes compute/network/storage billed externally; unlimited developers/catalogs advertised. | [Primary pricing](https://lap.dev/pricing/) |
| GA future subscription | Account plan | Unpublished / sales; Planned subscription by active environments; not yet priced. | [Primary pricing](https://lap.dev/pricing/) |
## Gotchas
- Customer supplies Kubernetes cluster and pays its provider independently.
- Future GA prices unpublished; zero beta fee is temporary, not permanent list promise.
- Kubernetes pod isolation depends on customer runtime; no default hardware microVM assurance established.
- No provider-neutral total can be calculated without cluster/node/storage/network SKUs and utilization.
## Required worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU, 50 GiB retained snapshots and 100 GiB egress.
**Unknown total, not $0.** A platform licence contributes $0 during beta, but the customer must provision enough Kubernetes CPU/RAM for 50 × 4 vCPU/8 GiB if all are reserved, and pay running nodes, 50 GiB retained state and 100 GiB transfer. Active 30% CPU does not automatically make node allocation 30% billable.
## Feature evidence
- https://docs.lap.dev/llms-full.txt
- https://github.com/lapce/lapdev