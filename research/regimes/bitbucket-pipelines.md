# Bitbucket Pipelines — pricing regimes (2026-09-28)
CI runner product (job-scoped, ephemeral). Added by the missing-providers audit.
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Plan minutes | per workspace | included build minutes | Free 50, Standard 2,500, Premium 3,500 /month | https://www.atlassian.com/software/bitbucket/pricing |
| Extra minutes | beyond plan | $10 per 1,000 minutes | $0.01/min per 1x | https://www.atlassian.com/software/bitbucket/pricing |
| Size multiplier | size: Nx | N x minutes | 1x 2/4 ... 32x 64/128; 4x+ paid only | https://support.atlassian.com/bitbucket-cloud/docs/step-options/ |
## Gotchas
- Build minutes multiply by step size.
## Worked example
4 vCPU / 8 GiB = 2x: 528,000 min x 2 = 1,056,000 build minutes x $0.01 = $10,560 minus included.
Sources: https://www.atlassian.com/software/bitbucket/pricing, https://support.atlassian.com/bitbucket-cloud/docs/step-options/