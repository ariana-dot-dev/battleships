# Price per unit of work
A faster machine finishes sooner, so the cheapest hour isn't always the cheapest job. Each row is priced at the provider's current list price for the machine that was actually measured.
## Node.js build & test loop, 4 vCPU / 8 GB
| Provider | Runs per second | $ / hour | $ per million runs |
|---|---:|---:|---:|
| boat.dev | 26.7 | 0.036 | **0.37** |
| tama | 16.8 | 0.091 | **1.50** |
| Novita | 19.5 | 0.233 | **3.32** |
| Daytona (VM sandbox) | 21.5 | 0.331 | **4.27** |
| microsandbox | 21.1 | 0.330 | **4.34** |
| Namespace | 21.8 | 0.360 | **4.59** |
| Blaxel | 19.5 | 0.331 | **4.72** |
| E2B | 12.6 | 0.331 | **7.29** |
| Modal (VM runtime, beta) | 15.5 | 0.760 | **13.59** |
| Vercel Sandbox | 13.0 | 0.682 | **14.62** |
| Modal (default runtime) | 12.8 | 0.760 | **16.51** |
| Runloop | 8.3 | 0.634 | **21.24** |
Source: [StarSling hpc-sandbox-benchmarks](https://starsling.dev/hpc-sandbox-benchmarks), run of 2026-09-29, every provider on the same 4 vCPU / 8 GB target (Node.js V8 Web Tooling). Hourly prices are each provider's current list rate for that machine, compute and memory only (plan fees excluded). tama had provisioning failures in that run; run.cloud was measured too but its sandboxes are closed to new organizations. When boat.dev runs out of standard capacity, new sandboxes briefly land on an older machine at the same price, which costs about $1.13 per million runs.
## Clone, install and typecheck a repo (one run)
| Provider | Seconds | $ per run |
|---|---:|---:|
| Mosaic | 61 | 0.0034 |
| Isorun | 33 | 0.0040 |
| Miosa | 39 | 0.0067 |
| CreateOS | 50 | 0.0067 |
| Blaxel | 45 | 0.0085 |
| Sandbox0 | 128 | 0.0086 |
| Daytona | 69 | 0.0129 |
| E2B | 77 | 0.0144 |
| Runloop | 69 | 0.0243 |
| Beam | 65 | 0.0261 |
| Vercel Sandbox | 75 | up to 0.0288 |
| Modal | 111 | 0.0296 |
Source: [ComputeSDK benchmarks](https://github.com/computesdk/computesdk), weekly runs, 2026-09-25. Each is a single run, so read these as ±30%. Providers that bill only busy CPU (Vercel, Tensorlake, Upstash, Sail) cost less when the job waits on the network.