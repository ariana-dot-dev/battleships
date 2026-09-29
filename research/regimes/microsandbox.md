# microsandbox — pricing regimes (as of 2026-09-28)
microsandbox is an Apache-2.0 microVM runtime built on **libkrun** (KVM on Linux, Hypervisor.framework on macOS, WHP on Windows).
It runs free on your own machine, and a managed **cloud is in private beta**, with access by request.
Cloud pricing is published but labelled "private beta pricing". Search snippets of the docs say the rates "need owner confirmation before
promotion", so treat them as provisional. Each plan is a **fee that buys a monthly pool of resource-hours**, not dollars.
Usage beyond the pool is billed at a single rate card that is the same on every plan, prorated per second of runtime.
Rates: vCPU **$0.05/vCPU-h**, memory **$0.0162/GiB-h**, writable disk **$0.0001/GiB-h** (~$0.073/GiB-mo),
durable storage **$0.000205/GiB-h** (~$0.15/GiB-mo), persistent volumes **$0.15/GiB-month**.
A 4 vCPU / 8 GiB sandbox costs 0.20 + 0.1296 = **$0.3296/h**, plus writable disk.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Local / self-host runtime | Run on your own laptop or server (macOS Apple Silicon, Linux KVM, Windows WHP) | Free, open source | $0 (you pay for your own hardware) | https://github.com/superradcompany/microsandbox |
| BYOC | Run in your own cloud or on your own metal | Evaluated with sales | null | https://microsandbox.dev/platform/byoc |
| Free (cloud) | Private-beta access granted | **Hard-capped** monthly pool with **no overage**: usage stops at the cap | 5 vCPU-h, 20 memory GiB-h, 20 disk GiB-h per month; at most 3 sandboxes (3 ephemeral / 2 persistent running); each limited to **1 vCPU / 512 MiB / 8 GiB writable disk**; 1 GiB durable storage in total | https://microsandbox.dev/pricing |
| Builder | $49/mo | The fee buys a pool; usage beyond it bills at the published rates | 500 vCPU-h + 2,000 mem GiB-h + 2,000 disk GiB-h + 50 GiB durable storage, worth about $57.40 of compute+memory at list prices ($57.60 counting disk); **1,000 ephemeral / 50 persistent** sandboxes running at once | pricing page |
| Teams | $299/mo | Pool plus overage | 2,000 vCPU-h + 8,000 mem GiB-h + 8,000 disk GiB-h + 250 GiB durable storage (~$229.60 of compute+memory); **25,000 ephemeral / 500 persistent** running | pricing page |
| Enterprise | Custom agreement, committed or BYOC | The fee is not published, but the pool is | 4,000 vCPU-h + 16,000 mem GiB-h + 16,000 disk GiB-h + 500 GiB durable; running caps "set together" | pricing page |
| Running (ephemeral or persistent) | Sandbox running | Allocated vCPU + memory + writable disk, prorated per second while it runs ("billed for the time it actually runs") | $0.05 / $0.0162 / $0.0001 per unit-hour | pricing page |
| Stopped persistent sandbox | `stop` with persistent state, or idle-timeout graceful stop | Compute stops. Whether writable disk keeps billing while stopped is **not stated**. Durable storage bills per GiB-hour | $0.000205/GiB-h durable | https://docs.microsandbox.dev/cloud/overview, pricing page |
| Disk snapshots | Taken from stopped persistent sandboxes | Probably durable storage, but this is not stated | ~$0.15/GiB-mo (assumed) | cloud overview |
| Persistent managed volumes | Named volumes | Per GiB-month, **separate from the pools** | $0.15/GiB-month | pricing-page calculator footnote |
| Egress | — | Pricing FAQ: "is there egress billing?" is answered only with "we are not making billing promises on this page" | null | https://microsandbox.dev/platform/cloud |
No dated price changes were found; the whole price list is a private-beta draft.
## Gotchas
1. **The Free tier is tiny and hard-capped.** Each sandbox is limited to 1 vCPU / 512 MiB, so it can't run a 4/8 workload at all.
2. **Pools are per resource and do not substitute for each other.** Builder includes 500 vCPU-h but 2,000 memory GiB-h, a 1:4 ratio.
   A 4/8 workload (1:2 ratio) exhausts the vCPU pool after 125 h, while only 1,000 of the 2,000 GiB-h are used, so the pool is effectively worth
   ~$41 at that shape, not $57.40. The $49 fee is therefore not fully "credit" for CPU-heavy shapes.
3. **The persistent-running cap is much lower than the ephemeral cap**: 50 vs 1,000 on Builder, 500 vs 25,000 on Teams. A fleet of long-lived stateful
   sandboxes may need Teams just for the cap.
4. **The cloud has no published ports.** The cloud docs say published ports, custom DNS and TLS interception are unavailable, so there is no inbound HTTP preview.
   SSH works.
5. **Everything is private beta.** Rates may change, and egress billing is explicitly left open.
6. Earlier research recorded the isolation as Firecracker. The project actually uses **libkrun**.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots, 100 GiB egress.
Assume a 10 GiB writable disk per sandbox. Billing is on allocation, so the 30% CPU figure does not matter.
Raw usage:
- vCPU: 35,200 vCPU-h × $0.05 = $1,760
- Memory: 70,400 GiB-h × $0.0162 = $1,140.48
- Writable disk: 88,000 GiB-h × $0.0001 = $8.80
- **Total: $2,909.28**
| Regime | Feasible? | Monthly total |
|---|---|---|
| Free | No: 1 vCPU / 512 MiB per sandbox, 3 sandboxes | n/a |
| Builder ($49) | Yes. 50 concurrent fits the ephemeral cap (1,000) and just fits the persistent cap (50) | $49 + (1,760 − 25) + (1,140.48 − 32.40) + (8.80 − 0.20) = **$2,900.68**. The 50 GiB of snapshots fit in the 50 GiB durable allowance (if snapshots count as durable storage). Egress unknown. |
| Teams ($299) | Yes | $299 + (1,760 − 100) + (1,140.48 − 129.60) + (8.80 − 0.80) = **$2,977.88** |
| Enterprise | Sales | fee unknown; pool worth $459.20 at list |
| Self-host (local runtime) | Yes, on your own KVM hosts | $0 license + your hardware |