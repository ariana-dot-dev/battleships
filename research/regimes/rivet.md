# Rivet — regimes (2026-11-08)
YC: Winter 2023 (company facts not re-verified on 2026-11-08). Source: https://www.ycombinator.com/companies/rivet
Rivet Actors are the primitive for stateful workloads. agentOS runs on Actors.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Actor Nodes (agentOS and Actors) | always | flat monthly per node | R-5 1/4 vCPU 1 GB $4.20; R-10 1/2 vCPU 2 GB $8.40; R-20 1 vCPU 4 GB $16.80; R-40 4 vCPU 8 GB $27.30; R-160 8 vCPU 16 GB $94.50 | https://rivet.dev/pricing/ |
| Free | prototyping | control plane $0 | 1 node (R-5 or R-10) at no charge | https://rivet.dev/pricing/ |
| Hobby | Plan limits apply | control plane $10/mo + nodes | up to 3 nodes, R-5 to R-20 | https://rivet.dev/pricing/ |
| Team | Plan limits apply | control plane $120/mo + nodes | up to 10 nodes, all sizes; YC / a16z Speedrun 50% off for 12 months | https://rivet.dev/pricing/ |
| Enterprise | Plan limits apply | control plane $900/mo + nodes | up to 50 nodes; more: contact sales | https://rivet.dev/pricing/ |
| Storage, egress | n/a | not listed on the pricing page | unknown | https://rivet.dev/pricing/ |
## Verified billing facts and gotchas
1. "Your monthly cost is the control plane price for your plan plus your Actor Nodes." Actors are paid "Only through the Actor Nodes in your cluster." No per-second, storage or egress rates are listed.
2. Many actors share one node. Actors per node and proration are not published, so the model prices one node per machine for the whole month.
3. Node caps per cluster: Free 1, Hobby 3, Team 10, Enterprise 50. R-40 and R-160 need Team or higher.
4. agentOS runs no Docker, apt or arbitrary binaries. Rivet documents mounting an external sandbox (E2B, Daytona, Freestyle, own Docker); that provider bills it.
5. Clusters run on Google Cloud: us-east4, us-central1, europe-west1, europe-west3, asia-southeast1, asia-east1.
## Worked example
Requested: 4 vCPU/8 GiB, 50 at once. 50 × R-40 = $1,365/mo plus Enterprise $900 = $2,265/mo, flat. 300 or 1,000 at once exceed the published 50-node cap (contact sales).
## Sources and coverage
- https://rivet.dev/pricing/
- https://rivet.dev/agentos/docs/limitations.md
- https://rivet.dev/agentos/docs/versus-sandbox.md
- https://rivet.dev/guides/run-claude-code/
- https://rivet.dev/agents/docs/sandboxes/
