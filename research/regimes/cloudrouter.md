# cloudrouter (Manaflow): pricing regimes (as of 2026-09-28)
cloudrouter is a CLI plus agent skill from Manaflow (the team behind cmux). It lets Claude Code, Codex, Cursor and similar agents
start cloud VMs (`cloudrouter start .`) and GPUs (`--gpu H100`). It is not a compute provider itself. It routes to **E2B**
(default, Firecracker microVMs) or **Modal** (GPU sandboxes). Each VM comes with a VNC desktop, VS Code in the browser,
Jupyter Lab, Chrome with CDP, and Docker.
**Launched:** Show HN on 2026-02-13 (https://news.ycombinator.com/item?id=47006393). The npm package `@manaflow-ai/cloudrouter`
was first published on 2026-02-09.
**Status:** on 2026-09-28, https://cloudrouter.dev and https://cloudrouter.dev/pricing both redirect to https://manaflow.com/, and that
page lists only cmux. The last CLI release (0.9.30) was on 2026-02-16 and the last skill-repo commit on 2026-02-19. The product
looks dormant or discontinued.
**Pricing was never published.** There is no pricing page. The Wayback CDX (checked before the archive went offline) has no
`/pricing` capture, and the docs, HN thread and source code give no rate. On HN (2026-02-14) the co-founder wrote: "Right now, all usage is routed
through us, hence `cloudrouter login` is required for now. Plan on adding bring-your-own cloud/key".
## Regime table
| Regime | When it applies | How billed | Numbers | Source URL |
|---|---|---|---|---|
| Default account (logged in) | Every user after `cloudrouter login` | Unknown. Usage ran on Manaflow's own E2B and Modal accounts. No price, credit or free-tier terms were published | 10 concurrently running sandboxes; self-serve GPUs T4, L4, A10G | https://raw.githubusercontent.com/manaflow-ai/manaflow/main/packages/convex/convex/cloudRouterSubscription.ts, https://news.ycombinator.com/item?id=47006393 |
| Subscription tier "low" | Only in backend source (`cloudRouterSubscription` table) | Unknown fee | 50 concurrent; unlocks L40S, A100 | same .ts file |
| Subscription tier "mid" | Source only | Unknown fee | 100 concurrent; adds A100-80GB, H100 | same |
| Subscription tier "high" | Source only | Unknown fee | 500 concurrent; adds H200, B200 | same |
| GPU approval | L40S/A100/A100-80GB/H100/H200/B200 without a tier | Contact founders@manaflow.ai | n/a | https://raw.githubusercontent.com/manaflow-ai/manaflow/main/packages/cloudrouter/internal/cli/start.go |
| Size presets | `--size` (default **large**) | Unknown | small 2 vCPU/8 GB/20 GB; medium 4/16/40; **large 8/32/80 (default)**; xlarge 16/64/160; `--cpu/--memory/--disk` override | start.go, SKILL.md |
| Running | Sandbox running | Unknown. The underlying E2B cost is per-second allocated (E2B list 4 vCPU/8 GiB = $0.3312/h) | Default timeout 600 s, extendable (`extend`, default +1 h) | https://e2b.dev/pricing (reference only) |
| Stopped = paused | `cloudrouter stop`/`pause` | Unknown. The E2B backend does not bill paused sandboxes | Resumable with `resume` | SKILL.md |
| Deleted | `cloudrouter delete` | n/a | State destroyed | SKILL.md |
| Egress / storage / IPv4 | All | Not documented | null | none |
## Gotchas
1. **You cannot budget it.** No price exists anywhere, and the tiers in the code carry no fee. The Battleships card is null-priced and every mode is
2. **It is probably dead.** The domain redirects to the Manaflow homepage and releases stopped in February 2026.
3. **The default size is 8 vCPU / 32 GB.** The skill tells agents never to pass `--size`, so each agent-started sandbox is 2 to 4 times bigger than a
   typical 4/8 sandbox. If it were ever billed on allocation, that multiplies the cost.
4. **The default timeout is 10 minutes**, and GPU tasks are told to use `--timeout 7200`. Runaway GPU spend was raised on HN (agent retry loops
   starting B200s). The only guardrails were concurrency caps and approval gates on large GPUs.
5. **Multi-provider "router" in name only.** Only E2B and Modal shipped. Vercel, Daytona, Morph and Freestyle were announced as "working on".
6. **Concurrency tops out at 10** on the default account. 50, 100 and 500 need tiers that were never sold publicly.
## Worked example (4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = 8,800 h, 30% CPU, 50 GiB snapshots, 100 GiB egress)
**Cannot be priced.** No cloudrouter rate exists. Feasibility: 50 concurrent is above the default limit of 10 and needs the unpriced "low" tier (50).
For reference only, if usage were passed through at the default backend's (E2B) list rates: 8,800 h × $0.3312 = **$2,914.56**
(allocation billing, so 30% CPU changes nothing), plus E2B's $150/mo Pro plan needed for more than 20 concurrent sandboxes,
giving **about $3,064.56**. Paused-state storage and egress are not billed or not documented on E2B. With the default `large` size (8/32) and no `--cpu 4 --memory 8192`,
the pass-through figure would be 8,800 × (8×0.0504 + 32×0.0162) = 8,800 × $0.9216 = **$8,110.08** + $150.
None of these are cloudrouter prices. cloudrouter's markup, subsidy or free usage is unknown.