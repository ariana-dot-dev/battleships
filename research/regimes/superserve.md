# Superserve: pricing regimes (as of 2026-11-08)
Superserve sells Firecracker-VM sandboxes for long-horizon agents. Usage rates are the same on every plan and identical to E2B's list rates: allocated vCPU and allocated RAM per second while the sandbox is active, and no compute while it is paused.
Three plans set the monthly fee, the concurrency cap and the largest sandbox. The plan fee is included usage.
Base rates (pricing page and public billing API, effective 2026-06-17): vCPU $0.000014/s = **$0.0504/h**; RAM $0.0000045/GiB-s = **$0.0162/GiB-h**; storage $0.000108/GiB-h (about $0.0788/GiB-month).
4 vCPU / 8 GiB = **$0.3312/h** (fits Developer).
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free trial | New account | "Start free, no card required." Docs: "A new account gets a limited free trial for its first sandbox." Amount not published | unpublished | https://superserve.ai/pricing, https://superserve.ai |
| Developer | Self-serve | $20/month, "Includes $20 of usage". Up to 100 concurrent sandboxes, 4 vCPU / 16 GiB per sandbox, unlimited runtime | $20/mo floor | https://superserve.ai/pricing |
| Pro | Self-serve | $250/month, "Includes $250 of usage". Up to 2,000 concurrent sandboxes, 16 vCPU / 64 GiB per sandbox, unlimited runtime | $250/mo floor | https://superserve.ai/pricing |
| Enterprise | Contact sales | Volume pricing, custom concurrency and sizes, dedicated hardware, BYOC in your own VPC on AWS, GCP or Azure (early partners) | unpublished | https://superserve.ai/pricing |
| Startup program | Early-stage startups, by application | Credits | up to $50k | https://superserve.ai/pricing |
| Active | `active` state | Allocated vCPU + RAM per second, whatever the utilisation | as above | https://docs.superserve.ai/sandbox/lifecycle |
| Paused | `pause()`, or an auto-pause timer | Full VM (memory, processes, filesystem) checkpointed. No compute. Storage billed copy-on-write for retained changes. The billing API still marks storage billable:false | $0.000108/GiB-h | pricing page; https://superserve.ai; billing API |
| Idle auto-pause (`idleTimeoutSeconds`) | Opt-in, 60 s to 7 d with no activity | Pauses an idle sandbox. Commands and open terminals count as activity; outbound traffic and nohup/& background processes do not | — | https://docs.superserve.ai/sandbox/lifecycle |
| Active-time auto-pause (`timeoutSeconds`) | Opt-in | Pauses after N active seconds | — | https://docs.superserve.ai/sandbox/lifecycle |
| Auto-delete (`autoDeleteSeconds`) | Opt-in | Deletes a sandbox paused for that long. By default paused sandboxes are kept | — | https://docs.superserve.ai/sandbox/lifecycle |
| Named snapshots / fork | `snapshot`, `fromSnapshot` | Memory+disk snapshot that outlives the sandbox. Each fork is a new active sandbox at full rate | storage rate | API reference |
| Per-sandbox shape | Fixed per template | Free 2 vCPU / 4 GiB, Developer 4 / 16, Pro 16 / 64 | — | https://docs.superserve.ai/templates/build-spec |
| Egress / IPv4 | — | No network meter in the rate card. No public IPv4; HTTPS preview URLs | null | billing API |
## Gotchas
1. **The plan fee is a floor, not an add-on.** Developer bills the larger of $20 and usage; Pro the larger of $250 and usage.
2. **Concurrency follows the plan.** 100 on Developer, 2,000 on Pro. Paused sandboxes do not count.
3. **Auto-pause is opt-in.** Set `idleTimeoutSeconds` or an idle running sandbox bills its full allocation.
4. **Storage billing is in transition.** The pricing page and docs bill retained storage; the public billing API still marks it billable:false. Budget $0.0788/GiB-month.
5. The free trial amount is not published.
6. Self-hosting is no longer listed; Enterprise offers BYOC / own VPC.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots, 100 GiB egress; paused between shifts.
| Regime | Feasible? | Monthly total |
|---|---|---|
| Developer (100 concurrent, 4/16 max) | Yes | 8,800 × 0.3312 = **$2,914.56** (fee is included usage) + $3.94 snapshots |
| Paused state | Storage on retained changes | 50 × (8 GiB RAM checkpoint + changed disk) × 554 paused h × $0.000108, at most a few tens of dollars |
| CPU at 30% | — | no effect (allocation billing) |
| Egress 100 GiB | — | not metered / unpublished (null) |
| Anti-pattern: never paused (no timer set), 24 h/day | Yes | 50 × 24 × 22 × 0.3312 = **$8,743.68** |
