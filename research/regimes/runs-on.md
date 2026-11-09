# RunsOn — pricing regimes (re-checked 2026-11-08)
CI runner product (job-scoped, ephemeral EC2 VM per job, in your own AWS account). Added by the missing-providers audit.
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Spot EC2 (default) | every job unless spot=false | AWS per second, your bill | x64 2cpu m8a.large $0.0009/min, 4cpu m8a.xlarge $0.0013, 16cpu c8id.4xlarge $0.0037, 96cpu c8id.24xlarge $0.0211 (7-day average, cheapest us-east-1 zone, incl. 30 GB gp3) | https://runs-on.com/pricing/ |
| On-demand EC2 | spot disabled/fallback | AWS per second | x64 2cpu $0.0023/min, 4cpu $0.0044, 16cpu $0.0151, 96cpu $0.0890 (EC2 on-demand + $0.0003/min gp3) | https://runs-on.com/pricing/ |
| Licence | commercial use | annual flat, EUR or USD | Starter €300 / $350, Growth €900 / $1,050, Scale €1,800 / $2,100, Sponsorship (Enterprise) €3,600 / $4,200 per year | https://runs-on.com/pricing/ |
| Free | non-profit, open-source, personal non-commercial | €0, public link back to runs-on.com | — | https://runs-on.com/pricing/ |
## Gotchas
- Licence is annual, in EUR or USD (page toggle). Sponsorship is also sold on AWS Marketplace.
- Tiers count runners launched per month across Flex and Fleet. Overage never blocks CI; two months in a row over the tier moves you up (prorated).
- Spot prices move with the AWS spot market; interruption possible.
- You also pay S3 cache, public IPv4 or NAT, and transfer on AWS.
- 15-day trial on Starter, Growth and Scale.
## Worked example
4 vCPU / 8 GiB is not a stock size; 4cpu m8a.xlarge (16 GiB): spot $0.0013/min -> 50 x 8 h x 22 d = 528,000 min = $686 + licence (Growth $1,050/yr ≈ $87.50/mo). On-demand $0.0044/min = $2,323.
Sources: https://runs-on.com/pricing/, https://runs-on.com/runners/linux/, https://runs-on.com/docs/costs/licensing/
