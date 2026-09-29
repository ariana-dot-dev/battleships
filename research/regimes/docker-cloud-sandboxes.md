# Docker Cloud Sandboxes — pricing regimes (as of 2026-09-28)
Launched 2026-09-24. One compute rate card: five fixed sizes, all 1 vCPU : 2 GiB, priced linearly at
**$0.07 per (1 vCPU + 2 GiB)-hour**, metered per second while running. Everything else (volumes, egress, stopped
state, public images/Kits) is free. Billing sits on a separate "Docker Agentic Platform" pay-as-you-go subscription
tied to a personal Docker account. It is not part of Docker Personal/Pro/Team/Business.
4 vCPU / 8 GiB = **medium = $0.28/h** (≈ $0.035/vCPU-h + $0.0175/GiB-h if split like a 1:2 unit).
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Local Docker Sandboxes | `sbx` on your own machine | Free, incl. commercial use (no Desktop licence needed) | $0 | https://docs.docker.com/ai/sandboxes/cloud/local-vs-cloud/, forums.docker.com/t/151790 |
| Cloud PAYG (Docker Agentic Platform) | Any cloud sandbox | No recurring fee; per-second compute on the chosen size; invoiced monthly in arrears | micro 1/2 $0.07, small 2/4 $0.14 (default), medium 4/8 $0.28, large 8/16 $0.56, xl 16/32 $1.12 per hour | Docker blog (launch), https://docs.docker.com/agentic-platform/signup/ |
| Promo credit | New accounts, limited time | One-time compute credit; not usable for model inference | $250 (≈893 h of medium) | Docker blog, https://www.docker.com/c/sbx-promo/ |
| Running | Sandbox started | Allocated size, idle or busy | as above | https://docs.docker.com/agentic-platform/signup/ |
| Stopped (memory + filesystem preserved) | `sbx stop` or TTL action `stop` | "Compute isn't billed while it is stopped"; storage free; frees the concurrency slot but counts toward 50 stored sandboxes | $0 | https://docs.docker.com/ai/sandboxes/cloud/usage/, /sandboxes-api/limits/ |
| TTL expiry (default) | 1 h after creation unless renewed | Default on-timeout: **stop** if resumable, else **delete**; `restart` also available | billing continues until expiry | https://docs.docker.com/ai/sandboxes/cloud/usage/ |
| Max lifetime | Any sandbox | Renewals cannot move expiry beyond 24 h from creation | 24 h cap | same |
| Always-on sandbox | Configured always-on | Keeps its concurrency slot when "stopped"; no separate price published | null | https://docs.docker.com/ai/sandboxes-api/limits/ |
| Volumes (experimental) | Persistent data outside a sandbox | Free; snapshot saved when the sandbox exits | $0; 100 volumes/account | Docker blog, /cloud/usage/ |
| Egress / public HTTPS URL | All traffic / exposed ports | Free | $0 | Docker blog |
| Quotas | Default account | 10 concurrent, 50 stored, 100 volumes, 100 secrets, 3 image preps | raise: unpublished | https://docs.docker.com/ai/sandboxes-api/limits/ |
| AI Governance | Org-wide policies | Separate paid subscription, contact sales | null | https://docs.docker.com/ai/sandboxes/ |
| Docker Pro/Team/Business | Docker Hub/Desktop seats | $9–24/user/mo; **no** sandbox credit; not required | n/a | https://www.docker.com/products/docker-sandboxes/ |
No dated price changes (product is 4 days old).
## Gotchas
1. **The 1-hour default TTL is a billing floor if you never stop.** Sandboxes bill until explicitly stopped or until the TTL action fires.
2. **24 h hard ceiling from creation.** Long-lived agents need stop/restart cycles or re-creation.
3. **Only 10 concurrent by default**, and no published way or price to raise it.
4. Stopped state includes **memory**, and is free, so it is a cheap pause, limited only by the 50 stored-sandbox quota.
5. Being a Docker Business customer gives you nothing here: the Agentic Platform is billed separately on a personal account (no org billing documented).
6. Disk size per size tier is not published.
## Worked example
4 vCPU / 8 GiB (medium), 50 concurrent × 8 h/day × 22 days = 8,800 sandbox-hours, 30% CPU, 50 GiB snapshots, 100 GiB egress.
| Regime | Feasible? | Monthly total |
|---|---|---|
| PAYG, stopped between shifts | Only after a quota raise (default 10 concurrent) | 8,800 × $0.28 = **$2,464.00**; snapshots/volumes $0, egress $0; CPU util irrelevant (allocated) |
| First month with promo credit | same | $2,464 − $250 = $2,214 |
| Anti-pattern: left running 24 h/day | Not possible beyond 24 h from creation; recreate daily | 50 × 24 × 22 × 0.28 = $7,392 |