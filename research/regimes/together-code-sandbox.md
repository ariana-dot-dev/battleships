# Together Code Sandbox (+ Code Interpreter): pricing regimes (as of 2026-11-08)
Together AI lists two sandbox products on its pricing page.
1. **Together Code Sandbox** is the `together-sandbox` SDK and CLI (Python, TypeScript). "To use the `together-sandbox` SDK and CLI, your organization must have them enabled." Access goes through Together.
   - The pricing page lists "VM sandboxes" at $0.0446 per vCPU-hour + $0.0149 per GiB RAM-hour.
   - Sizes: 0.1–16 cores, 1–8 GB per CPU, "Max 16 vCPU / 32 GB" in the migration doc. Default 1 vCPU / 2 GiB.
   - The older CodeSandbox-based SDK is deprecated. Its self-serve route is priced in `codesandbox-sdk`, not here.
2. **Together Code Interpreter** is listed on the pricing page at **$0.03 per 60-minute session**. Together's docs no longer describe it: the old docs URL and the `tci-execute` reference now show Code Sandbox. Its language, image and persistence behaviour have no current source.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Code Sandbox (together-sandbox) | Organization enabled by Together | Per vCPU-h + per GiB-h on allocated resources while the sandbox runs. Granularity unpublished | **$0.0446/vCPU-h, $0.0149/GiB-h**. 4 vCPU/8 GiB = **$0.2976/h** | https://www.together.ai/pricing |
| 2 | Contract terms | Same | Unpublished | null | https://docs.together.ai/docs/together-code-sandbox |
| 3 | Stopped sandbox | terminate() with a snapshot | No compute. Snapshot storage price and retention unpublished | null | https://raw.githubusercontent.com/togethercomputer/together-sandbox/main/docs/migrating-from-codesandbox.md |
| 4 | **Code Interpreter session** | Listed on the pricing page | **$0.03 per session (60 minutes)**. Resource spec unpublished | $0.03/session | https://www.together.ai/pricing |
| 5 | Together prepaid credits | Any Together pay-as-you-go use | Prepaid. **$5 minimum purchase**. API access suspended at a zero balance. Auto-recharge optional. Credits never expire. No free trial credit | $5 minimum | https://docs.together.ai/docs/billing |
| 6 | Storage / egress / IPv4 | — | Not published. No public IPv4 | null | https://www.together.ai/pricing |
## Gotchas
1. **Access is gated.** Your organization must have together-sandbox enabled before you can use the listed rates.
2. **No idle stop.** "Sandboxes run until you terminate them." A ttl counts from creation, not idle time. Idle time is billed until you terminate.
3. **Persistence is by snapshot.** Terminate with a snapshot to keep the disk (and memory if you ask). The next sandbox starts from that snapshot. No live fork: the parent stops.
4. **Ports.** Each port has a URL (`https://<sandbox-id>-<port>.…`), open to everyone by default. An experimental network policy limits access by IP/CIDR or requires the sandbox token.
5. **Code Interpreter is session-priced.** $0.03 buys a 60-minute session. CPU/RAM is unpublished, so it is not comparable to a 4 vCPU / 8 GiB VM.
6. **Together is fully prepaid.** At a zero balance the API is suspended. The minimum top-up is $5.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 VM-hours**, 30% CPU util, 50 GiB snapshots, 100 GiB egress.
| Regime | Compute | Snapshots 50 GiB | Egress 100 GiB | Plan fee | **Monthly total** |
|---|---|---|---|---|---|
| Code Sandbox at list rate | 8,800 × $0.2976 = $2,618.88 | unpublished | unpublished | unpublished | **$2,618.88 + unpublished items** |
| Self-serve via CodeSandbox (deprecated SDK) | see codesandbox-sdk.md | | | | |
- 30% utilisation saves nothing: Code Sandbox bills allocation.
- Code Interpreter is left out: its resource spec is unpublished, so it does not match this workload.
Sources: https://www.together.ai/pricing · https://docs.together.ai/docs/together-code-sandbox · https://docs.together.ai/docs/billing · https://raw.githubusercontent.com/togethercomputer/together-sandbox/main/docs/migrating-from-codesandbox.md · https://raw.githubusercontent.com/togethercomputer/together-sandbox/main/docs/experimental.md
