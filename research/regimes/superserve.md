# Superserve: pricing regimes (as of 2026-09-28)
Superserve sells Firecracker-VM sandboxes for long-horizon agents on a single pay-as-you-go card. Its per-second rates
are identical to E2B's: allocated vCPU and allocated RAM while the sandbox is active, and nothing for compute while it is paused.
There are no plan tiers, no fees and no creation charges. The regimes that matter are lifecycle regimes: active vs paused, auto-pause, auto-delete.
Two further factors change the bill: the **4 vCPU / 4 GiB per-sandbox ceiling**, and storage, which is listed on the pricing page but not billed today.
Base rates (public billing API, effective 2026-06-17): vCPU $0.000014/s = **$0.0504/h**; RAM $0.0000045/GiB-s =
**$0.0162/GiB-h**; storage $0.00000003/GiB-s = $0.000108/GiB-h (≈ $0.0788/GiB-month), **flagged billable:false**.
4 vCPU / 4 GiB (max shape) = **$0.2664/h**; 4 vCPU / 8 GiB would be $0.3312/h if support raised the limit.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Pay-as-you-go | Default for all teams | No fee, no card to start. Per-second allocated vCPU + RAM while `active` | $0.0504 vCPU-h, $0.0162 GiB-h | https://superserve.ai/pricing, https://api.superserve.ai/billing/pricing/public |
| Signup / activation credit | New user | $5 trial grant at team creation plus a $95 bonus on Stripe checkout (card added), one per user. **From vendor source code, not the pricing page** | $100 one-time total | https://github.com/superserve-ai/sandbox/pull/454 (merged 2026-09-25) |
| Startup program | Early-stage startups, by application | Credits | up to $50k | https://superserve.ai/pricing |
| Enterprise | On-prem deployment and dedicated support | Contact sales | unpublished | https://superserve.ai/pricing |
| Active | `active` state | Allocated vCPU + RAM per second, whatever the utilisation | as above | https://docs.superserve.ai/sandbox/lifecycle |
| Paused | `pause()`, or auto-pause | Full VM (memory+processes+disk) checkpointed. No compute. Pricing page: "billed only for storage". Billing API: storage **tracked-only, not billable** | list $0.000108/GiB-h; actual $0 today | pricing page; https://docs.superserve.ai/api-reference/billing/get-timezone-aware-billing-usage-chart-buckets |
| Auto-pause (`timeoutSeconds`) | Opt-in, 1 s–7 d of **active time** (not idle time) | Pauses after N active seconds, re-armed on resume. Off by default | — | lifecycle docs, OpenAPI |
| Auto-delete (`autoDeleteSeconds`) | Opt-in, max 30 days of continuous pause | Deletes the paused sandbox. By default paused sandboxes are kept **forever** | — | lifecycle docs |
| Named snapshots / fork | `snapshot`, `fromSnapshot` | Memory+disk snapshot that outlives the sandbox. Each fork is a new active sandbox at full rate. Snapshot storage falls under the (currently unbilled) storage meter | list $0.0788/GiB-mo | API reference |
| Per-sandbox shape | Fixed per template | 1–4 vCPU, 256–4096 MiB, 1–8 GiB disk platform ceiling. **New teams capped at 2 vCPU / 2 GiB** until support raises it | — | https://docs.superserve.ai/templates/build-spec |
| Concurrency | Per-team active-sandbox limit | 429 `too_many_sandboxes`; value unpublished; paused sandboxes free a slot | null | https://docs.superserve.ai/errors |
| Egress / IPv4 | — | No network meter in the rate card (only vcpu, memory_gib, storage_gib). No public IPv4; HTTPS preview URLs | null | billing API |
Dated: current rates effective **2026-06-17** (billing API).
## Gotchas
1. **You can't self-serve 4 vCPU / 8 GiB.** The platform ceiling is 4 GiB RAM per sandbox, and new teams get 2 vCPU / 2 GiB. The OpenAPI schema accepts up to 10 vCPU / 20 GiB / 64 GiB disk, which suggests support can raise it (unverified).
2. **Storage is listed but not billed (today).** The pricing page says paused sandboxes pay storage, but the live billing API marks storage `billable:false` and the docs call it "tracked-only". Expect this to switch on without a rate change. Budget $0.0788/GiB-month.
3. **No idle auto-pause.** `timeoutSeconds` counts *active* time, is off by default, and an idle-but-running sandbox bills its full allocation. Always set a timeout.
4. **Paused sandboxes live forever** unless `autoDeleteSeconds` is set. That is free now, but will cost money once storage becomes billable.
5. **Same rates as E2B**, but no $150 plan fee and no concurrency add-ons (limit unpublished; ask support).
6. The free credit amount is not published on the pricing page. The $5 + $95 figures come from Superserve's own GitHub code.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots,
100 GiB egress; paused between shifts.
| Regime | Feasible? | Monthly total |
|---|---|---|
| PAYG at the 4 vCPU / 4 GiB ceiling | Yes, if the team cap is raised from 2/2 and the active-sandbox limit allows 50 | 8,800 × 0.2664 = **$2,344.32** (+ $3.94 snapshots at list, $0 today) |
| PAYG at 4 vCPU / 8 GiB (support-raised limit) | Only with support | 8,800 × 0.3312 = **$2,914.56** (+ $3.94 snapshots at list) |
| Paused state at list price | Would apply if storage became billable | 50 × (4 GiB RAM + 8 GiB disk) × 554 paused h × $0.000108 ≈ **+$35.90** |
| CPU at 30% | — | no effect (allocation billing) |
| Egress 100 GiB | — | not metered / unpublished (null) |
| First month | $100 signup + activation credit | −$100 one-time |
| Anti-pattern: never paused (auto-pause off by default), 24 h/day at 4/4 | Yes | 50 × 24 × 22 × 0.2664 = **$7,032.96** |