# Prime Intellect Sandboxes: pricing regimes (as of 2026-09-28)
Prime Sandboxes are hardware-isolated microVMs built for agentic RL. Each one boots a Docker/OCI image as the root filesystem
with its own guest kernel. The VMM isn't disclosed, and the blog positions the product against gVisor containers.
VM is now the default and only documented runtime. You drive sandboxes through the `prime` CLI, the `prime-sandboxes` Python SDK,
verifiers `SandboxEnv`, prime-rl, or Hosted Evaluations/Training. They went GA on 2026-09-23 (https://www.primeintellect.ai/blog/sandboxes),
after a beta that started 2025-08-27 with the Environments Hub.
There is one meter with no tiers, no subscription and no minimum spend. **All published rates are launch promo list prices valid
through 2026-12-22.** 4 vCPU / 8 GiB = 0.08 + 0.10 = **$0.18/h** (+$0.001/h for the default 5 GiB disk).
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand (launch promo) | Every running sandbox through 2026-12-22 | Allocated vCPU + RAM + disk while RUNNING; granularity/minimum undocumented | $0.02/vCPU-h, $0.0125/GiB-h RAM, $0.0002/GiB-h disk. Docs example 1 vCPU/2 GiB/5 GiB = $0.046/h; site calculator 1/1/5 = $0.0335/h | https://docs.primeintellect.ai/sandboxes/overview.md, https://www.primeintellect.ai/sandboxes |
| Post-promo | From 2026-12-23 | Unpublished | null | same |
| Default account limits | All accounts | Hard caps, raisable via support | 1,024 active sandboxes, 4,096 vCPU, 4,096 GiB RAM, 32,768 GiB storage, 102,400 creations/h, burst 192/10 s | overview.md |
| Custom capacity | Above the defaults ("tens of thousands" of concurrent sandboxes) | Contact | Unpublished | https://www.primeintellect.ai/blog/sandboxes |
| Per-sandbox size | Create request | Whole vCPUs; RAM and disk free-form | 1–16 vCPU, 128 MiB–64 GiB RAM, 2–128 GiB disk, 0–8 GPU (defaults 1 / 1 GiB / 5 GiB / 0) | overview.md |
| Lifetime / idle timeout | Always / opt-in | Sandbox **terminated** (not paused) | Default 60 min, negative = unlimited; idle 1–1,440 min, SSH doesn't count as activity | https://docs.primeintellect.ai/sandboxes/cli.md |
| GPU sandboxes | Not open | "Coming soon", VM-only, needs explicit grant | no types/prices published | overview.md |
| Pause / snapshot / fork / volumes | Not available | "Coming soon" | n/a | overview.md, blog |
| Hosted Evaluations (Prime Inference) | `prime eval` hosted, no `--api-base-url` | Tokens only; "sandbox runtime is not billed separately" | Prime Inference per-model token prices | https://docs.primeintellect.ai/tutorials-environments/hosted-evaluations |
| Hosted Evaluations (custom endpoint) | `--api-base-url` set | Billed as sandbox compute; the external provider bills tokens | rates above | same |
| Hosted Training (RL) | Managed RL runs | Per 1M tokens (input / output / train) | e.g. Qwen3.5-0.8B $0.02/$0.06/$0.06; Qwen3.6-35B-A3B $0.25/$0.75/$1.00; sandbox add-on undocumented | https://docs.primeintellect.ai/hosted-training/models-and-pricing |
| Egress | All traffic | Not published | null | (none found) |
| Payment | All | Prepaid Prime wallet (auto-top-up, usage limits, team wallets, promo codes) | n/a | https://docs.primeintellect.ai/faq |
| (Separate) GPU Pods marketplace | GPU VMs from aggregated providers, not sandboxes | Per-offer $/h, dynamic, deducted per minute; spot "up to 90%" off | Prices only visible logged in; docs example 2x H100 80GB PCIe (runpod) $5.40/h | https://docs.primeintellect.ai/faq, llms-full.txt |
## Gotchas
1. **The promo ends 2026-12-22.** Prime markets the launch rates as "a third of the cost of other large sandbox providers". Future rates are not published.
2. **There is no pause and no persistence.** Keeping state between shifts means leaving the sandbox running at full price. Otherwise you rebuild it from a Prime Image.
3. **The idle timeout deletes the sandbox.** An open SSH session doesn't keep it alive.
4. **Billing is on allocation.** Low CPU utilisation saves nothing.
5. **The first launch of any new image converts it to a VM image.** The sandbox stays PENDING for "a few minutes" (~10 min per the verifiers docs). Whether that time is billed is undocumented. Pre-pushing with `--source-image` avoids it.
6. **Concurrency for RL:** the default is 1,024 concurrent sandboxes, 4,096 vCPU and 4,096 GiB RAM. The vCPU cap binds first above 4 vCPU per sandbox (1,024 × 4 = 4,096). Thousands of rollouts need a support request.
7. **There is no inbound port API.** Prime Tunnel is the workaround and is unpriced. Uploads are capped at 16 MiB per file, and SSH has no port forwarding, scp or sftp.
8. **GPU sandboxes can't be bought yet.** The GPU Pods marketplace is a different product (GPU VMs with SSH) and does not support the sandbox API.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots, 100 GiB egress.
- Compute: 8,800 × $0.18 = **$1,584.00** (vCPU $704 + RAM $880). The 30% CPU figure is irrelevant because billing is on allocation.
- Disk: the default 5 GiB costs 8,800 × 5 × $0.0002 = **$8.80** (50 GiB disks would cost $88.00).
- Snapshots (50 GiB retained): **not possible** because the feature doesn't exist yet.
- Egress 100 GiB: the price isn't published, so it is treated as unknown ($0 in the total).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Promo, sandboxes deleted after each 8 h shift | Yes (50 ≤ 1,024; 200 vCPU ≤ 4,096) | **$1,592.80** + unknown egress |
| Promo, kept running 24 h on 22 workdays to preserve state | Yes | 26,400 h × $0.181 = **$4,778.40** |
| Promo, kept running all month (730 h × 50) | Yes | 36,500 h × $0.181 = **$6,606.50** |
| After 2026-12-22 | ? | unknown |
## Sources
- https://www.primeintellect.ai/sandboxes
- https://www.primeintellect.ai/blog/sandboxes
- https://docs.primeintellect.ai/sandboxes/overview.md, cli.md, sdk.md, images.md, tunnel.md
- https://docs.primeintellect.ai/faq
- https://docs.primeintellect.ai/tutorials-environments/hosted-evaluations
- https://docs.primeintellect.ai/hosted-training/models-and-pricing
- https://raw.githubusercontent.com/PrimeIntellect-ai/prime/main/packages/prime-sandboxes/src/prime_sandboxes/models.py