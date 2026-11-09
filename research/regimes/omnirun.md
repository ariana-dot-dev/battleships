# OmniRun — billing regimes
As of 2026-11-08. No public price. The managed service is priced per client by agreement. Never a fabricated quote.

| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Managed (by agreement) | Any managed use | No public price list and no self-serve plan. Limits, quotas and price are agreed per client. | https://omnirun.io/pricing |
| Self-hosted | Your own x86_64 Linux + KVM host | No OmniRun fee. You pay your own hardware. Installer via omnictl; the server source is announced as Apache-2.0 but is not public yet. | https://omnirun.io/open-source |

## Gotchas
- The Free (25 h), Launch (EUR 19, EUR 0.19/h), Scale (EUR 79, EUR 0.15/h) and Dedicated (EUR 0.10/h) plans published on 2026-09-28 are no longer listed. Do not use them.
- Not priceable in ENGINE_CARD. Null is not zero; do not rank as a free provider.
- Docs default: 3 concurrent sandboxes per user (HTTP 429 beyond). https://omnirun.io/docs/sandboxes
- Default lifetime 300 s (you can raise it). Idle sandboxes are killed after 15 minutes, except sandboxes created with vaultInject: true. The disk is deleted when the sandbox ends. https://omnirun.io/docs/sandboxes
- Features set to null were not verified. No sandbox was purchased or tested.

## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances x 8 h/day x 22 days = 8,800 instance-hours. Needs a negotiated agreement (above the 3-sandbox default). No normalized USD figure.

## Sources
- https://omnirun.io/pricing
- https://omnirun.io/docs/sandboxes
- https://omnirun.io/open-source
