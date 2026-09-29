# Server4Agent — Persistent build-agent servers and project hosting
As of 2026-09-28. Public USD list subscription allowances, plus metered dollars of compute+AI. Signup/early-access product with published MCP and REST; original launch date not verified. The provider explicitly distinguishes itself from raw sandbox primitives.
## Regimes
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Account credits | Native product usage | 1 credit=$1 of compute+AI metered usage; base meter not published. | [Primary pricing](https://www.server4agent.com/pricing) |
| Egress overage | Native product usage | Starter $0.12/GB after 100 GB; Pro $0.10/GB after 250 GB; Business $0.08/GB after 1 TB; Free 10 GB with no published overage. | [Primary pricing](https://www.server4agent.com/pricing) |
| Annual discount | Native product usage | Two months free advertised; credit/renewal details not confirmed. | [Primary pricing](https://www.server4agent.com/pricing) |
| Free | Account plan | $0/month; 1 server; small tier; 5 GB/server; 1 public project; 10 GB monthly egress; $2 trial credits. | [Primary pricing](https://www.server4agent.com/pricing) |
| Starter | Account plan | $29/month; 2 small servers; 5 GB/server; 3 public projects; 100 GB egress; 3 members. | [Primary pricing](https://www.server4agent.com/pricing) |
| Pro | Account plan | $99/month; 3 small/medium servers; 20 GB/server; 10 public projects; 250 GB egress; 5 members. | [Primary pricing](https://www.server4agent.com/pricing) |
| Business | Account plan | $299/month; 10 servers, small/medium/large; 100 GB/server; 30 public projects; 1 TB egress; 15 members. | [Primary pricing](https://www.server4agent.com/pricing) |
| Enterprise | Account plan | Unpublished / sales; Unlimited advertised servers, custom storage/credits; managed or BYOC. | [Primary pricing](https://www.server4agent.com/pricing) |
## Gotchas
- vCPU/RAM of server tiers and base compute meter unpublished.
- Plan fee is not wholly credit: Starter $29 includes $10; Pro $99 includes $40; Business $299 includes $150.
- Displayed ~1.4x Starter/Pro and ~1.2x Business AI overage are approximate and applied to an unpublished base; cannot derive a unit price.
- Default managed-server caps stop at 10, so 50 concurrent servers requires Enterprise contract.
- Project count is not sandbox concurrency; no inference that many projects each get a separate 4/8 VM.
- Early-access CTA leaves onboarding availability untested; no account created.
## Required worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU, 50 GiB retained snapshots and 100 GiB egress.
**Enterprise quote required.** 50 simultaneous servers exceeds Business cap 10; vCPU/RAM and compute pricing unknown. 100 GiB egress would fit Starter/Pro/Business allowances under the project convention GB≈GiB, but that does not solve the capacity mismatch or price the retained snapshots.
## Feature evidence
- https://www.server4agent.com/llms-full.txt
- https://www.server4agent.com/docs/api
- https://www.server4agent.com/blog/e2b-alternatives-for-ai-agents