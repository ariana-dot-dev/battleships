# GitHub Copilot cloud sandboxes — pricing regimes (as of 2026-09-28)
`copilot --cloud` launches an isolated, ephemeral Linux sandbox hosted by GitHub. GitHub's docs say cloud sandboxing
is "built on Azure Container Apps Sandboxes, with GitHub providing the identity, policy, and billing layer". Public
preview since 2026-06-02. Meters (https://docs.github.com/en/billing/concepts/product-billing/cloud-and-local-sandboxes):
**$0.000024 per compute second, $0.000003 per GiB-second of memory, $0.005 per GiB-month of storage** — the same
compute/memory meters as ACA Consumption/Sandboxes.
Reference 4 vCPU / 8 GiB (if such a tier exists): **$0.432/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Running cloud sandbox | Session running | Compute per second (read as per vCPU-second) + allocated memory per GiB-second | $0.0864/vCPU-h, $0.0108/GiB-h | GitHub billing docs |
| Stopped session | After stop (a snapshot of state is taken) | Compute and memory not metered; snapshot storage from stop until delete | $0.005/GiB-month | GitHub billing docs; about-cloud-and-local-sandboxes |
| Preview entitlement | Eligible accounts during public preview | $10/month included | ended "end of July 2026"; after that "all usage is billed" | GitHub billing docs |
| Local sandboxing | Sandbox on your own machine | Included in the Copilot seat | $0 | GitHub billing docs |
| Copilot seat | Required to use cloud sandboxes; org/enterprise must enable it (off by default) | Monthly seat | not re-verified here (fee null) | docs.github.com |
| Budgets | Product-level or SKU-level budget with "stop usage at 100%" | Hard stop | — | GitHub billing docs |
| No payment method | Quota used up | Usage blocked | — | GitHub billing docs |
## Gotchas
1. **Tiers, max session length, egress price and regions are not published** by GitHub; ACA Sandboxes tiers (XS-XL, 1 core : 2 GB) are assumed.
2. **Snapshot storage is very cheap ($0.005/GiB-month)** versus the Premium Blob ZRS rate ACA will charge direct customers ($0.20).
3. The $10/month preview credit is gone; every second is billed now.
4. Usable only through Copilot, not as a general sandbox API.
## Worked example
4 vCPU / 8 GiB, 50 concurrent x 8 h/day x 22 days = 8,800 sandbox-hours, stopped between shifts, 30% CPU
(no effect), 50 GiB snapshots, 100 GiB egress (price unpublished, assumed $0).
| Regime | Calculation | Total / month |
|---|---|---|
| Cloud sandbox usage | 8,800 x 0.432 = $3,801.60 + 50 x $0.005 = $0.25 | **$3,801.85** + Copilot seats |
| During preview (until end of July 2026) | $3,801.85 - $10 | $3,791.85 (expired) |