# Lizard — Sandboxes (2026-11-08)
Public product verified from the pricing, billing, limits, SDK and sandbox docs on 2026-11-08. The [public SDK repository](https://github.com/lizard-build/lizard-sdk) is also available. All prices USD list.
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Running sandbox | Small 2 vCPU / 4 GB / 5 GB disk; Medium 4 vCPU / 8 GB / 20 GB; Large 8 vCPU / 16 GB / 50 GB | Flat price per size, per second while it runs | Small $0.0162/h; Medium $0.0324/h; Large $0.0648/h | [Limits](https://lizard.build/docs/platform/limits.md), [Pricing](https://lizard.build/pricing) |
| Paused sandbox | After `pause()`; keeps the whole disk, memory and processes (`fast: true` keeps the disk only) | No compute | $0 compute | [Sandboxes](https://lizard.build/docs/sandboxes.md), [Pricing](https://lizard.build/pricing) |
| Snapshot | `sandbox.snapshot()`; holds the whole disk and memory; restorable after the source sandbox is gone | Not published | Unknown | [SDK reference](https://lizard.build/docs/sandboxes/sdk-reference.md), [Sandboxes](https://lizard.build/docs/sandboxes.md) |
| Persistent Volume | 1-50 GB at `/workspace`, one sandbox at a time, node-local | Per GB-month while you keep it | $0.14/GB-month | [Pricing](https://lizard.build/pricing), [Sandboxes](https://lizard.build/docs/sandboxes.md) |
| Sandbox egress | Outbound traffic from sandboxes | Included | 2 TB per account over a rolling 30 days; ingress free | [Pricing](https://lizard.build/pricing) |
| Pro / Pro 5x / Pro 20x | Self-serve plans | Monthly fee, usage credit equal to the fee; overage as it builds up, no spending cap | $19 / $99 / $499; 40 / 220 / 1,200 vCPU at once; no start limit | [Billing](https://lizard.build/docs/platform/billing.md), [Limits](https://lizard.build/docs/platform/limits.md) |
| Pro trial | New account, card required | 7 days with $5 of usage | 8 vCPU at once (Small only, US regions only); 6 starts/min, 30/h, 100/day | [Billing](https://lizard.build/docs/platform/billing.md), [Limits](https://lizard.build/docs/platform/limits.md) |
| Enterprise | Custom contract | Invoiced monthly | Contract rates; SSO/SAML, RBAC and audit log on demand; SOC 2 report "coming soon" | [Pricing](https://lizard.build/pricing) |
## Gotchas
- A stop (kill or expiration) deletes the disk. Only a `/workspace` volume and snapshots you took remain. Nothing is saved automatically. [Sandboxes](https://lizard.build/docs/sandboxes.md).
- Plan usage credit is shared with apps, databases, storage and egress. Unused usage does not carry over. [Billing](https://lizard.build/docs/platform/billing.md).
- Concurrency counts vCPU, not sandboxes: Pro runs 10 Medium sandboxes at once. [Limits](https://lizard.build/docs/platform/limits.md).
- Fork makes 1 to 100 copies with memory and processes; it returns 409 with a volume attached. [SDK reference](https://lizard.build/docs/sandboxes/sdk-reference.md).
- SDK and CLI default to a five-minute lifetime; the raw API and dashboard default to no expiration. [Sandboxes](https://lizard.build/docs/sandboxes.md).
## Required worked example
Workload: 4 vCPU / 8 GiB, 50 simultaneous sandboxes × 8 hours/day × 22 days = **8,800 sandbox-hours**; retained snapshots 50 GiB-month; egress 100 GiB.
- 50 Medium sandboxes = 200 vCPU at once: needs Pro 5x (220 vCPU).
- Compute: `8,800 × $0.0324 = $285.12`. The $99 Pro 5x fee is usage credit, so the bill is **$285.12**.
- Egress: 100 GiB is inside the 2 TB included.
- Snapshot storage: price not published; not added.
