# Claude Managed Agents — pricing regimes (as of 2026-09-28)
Anthropic's hosted agent harness (public beta since 2026-04-08) bills on **two dimensions: tokens + session runtime**.
The sandbox part is a single flat SKU: **$0.08 per session-hour**, metered to the millisecond, **only while the
session status is `running`**. There is no size choice: each session gets an Ubuntu 24.04 container with up to 8 GB RAM
and 10 GB disk (vCPU count unpublished). Tokens are billed at normal API list rates and usually dominate.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Session runtime – running | Agent actively executing (tool calls **and** waiting on model inference) | Flat per session-hour, ms metering; resource-independent | $0.08/h | https://platform.claude.com/docs/en/about-claude/pricing |
| Session idle | Waiting for a user message / tool confirmation; also after a budget cap is hit | Not billed; sandbox + history preserved | $0 | pricing page, /managed-agents/session-operations, /managed-agents/budgets |
| Rescheduling | Transient error, auto-retry | Not billed | $0 | pricing page |
| Terminated / archived | Unrecoverable error or archived | Not billed; history kept | $0 | same |
| Deleted | `DELETE /sessions/{id}` | Removes record, events, sandbox and session-produced files | $0 | /managed-agents/session-operations |
| Tokens | Every model request in the session | Model list rates; prompt-caching multipliers apply; **no Batch discount**; fast-mode premium if `model.speed=fast` | e.g. Opus 5 $5/$25, Sonnet 5.5 $2/$10, Haiku 4.5 $1/$5 per MTok | pricing page |
| US-only inference | `model.inference_geo = "us"` | 1.1× on tokens only | ×1.1 tokens | pricing page |
| Web search in session | Each search | Per search | $10 / 1,000; web fetch free | pricing page |
| Self-hosted sandbox environment | `type: self_hosted`, worker on your Linux host | You pay your compute; whether the $0.08/h runtime applies is **not documented** | null | /managed-agents/self-hosted-sandboxes |
| Claude Platform on AWS | Using MA via AWS Marketplace | Same token + runtime charges converted to CCUs at $0.01; autonomous sessions need re-auth after 6 h | same rates | pricing page, /build-with-claude/claude-platform-on-aws |
| Session budget | Optional per-session hard cap | Enforced at **list** cost (tokens + searches + running time); session pauses idle at the cap, overshoot ≤ one model request per thread | user-set | /managed-agents/budgets |
| Enterprise / volume | Negotiated | Custom rate limits, volume discounts | unpublished | pricing page |
| Code execution tool (separate SKU, Messages API) | `code_execution` tool outside Managed Agents | Execution time per container, 5-min minimum; 1,550 free h/org/month; **free** with web_search/web_fetch 20260209+; replaced by session runtime inside MA | $0.05/container-h; 1 CPU / 5 GiB / 5 GiB, no internet, 30-day expiry | pricing page, /agents-and-tools/tool-use/code-execution-tool |
| Storage / egress | Session filesystem, outbound traffic | No charge published | null / not priced | — |
No dated runtime price change since launch (the $0.08 figure was quoted at the 2026-04-08 launch and is unchanged).
Token prices did change: Sonnet 5's $2/$10 intro price became permanent (the planned rise to $3/$15 on 2026-09-01 was cancelled).
## Gotchas
1. **"Running" ≠ CPU busy.** Time the agent waits on model inference counts as running. Only time waiting on *you* is free.
2. **No size choice.** vCPU is unpublished and RAM tops out at 8 GB. The same $0.08/h is charged whether the agent uses 1 core or 4.
3. **Idle sessions are a free pause:** the sandbox is kept, with no runtime charge and no published retention limit.
4. **Tokens are the bill.** In Anthropic's own worked example (1 h, Opus 5), tokens are $0.625 and runtime is $0.08, so runtime is only 11% of the total.
5. **Budgets use list prices**, so negotiated discounts don't stretch a budget.
6. Not eligible for HIPAA BAA or ZDR. No inbound ports, SSH or IPv4. Egress is allowlist-capable (`limited` networking).
7. Third-party posts quoting "$0.25/session-hour" are wrong per the official pricing page.
## Worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = 8,800 session-hours, 30% CPU, 50 GiB snapshots, 100 GiB egress.
The shape is taken as the fixed sandbox (8 GB RAM fits; vCPU unknown). Assume the agent is `running` the whole 8 h.
| Line | Calculation | Monthly |
|---|---|---|
| Session runtime | 8,800 × $0.08 | **$704.00** |
| CPU util 30% | no effect (flat SKU) | $0 |
| Snapshots 50 GiB | idle-session state not billed | $0 |
| Egress 100 GiB | not priced | $0 (unpublished) |
| **Sandbox subtotal** | | **$704.00** |
| Illustrative tokens | Anthropic's example rate of $0.625 per running hour on Opus 5, × 8,800 | +$5,500 |
| If agent is running only 50% of wall-clock (rest idle awaiting input) | 4,400 × $0.08 | $352 runtime |
Feasibility: no published concurrency cap; 50 sessions/day is far under the 300 creates/min limit.