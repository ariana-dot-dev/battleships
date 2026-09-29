# Together Code Sandbox (+ Code Interpreter): pricing regimes (as of 2026-09-28)
Together AI owns CodeSandbox and sells two sandbox products.
1. **Together Code Sandbox** is the CodeSandbox SDK VM product (same `@codesandbox/sdk`, same Firecracker infrastructure, API key from codesandbox.io). It is "currently available on **Together's custom plans**" only.
   - Together's pricing page lists per-resource rates ($0.0446/vCPU-h, $0.0149/GiB-h).
   - Together's docs bill it in CodeSandbox VM credits ($0.01486/credit, fixed sizes, per started minute).
   - The only self-serve path is a codesandbox.io workspace. That path is priced in `codesandbox-sdk`, not duplicated here.
2. **Together Code Interpreter (TCI)** is a hosted Python execution API at **$0.03 per session**, where a session lives 60 minutes. It is self-serve on prepaid Together credits.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Code Sandbox, Together custom plan (per-resource list rate) | Together sales contract | Per vCPU-h + per GiB-h on allocated resources while running. Per-minute granularity per the docs | **$0.0446/vCPU-h, $0.0149/GiB-h**. 4 vCPU/8 GiB = **$0.2976/h** | https://www.together.ai/pricing |
| 2 | Code Sandbox, credit accounting (docs) | Same product as described in Together docs | Fixed sizes in VM credits at $0.01486/credit. Smallest unit 1 minute, rounded up | Pico 5 cr/h $0.0743 … Micro (4c/8GB) 20 cr/h **$0.2972**, XLarge 320 cr/h $4.7552. Differs from row 1 by ≤$0.0004/h (row 1 lets RAM/vCPU vary, but only fixed tiers exist) | https://docs.together.ai/docs/together-code-sandbox |
| 3 | Enterprise credit discount | Custom plan | CodeSandbox Enterprise: "up to 50% off bulk VM credit packs" | Best case Micro $0.1486/h. Actual terms negotiated | https://codesandbox.io/pricing, https://codesandbox.io/docs/sdk/pricing |
| 4 | Concurrency by plan | — | Build 10, Scale 250, Enterprise/custom = custom (the docs repeat CodeSandbox's plan table) | — | docs.together.ai/docs/together-code-sandbox |
| 5 | Self-serve fallback | No Together contract | Open a CodeSandbox workspace (Build free / Scale $170/mo). See  | — | docs.together.ai/docs/together-code-sandbox |
| 6 | Hibernated / shut down | Same lifecycle as CodeSandbox SDK | No compute. No storage fee published | $0 (unpublished) | codesandbox.io/docs/sdk |
| 7 | **Code Interpreter session** | `/tci/execute` API | **$0.03 per session**. A session has a 60-minute lifespan and can be reused for many executions (state, packages and variables persist). Billed per session, not per call. Resource spec **unpublished** | $0.03/60-min session = $0.03/h equivalent if chained | https://www.together.ai/pricing, https://docs.together.ai/docs/together-code-interpreter |
| 8 | Together prepaid credits | Any Together self-serve use (TCI) | Prepaid. **$5 minimum purchase**. API access suspended at a zero balance. Auto-recharge optional. Credits never expire. **No free trial credit** | $5 minimum | https://docs.together.ai/docs/billing |
| 9 | Storage / egress / IPv4 | — | Not published for either product. No public IPv4 | null | together.ai/pricing |
## Gotchas
1. **There is no self-serve Together path for VMs.** "Together Code Sandbox" at the listed per-vCPU rate needs a sales-negotiated custom plan. Self-serve means CodeSandbox's own plans: a $170 Scale fee for more than 10 concurrent VMs.
2. **Two price expressions exist for the same VM.** They are per-resource ($0.0446/$0.0149) on together.ai and per-credit fixed tiers in the docs. They agree to within 0.1% for the 2 GB/core tiers. The per-resource form overstates flexibility, since only fixed sizes exist (Pico 2c/1GB, Nano 2c/4GB, then 2 GB per core up to 64c/128GB).
3. **Code Interpreter is session-priced, not resource-priced.** $0.03 buys a 60-minute session regardless of use. That is cheap for bursty notebook-style LLM code execution, but there is no published CPU/RAM, no Docker and no custom image. It is not a general VM.
4. **Together is fully prepaid.** At a zero balance the API is suspended, which kills running sessions. The minimum top-up is $5.
5. **Per-started-minute rounding** is inherited from CodeSandbox for VMs.
## Worked example
Workload: 4 vCPU / 8 GiB (Micro), 50 concurrent × 8 h/day × 22 days = **8,800 VM-hours**, 30% CPU util, 50 GiB snapshots, 100 GiB egress.
| Regime | Compute | Snapshots 50 GiB | Egress 100 GiB | Plan fee | **Monthly total** |
|---|---|---|---|---|---|
| Together custom plan at list per-resource rate | 8,800 × $0.2976 = $2,618.88 | $0 (hibernation unmetered, unpublished) | null | unpublished (custom) | **$2,618.88 + contract fee?** |
| Together custom plan, credit accounting (Micro $0.2972) | $2,615.36 | $0 | null | unpublished | **$2,615.36 + ?** |
| Custom plan with best-case 50% bulk credit discount | $1,307.68 | $0 | null | unpublished | **$1,307.68 + ?** |
| Self-serve via CodeSandbox Scale | see codesandbox-sdk.md | | | $170 | **$2,761.58** |
| Code Interpreter (not the same machine) | 50 × 8 sessions/day × 22 = 8,800 sessions × $0.03 = $264 | n/a | null | $0 (prepaid) | **$264.00** (illustrative only: spec unknown, not 4/8, no Docker) |
- 30% utilisation saves nothing on the VM regimes, which are billed on allocation.
- TCI is billed per session, so utilisation doesn't matter there either.
Sources: https://www.together.ai/pricing · https://docs.together.ai/docs/together-code-sandbox · https://docs.together.ai/docs/together-code-interpreter · https://docs.together.ai/docs/billing · https://docs.together.ai/reference/tci-execute · https://codesandbox.io/pricing · https://codesandbox.io/docs/sdk/pricing