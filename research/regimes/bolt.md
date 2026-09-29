# Bolt: token subscription and browser/hosting compute
As of 2026-09-28. Category: `agent-platform`. USD list prices unless explicitly labelled otherwise.
| Regime | When / unit | Published numbers | Source |
|---|---|---|---|
| Free | Monthly/daily AI-token allowance | $0; 1M/month, 300k/day; 10 MB uploads; up to 333k web requests | [Pricing](https://bolt.new/pricing) |
| Pro | Per subscriber/month | $25 monthly starting at 10M tokens; no daily token limit; 100 MB uploads; up to 1M web requests | [Pricing](https://bolt.new/pricing) |
| Teams | Per member/month | $30 monthly starting tier; separate member token allowances, not pooled | [Pricing](https://bolt.new/pricing) |
| Extra tokens / enterprise | Reload / contract | Reload prices vary by tier, numeric rate null here; Enterprise custom | [Tokens](https://support.bolt.new/faqs/account-and-subscription/tokens) |
## Compute and caps
Token consumption includes project context and generated changes, not VM runtime. Bolt's in-browser development and website hosting/database entitlements must not be represented as 4-vCPU server rentals. Exact hosted builder vCPU/RAM/disk and concurrency/lifetime guarantee are null. Plan features advertise databases and hosting but backend usage limits still apply. [Introduction](https://support.bolt.new/building/intro-bolt)
## Gotchas / examples
Subscription tokens roll for one additional month (up to two months total) and need an active subscription. Team tokens are per user. Bolt Forge inclusion through October 14 is a **temporary promotion**, not permanent free compute. [Pricing](https://bolt.new/pricing)
One developer on entry Pro spends $25 for its allowance; 50 entry Teams seats cost **$1,500/month base**, not 50×8×22 hours of guaranteed server compute. Tokens per task are unknown, so overage and all-in cost remain null. 10M included tokens do not imply a model-independent API tariff or an exchange rate to CPU-hours. Website requests are not agent sessions; uploads aren't snapshots. Standard 50-GiB snapshot and 100-GiB egress price cannot be derived. Regime-only.