# Codemagic: pricing regimes (as of 2026-09-28)
Codemagic is a mobile CI/CD service with macOS, Linux and Windows machines. It is sold two ways:
- **Pay-as-you-go** per build minute.
- **Fixed annual plans** with unlimited minutes and 3 concurrent builds.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Free (individual) | Single user | 500 free Mac mini M2 minutes/month (refilled), 1 parallel build, 120-min build limit | $0 | https://codemagic.io/pricing/ |
| 2 | Pay as you go (teams) | Default | Per build minute, billed monthly. 1 concurrency included, +$49 per extra concurrency/month (up to 3) | Mac mini M2 (8-core/12 GB) **$0.095/min**; Mac mini M4 (10-core/16 GB) **$0.114/min**; Linux X2 and Windows (8 vCPU/32 GB) **$0.045/min** | same; https://docs.codemagic.io/specs/versions-macos/, https://docs.codemagic.io/specs/versions-windows/ |
| 3 | Fixed price, annual | Yearly commitment | Unlimited macOS/Linux/Windows minutes, 3 concurrent builds | M2 **$3,990/year**, M4 $5,400/year, M4 Max $9,000/year. Extra concurrency $1,500 / $1,800 / $3,000 per year | same |
| 4 | Burstable concurrency | Fixed plans | Per concurrency above/below baseline | $50 above / $150 below baseline | same |
| 5 | App preview | Add-on | Per minute | $0.095/min or $3,000/year unlimited | same |
| 6 | Enterprise | Sales | Dedicated machines, SSO, SLAs | from $12,000/year | same |
## Gotchas
1. PAYG caps at 4 concurrent builds (1 + 3 extra). Fixed plans allow up to about 10 extra.
2. 120-minute build limit (custom on Enterprise). Jobs only.
3. Free minutes are M2-only and individual-plan only.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress. Illustrative.
| Regime | Compute | Fees | **Monthly** |
|---|---|---|---|
| PAYG Mac mini M2 ($5.70/h) | $50,160.00 | +$147 (3 extra concurrency), but max 4 concurrent | **$50,307** (cannot actually run 50 concurrent) |
| PAYG Windows 8 vCPU/32 GB ($2.70/h) | $23,760.00 | +$147 | **$23,907** (same concurrency cap) |
| Fixed M2 plan | unlimited minutes | $332.50/month for 3 concurrent; +$125/month per extra concurrency | 13 concurrent max ≈ $1,582.50/month, so 50 concurrent is not reachable |
Snapshots and egress are not metered or published.
Sources: https://codemagic.io/pricing/ · https://docs.codemagic.io/specs/versions-macos/ · https://docs.codemagic.io/specs/versions-windows/