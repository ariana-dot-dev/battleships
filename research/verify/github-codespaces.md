# Verify: github-codespaces (2026-09-28, independent verifier)
Sources re-fetched live: docs.github.com billing/concepts/product-billing/github-codespaces,
get-started/learning-about-github/githubs-plans, github.com/pricing.
| Item | Result | Note |
|---|---|---|
| 2/4/8/16/32-core = $0.18/$0.36/$0.72/$1.44/$2.88 per hour, multiplier = cores | confirmed | billing doc |
| Storage $0.07/GB-month | confirmed | billing doc |
| GitHub Free personal: 120 core-hours + 15 GB-month | confirmed | githubs-plans: "120 GitHub Codespaces core hours per month" (billing doc shows "120 hrs" in a table beside the multiplier column) |
| GitHub Pro personal: 180 core-hours + 20 GB-month | confirmed | githubs-plans |
| Orgs get no free quota | confirmed | billing doc: "GitHub plans for organizations and enterprises do not include a free quota for GitHub Codespaces." |
| Team $4 / Enterprise $21 per user/month "for the first 12 months *" | confirmed | github.com/pricing |
| Free org "$0 spend limit"; Team/Enterprise can raise the limit | confirmed | github.com/pricing |
| GitHub Pro subscription price | unverifiable | not on github.com/pricing or the docs; fee null is correct |
| No network/egress charge documented | confirmed | nothing in the billing doc |
| 4 GB RAM/core, disk sizes, regions, idle-timeout range, retention | not re-checked in depth | docs pages cited; community-thread disk sizes stay third-party |
subtracted (caveat already says N developers get N quotas). The reference workload gives $3,358.70 (compute $3,366 with the default
1.0625 idle-tail knob + $3.50 storage - $10.80).
Corrections:
- features.snapshot "none" -> "fs".
  retained state, although the card prices stopped-codespace storage (snapshot_gib_month 0.07) and the regime worked
  example includes it. A stopped codespace keeps its filesystem (billing doc: storage billed while the codespace exists).