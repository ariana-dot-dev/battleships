# Islo (islo.dev, by Incredibuild) — pricing regimes
As of 2026-09-28. Islo launched on 2026-05-04 (PR Newswire). The public price list is short: three meters, and they apply only while a sandbox runs. Most of the nuance is in the plan tiers (these appear only in press coverage), the AWS Marketplace package, and what a paused or stopped sandbox is billed for.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | **Team / pay-as-you-go (list)** | Default for a sandbox that is running | Per vCPU **allocated** ("per core while the env runs"), RAM **provisioned**, disk **provisioned**. CPU utilisation has no effect on the bill. | $0.07/vCPU-h, $0.04/GB-h RAM, $0.0007/GB-h disk (= $0.511/GB-month). A 4 vCPU/8 GB sandbox costs $0.60/h before disk. | https://islo.dev/pricing |
| 2 | **Free plan** | Signup ("credits to start, no card required") | Draws down a signup credit balance, held in cents (`balance_cents`, USD) | Credit amount not published. Up to **5 concurrent sandboxes** (press coverage). | https://islo.dev/pricing ; https://docs.islo.dev/api-reference/credits/get-credit-balance.md ; The New Stack launch article (seen only as a search-index snippet) |
| 3 | **Team plan concurrency cap** | Paid pay-as-you-go | Same rates as #1 | Up to **50 concurrent** running sandboxes (press coverage). Paused sandboxes do **not** count against the running-sandbox quota. | The New Stack (snippet) ; https://docs.islo.dev/concepts/sandbox-lifecycle.md |
| 4 | **AWS Marketplace "Team Starter Package"** | Buying through AWS Marketplace | $50/month contract that grants **$50 of monthly credits**, which usage draws down | $50/mo, 1-month recurring, **no refunds**. The listing says the credit covers "about 294 hours per month", but it does not say for which machine size (294 h × $0.60 would be $176, so it is not the 4/8 size). Overage handling and credit rollover are "not specified" in the listing. | https://aws.amazon.com/marketplace/pp/prodview-3eew6wp37ylek |
| 5 | **Enterprise / BYOC** | Custom deal, or agent computers running in the customer's own cloud/VPC | FAQ: "You still pay for compute time. BYOC deployment terms may vary." | No numbers published. It is unclear whether BYOC bills Islo's list rates on top of the customer's own cloud bill. | https://islo.dev/pricing (FAQ) ; https://islo.dev/solutions/enterprise |
| 6 | **Idle-but-running** | The sandbox is up but doing nothing, before `pause_after_idle` fires, or with no lifecycle policy at all | **Full rate #1**. There is no idle discount, and billing is on allocation. | $0.60/h for 4/8, plus disk | https://docs.islo.dev/concepts/sandbox-lifecycle.md |
| 7 | **Paused** (`islo pause` or the lifecycle timers) | The VM snapshots memory and filesystem, then releases compute | CPU and RAM are $0. Disk and snapshot billing is **not documented**. The pricing page says "No charge when stopped" and "no idle fees", but it also lists storage as a per-GB-hour meter. | $0 compute. Storage is either $0 or $0.0007/GB-h (unconfirmed). | https://islo.dev/pricing ; https://docs.islo.dev/cli/sandbox-commands.md |
| 8 | **Stopped** (`islo stop`: halted, still in the list) | Distinct from pause: the VM is halted, no memory state is kept, and the filesystem stays | FAQ: "No charge when stopped." Whether the disk meter keeps running is unconfirmed. | $0 compute. Storage unknown. | https://islo.dev/pricing (FAQ) |
| 9 | **Named snapshots** (`islo snapshot save`) | Filesystem image, used to restore into new sandboxes and fan out | Not priced anywhere. Snapshot sizes are reported (for example 2.1 GB). | null | https://docs.islo.dev/cli/snapshots.md |
| 10 | **Harbor promo** | Harbor (Terminal-Bench / RL) users who enter promo code `HARBOR250` in Billing | One-time credit | **$250** | https://docs.islo.dev/integrations/harbor.md |
| 11 | **Gateway inference** | Calls to Islo-managed LLMs via gateway.islo.dev (OpenAI- and Anthropic-compatible endpoints) | Drawn "from credits". This is a separate token meter, not compute. | Per-token prices not published | https://docs.islo.dev/concepts/gateway-inference.md ; github.com/islo-labs/skills |
| 12 | **Per-task cost limits** | Optional spend cap per run or task | Hard stop, not a price | The limit is set by the user | https://islo.dev/pricing (FAQ "Can I cap spend per run?") |
| — | Egress / IPv4 / region | — | Not published. There is no public IPv4 product: shares are HTTPS only, and non-HTTP access goes through a CLI tunnel. The only region seen is `us-west`. | null | — |
## Gotchas
- **CPU is billed on allocation.** "Per core while the env runs" means a sandbox at 30% utilisation pays the same as one at 100%. There is no active-CPU billing.
- **RAM is expensive at $0.04/GB-h.** That is roughly 2.5× E2B's $0.0162, so RAM is more than half the bill for a 1:2 vCPU:GB shape (4/8: $0.32 of the $0.60/h).
- **Disk is billed per provisioned GB from the first GB.** No free allowance is stated. $0.511/GB-month is about 6× typical block storage. If paused or stopped disk turns out to be billed, long-lived paused workspaces add up.
- **"No charge when stopped" conflicts with the listed storage meter.** Whether disk is billed while paused or stopped is unresolved.
- **Granularity is unknown.** The page says "billed per hour" and "per vCPU-hour", and per-second metering is never confirmed. If Islo rounds each start up to the hour, short sandboxes cost a full hour.
- **Team caps at 50 concurrent sandboxes, which is exactly the size of the worked example.** The Free plan caps at 5. Both numbers come only from press coverage; none of Islo's own pages publish plan tiers.
- **Lifecycle policy is immutable after creation.** If you forget `pause_after_idle`, the sandbox bills at full rate until you delete it. `pause_after` is a hard cap per active stretch, not per lifetime.
- **Resuming a heavy paused sandbox can take 5–7 minutes** while "archival state settles" (third-party agentbox provider README). Large images (about 1.3 GB compressed) are rejected with a 503.
- **The AWS Marketplace package has no refunds and does not specify overage.** Its "294 hours" figure does not match any size at list rates, and may be boilerplate carried over from Incredibuild's build-acceleration product.
- No startup-program numbers are published (the /solutions/startups page has none).
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent sandboxes × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU utilisation, 50 GiB of snapshots retained, 100 GiB egress.
Assumptions: disk is 10 GB per sandbox (the default in the docs' islo.yaml), and sandboxes are paused (not left running) outside working hours.
| Regime | Compute | Running disk | Snapshots 50 GiB | Egress 100 GiB | **Monthly total** |
|---|---|---|---|---|---|
| Team PAYG (list) | 8,800 × $0.60 = $5,280.00 (30% utilisation gives no discount) | 50×10 GB × 176 h × $0.0007 = $61.60 | $0 (if paused storage is free) to $25.55 (at $0.511/GB-mo) | unknown (not published) | **$5,341.60 – $5,367.15** + egress |
| Team PAYG + paused workspaces kept all month | as above | as above | + 50×10 GB × 554 off-hours × $0.0007 = $193.90, only if paused disk is billed | unknown | up to **$5,561.05** + egress |
| No pause policy (left running 24/7) | 50 × 730 × $0.60 = $21,900.00 | $255.50 | $0–25.55 | unknown | **$22,155.50 – $22,181.05** |
| AWS Marketplace Starter ($50/mo credit) | The $50 is consumed within about 83 h of 4/8. After that, the price depends on overage handling, which is unspecified. | | | | **≥ $5,341.60** if overage is billed at list (the $50 fee is absorbed as credit) |
| Free plan | Not feasible: capped at 5 concurrent (would need 10× the wall-clock time), and the credit amount is unknown | | | | n/a |
| Enterprise / BYOC | custom (null) | | | | null |
| One-time Harbor promo | −$250 in the first month only | | | | $5,091.60 – $5,117.15 in month 1 |
Normalised rate: 4 vCPU/8 GiB = **$0.60/h** (+ $0.007/h for 10 GB of disk).