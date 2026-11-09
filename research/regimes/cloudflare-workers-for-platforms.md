# Cloudflare Workers for Platforms — pricing regimes (2026-09-28, re-checked 2026-11-08)
Added by the missing-providers audit (code-interpreter preset).
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Platform plan | always | $25/month | 20M requests + 60M CPU-ms + 1,000 scripts included | https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/pricing/ |
| Requests | beyond included | per million | $0.30 | https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/pricing/ |
| CPU time | beyond included | per million CPU-ms | $0.02 | https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/pricing/ |
| Scripts | beyond 1,000 | per script | $0.02 | https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/pricing/ |
| Dynamic Workers | Workers Paid plan ($5/month) | per Dynamic Worker per day | 1,000 unique per month included, then $0.002; requests $0.30/M beyond 10M; CPU $0.02/M CPU-ms beyond 30M | https://developers.cloudflare.com/dynamic-workers/pricing/ |
## Gotchas
- Only CPU time is billed, not wall time.
- 128 MB memory cap per isolate.
- WfP caps CPU at 30 s per invocation (15 min for Cron Triggers and Queue consumers).
- Workloads that need a shell, more RAM or a lasting disk run on Cloudflare's Sandbox SDK, a separate product (card cloudflare-sandbox).
## Worked example
200k requests x 1 min at 20% CPU = 200k x 12 s CPU = 2.4M CPU-s = 2,400M CPU-ms -> (2,400M - 60M) x $0.02/M = $46.80 + requests within included + $25 = $71.80.
Sources: https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/pricing/, https://developers.cloudflare.com/dynamic-workers/pricing/, https://developers.cloudflare.com/workers/platform/limits/
