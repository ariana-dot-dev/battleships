# Apple Xcode Cloud: pricing regimes (as of 2026-09-28)
Xcode Cloud is Apple's CI/CD for Xcode projects: build, test in parallel, archive and TestFlight. It sells **compute hours** in fixed monthly subscriptions on top of Apple Developer Program membership. It gives no shell, SSH or desktop access, so it is **not a general macOS sandbox** (the card's mode is flagged `alt`).
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Included | Apple Developer Program membership | Monthly allotment | **25 compute hours/month** | https://developer.apple.com/xcode-cloud/ |
| 2 | 100 h | Subscription | Monthly | **US$49.99/month** ($0.50/h) | same |
| 3 | 250 h | Subscription | Monthly | **US$99.99/month** ($0.40/h) | same |
| 4 | 1,000 h | Subscription | Monthly | **US$399.99/month** ($0.40/h) | same |
| 5 | 10,000 h | Subscription | Monthly | **US$3,999.99/month** ($0.40/h) | same |
| 6 | Compute hour definition | – | Summed task time: "running 5 tests of 12 minutes each equals one compute hour" | – | same |
## Gotchas
1. **There is no published overage.** Beyond your pack you upgrade (packs can be changed at any time). The card approximates this as $0.40/h, with plan `included_usd` = hours × $0.40.
2. **Parallel tests burn hours in parallel.**
3. Xcode workloads only. Environments are destroyed after each build.
## Worked example
The reference workload (50 interactive 4 vCPU / 8 GiB sessions) **cannot run** on Xcode Cloud. If the same 8,800 hours were Xcode build/test time, they would need the **10,000 h pack at $3,999.99/month**. Snapshots and egress are not applicable.
Sources: https://developer.apple.com/xcode-cloud/