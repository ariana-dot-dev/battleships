# Azure Pipelines — pricing regimes (2026-09-28)
CI runner product (job-scoped, ephemeral). Added by the missing-providers audit.
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Microsoft-hosted parallel job | paid parallelism | flat per job per month | $40/job/month, unlimited minutes, 6 h job cap, 2 vCPU/7 GB agent | https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/ |
| Self-hosted parallel job | own agents | flat per job per month | $15/job/month | https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/ |
| Free grant | private projects | 1 hosted job | 1,800 min/month, 60-min jobs | https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted |
## Gotchas
- Only one hosted machine size (2 vCPU / 7 GB).
- Minutes are unlimited on paid jobs: cost scales with concurrency, not usage.
## Worked example
4 vCPU / 8 GiB does not fit the 2 vCPU / 7 GB agent. For 2 vCPU jobs at 50 concurrency: 50 x $40 = $2,000/month.
Sources: https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/, https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted