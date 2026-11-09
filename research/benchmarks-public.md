# Price per unit of work
A faster machine finishes sooner, so the lowest hourly price does not always give the lowest cost per job. Each row is the provider's current list price for a 4 vCPU / 8 GB machine, divided by the work that machine did in one public benchmark run.
## V8 Web Tooling Benchmark (Node.js), 4 vCPU / 8 GB
| Provider (runtime) | Runs per second | $ / hour | $ per million runs |
|---|---:|---:|---:|
| boat.dev | 28.06 | 0.036 | **0.36** |
| tama | 18.69 | 0.091 | **1.35** |
| Novita | 20.16 | 0.233 | **3.21** |
| Namespace | 24.90 | 0.360 | **4.02** |
| Daytona (VM class) | 21.52 | 0.331 | **4.28** |
| microsandbox | 21.34 | 0.330 | **4.29** |
| Blaxel | 18.03 | 0.331 | **5.10** |
| Freestyle | 10.22 | 0.265 | **7.19** |
| E2B | 11.08 | 0.331 | **8.30** |
| Modal (VM runtime) | 15.48 | 0.760 | **13.63** |
| Vercel Sandbox | 12.66 | 0.682 | **14.96** |
| Modal (gVisor, default runtime) | 12.60 | 0.760 | **16.75** |
| Runloop | 8.93 | 0.634 | **19.71** |

Speed: [StarSling hpc-sandbox-benchmarks, run 37073680030](https://github.com/starslingdev/hpc-sandbox-benchmarks/blob/297198a96ee827df5edcd918bd37b949526cfe20/LEADERBOARD.md) of 2026-10-03, the latest run on StarSling's leaderboard. Every provider asked for 4 vCPU / 8 GB. The test is the V8 Web Tooling Benchmark: JavaScript tools such as Babel, TypeScript and Prettier running in Node.js. Brezel had the highest score in this run (30.06 runs/s) and has no row here because we do not have its list price. In the same run, boat.dev, Namespace, Daytona, microsandbox and Novita share rank 2: the benchmark cannot tell them apart.

Prices: each provider's pricing page on 2026-11-08, compute and memory only, plan fees excluded ([boat.dev](https://docs.boat.dev/pricing), [tama](https://tama.computer/docs), [Novita](https://docs.novita.ai/guides/sandbox-pricing), [Namespace](https://namespace.so/pricing), [Daytona](https://www.daytona.io/pricing), [microsandbox](https://microsandbox.dev/pricing), [Blaxel](https://blaxel.ai/pricing), [Freestyle](https://www.freestyle.sh/pricing), [E2B](https://e2b.dev/pricing), [Modal](https://modal.com/pricing), [Vercel](https://vercel.com/docs/sandbox/pricing), [Runloop](https://www.runloop.ai/pricing)).

Read these limits next to the table:
- **Modal.** Each row is priced as the machine that was measured. StarSling ran Modal with cpu=4, and the sandbox saw 4 CPUs ([PR #121](https://github.com/starslingdev/hpc-sandbox-benchmarks/pull/121)). That is 4 Modal cores: $0.76 per hour at 8 GiB. Modal counts 1 core as 2 vCPU, so the hourly size tables price 4 vCPU as 2 cores ($0.48 per hour); that sandbox shows 2 CPUs, and no public run measured it.
- **Busy-time billing.** Vercel bills CPU only while it is busy, and Blaxel bills only while a sandbox is active. A job that waits on the network costs less there than this table shows.
- **boat.dev.** Every boat.dev sandbox in this run ran on an AMD Ryzen 9 9950X host. boat.dev also places some sandboxes on AMD Ryzen 7 9700X hosts at the same price, which this run did not measure. boat.dev also limits how many sandboxes a plan can start per minute and per day, and charges for starts above the included number ([limits](https://docs.boat.dev/limits)).
- **Not compared.** tama did not get the requested size in this run, so its speed is not like-for-like. run.cloud was measured too, but its sandboxes are closed to new organizations.
