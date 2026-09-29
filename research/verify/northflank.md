# Verify: northflank (2026-09-28)
https://northflank.com/blog/ai-sandbox-pricing (published 2026-05-05). The pricing page's BYOC and GPU tabs are JS-rendered and were not re-rendered in this pass.
| Item | Result |
|---|---|
| CPU $0.01667/vCPU-h, memory $0.00833/GB-h, per second | confirmed |
| All 19 predefined plans (vCPU, RAM, $/month, $/h), shared below 1 vCPU, dedicated from 1 vCPU; monthly = 720 h | confirmed (e.g. nf-compute-400 4/8 GB $96/mo = $0.1333/h; nf-compute-2000-40 $480 = $0.6667/h) |
| Largest listed plan 20 vCPU / 40 GB | confirmed for the rows visible before "Show more"; the page also says "Scale compute from 0.1 vCPU to 32 vCPU" and "memory from 256 MB to 256 GB", so larger predefined/custom sizes exist (unverifiable which are self-serve) |
| Custom compute plans "Request custom vCPU + memory combinations" | confirmed; same unit rates assumed (unverifiable) |
| Egress $0.06/GB, ingress free | confirmed. New detail: cross-zone transfer $0.02/GB when using Zonal Redundancy (not modelled; only for HA setups) |
| Disk $0.15/GB-month | confirmed |
| GPUs L4 0.80, A100-40 1.42, A100-80 1.76, H100 2.74, RTX PRO 6000 3.00 | confirmed (compute tab) |
| H200 $3.14 | confirmed (vendor blog); not in static compute tab |
| B200 $5.87 | unverifiable this pass (GPU tab is JS-rendered; H200/B200 exist in the page's encoded GPU list) |
| GPU rate is "a combined rate per hour" (GPU+CPU+RAM) | confirmed (vendor blog wording); docs ambiguity unverifiable |
| $50 credit minimum for GPUs | unverifiable (not on pages re-fetched) |
| BYOC fee $0.01389/vCPU-h + $0.00139/GB-h | confirmed via vendor blog ("Cloud bill + $0.01389/vCPU-hr and $0.00139/GB-hr management fee"); docs confirm "a flat fee for each cluster, vCPU, and GB of memory" (per-cluster amount unpublished). BYOC tab not re-rendered |
| BYO GPU $0.00278/GB vRAM-h | unverifiable this pass (BYOC tab only) |
| "No added cost for running in your VPC" contradiction | confirmed (still in Pay-as-you-go column) |
| Free "Sandbox"/Developer tier: 2 services, 2 jobs, 1 addon, 1 BYOC cluster, always-on, "Compute: Limited" | confirmed (docs + page) |
| Pay-as-you-go: no seat pricing, pro-rated to the second, billed at end of cycle | confirmed |
| Enterprise: invoice billing, volume discounts, annual commitment, BYOC commits, SSO, audit logs | confirmed |
| Regions US West/Central/East, EU West, Asia East; no multipliers | confirmed (region selector; one price list) |
| Snapshot fees $0, no idle auto-pause, pause wipes ephemeral disk | unverifiable this pass (sandbox docs / blog not re-fetched) |
No corrections needed.