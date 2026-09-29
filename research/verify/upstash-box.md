# Verify: upstash-box (2026-09-28)
https://upstash.com/docs/box/overall/pricing, https://upstash.com/docs/box/overall/how-it-works,
https://upstash.com/blog/ai-agent-sandbox-providers-compared-2026
| Item | Result |
|---|---|
| Sizes Small 2 vCPU/4 GB/5 GB, Medium 4/8/10, Large 8/16/20 | confirmed (pricing/box.md, docs how-it-works) |
| PAYG $0.1 / $0.2 / $0.4 "per active CPU hour" by size | confirmed (box.md table, box.ts `cpuHourPrice`) |
| Billed in core-hours; FAQ "100% of 2 cores for one hour costs $0.2, 10% of a single core ... $0.01" | confirmed verbatim |
| Reading A (per-core rate rises with size: Medium full load $0.80/h) | unverifiable. Every official worked example uses the Small rate; blog lists "$0.10/$0.20/$0.40 per active CPU-hour for small (2 vCPU), medium (4), large (8)". Card keeps reading A with alternative readings in caveats (already there) |
| RAM not billed | confirmed (no RAM price anywhere; blog "memory remaining free") |
| Idle running box $0 CPU; paused = storage only | confirmed (FAQ, docs lifecycle) |
| Idle timeout Free 1 h, PAYG 6 h, Keep-alive never | confirmed (pricing/box plan table) |
| Keep-alive $8 / $16 / $32 per box per month, covers CPU + storage, "only charge for that box" | confirmed (FAQ, box.md Fixed section, box.ts) |
| Keep-alive enabled per box on PAYG account, shares 1,000 concurrency + $100 LLM budget | confirmed (box.md) |
| Storage $0.10/GB-month incl. snapshots; limits 5/10/20 GB | confirmed (FAQ) |
| Free: $0, 10 concurrent, 5 CPU h/month, $1 LLM, API 400 after | confirmed; "5 GB included" storage on Free confirmed |
| PAYG 1,000 concurrent soft limit, $100 LLM, BYOK | confirmed |
| Region AWS us-east-1 only | confirmed |
| Custom Docker "coming soon" | confirmed |
| Egress price | unverifiable (not published) - null kept |
| Granularity / minimum billed | unverifiable (not published) - null kept |
| Keep-alive proration, fair use | unverifiable |
| Engine note (not changed) | For the worked example (4 vCPU/8 GiB, 50 concurrent) the engine picks the "Keep-Alive Small fleet" pool (100 x Small, $800): pricePool ignores the per-box max_vcpu, so a 4-vCPU session is "spread" over two Small boxes, which is impossible. The dollar figure is still right because all keep-alive sizes cost exactly $4/vCPU-month ($800 = 50 x Medium), only the label is wrong. The engine also adds $12 of PAYG storage although keep-alive includes storage. Left as-is; flag for an engine fix (pool modes should honour mode max_vcpu). |
| Free plan modeled as plan with fee 0 + included_usd 0.5 | **corrected** (engine semantics): the Free tier is a hard cap (usage blocked, not billed), but the engine would pick it as "PAYG minus $0.50" for any 2-vCPU workload with <=10 concurrency. Added `trial_only: true` so it is never auto-picked. |