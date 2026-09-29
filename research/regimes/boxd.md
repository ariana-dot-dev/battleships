# boxd — pricing regimes (as of 2026-09-28)
boxd sells KVM microVM "machines" on prepaid credits. No plan fee, no seats. There are two price lists, EUR (native)
and USD (a separate list behind the EUR/USD toggle on boxd.sh/pricing). Every USD number is about 1.2x the EUR number:
0.059/0.049 = 1.204, 0.018/0.015 = 1.20, 0.00012/0.0001 = 1.20. Prices exclude VAT.
Each resource is metered on a different basis:
- **vCPU**: the machine's full vCPU count, and only while it runs.
- **RAM**: resident memory, sampled every second, while the machine runs *or is in standby*.
- **Disk**: bytes actually written, not the 100 GiB copy-on-write that is provisioned. Billed in every state.
## Regime table
| Regime | When it applies | How billed | Numbers (USD list / EUR list) | Source |
|---|---|---|---|---|
| Running (PAYG) | Machine running | vCPU on shape size + resident RAM + written disk, per second, drawn from credits | $0.059 / vCPU-h (€0.049); $0.018 / GiB-h resident RAM (€0.015); $0.00012 / GiB-h written disk (€0.0001) = $0.0876 / GiB-month | https://boxd.sh/pricing |
| Shape: 2 vCPU / 8 GiB (default, self-serve) | Every machine unless the quota is raised | Same rates. RAM cap 8 GiB, but only resident RAM is billed | $0.262/h at full RAM, $0.1564/h with 2 GiB resident and 20 GiB written (the vendor's example) | boxd.sh/pricing (FAQ), docs.boxd.sh/guides/resources |
| Shape: 1 vCPU / 4 GiB | Selectable in the rate-card calculator | Same rates | $0.131/h at full RAM | boxd.sh/pricing |
| Shape: 4 vCPU / 16 GiB (and larger) | Only after emailing contact@boxd.sh ("larger shapes than the default 2 vCPU / 8 GiB"). Larger shapes are on the Custom plan | Same rates on the published list. Custom may carry volume pricing (not published) | $0.524/h at 16 GiB resident; $0.380/h with 8 GiB resident | boxd.sh/pricing FAQ |
| Standby (auto-suspend / `machine pause`) | Optional. Auto-suspend is off by default in the docs and triggers after N s with no inbound TCP/UDP | No vCPU; resident RAM still billed (frozen in host RAM) + written disk | $0.018 / GiB-h RAM + disk | boxd.sh/pricing FAQ ("a machine in standby pays for RAM and disk"). The docs conflict: they call it "near zero" (docs.boxd.sh/how-it-works/suspend-resume) |
| Hibernated (auto-hibernate) | On by default after 4 h with no *network* traffic (docs). The pricing page says it happens "when network activity stops". Memory is written to disk; wake takes about 85 ms per the docs (the pricing FAQ says "sub-millisecond", which the docs attribute to standby, not hibernate) | Written disk only | $0.00012 / GiB-h ($0.0876 / GiB-month) | boxd.sh/pricing FAQ; docs suspend-resume |
| Stopped | `machine stop` | Written disk only; vCPU "nothing in ... stopped" | same disk rate | boxd.sh/pricing FAQ |
| Destroyed / auto-destroy | `idle.destroy_after` timer or explicit destroy | Nothing. Checkpoints die with the machine ("billing ends with the machine") | $0 | docs checkpoints; features record |
| Checkpoints (up to 10 per machine, memory+disk) | Per machine | Not priced separately. Presumably part of the machine's written disk (unverified) | null | docs.boxd.sh/guides/checkpoints |
| Named snapshots (replicated, outlive the machine) | Golden images, fan-out | No published price | null | docs.boxd.sh/guides/snapshots |
| Disk backups to object storage | On demand, or on a schedule of 15 min or longer; 7-day default retention; sparse + dedup | No published price ("keep the storage bill honest") | null | docs.boxd.sh/guides/disaster-recovery |
| Volumes (detachable disks) | Optional | No published price. Presumably the written-disk rate (unverified) | null | features record |
| Egress / bandwidth | Always | Not published anywhere (pricing, FAQ, egress docs) | null | boxd.sh/pricing, docs egress |
| Public IPv4 | n/a | Not offered per the docs: shared proxy IP, SSH on a per-machine port, 3 raw TCP/UDP forwards per machine. (boxd.sh/faq marketing says "a public IPv4"; docs table followed) | n/a | docs resources, boxd.sh/faq |
| Free credit | Adding a payment method | One-time $30 / €30. Afterwards auto top-up adds $20 / €20 at a time (amount can be changed or turned off) | $30 one-time | boxd.sh/pricing FAQ |
| No payment method | Before a card is added | Quota of 2 machines | — | docs resources |
| Org quota | Default | 50 machines per org, **hibernated machines included**. Can be raised the same day on request | 50 | docs resources, features |
| Custom (volume / bigger machines / SSO) | Contract | Volume pricing, not published | null | boxd.sh/pricing |
| Self-host / BYOC | Contract | Annual licence for a single Rust binary running on your own hardware. Price not published | null | boxd.sh/pricing FAQ |
| Currency regime | Account currency | EUR list or USD list. The USD list is about 1.2x EUR, so what a EUR payer pays in USD terms depends on the FX rate | — | boxd.sh/pricing (EUR/USD toggle) |
No dated price changes turned up. The blog (Aug–Sep 2026) and the docs have no pricing posts or changelog entries.
## Gotchas
1. **Standby can cost more than running the same hours.** Standby drops vCPU but keeps billing resident RAM. A 4 vCPU / 8 GiB-resident box parked in standby for 554 idle h/month costs more than its 176 working hours. Hibernate is the cheap idle state. The docs say standby is "near zero"; the pricing page says it pays RAM. We follow the pricing page.
2. **Idle timers watch the network, not the CPU.** A CPU-bound job with no inbound traffic gets hibernated after 4 h by default, and its clocks freeze. If you disable auto-hibernate to prevent that, a forgotten machine bills full vCPU + RAM forever. The default also means a machine you walk away from keeps billing about 4 h of running time before it hibernates.
3. **RAM billed on resident memory flatters light workloads.** The vendor headline of about $0.16/h assumes 2 of 8 GiB resident. Page cache, a JVM heap, or Docker can push resident memory to the full allocation, giving $0.262/h on the default shape. Whether page cache counts as resident is not documented.
4. **vCPU is billed on size, not on utilisation.** 30% CPU utilisation saves nothing.
5. **4 vCPU is not self-serve.** The self-serve shape is 2 vCPU / 8 GiB. The 4/16 shape appears in the calculator but needs an email. There is no public ceiling above 4/16.
6. **Quota counts hibernated machines.** 50 concurrent running machines leaves no room for parked ones unless the quota is raised.
7. **Unpublished prices:** snapshot, backup and volume storage, and egress. Disk is cheap at $0.0876/GiB-month, but only for written bytes. Forks share CoW blocks and start near zero.
8. **Credits, not invoices.** When the balance runs out, auto top-up in $20 steps keeps machines alive. With auto top-up off, what happens at zero balance is undocumented.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 machine-hours), 30% CPU utilisation, 50 GiB of snapshots retained, 100 GiB egress.
Assumptions:
- The shape is 4 vCPU / 16 GiB, unlocked on request, with 8 GiB resident. RAM is billed on resident memory, so the 16 GiB provisioned does not matter.
- Hourly rate = 4 × 0.059 + 8 × 0.018 = **$0.380/h**. At 30% CPU the vCPU charge does not change.
- The 50 GiB of retained state is billed as written disk on hibernated machines: 50 × $0.0876 = **$4.38**. Named-snapshot storage price is unknown.
- Egress: **unknown (null)**. Totals below exclude it.
- Idle hours per machine: 730 − 176 = 554 h/month.
| Regime | Computation | Monthly (USD) |
|---|---|---|
| A. Running, then hibernate / stop when idle (recommended) | 8,800 × 0.380 = 3,344.00 + 4.38 disk | **$3,348.38** + egress |
| A′. Same, resident RAM only 4 GiB (sensitivity) | 8,800 × (0.236 + 0.072) = 2,710.40 + 4.38 | $2,714.78 |
| B. Running, then left alone until default auto-hibernate (4 h extra running per workday) | 3,344 + 50 × 4 × 22 × 0.380 = 1,672.00 + 4.38 | **$5,020.38** |
| C. Running, then standby overnight and weekends | 3,344 + 50 × 554 × 8 × 0.018 = 3,988.80 + 4.38 | **$7,337.18** |
| D. Destroy after each session, keep 50 GiB as named snapshots | 3,344.00 + snapshot storage (unpublished) | $3,344.00 + null |
| E. Self-serve default shape 2 vCPU / 8 GiB (nearest self-serve; half the CPU) | 8,800 × 0.262 = 2,305.60 + 4.38 | $2,309.98 |
| F. EUR list, regime A | 8,800 × €0.316 = €2,780.80 + 50 × €0.073 = €3.65 | **€2,784.45** (USD depends on FX) |
| G. Custom / volume / self-host | not published | null |
Free credit: −$30 once, in the first month only. Quota: 50 concurrent is exactly the default org quota, and hibernated machines count toward it. In A, the 50 hibernated machines are the same 50, so it fits. In D, snapshots do not count as machines.
https://docs.boxd.sh/guides/resources, https://docs.boxd.sh/how-it-works/suspend-resume, https://docs.boxd.sh/guides/snapshots,
https://docs.boxd.sh/guides/disaster-recovery, https://docs.boxd.sh/guides/egress, https://boxd.sh/blog