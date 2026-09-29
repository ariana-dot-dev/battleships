# Riza Code Interpreter — pricing regimes (as of 2026-09-28)
**Status: the hosted Code Interpreter API shut down on 2025-10-01.** New signups stopped 2025-07-28, microVM custom
runtimes were deprecated 2025-08-01, and api.riza.io / dashboard.riza.io were turned off 2025-10-01
(https://riza.io/blog/shutting-down-hosted-code-interpreter). riza.io/pricing and the homepage are still online but stale
(© 2025, last changelog entry 2025-08-04). Only the self-hosted container survives, "indefinitely with any existing
offline license key". Everything below is the last published price list, kept for the record.
Riza was never compute-metered: each request ran a script in a fresh WebAssembly module (128 MiB, no shell, Python/JS/TS/Ruby/PHP),
priced by monthly request quota per plan.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Hobby | Default, free forever | Request quota, hard limits | $0; 100,000 requests/month; 30 s/request; 100 GB transfer/month; 3 custom runtimes; Discord support | https://riza.io/pricing |
| Pro | Growing startups | **Flat $250/month fee for a quota** (not usage credit) | 1,000,000 requests/month (≈$0.00025/request at full use); up to 15 min/request; 500 GB transfer; 50 custom runtimes; Slack channel | https://riza.io/pricing |
| Overage | Beyond request or transfer quota | Never published | null | https://riza.io/pricing |
| Enterprise | Scale / on-prem | Custom quota, custom execution time, self-hosting | price unpublished | https://riza.io/pricing |
| Self-hosted container | Enterprise / trial license | Your own infra + license key (`RIZA_LICENSE_KEY`); stateless Docker image, amd64/arm64, no privileged mode | license price unpublished; trial via hello@riza.io | https://docs.riza.io/self-hosting/quickstart |
| microVM custom runtimes | Hosted variant beyond WASM | Never priced separately | deprecated 2025-08-01 | shutdown blog post |
| Per-invocation limits | All plans | — | 128 MiB RAM, 1 MiB code, 10 MiB stdin, 20 MiB stdout, HTTP-only egress, `/mnt/req` writable only | https://docs.riza.io/interpreters/limits |
| Storage / snapshots / idle | — | None exist (stateless) | $0 | docs |
Dated changes: billing self-serve in dashboard 2025-03-07; signups closed 2025-07-28; microVM runtimes deprecated 2025-08-01;
hosted shutdown 2025-10-01.
## Gotchas
1. **Not buyable.** The pricing page still says "free for your side projects, forever", but the hosted API has been off for a year.
2. **Pro is a pure fee**, not credit: $250 buys the 1M-request quota and 15-min timeout; unused requests are lost; overage price never disclosed.
3. **Not a VM.** 128 MiB per call, no processes, no packages outside Python/JS custom runtimes: most agent-sandbox workloads simply don't fit.
4. **Transfer caps** (100 GB / 500 GB) were the only network pricing and overage was unpublished.
5. Self-hosting continues only for customers already holding an offline license key; whether new licenses are sold is unknown.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days, 30% CPU, 50 GiB snapshots, 100 GiB egress.
| Regime | Feasible? | Monthly total |
|---|---|---|
| Hobby / Pro (hosted) | **No**: service shut down 2025-10-01; and even before, 8 GiB RAM and 8 h sessions exceed the 128 MiB / 15 min per-request limits; no snapshots | n/a |
| Self-hosted | Only as a code-execution component, not a 4/8 VM; license price unknown | your own compute + unknown license |
For its real use case (short LLM-generated scripts), Pro was $250/month for up to 1M executions; Hobby covered 100k/month free.