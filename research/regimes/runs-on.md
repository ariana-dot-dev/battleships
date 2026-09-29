# RunsOn — pricing regimes (2026-09-28)
CI runner product (job-scoped, ephemeral). Added by the missing-providers audit.
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Spot EC2 (default) | every job unless spot=false | AWS per second, your bill | x64 2cpu $0.0009/min, 16cpu $0.0047, 96cpu $0.0229 (incl. 30 GB gp3) | https://runs-on.com/pricing/ |
| On-demand EC2 | spot disabled/fallback | AWS per second | x64 2cpu $0.0019/min, 16cpu $0.0116, 96cpu $0.0717 | https://runs-on.com/pricing/ |
| Licence | commercial use | annual flat, EUR | Starter €300, Growth €900, Scale €1,800, Enterprise €3,600 /yr | https://runs-on.com/pricing/ |
## Gotchas
- Licence is EUR and annual; tiers by runners/month.
- Spot prices fluctuate; interruption possible.
- You also pay S3 cache / NAT / transfer on AWS.
## Worked example
4 vCPU / 8 GiB is not a stock size; 4cpu m7i-flex.xlarge (16 GiB): spot $0.0014/min -> 50 x 8 h x 22 d = 528,000 min = $739 + licence (Growth €900/yr ≈ €75/mo). On-demand $0.0035/min = $1,848.
Sources: https://runs-on.com/pricing/, https://runs-on.com/runners/linux/