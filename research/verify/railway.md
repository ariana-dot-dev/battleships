# Verify: railway (2026-09-28)
Re-fetched: https://railway.com/pricing (raw HTML), https://docs.railway.com/pricing/plans.md, /sandboxes.md, /cloud-agents.md,
/pricing/committed-spend.md, /pricing/free-trial.md, /volumes/reference.md, /deployments/serverless.md, /storage-buckets/billing.md,
https://railway.com/changelog/2026-09-18-railway-sandboxes, docs /pricing/understanding-your-bill (via search snippet).
| Item | Result |
|---|---|
| VM rates: CPU & RAM $0.00001929/s = $0.069444/h (~$50/mo on a 30-day month); docs $0.001157/min | confirmed (pricing page, plans.md, sandboxes.md) |
| VM CPU on measured use; RAM on memory in use incl. OS + filesystem cache; RAM billable while waiting | confirmed (plans.md "VM pricing", sandboxes.md) |
| Pricing page "never for the time it spends waiting" vs docs contradiction | confirmed (both quotes still live) |
| Container rates $0.00000772/vCPU-s = $0.027792/h, $0.00000386/GB-s = $0.013896/h (docs $20/$10 per month, per-minute quotes) | confirmed |
| VM vs container ratio 2.5x CPU, 5x RAM | confirmed (arithmetic) |
| Egress $0.05/GB, no free allowance; buckets $0.015/GB-mo, free ops + bucket egress | confirmed |
| Volumes $0.15/GB-mo on used bytes, 2-3% metadata, services only | confirmed (volumes reference; pricing $0.00000006/GB-s) |
| Volume caps Free/Trial 0.5, Hobby 5, Pro 1 TB, Ent 5 TB | corrected (regimes): Pro is 50 GB default, self-serve resize to 1 TB (volumes reference) |
| Sandboxes per environment 10/10/50/100, Enterprise starts at 100, raisable; per environment | confirmed (sandboxes.md, pricing table) |
| Sandbox default/max size Trial+Free 2/2; Hobby 4/4 -> 8/8; Pro 8/8 -> 32/32; fractional vCPU | confirmed |
| Idle timeout Hobby/Pro default 30 min, 1-120, 0 = never; Trial/Free 5 min (1-5), can't disable; destroys not pauses; forks don't inherit | confirmed |
| Checkpoints: disk snapshot, count = plan sandbox limit, storage price unpublished | confirmed (no price in any page) |
| Sandboxes GA ~2026-09-17 on every plan | confirmed (changelog) |
| Cloud Agents: Trial/Free 2/1, Hobby 2/2, Pro+Ent 4/4; 25 creations/user/day; bills while awake, sleep stops compute, keeps disk; disk price unstated | confirmed (cloud-agents.md) |
| Free VM (ssh railway.new) 2 vCPU/2 GB, 60 min, 24 h claim | confirmed; added "3 boxes per IP per day" (free-trial.md) |
| Plans Free $0 + $1/mo credit (no rollover), Hobby $5, Pro $20, fee = included usage (pay max(fee, usage)) -> fee_is_credit true | confirmed (plans.md "Included usage" examples) |
| Trial $5 one-time, 30 days, carries over on upgrade; limited trial restricted network | confirmed (free-trial.md) |
| Hobby fee waiver for active builders, automatic | confirmed |
| Post-paid card required since March 30; credit balance 0 -> subscription cancelled, workloads stop | confirmed (plans.md FAQ) |
| Invoices under $0.50 "marked paid" | corrected (clarified): marked paid but amount carried as debit to a future invoice (docs understanding-your-bill) |
| Service limits: Free 1 vCPU/0.5 GB; Trial 2 vCPU/1 GB; per-replica Hobby 8/8, Pro 24/24, Ent 48/48; 2,400 vCPU/2.4 TB per service | confirmed. Note: pricing page header says Hobby "Up to 5 replicas", its table and docs say 6 (Railway-side conflict, not modelled) |
| Committed spend $1k/$2k/$5k/$10k, shortfall invoiced, no rate discount, Pro only; HIPAA needs 1-yr term | confirmed (committed-spend.md) |
| Committed spend feature grouping | confirmed per docs; noted conflict: railway.com/pricing puts log history at $2k and adds cloud regions at $5k (card caveat + regimes row 6) |
| Serverless: sleep 5-10 min after last outbound packet, 502 on first request, private traffic counts | confirmed |
| Bucket Free/Trial "10/50 GB-mo free" | corrected (regimes + card caveat): these are caps that count against the $1 / trial credit, not free extra |
| Enterprise: dedicated VMs, BYOC, SSO, HIPAA, custom price | confirmed (pricing page) |
| Static outbound IPs price unpublished; no dedicated inbound IPv4 | unverifiable in this pass (page not re-fetched); left as is |
| Legacy GCP egress $0.10 / disk $0.25 | unverifiable (historical, railway-metal doc not re-fetched) |
| Regions us/eu/asia, no region multipliers | unverifiable in this pass |
| Worked example: $733.33, $4,888.86, ≈$5,627; idle tail +$305.55 ≈$5,933; 4 GiB ≈$3,183; services $293.48 + $978.28 + $7.50 + $5 ≈$1,284; cloud agents ≈$3,183; legacy ≈$1,294 | confirmed (recomputed) |
Card numbers: no rate/fee/limit changes needed. JSON re-parsed OK.