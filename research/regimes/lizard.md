# Lizard — Sandboxes (2026-09-28)
Public product verified from pricing, SDK and sandbox documentation. Discovery: [DEV, September 23 2026](https://dev.to/yuraoak/e2b-sandboxes-pricing-lifecycle-and-alternatives-m0h); this establishes presence, **not original launch date**. The [public SDK repository](https://github.com/lizard-build/lizard-sdk) is also available. All prices USD list unless labeled trial.
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Running sandbox | Fixed public 4-vCPU/4096-MiB template | Measured CPU and RAM seconds | CPU $0.000006948/vCPU-s = $0.0250128/vCPU-h; RAM $0.000003474/GB-s = $0.0125064/GB-h | [Pricing](https://lizard.build/pricing), [actual size constraint](https://lizard.build/docs/sandboxes.md) |
| Paused guest | vCPUs frozen; state in host RAM | No on-demand compute; retained attached volumes separate | $0 compute while paused; retention unsafe across host failure or expiration issue | [Dashboard](https://lizard.build/docs/sandboxes/dashboard.md), [known issues](https://lizard.build/docs/platform/known-issues.md) |
| Persistent volume | Created storage, including after sandbox ends | GB-seconds | $0.000000054/GB-s = $0.141912/GB per 730-hour month | [Pricing](https://lizard.build/pricing), [volumes](https://lizard.build/docs/sandboxes/volumes.md) |
| Network | Outbound bytes from first byte | GB transferred | $0.045/GB; ingress and per-request fee $0 | [Pricing](https://lizard.build/pricing) |
| PAYG account | Standard accounts | No base/seat subscription | $0 recurring base; purchased credits do not expire | [Pricing](https://lizard.build/pricing) |
| Trial | New account | Promotional usage credit | $10, expires after 31 days | [Pricing](https://lizard.build/pricing) |
| Enterprise | Custom infrastructure/compliance contract | Sales-priced | Unknown; do not assume public unit rates or capacity | [Pricing](https://lizard.build/pricing) |
## Gotchas
- **4 vCPU / 8 GiB is not publicly supported.** The sandbox docs now explicitly fix the create API to 4 vCPU/4096 MiB. App quotas of 20 vCPU/40 GB do not override that restriction. [Sandbox specification](https://lizard.build/docs/sandboxes.md).
- Marketing suggests custom templates and shared storage, but current docs expose only `base` and `code-interpreter-v1`, with no public template-upload flow. A volume attaches to one sandbox at a time and stays on its node. Prefer the specific docs to generic marketing. [Templates](https://lizard.build/docs/sandboxes.md), [volume lifecycle](https://lizard.build/docs/sandboxes/volumes.md).
- Pause is **not durable snapshot storage**. RAM stays in host memory. A documented lifecycle issue may expire a paused VM at its original deadline. Default SDK lifetime is five minutes; raw `timeoutMs: 0` disables expiration. [Known issues](https://lizard.build/docs/platform/known-issues.md), [quickstart](https://lizard.build/docs/sandboxes/quickstart.md).
- Pricing says measured memory, not allocated memory; the precise measurement statistic is not documented. Active RAM is approximated by estimator `ram_basis=active`, not asserted to be resident-set sampling with a known interval. [Pricing](https://lizard.build/pricing).
- Payment processing fees and top-up minimum appear only at checkout. Do not assume $0. [Pricing](https://lizard.build/pricing).
## Required worked example
Workload: 4 vCPU / 8 GiB, 50 simultaneous sandboxes × 8 hours/day × 22 days = **8,800 sandbox-hours**; CPU utilization 30%; retained snapshots 50 GiB-month; egress 100 GiB.
**Result: unsupported / no valid total.** A documented sandbox has only 4 GiB RAM, capacity for 50 is not confirmed, and durable VM snapshots are not offered. The 4/8 arithmetic `$0.2001024/h` at full utilization is deliberately not encoded as a purchasable quote.
For arithmetic validation only, changing the request to **4 vCPU / 4 GiB** and assuming all 4 GiB are billable measured memory yields:
- CPU: `8,800 × 4 × 0.30 × 0.0250128 = $264.135168`.
- Memory: `8,800 × 4 × 0.0125064 = $440.225280`.
- Compute subtotal: **$704.360448**; egress: `100 × 0.045 = $4.50`.
- An optional 50-GiB volume for 730 hours would add **$7.0956**, but is **not equivalent to 50 GiB of retained snapshots** and cannot be shared simultaneously across all 50 guests.
No trial credit deducted; payment fees and capacity approval remain unknown. This altered workload is not a quote for the required example.