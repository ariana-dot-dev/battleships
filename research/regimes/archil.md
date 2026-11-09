# Archil — pricing regimes (as of 2026-11-08)
Archil sells "sandboxes and durable disks for AI". A disk is S3-backed storage whose hot data sits in a durable cache. Compute comes in
two products: **persistent sandboxes** (Firecracker microVMs, generally available since September 2026) and **serverless execution**
(`disk.exec`, billed per tool call). Sandboxes are metered per resource at every size from 1 to 32 vCPU and 0.25 to 64 GiB.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free plan | Default, no card | Monthly allowance, hard caps, no overage | 1 vCPU-hour + 2 GiB-hours a month (30 min of 2 vCPU / 4 GiB); 30-min sessions; 5 concurrent; egress to a managed allowlist only; 10 GB per disk, 5 disks | https://archil.com/pricing |
| Developer plan | Self-serve paid | **$10/month minimum**; metered usage counts toward it | 20 concurrent; unrestricted egress by default; network policies and credential brokering | https://archil.com/pricing |
| Team plan | Larger fleets | **$500/month minimum**; metered usage counts toward it | 250 concurrent (+500 for $500/month); SOC 2 | https://archil.com/pricing |
| Enterprise | BYOC / on-prem, HIPAA | Custom minimum commitment | Unlimited concurrency; DPA and BAA; PrivateLink / VPC peering | https://archil.com/pricing |
| Sandbox running | Developer and Team | Per resource, allocated | **$0.055 per vCPU-hour + $0.020 per GiB-hour** (1/2 = $0.095/h, 2/4 = $0.19/h, 4/8 = $0.38/h); granularity not published | https://archil.com/pricing |
| Sandbox paused or stopped | `pause()`, hard timeout (24 h), idle timeout (30 min default, can be turned off), `stop()` | No compute charge | $0 compute; storage of paused memory not priced | https://archil.com/pricing, https://docs.archil.com/compute/sandboxes/introduction |
| Forks | Fork a running, paused or stopped sandbox | Each fork is a new metered sandbox | ~15 ms checkpoint, ~35 ms branch | https://docs.archil.com/compute/sandboxes/introduction |
| Active storage | Disk data read or written recently | Per GiB-month | $0.20/GiB-month (Developer and Team) | https://archil.com/pricing |
| Archive storage | Data on Archil-managed disks | Per GB-month | $0.025/GB-month (paid plans; disks synced to your own bucket do not pay it) | https://archil.com/pricing |
| Data transfer out | Out of Archil | Per GB | $0.07/GB; free within Archil | https://archil.com/pricing |
| Serverless tool calls | `disk.exec` without a VM | Per call, execution included | $0.05 per 1,000 calls; Free: 1,000 a month | https://archil.com/pricing |
| Regions | AWS us-east-1 priced | "Other regions vary" (sandboxes: us-east-1, us-west-2, eu-west-1) | multiplier not published | https://archil.com/pricing |
Dated changes: Sept 2026, persistent sandboxes became generally available and timeouts pause instead of shut down. Oct 2026, an idle
sandbox pauses after 30 minutes by default. Nov 2026, serverless exec takes custom images, 1-32 vCPU sizes and egress policies.
## Gotchas
1. **Sessions pause at 24 hours.** Resume keeps memory and processes. The idle timeout (30 min default) can be turned off.
2. **Free egress reaches only an allowlist.** Package registries, Git hosts, container registries, OS mirrors and model APIs work. Developer and above have open egress.
3. **Minimums, not fees.** The $10 and $500 minimums count usage, so a busy account pays only usage.
4. **No /dev/kvm.** Docker and Docker Compose work; nested virtualization does not.
5. **"Active data" is not what you store.** Prefetch and rapid overwrites inflate it, and data stays active for up to 1 h after last access.
6. **Storage for paused memory snapshots is not priced.**
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 100 GiB egress.
50 concurrent needs Team (Developer allows 20).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Team, 4 vCPU / 8 GiB | Yes | 8,800 × (4 × $0.055 + 8 × $0.020) = 8,800 × $0.38 = **$3,344.00** usage (above the $500 minimum) + 100 GB × $0.07 = $7.00 → **$3,351.00** plus storage |
| Developer, 4 vCPU / 8 GiB | Only at ≤20 concurrent | same per-hour rate; $10 minimum |
| Enterprise | Yes | unknown |
