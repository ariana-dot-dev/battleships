# Verify: steel (2026-09-28, independent verifier)
Source re-fetched live: docs.steel.dev/overview/pricinglimits ("Last Edit: June 30th, 2026"). steel.dev/pricing
returned a 308 redirect (not followed).
| Item | Result | Note |
|---|---|---|
| Launch $0 + usage, $30 one-time credit valid 90 days (~300 browser-h) | confirmed | |
| Scale $250 + usage, $100 usage credit per month | confirmed | |
| Enterprise custom + usage | confirmed | |
| Browser hours $0.10 (Launch) / $0.08 (Scale), billed by the minute, rounded up | confirmed | |
| Proxy $10/GB (Launch) / $6/GB (Scale) | confirmed | |
| CAPTCHA $3/1k / $1/1k; Browser Tools $5/1k both | confirmed | |
| Credits apply to browser hours, proxy, CAPTCHA and Tools | confirmed | "How Credits Work" |
| Concurrency 10 / 100 / 1,000+; max session 15 min / 1 h / up to 24 h | confirmed | |
| Seats up to 3 / unlimited; req/min 60 / 600; retention 7 / 14 days | confirmed | |
| Dedicated IPs $5/IP/month on Scale | confirmed | "up to 25 self-serve" not re-checked |
| Stealth Browser and reserved pools Enterprise-only; SSO + HIPAA-ready BAA on Scale+ | confirmed | |
| $10 deposit to use CAPTCHA/proxies on Launch; free credits don't count | confirmed | |
| Legacy Starter/Developer/Startup prices | unverifiable | third-party only; plan flagged legacy (never priced) |
| Region us-east only | not re-checked | |
reads (mode.plans || requires_plan). confirmed. The Scale rate can never be combined with the Launch plan.
Corrections:
- Re-added proxy pricing as knobs proxy_launch ($10/GB, modes ["launch"]) and proxy_scale ($6/GB, modes ["scale"]) with
  effect egress_gib_rate, default 0 = no Steel proxy / BYO.
  proxy = $1,454 on Scale (= regime); no proxy = $854.
  s.vcpu >= W.vcpu, which is false for null, so the card is never priced ("no preset with >=N vCPU"). The figures above were
  obtained by temporarily giving the preset 1 vCPU/1 GiB in a test harness. Recorded as a card caveat.
- Knob design note: the two proxy knobs are per-plan. A user who turns on only one of them compares plans unevenly.