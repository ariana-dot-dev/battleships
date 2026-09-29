# Windows 365 for Agents: pricing regimes (as of 2026-09-28)
Windows 365 for Agents is a class of Windows Cloud PCs built for agents. Agents **check out** a Cloud PC for a task and check it back in afterwards. The platform is driven by Microsoft agent products (Copilot Studio computer use, Project Opal, Researcher, Agent 365) and managed through Intune agent pools.
- **Pricing:** pay-as-you-go by the hour, plus an optional flat fee for "always-available" PCs.
- **Licence:** Windows is included.
- **Spec:** the Cloud PC hardware is not published.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Pay-as-you-go (US) | Batch/async agents (e.g. Copilot Studio). PCs provisioned per task | "total time spent running agent tasks on provisioned Cloud PCs within each hourly window, rounded up to the next full hour" | **$0.40/h** | https://learn.microsoft.com/en-us/windows-365/agents/pricing-paygo-always-available |
| 2 | Always-available (US) | Interactive, latency-sensitive agents (Agent 365) | Fixed monthly fee per Cloud PC **plus** PAYG usage | **$5 per Cloud PC per month** + $0.40/h | same |
| 3 | Other geographies | Cloud PCs outside the US | "Pricing varies based on the geography" | null | same |
| 4 | Storage / egress / IPv4 | – | Not published. No inbound networking | null | – |
## Gotchas
1. **Hour-window rounding.** A 5-minute task bills a full hour. A task that crosses a window boundary can bill 2 hours.
2. **Unknown machine size.** You cannot compare $/vCPU. The card leaves vcpu/ram null.
3. **Microsoft-stack only.** It is not a generic VM API. Agents run through Microsoft's agent products and Intune/Entra, and the prerequisite licences for those products are extra and not captured.
4. The always-available $5/PC/month is on top of usage and is not in the mode maths. Add it by hand.
## Worked example
Workload: 50 concurrent × 8 h/day × 22 days = 8,800 PC-hours (1,100 sessions). The 4 vCPU / 8 GiB request cannot be checked against the unpublished spec.
| Regime | Maths | Monthly |
|---|---|---|
| PAYG, sessions aligned to hour windows | 8,800 × $0.40 | **$3,520** |
| PAYG, worst case (each session spans 9 windows) | 1,100 × 9 × $0.40 | $3,960 |
| + always-available for 50 PCs | + 50 × $5 | $3,770 (aligned) |
| Snapshots / egress | not priced | null |
CPU utilisation does not matter.
Sources: https://learn.microsoft.com/en-us/windows-365/agents/pricing-paygo-always-available · https://learn.microsoft.com/en-us/windows-365/agents/introduction-windows-365-for-agents