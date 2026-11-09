# Azure Pipelines — pricing regimes (2026-11-08)
CI runner product (job-scoped, ephemeral). Added by the missing-providers audit; updated by the 2026-11-08 fairness audit.
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Microsoft-hosted parallel job | paid parallelism | flat per job per month | $40/job/month, unlimited minutes, 6 h job cap, 2 vCPU/7 GB/14 GB SSD agent (Intel 3-core/14 GB on macOS) | https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/ |
| GitHub-hosted agents | larger or Apple Silicon machines | per minute, no free tier | Linux 8-core (8 vCPU/32 GB/300 GB) $0.022, 16-core (16 vCPU/64 GB/600 GB) $0.042; Windows 8-core $0.042, 16-core $0.082; macOS M1 $0.062, M2 XL $0.102. macOS GA since 2026-10-01; Linux and Windows in public preview, 8 agents per SKU by default | https://devblogs.microsoft.com/devops/github-hosted-agents-with-pay-as-you-go-pricing-are-now-generally-available-in-azure-pipelines/ , https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/github-hosted-faq |
| Managed DevOps Pools | your choice of A/B/D/E/F VM size | Azure VM rates + $15 self-hosted parallel job | jobs up to 2 days; stateful agents keep files up to 7 days | https://learn.microsoft.com/en-us/azure/devops/managed-devops-pools/configure-scaling?view=azure-devops |
| Self-hosted parallel job | own agents | flat per job per month | $15/job/month, no job time limit | https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/ |
| Free grant | private projects | 1 hosted job | 1,800 min/month, 60-min jobs | https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted |
## Gotchas
- The $40 parallel job buys one size: 2 vCPU / 7 GB (Linux/Windows). Bigger machines are per minute (GitHub-hosted), or your own VMs (Managed DevOps Pools, self-hosted).
- Minutes are unlimited on paid parallel jobs: cost scales with concurrency, not usage.
- Hosted agents are reimaged after each job.
## Worked example
4 vCPU / 8 GiB does not fit the 2 vCPU / 7 GB parallel-job agent. It fits a GitHub-hosted Linux 8-core agent at $0.022/min ($1.32/h). For 2 vCPU jobs at 50 concurrency on parallel jobs: 50 x $40 = $2,000/month.
Sources: https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/, https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted, https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/github-hosted?view=azure-devops
