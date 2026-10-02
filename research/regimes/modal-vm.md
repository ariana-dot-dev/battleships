# Modal (VM Sandboxes)
Modal's VM runtime for Sandboxes (`runtime="vm"`), generally available since 2026-10-01. Same per-second CPU and memory rates as the gVisor sandboxes (card Modal): "both runtimes sharing the same APIs, Images, and usage-based pricing" (https://modal.com/blog/vm-sandboxes-agent-computers).
- **VM Sandbox, request = size**: you reserve the shape you need; billed max(request, used) per second.
- **VM Sandbox, minimal request + burst**: a tiny request that bursts on demand; cheapest, but the burst capacity is not guaranteed.
No GPUs (GPU Sandboxes are gVisor-only). Nested virtualization on Team and Enterprise plans only. Memory snapshots are invite-only on VMs.