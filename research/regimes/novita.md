# Novita AI Agent Sandbox — pricing regimes (as of 2026-09-28)
Pure prepaid pay-as-you-go: no subscription, no plan fee, no per-start fee. One compute rate card
($0.0000098/vCPU-s, $0.0000032/GiB-s, allocated, per-second). The regimes differ by **account tier
(quota unlock)**, **lifecycle state (running / paused / killed)**, **timeout mode (default vs long-running)**
and **storage (ephemeral vs persistent w/ 60 GB account allowance)**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Running (on-demand) | Sandbox in Running state, any tier | Allocated vCPU + allocated RAM, per second (docs: "accurate to the second"); utilisation irrelevant | vCPU $0.0000098/s = **$0.03528/vCPU-h**; RAM $0.0000032/GiB-s = **$0.01152/GiB-h**; 4 vCPU/8 GiB = **$0.23328/h**; 8/8 = $0.3744/h (vendor example matches) | https://docs.novita.ai/guides/sandbox-pricing , https://novita.ai/sandbox |
| Size grid | Every sandbox | vCPU integer 1–8; RAM 512 MiB steps, 512–8192 MiB, 0.5–4 GiB per vCPU | 4 vCPU allows 2–8 GiB; 8 vCPU needs ≥4 GiB | https://docs.novita.ai/guides/sandbox-quota-limit |
| Free tier (no balance) | New account, no top-up / credit line | Same rates, drawn from $100 promo credit | 5 concurrent, **1 h** max session, max 2 vCPU / 4 GiB, 20 GB disk, no priority scheduling | quota-limit page, novita.ai/sandbox |
| Paid tier (PAYG) | Unlocks when account balance > $0 (landing) / "adding account balance or enabling a credit line" (docs) | Same rates, prepaid balance | 100 concurrent, max 8 vCPU / 8 GiB, 20 GB disk; session **3 h** (docs quota table) vs **24 h** (landing page); priority scheduling | quota-limit page, novita.ai/sandbox |
| Enterprise | Contract | Not published | 500 concurrent default (landing: "unlimited"), 4 h session default, all limits adjustable, region selection / dedicated infra, 99.95% SLA | quota-limit page, novita.ai/sandbox |
| Long-running mode | `metadata.long_running="true"` / CLI `--long-running` at create | Same running rates; only lifts timeout cap | Default timeout 5 min; cap 1 h without long-running; docs examples 24 h, 168 h, 720 h. Inherited through resume/clone | https://docs.novita.ai/guides/sandbox-long-running |
| Paused (manual / onTimeout=pause / idle auto-pause) | Sandbox paused; memory+FS preserved | CPU & RAM = $0; state counts as Persistent Storage | Persistent storage: **60 GB free per account**, then **$0.00009/GB-h** (= $0.0657/GB-month at 730 h; $0.00216/GB-day); "billed daily" (docs), "first 60 GB included daily" (landing); metering interval not documented | sandbox-pricing, novita.ai/sandbox, sandbox-overview |
| Auto-pause / auto-resume ("on-demand mode", NovitaClaw) | lifecycle onTimeout=pause + autoResume, or idle_timeout (60–86400 s in NovitaClaw) | Compute only while running; resumes (~1 s) on SDK call or inbound HTTP | Zero compute while paused; storage as above | llms-full (NovitaClaw), sandbox-idle-timeout |
| Templates & snapshots | Any built template, snapshot (v2 region only), legacy commit/clone snapshot-templates | Persistent Storage, same pool as paused sandboxes | Shares the **same 60 GB account allowance**, then $0.00009/GB-h | sandbox-pricing ("Templates and Snapshots are saved as persistent storage"), sandbox-overview |
| Ephemeral disk | Running sandbox | Free | 20 GB per sandbox, not expandable except Enterprise | sandbox-pricing |
| Volumes (beta, v2 only) | Standalone mounted volumes | **Not published** | null | https://docs.novita.ai/guides/sandbox-volume |
| Killed | After kill / timeout-kill (default) | Nothing | $0; state lost | sandbox-overview |
| Egress / ingress | Internet traffic | **Not published** (no line item on pricing page) | null (assumed $0, unverified) | sandbox-pricing |
| Regions | v2 us-phx-1 (default) vs v1 us-virginia-1 | No price difference documented | Snapshots, secrets, volumes only in v2 | sandbox-overview |
| Promo credit | New account after onboarding survey | One-time $100, applied first to CPU/RAM/storage | Validity period unspecified; "subject to availability" | sandbox-pricing |
| Overdue | Balance (incl. vouchers) < bill | Sandboxes **terminated, data lost** | — | sandbox-pricing |
## Gotchas
1. **Paying doesn't upgrade limits by itself.** The $100 promo credit is spent under Free-tier quota (2 vCPU / 4 GiB,
   5 concurrent, 1 h). Paid-tier limits (8/8, 100 concurrent) need a real balance top-up or credit line. Whether voucher
   balance counts as "balance > $0" is unclear.
2. **Session cap is contradictory**: 1 h default timeout cap (without long_running), 3 h (docs quota table, Paid),
   24 h (landing page), 720 h (long-running examples). With no minimum and no start fee, splitting sessions costs nothing extra.
3. **Default timeout is 5 minutes, and the default onTimeout action is kill.** Forget to set timeout → work lost; forget
   to pause → you pay until the timeout fires (up to 1 h, or whatever long-running timeout you set).
4. **The 60 GB free is per account, not per sandbox**, and templates + snapshots + paused sandboxes all draw from it.
   A few fat templates can eat the allowance so every paused sandbox is billed from byte 0. Paused state includes memory
   (pause takes ~4 s per GB RAM per legacy docs), so an 8 GiB sandbox pauses into ≥8 GB plus written disk.
5. **CPU utilisation is irrelevant**: CPU and RAM billed on allocation. A 30%-busy sandbox costs the same as 100%.
6. **Memory hotplug** (virtio-mem) changes allocated RAM of a running sandbox; billing presumably follows allocation
   (RAM "billed based on allocated memory capacity"), unverified.
7. **Novita's own blog (2026-06-30) misquotes RAM as $0.0000016/GiB/s** — that is the 512 MiB price. Official docs:
   $0.0000032/GiB/s.
8. **Hard prepaid cutoff**: going overdue kills sandboxes and deletes data; only email low-balance alerts, no spend caps.
9. Egress and volume pricing are not published; enterprise pricing is contract-only.
10. 8 GiB RAM max per sandbox on standard tiers; 20 GB disk hard limit (Enterprise adjustable).
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU util,
50 GiB snapshots retained, 100 GiB egress. 4/8 is a legal size (2 GiB/vCPU). 50 concurrent ≤ 100 (Paid).
| Regime | Compute | Storage | Egress | Monthly total |
|---|---|---|---|---|
| Paid PAYG, kill after each session | 8,800 × $0.23328 = **$2,052.86** (30% util gives no discount) | 50 GiB ≤ 60 GB free → **$0** (if templates don't consume the allowance) | not published → $0 assumed | **$2,052.86** |
| Same, first month with $100 promo credit | — | — | — | **$1,952.86** (credit is one-time) |
| Same, but the 60 GB allowance already used by templates | $2,052.86 | 50 × $0.0657 = $3.29 | $0? | **$2,056.15** |
| Paid PAYG, pause instead of kill between sessions (illustrative assumption: 10 GB state per paused sandbox; not a Novita number) | $2,052.86 | (50×10 + 50 − 60) = 490 GB × 554 paused h × $0.00009 = $24.43 | $0? | **≈$2,077.29** |
| Free tier | not feasible: max 2 vCPU / 4 GiB, 5 concurrent, 1 h sessions | — | — | n/a |
| Enterprise | rates not published | — | — | null |
Session-length note: 8 h sessions need long-running mode (without it the timeout is capped at 1 h, so the
alternative is 8 × 1 h sessions — the 3 h Paid "maximum session duration" in the quota table does not help
without long-running; verified 2026-09-28 at https://docs.novita.ai/guides/sandbox-long-running);
cost is identical because there is no minimum or start fee.
Sources: https://docs.novita.ai/guides/sandbox-pricing , https://docs.novita.ai/guides/sandbox-quota-limit ,
https://docs.novita.ai/guides/sandbox-long-running , https://docs.novita.ai/guides/sandbox-overview ,
https://docs.novita.ai/guides/sandbox-volume , https://novita.ai/sandbox ,