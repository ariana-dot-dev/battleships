# Cloudflare Workers for Platforms — pricing regimes (2026-09-28)
Added by the missing-providers audit (code-interpreter preset).
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Platform plan | always | $25/month | 20M requests + 60M CPU-ms + 1,000 scripts included | https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/platform/pricing/ |
| Requests | beyond included | per million | $0.30 | https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/platform/pricing/ |
| CPU time | beyond included | per million CPU-ms | $0.02 | https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/platform/pricing/ |
| Scripts | beyond 1,000 | per script | $0.02 | https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/platform/pricing/ |
## Gotchas
- Only CPU time is billed, not wall time.
- 128 MB memory cap per isolate.
## Worked example
200k requests x 1 min at 20% CPU = 200k x 12 s CPU = 2.4M CPU-s = 2,400M CPU-ms -> (2,400M - 60M) x $0.02/M = $46.80 + requests within included + $25 = $71.80.
Sources: https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/platform/pricing/, https://developers.cloudflare.com/workers/platform/limits/