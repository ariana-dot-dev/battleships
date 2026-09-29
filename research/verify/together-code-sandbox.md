# Verify: together-code-sandbox (2026-09-28)
https://docs.together.ai/docs/together-code-interpreter.md, https://docs.together.ai/docs/billing.md.
| Item | Result |
|---|---|
| Code Sandbox per vCPU $0.0446/h, per GiB RAM $0.0149/h | confirmed (pricing page "Sandbox" section) |
| 4 vCPU / 8 GiB = $0.2976/h | confirmed (arithmetic) |
| "currently available on Together's custom plans" (sales only -> `sales` flag) | confirmed |
| Docs credit accounting $0.01486/credit, size table Pico 5 ... XLarge 320 credits/h, per started minute | confirmed (docs page reproduces CodeSandbox table) |
| Concurrency Build 10 / Scale 250 / Enterprise custom | confirmed (docs); docs example still says Scale "1100 free VM credits" and "up to 100 concurrent VMs" (stale, same as CodeSandbox docs) |
| Bulk "up to 50% off" | confirmed on codesandbox.io/pricing (see verify/codesandbox-sdk.md); not stated on together.ai (applies via CodeSandbox Enterprise) |
| Code Interpreter $0.03 per session, 60-minute lifespan, reusable, state persists | confirmed |
| Together fully prepaid, $5 minimum, no free trial, API suspended at zero, auto-recharge, credits never expire | confirmed |
| Shared filesystem $0.16/GiB-month on Together pricing | noted (not a sandbox storage price; not added) |
| Storage/snapshot, egress, IPv4, regions | unverifiable (not published) |
| Engine note | code-interpreter mode has a size with `vcpu: null`, so the engine can never select it (null >= n is false). Harmless (`alt`), left as-is. |
No corrections needed.