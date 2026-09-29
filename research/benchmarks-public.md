# Price per unit of work
A faster machine finishes sooner, so the cheapest hour isn't always the cheapest job. Each row is priced at the provider's current list price for the machine that was actually measured.
## Node.js build & test loop, 4 vCPU / 8 GB
| Provider | Runs per second | $ / hour | $ per million runs |
|---|---:|---:|---:|
| boat.dev | 27.7 | 0.036 | **0.36** |
| Blaxel | 19.8 | 0.331 | **4.65** |
| Novita | 13.5 | 0.233 | **4.79** |
| Daytona (VM sandbox) | 18.6 | 0.331 | **4.95** |
| Freestyle | 9.6 | 0.265 | **7.62** |
| E2B | 11.2 | 0.331 | **8.19** |
| Modal (VM runtime, beta) | 15.1 | 0.760 | **14.00** |
| Modal (default runtime) | 9.6 | 0.760 | **22.07** |
Source: [hpc-sandbox-benchmarks](https://github.com/AnicetNgrt/hpc-sandbox-benchmarks), published by the boat.dev team. boat.dev and Freestyle were measured on 2026-08-24, the other rows in July. When boat.dev runs out of standard capacity, new sandboxes briefly land on an older machine at the same price, which costs $1.13 per million runs.
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