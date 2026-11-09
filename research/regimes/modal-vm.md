# Modal (VM Sandboxes)
Modal's VM runtime for Sandboxes (`runtime="vm"`), generally available since 2026-10-01. Same per-second CPU and memory rates as the gVisor sandboxes (card Modal): "both runtimes sharing the same APIs, Images, and usage-based pricing" (https://modal.com/blog/vm-sandboxes-agent-computers).
Price unit: Modal bills per physical core, and "1 core = 2 vCPUs" (https://modal.com/docs/guide/sandbox-resources). A 4 vCPU sandbox is priced as 2 cores.
- **VM Sandbox, request = size**: you reserve the shape you need; billed max(request, used) per second.
- **VM Sandbox, minimal request + burst**: a small request (0.125 core) that bursts on demand; lowest bill when usage is low, but burst capacity is not guaranteed.
No GPUs on this runtime (GPU Sandboxes run on gVisor). Nested virtualization: Enterprise plan only, as an experimental option. Files survive a sandbox end through filesystem snapshots (30-day default TTL, or indefinite) or Volumes. Memory snapshots are alpha and end the sandbox.
