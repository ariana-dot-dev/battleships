# GitHub Codespaces — pricing regimes (as of 2026-09-28)
Codespaces is a cloud dev environment, not an API sandbox. Each codespace is a dev container on its own Azure VM.
There is one compute rate card: fixed machine types priced linearly at **$0.09 per core-hour** (RAM 4 GB/core, not
priced separately), plus **$0.07/GB-month** storage metered on used space. Prices are identical in every region
and for every payer. What changes the bill is *who pays* (personal quota vs org), how sessions end (idle-timeout
tail), how long stopped codespaces and prebuilds are retained, and seat fees for the GitHub plan the org is on.
4 vCPU / 8 GiB → no such shape; closest is **4-core / 16 GB = $0.36/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Pay-as-you-go machine types | Any billed codespace | Per active hour per machine type (active = created/started until stopped, deleted or idle-timed-out), regardless of CPU use; usage reported hourly, billed monthly; exact rounding unpublished | 2-core $0.18, 4-core $0.36, 8-core $0.72, 16-core $1.44, 32-core $2.88 per hour; "included usage multiplier" = cores | https://docs.github.com/en/billing/concepts/product-billing/github-codespaces |
| Machine specs | Choice at create / change later | Fixed presets, 4 GB RAM per core | 2c/8 GB/32 GB … 32c/128 GB/128 GB (official); 4c/16 GB/32 GB and 8c/32 GB/64 GB disk per community thread (**third-party**); a 4c/64 GB variant also exists; 16c disk unpublished | https://docs.github.com/en/codespaces/about-codespaces/what-are-codespaces, https://github.com/orgs/community/discussions/145944 |
| Personal free quota (GitHub Free) | Codespaces billed to a personal account | Monthly quota in **core-hours**, resets each cycle; blocked when exhausted unless a payment method is on file | 120 core-hours (= 60 h 2-core / 30 h 4-core, $10.80) + 15 GB-month ($1.05) | billing doc, https://docs.github.com/en/get-started/learning-about-github/githubs-plans |
| Personal free quota (GitHub Pro) | Personal account on Pro | Same mechanics | 180 core-hours ($16.20) + 20 GB-month ($1.40); Pro subscription price **not on live official pages** ($4/mo is prior research / third-party) | same |
| Personal overage | Quota used + payment method | List price, capped by any budget the user set (stop-usage option blocks create/resume) | list rates | https://docs.github.com/en/billing/how-tos/set-up-budgets |
| Org-owned, GitHub Team | Org chose organization-owned codespaces, user enabled | No free quota; org pays list rates; pays only if no Codespaces budget or a non-zero one | $4/user/month "for the first 12 months *" (footnoted later price not captured) + usage | https://github.com/pricing, https://docs.github.com/en/codespaces/managing-codespaces-for-your-organization/choosing-who-owns-and-pays-for-codespaces-in-your-organization |
| Org-owned, Enterprise Cloud | Same, enterprise account | Same list rates; enterprise/cost-center budgets, SSO, audit logs | "Starting at $21/user/month for the first 12 months *"; volume discounts via sales, unpublished | https://github.com/pricing |
| Org on GitHub Free | Free org | Org **cannot** pay; creator pays personally (uses their personal quota) | "$0 spend limit" | pricing page, who-pays doc |
| User-owned in an org | Org sets user-owned, or user not enabled | Creator pays from personal quota/card | list rates | who-pays doc |
| Idle tail | Codespace not stopped explicitly | Full compute rate until idle timeout; typing, mouse and **terminal output** reset the timer | default 30 min; 5–240 min; org can set a max | https://docs.github.com/en/codespaces/setting-your-user-preferences/setting-your-timeout-period-for-github-codespaces |
| Stopped codespace storage | Codespace exists but stopped | $0.07/GB-month in GB-hours of **used** space (repo, data, extensions, custom image); default universal image free; month-to-date storage never decreases | $0.07/GB-month | billing doc, included-usage doc |
| Retention / auto-delete | Stopped codespaces | Auto-deleted after retention; "Keep codespace" = indefinite (storage keeps billing, not allowed under org retention policy) | default and max 30 days; 0 = delete on stop | https://docs.github.com/en/codespaces/setting-your-user-preferences/configuring-automatic-deletion-of-your-codespaces |
| Prebuilds | Prebuild configuration on a repo | GitHub Actions minutes to build (billed as Actions) + storage per prebuild **per region per retained version** | default: all regions × 2 versions (1–5); storage $0.07/GB-month | https://docs.github.com/en/codespaces/prebuilding-your-codespaces/configuring-prebuilds |
| Budgets | Any account | Monthly $ budgets per account/org/repo/cost center; optional hard stop blocks creating/resuming codespaces | alerts 75/90/100%; included-usage alerts 90/100% | https://docs.github.com/en/billing/concepts/budgets-and-alerts |
| Network | All traffic | No network charge documented (doc: "two types of charges": compute, storage) | $0 | billing doc |
| Regions | UsEast, UsWest, EuropeWest, SoutheastAsia (REST geo enum) | One global price | multiplier 1 | https://docs.github.com/en/rest/codespaces/codespaces |
| GPU | — | Not offered in current docs (older GPU machine types appear discontinued) | n/a | machine-type docs |
No upcoming price change found in the pages read (changelog history not checked).
## Gotchas
1. **Core-hours, not hours.** The free "120 hrs" is 120 *core*-hours: 30 h on a 4-core machine.
2. **No 4 vCPU / 8 GiB shape.** RAM is 4 GB/core, so a 4 vCPU workload always pays for 16 GB.
3. **Idle is billed.** A codespace bills until stopped or idle-timed-out; a served app writing to the terminal keeps resetting the timer, so it may never time out.
4. **Storage is cumulative within the month.** Deleting a codespace slows accrual but never lowers the month-to-date figure.
5. **Prebuild storage multiplies.** Default is every region × 2 versions, and prebuilds consume storage even with zero codespaces.
6. **Orgs get no free quota**, and a GitHub Free org cannot pay at all. Org billing only flows if there is no budget or a non-zero one.
7. **Personal accounts are hard-stopped** when quota runs out without a payment method (export-to-branch is the escape hatch).
8. **Seat prices are "for the first 12 months *"** on the live pricing page; the post-promo price was not captured.
9. **"Keep codespace"** disables auto-deletion and keeps the storage meter running indefinitely.
10. **Third-party-only facts:** intermediate disk sizes (community thread) and the GitHub Pro price ($4) are not on live official pages.
## Worked example
Workload: 4 vCPU / 8 GiB → **4-core/16 GB at $0.36/h**; 50 concurrent × 8 h/day × 22 days = **8,800 h**; 30% CPU
(irrelevant: billed on active time); 50 GiB retained storage; 100 GiB egress.
Compute 8,800 × $0.36 = **$3,168.00**. Default 30-min idle tail if not stopped: 1,100 sessions × 0.5 h × $0.36 =
**$198.00**. Storage 50 GB-month × $0.07 = **$3.50** (stopped codespaces must survive, retention ≥ 1 day). Egress **$0**.
| Regime | Feasible? | Monthly total |
|---|---|---|
| Org-owned, GitHub Team, stopped explicitly | Yes | **$3,371.50** = $3,168 + $3.50 + 50 × $4 seats |
| Org-owned, GitHub Team, default idle timeout | Yes | **$3,569.50** (+$198 idle tail) |
| Org-owned, Enterprise Cloud | Yes | **$4,419.50** = $3,168 + $198 + $3.50 + 50 × $21 |
| Each developer pays personally (GitHub Free) | Yes (needs card on file) | 704 core-h − 120 free = 584 × $0.09 = $52.56 + $3.96 tail per dev (1 GB-month each is inside 15 GB) → **$2,826.00** for 50 devs ($2,628 if stopped explicitly) |
| Each developer on GitHub Pro | Yes | 524 core-h × $0.09 = $47.16 + $3.96 tail per dev → **$2,556.00** + 50 × Pro fee (unpublished on live pages) |
| Anti-pattern: 240-min timeout, never stopped | Yes | +4 h/day billed: 50 × 12 × 22 × $0.36 = $4,752 compute alone |
| Anti-pattern: prebuilds in 4 regions × 2 versions of a 10 GB image | Yes | +80 GB-month ≈ +$5.60 + Actions minutes (not included above) |