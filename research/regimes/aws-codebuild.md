# AWS CodeBuild — pricing regimes (2026-09-28)
CI runner product (job-scoped, ephemeral). Added by the missing-providers audit.
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand EC2 | default | per build minute, rounded up | general1.small $0.005/min, medium $0.01, large $0.02, xlarge $0.0798, 2xlarge $0.20; arm1 $0.0034..$0.09 | https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/CodeBuild/current/us-east-1/index.csv |
| On-demand Lambda | lambda compute types | per second | not encoded | https://aws.amazon.com/codebuild/pricing/ |
| Reserved capacity | fleets | per minute, 60-min minimum | not encoded | https://aws.amazon.com/codebuild/pricing/ |
| Free tier | always | 100 min/month general1.small/arm1.small | $0.50 | https://aws.amazon.com/codebuild/pricing/ |
## Gotchas
- Per-minute rounding up per build.
- Logs/artifacts billed separately.
## Worked example
4 vCPU / 8 GiB = general1.medium $0.01/min: 528,000 min = $5,280/month (general1 medium is billed per build minute, no reuse).
Sources: https://aws.amazon.com/codebuild/pricing/, https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-compute-types.html, https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/CodeBuild/current/us-east-1/index.csv