# Verify: isorun (2026-09-28)
Sources re-fetched: https://docs.isorun.ai/getting-started/pricing, https://isorun.ai/, https://docs.isorun.ai/llms-full.txt (full docs dump incl. lifecycle, persistent-storage, authentication, computer-use-vnc, SDK reference).
| Item | Result |
|---|---|
| vCPU $0.025/h, RAM $0.015/GiB-h, billed per second on vCPU+RAM | confirmed (pricing page) |
| Shape table 1/1 $0.040, 2/4 $0.110, 4/8 $0.220, 8/16 $0.440 per h | confirmed |
| "No minimums", per-second | confirmed (homepage) |
| Allocation basis (example 1 vCPU+1 GiB x 90 s = $0.001) vs destroy() cpuMs/memPeakBytes "numbers you're billed on" | confirmed both texts exist; alloc kept (worked example is allocation) |
| Billed create() -> destroy() or auto-destroy `timeoutSec` | confirmed |
| Default `timeoutSec` 300 s idle auto-destroy | confirmed (SDK reference `timeoutSec: 300 // auto-destroy after N idle seconds`; some guides show 600/900 examples) |
| Hibernated = pay nothing | confirmed ("not billed for active runtime; you pay nothing while the sandbox is paused") |
| $50 signup credit, ~1,250 h default sandbox, no card | confirmed |
| Egress + platform fees included | confirmed (homepage "Egress traffic and platform fees are included") |
| 4 GiB scratch disk default (`diskMiB: 4096`), wiped on destroy | confirmed |
| Persistent disk $0.02/GB-month on stored data, no egress fees, forks add only divergent writes | confirmed |
| Org pinned to US or EU region by API key | confirmed |
| Homepage selector 1/2/4/8 vCPU (max_vcpu 8) | confirmed; no hard cap published |
| SOC 2 Type II "soon" | confirmed |
| "Talk to us" custom tier, no rates | confirmed |
| Concurrency limits exist but unpublished ("concurrent sandboxes count against your limits") | confirmed |
| Snapshot/checkpoint storage price | unverifiable (unpublished); snapshot_gib_month 0 reflects hibernation only (caveat present) |
| Scratch disk beyond 4 GiB price | unverifiable; engine will apply the $0.02 persistent-disk rate to extra disk (approximation) |
| features.computer_use | corrected: false -> true (docs "Browser & computer use" page: isorun/computer-use image, "Use it with Anthropic or OpenAI computer use") |
| Engine interpretation: single PAYG plan fee 0, sales plan fee null (never auto-picked), resource/alloc | confirmed correct |