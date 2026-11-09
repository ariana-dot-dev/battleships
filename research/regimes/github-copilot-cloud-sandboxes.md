# GitHub Copilot cloud sandboxes — pricing regimes (as of 2026-11-08)
Every Copilot cloud session runs in an isolated Linux cloud sandbox by default. Sessions start from github.com, GitHub
Mobile, Slack, Teams, the Copilot app, VS Code, the Copilot SDK, or `copilot --cloud` in an interactive CLI session.
GitHub's docs say cloud sandboxing is "built on Azure Container Apps Sandboxes, with GitHub providing the identity,
policy, and billing layer". Generally available on paid Copilot plans since 2026-10-28; billing starts November 2026
(https://github.blog/changelog/2026-10-28-work-from-anywhere-with-a-new-connected-copilot-cloud-experience/).
Meters (https://docs.github.com/en/billing/concepts/product-billing/cloud-and-local-sandboxes):
**$0.000024 per compute second, $0.000003 per GiB-second of allocated memory, $0.005 per GiB-month of snapshot storage**.
The Copilot docs table names the compute unit "vCPU second"; the billing page names it "Compute second" and its worked
example has no vCPU multiplier.
Reference 4 vCPU / 8 GiB (size not published by GitHub): **$0.432/h** per vCPU second, **$0.173/h** per sandbox second.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Running cloud sandbox | Session running | Compute per vCPU second (upper bound) + allocated memory per GiB-second | $0.0864/vCPU-h, $0.0108/GiB-h | GitHub docs |
| Included compute | Every month, per billing account | Sandbox compute and memory draw from it first; shared with Actions standard runners | $12 Free, $18 Pro or Team, $300 Enterprise Cloud | https://docs.github.com/en/billing/concepts/product-billing/github-actions |
| Stopped session | After stop (a snapshot of state is kept) | Compute and memory not metered; snapshot storage from stop until delete | $0.005/GiB-month | GitHub billing docs |
| Local sandboxing | Sandbox on your own machine | Included in the Copilot seat | $0 | GitHub billing docs |
| Copilot plan | Required (paid plan); org access is the "Copilot in the cloud" policy, enabled by default | Monthly fee or seat | Pro $10, Pro+ $39, Max $100, Business $19/seat, Enterprise $39/seat | https://docs.github.com/en/copilot/get-started/plans |
| Budgets | Product-level or SKU-level budget with "stop usage at 100%" | Hard stop | — | GitHub billing docs |
| No payment method | Quota used up | Usage blocked | — | GitHub billing docs |
## Gotchas
1. **Sizes, max session length, egress price, regions and concurrency limits are not published** by GitHub; 1 vCPU : 2 GiB is assumed from ACA Sandboxes tiers. There is no one-hour limit on total running session time.
2. **Compute unit is ambiguous**: per sandbox second, compute for 4 vCPU costs a quarter of the per-vCPU price.
3. The included compute is shared with GitHub Actions; Actions use reduces what is left for sandboxes.
4. Each sandbox runs Copilot's own agent. The SDK can prompt it from code; no exec, file or SSH API is documented.
## Worked example
4 vCPU / 8 GiB, 50 concurrent x 8 h/day x 22 days = 8,800 sandbox-hours, stopped between shifts, 50 GiB snapshots,
100 GiB egress (price unpublished, assumed $0), GitHub Free account ($12 included).
| Reading | Calculation | Total / month |
|---|---|---|
| Per vCPU second | 8,800 x 0.432 = $3,801.60 + $0.25 storage - $12 included | **$3,789.85** + Copilot seats |
| Per sandbox second | 8,800 x 0.1728 = $1,520.64 + $0.25 storage - $12 included | **$1,508.89** + Copilot seats |
