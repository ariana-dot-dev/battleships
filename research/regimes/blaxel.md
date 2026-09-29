# Blaxel — pricing regimes (as of 2026-09-28)
Blaxel (acquired by Baseten, announced 2026-09-10; "Blaxel will continue to operate and its product does not change") sells one
Pay-as-you-go plan plus a Custom/enterprise plan. **There is no CPU price.** Everything is metered in GB of *allocated* RAM × seconds of
*active* time; CPU cores are derived from memory (2 GB→1, 4 GB→2, 8 GB→4, 16 GB→6 cores). "Active" means "has an active connection",
**not** CPU utilisation. Idle sandboxes drop to standby (~15 s per docs, "~5 s" per marketing) and then pay only snapshot storage.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Sandbox — active | Sandbox has an open connection / keepAlive process / WS/TCP not idle >15 min | Allocated RAM GB × active seconds; CPU bundled (not charged) | $0.0000115/GB-s = **$0.0414/GB-h**; 2 GB (1 core) $0.0828/h, 4 GB (2) $0.1656/h, 8 GB (4) $0.3312/h, 16 GB (6) $0.6624/h | https://blaxel.ai/pricing ; https://docs.blaxel.ai/Sandboxes/Overview |
| Sandbox — standby (auto scale-to-zero) | No active connection for ~15 s; full memory+FS+process snapshot, ~25 ms resume | $0 compute; snapshot storage only | $0.20/GB-month (~$0.000274/GB-h). Vendor example: "a 2 GB sandbox in standby for one entire month would cost $0.40" ⇒ snapshot billed ≈ allocated memory size | https://blaxel.ai/pricing ; https://blaxel.ai/blog/persistent-ai-sandboxes-blaxel |
| Sandbox — archived (private preview, feature flag) | Explicit `archive()`; memory dropped, only FS diff over image kept, processes restarted on unarchive | Snapshot-storage billing stops; archive storage price **not published** | null | https://docs.blaxel.ai/Sandboxes/Archive ; Sandboxes/Overview "Archived mode" |
| Sandbox — deleted / TTL-expired | Expiration policy (ttl, ttl-idle, ttl-max-age, date) or forced tier TTL | Nothing (manual snapshots survive deletion and keep billing) | Tier 0 max TTL 7 d, Tier 1 30 d, Tier 2+ unlimited | https://docs.blaxel.ai/Sandboxes/Expiration |
| Manual snapshots / fork (Carbon = Mark 3.1, private preview) | `snapshot()` / fork | Snapshot storage; never expire; count against snapshot quota | $0.20/GB-month (assumed same "Snapshots storage" line) | https://docs.blaxel.ai/Sandboxes/Fork ; /Infrastructure/Gens |
| Batch Jobs | Workload run as a Job (max 24 h/task, ~30 s boot, no standby/state) | "Active compute across every task in a job, billed by the memory it uses" | $0.000006/GB-s = **$0.0216/GB-h** (−47.8 % vs sandbox) | https://blaxel.ai/pricing |
| MCP hosting | Workload run as an MCP server (max 10 min per request) | Memory-based active compute | $0.000007/GB-s = $0.0252/GB-h | https://blaxel.ai/pricing |
| Agent Runtime | Long-running agent sessions | "Coming soon" | null | https://blaxel.ai/pricing |
| Images | Every stored template/deployment image (billed to *source* workspace even if shared) | GB-month | $0.045/GB-month (charged since 2025-12-01) | https://blaxel.ai/pricing ; changelog 2025-10-21 |
| Volumes | Block volume attached at creation (single-attach, cannot detach) | **Provisioned** size, for as long as it exists, regardless of data written | $0.12/GB-month | https://blaxel.ai/pricing |
| Agent Drive (private preview, us-was-1) | Shared RWX FUSE FS | Free during beta | $0 (beta) | https://blaxel.ai/pricing |
| Network | Internet egress, internal traffic, LLM gateway | Included | $0/GB; dedicated egress IPs, egress gateway runtime, proxy data: free during beta; no public inbound IPv4 offered | https://blaxel.ai/pricing |
| Wildcard custom domain | Sandbox preview URLs on *.your.domain (tier-gated) | Per domain-month (billing dimension `custom_domain_active_time_hours`) | $20/domain-month; FQDN domains "coming soon" | https://blaxel.ai/pricing ; /api-reference/billing |
| Quota Tier 0 (free) | Default; free credits only | No fee | 10 sandboxes; forced TTL ≤7 d; free accounts cannot request quota increases | https://blaxel.ai/pricing ; /Security/Quotas |
| Quota Tier 1 | ≥$20 real top-ups in trailing 30 days | Top-up = prepaid wallet credit, not a fee | 50 sandboxes; TTL ≤30 d | same |
| Quota Tier 2 | ≥$50 top-ups / 30 d | same | 200 sandboxes; unlimited standby persistence | same |
| Quota Tiers 3–8 | higher top-ups | same | **not public** ("view in console") | same |
| Quota Tier 9 | Contact | same | 100,000+ sandboxes | same |
| Custom (enterprise) | Sales | Quote; "volume pricing" | Up to 256 GB RAM/sandbox, private networking, bring-your-own-metal, custom SLA — prices null | https://blaxel.ai/pricing |
| Add-on: Email support | Opt-in | $800/month **+ 3 % of usage** | | https://blaxel.ai/pricing |
| Add-on: Dedicated support (Slack, SAML) | Opt-in; required for SAML SSO | $1,600/month **+ 10 % of usage** | | https://blaxel.ai/pricing |
| Add-on: HIPAA BAA | Opt-in | $250/month flat | | https://blaxel.ai/pricing |
| Free credits | New account | "Up to $200" one-time; promo credits do NOT count toward tier top-up volume | | https://blaxel.ai/pricing ; /Security/Quotas |
### Dated changes
- 2025-02-12: Beamlit (former name) launched plan-based pricing.
- 2025-08-01: "Launched our new usage-based pricing model" (current GB-s model). Third-party pages still cite the older named sizes XS (2 GB, $0.0828/h) … XL (32 GB, $1.3248/h) — same $0.0414/GB-h slope.
- 2025-11-07: started charging snapshot and volume storage (previously free). 2025-12-01: started charging image storage.
- 2026-09-10: Baseten acquisition; no price change announced.
## Gotchas
1. **CPU utilisation is irrelevant; connection state is everything.** A sandbox at 1 % CPU with an open WebSocket pays 100 % of RAM rate; an idle WS/TCP connection keeps billing for up to 15 min before forced standby. keepAlive processes (timeout 0 = forever) keep it billing indefinitely.
2. **Tail billing on every session:** ~15 s (docs) of active billing after the last connection closes before standby. Minimum billed duration per resume is not documented.
3. **CPU is capped by memory:** you cannot buy 4 vCPU with 2 GB. 4 vCPU requires 8 GB; 6 cores requires 16 GB. Above 16 GB the core count is undocumented; 256 GB only on Custom.
4. **Writable disk lives in RAM** (tmpfs ≈ 50 % of memory). Needing more disk means either more RAM (billed per second active) or a Volume billed on provisioned size forever.
5. **Standby is not free**: snapshot ≈ allocated memory (vendor: 2 GB standby month = $0.40). 50 persistent 8 GB sandboxes idle all month ≈ 400 GB × $0.20 = $80/month.
6. **Sandbox quota counts standby sandboxes too** ("keeping inactive sandboxes in standby … counts against your quota limits"). A persistent fleet of 50 sits exactly at the Tier 1 cap; any extra forces Tier 2. There's also an account-wide memory quota per tier (QUOTA_EXCEEDED "maximum memory limit for the account"), values unpublished.
7. **Tiers are a rolling 30-day top-up volume**, not balance. Stop topping up and you are downgraded even with a large wallet balance, which may block creation. Promo/startup credits never unlock tiers.
8. **Tier 0/1 force TTL deletion** (7/30 d): "perpetual standby" really requires Tier 2 (≥$50/mo top-ups).
9. **Support add-ons are percent-of-usage surcharges** (3 % / 10 %) on top of the flat fee — SAML SSO is only via the $1,600 + 10 % add-on.
10. Batch Jobs are 48 % cheaper per GB-s than sandboxes for the same microVMs, but have no standby/state and 24 h max.
11. Manual snapshots outlive their sandbox and never expire, so they bill until deleted.
12. Archive storage rate unpublished; archive is private-preview only (403 without flag).
## Worked example
Workload: 4 vCPU / 8 GiB → Blaxel 8 GB sandbox (= 4 cores, exact fit). 50 concurrent × 8 h/day × 22 days = 8,800 sandbox-hours.
30 % CPU util (irrelevant to billing). 50 GiB snapshots retained. 100 GiB egress (free). Tier 1 needed for 50 concurrent (the $20 top-up is
consumed by usage, so adds $0). Image storage excluded (image size unknown; $0.045/GB-month).
| Regime | Compute | Storage | Egress | Add-on | **Monthly total** |
|---|---|---|---|---|---|
| A. Sandbox, connection held for whole 8 h session (Tier 1) | 8,800 × $0.3312 = $2,914.56 | 50 × $0.20 = $10.00 | $0 | — | **$2,924.56** |
| B. Sandbox, aggressive scale-to-zero — *illustrative*: only 30 % of session wall time has an active connection (2,640 h) | $874.37 | $10.00 | $0 | — | **$884.37** |
| C. Persistent fleet: 50 sandboxes never deleted, standby 554 h/month each at ~8 GB snapshot (instead of 50 GiB) | $2,914.56 | 400 × $0.20 × 554/730 = $60.71 | $0 | — | **$2,975.27** (needs Tier 2 for >30 d retention; top-up absorbed) |
| D. Batch Jobs (non-interactive; RAM billed as allocated 8 GB — upper bound) + 50 GB volume for retained state | 8,800 × 8 × $0.0216 = $1,520.64 | 50 × $0.12 = $6.00 | $0 | — | **$1,526.64** |
| E. MCP hosting rate (for reference only; 10-min request cap makes it unfit) | 8,800 × 8 × $0.0252 = $1,774.08 | $10.00 | $0 | — | $1,784.08 |
| F. A + Email support | $2,914.56 | $10.00 | $0 | $800 + 3 % × $2,924.56 = $887.74 | **$3,812.30** |
| G. A + Dedicated support (needed for SAML) | $2,914.56 | $10.00 | $0 | $1,600 + 10 % = $1,892.46 | **$4,817.02** |
| H. A + HIPAA BAA | $2,914.56 | $10.00 | $0 | $250 | **$3,174.56** |
| I. Custom / enterprise | quote (volume pricing) | | | | null |
Free "up to $200" one-time credit would reduce month 1 by ≤$200 (does not count toward tier).