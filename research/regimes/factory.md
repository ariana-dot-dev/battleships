# Factory Droid Computers and agent usage
As of 2026-09-28. Category: `agent-platform`. USD list prices unless explicitly labelled otherwise.
| Regime | Unit / applies | Price | Compute / cap | Source |
|---|---|---|---|---|
| Pro / Plus / Max | Individual subscription, rolling model usage | $20 / $100 / $200 monthly; Plus ~5× Pro, Max ~10× | Managed computers explicitly included in Plus/Max on plan docs | [Plans](https://docs.factory.ai/pricing/individuals), [pricing](https://factory.ai/pricing) |
| Teams | Team base + seat | $60/team/month + $40/seat/month | Up to 10 seats; indexed pricing snapshot lists 10 shared computer-hours/month; direct live fetch omitted this line, so entitlement unconfirmed | [Pricing](https://factory.ai/pricing), [organizations](https://docs.factory.ai/pricing/organizations) |
| Extra Usage | USD-denominated prepaid credits | Minimum $10 purchase; no expiry | Models and compute draw usage; separate compute $/hour not established | [Individual usage](https://docs.factory.ai/pricing/individuals) |
| Business / Enterprise | Negotiated | null, sales | Custom limits / deployment | [Organizations](https://docs.factory.ai/pricing/organizations) |
## Compute / caps
Factory-managed Droid Computer: **4 CPU, 8 GB RAM, 6 GB swap**, sudo-enabled user, persistent setup, automatic pause/resume. Swap is not RAM. Disk allocation, concurrency, maximum lifetime and overage computer-hour tariff null. Bring-your-own-machine is distinct and doesn't include free external hosting. [Droid Computers](https://docs.factory.ai/droid-computers/overview)
## Gotchas
Three independent rolling limits (5h, 7d, 30d) are model-usage windows, not VM session lengths. Sessions consume model-based Standard Credits and computer usage. Extra Usage or the separately limited Core model pool can extend usage; Missions have their own requirements. Current changelog mentions Pro computers with five hours/month, conflicting with plan-page gating; treat Pro compute entitlement as pending confirmation, not a reason to silently price unlimited Pro compute. [Changelog](https://docs.factory.ai/changelog/release-notes)
## Worked examples
A two-seat Teams base is $140/month; any included ten shared hours are far below 352 worker-hours. Standard 8,800-hour 4/8 workload matches the published shape, but cost cannot be computed without compute overage tariff and concurrency/allowance confirmation. A Plus developer's $100 is not a promise of 176 free computer-hours. 50 GiB snapshots and 100 GiB egress remain unpriced. Regime-only rather than a fabricated $/vCPU rate.