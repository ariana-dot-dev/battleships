# boxd — pricing regimes (as of 2026-11-08)
boxd sells KVM microVM "machines" on prepaid credits. No plan fee, no seats. There are two price lists, EUR (native)
and USD (a separate list behind the EUR/USD toggle on boxd.sh/pricing). Every USD number is about 1.2x the EUR number:
0.047/0.039 = 1.205, 0.014/0.012 = 1.17, 0.000096/0.00008 = 1.20. Prices exclude VAT.
Each resource is metered on a different basis:
- **vCPU**: active vCPU only, not the vCPUs the machine reserves, and only while it runs ("You only pay for active vCPU, not for the vCPUs your machine reserves", boxd.sh/pricing). boxd says machines average about 10% active vCPU.
- **RAM**: resident memory, sampled every second, while the machine runs *or is in standby*.
- **Disk**: bytes actually written, not the 100 GiB copy-on-write that is provisioned. Billed in every state.
Regions: Frankfurt (fra) and New York (nyc). "boxd runs in two regions, and every org can use both" (docs.boxd.sh/guides/regions). The machine limit counts each region on its own.
## Regime table
| Regime | When it applies | How billed | Numbers (USD list / EUR list) | Source |
|---|---|---|---|---|
| Running (PAYG) | Machine running | Active vCPU + resident RAM + written disk, per second, drawn from credits | $0.047 / active vCPU-h (€0.039); $0.014 / GiB-h resident RAM (€0.012); $0.000096 / GiB-h written disk (€0.00008) = $0.0701 / GiB-month | https://boxd.sh/pricing, https://boxd.sh/llms.txt |
| Shapes: 1/4, 2/8 (default), 4/16, 8/32 vCPU / GiB | Pay as you go: "Up to 8 vCPU · 32 GiB" (pricing page); default per-machine quota 8 vCPU / 32 GiB (resources guide). The FAQ still says 8/32 needs an email; the card follows the pricing page | Same rates. Only active vCPU and resident RAM are billed, so the shape sets the ceiling, not the bill | 2/8 at 100% active vCPU and full RAM: $0.206/h; 4/16: $0.412/h; 8/32: $0.824/h | boxd.sh/pricing, docs.boxd.sh/guides/resources |
| Larger than 8 vCPU / 32 GiB | Custom plan | Not published | null | boxd.sh/pricing |
| Standby (auto-suspend / `machine pause`) | Optional. Auto-suspend is off by default in the docs and triggers after N s with no inbound TCP/UDP | No vCPU; resident RAM still billed (frozen in host RAM) + written disk | $0.014 / GiB-h RAM + disk | boxd.sh/pricing FAQ ("a machine in standby pays for RAM and disk"). The docs conflict: they call it "near zero" (docs.boxd.sh/how-it-works/suspend-resume) |
| Hibernated (auto-hibernate) | On by default after 4 h with no *network* traffic (docs). Memory is written to disk; wake takes about 85 ms per the docs | Written disk only | $0.000096 / GiB-h ($0.0701 / GiB-month) | boxd.sh/pricing FAQ; docs suspend-resume |
| Stopped | `machine stop` | Written disk only | same disk rate | boxd.sh/pricing FAQ |
| Destroyed / auto-destroy | `idle.destroy_after` timer or explicit destroy | Nothing. Checkpoints die with the machine ("billing ends with the machine") | $0 | docs checkpoints |
| Checkpoints (up to 10 per machine, memory+disk, in-place restore) | Per machine | Not priced separately. Presumably part of the machine's written disk (unverified) | null | docs.boxd.sh/guides/checkpoints |
| Named snapshots (replicated, outlive the machine) | Golden images, fan-out | No published price | null | docs.boxd.sh/guides/snapshots |
| Disk backups to object storage | On demand, or on a schedule of 15 min or longer; 7-day default retention; sparse + dedup | No published price | null | docs.boxd.sh/guides/disaster-recovery |
| Volumes (detachable disks) | Optional | No published price. Presumably the written-disk rate (unverified) | null | docs python-sdk |
| Egress / bandwidth | Always | Not published anywhere (pricing, FAQ, egress docs) | null | boxd.sh/pricing, docs egress |
| Public IPv4 | n/a | Not offered per the docs: shared proxy IP, SSH on a per-machine port, 3 raw TCP/UDP forwards per machine. (boxd.sh/faq marketing says "a public IPv4"; docs table followed) | n/a | docs resources, boxd.sh/faq |
| Free credit | Adding a payment method | One-time $30 / €30. Afterwards auto top-up adds $20 / €20 at a time (amount can be changed or turned off) | $30 one-time | boxd.sh/pricing FAQ |
| No payment method | Before a card is added | Quota of 2 machines | — | docs resources |
| Org machine limit | Default, per region | 50 per org in the resources guide; 100 on the pricing page and llms.txt. **Hibernated machines included**. Owners can ask for up to 1000; above 1000 by email | 50 to 100 per region | docs resources, docs regions, boxd.sh/pricing |
| Custom (volume / bigger machines / SSO) | Contract | Volume pricing, not published | null | boxd.sh/pricing |
| Self-host / BYOC | Licence | Free up to 16 vCPUs ("It is free up to 16 vCPUs, and a licence lifts that limit"). Annual licence above that, priced by cluster size, not published | $0 up to 16 vCPUs; null above | boxd.sh/pricing |
| Currency regime | Account currency | EUR list or USD list, fixed per org. The USD list is about 1.2x EUR | — | boxd.sh/pricing (EUR/USD toggle) |
Price history: credit-metered regime since about 2026-08-31; ~20% rate cut seen 2026-10-14 (USD 0.059 / 0.018 / 0.00012 -> 0.047 / 0.014 / 0.000096); vCPU basis moved from full shape size to active vCPU, seen 2026-11-08.
## Gotchas
1. **Standby can cost more than hibernate.** Standby drops vCPU but keeps billing resident RAM. Hibernate is the cheap idle state. The docs say standby is "near zero"; the pricing page says it pays RAM. We follow the pricing page.
2. **Idle timers watch the network, not the CPU.** A CPU-bound job with no inbound traffic gets hibernated after 4 h by default, and its clocks freeze. A machine you walk away from keeps billing resident RAM (and any active vCPU) for about 4 h before it hibernates.
3. **RAM billed on resident memory flatters light workloads.** Page cache, a JVM heap, or Docker can push resident memory to the full allocation. Whether page cache counts as resident is not documented.
4. **vCPU is billed on active use.** A machine at 30% CPU pays 30% of its vCPU rate. A CPU-bound job pays the full rate.
5. **Shape ceiling is 8 vCPU / 32 GiB** on pay as you go. Larger machines are Custom, with no published price.
6. **Quota counts hibernated machines.** Parked machines use the same machine limit as running ones, per region.
7. **Unpublished prices:** snapshot, backup and volume storage, and egress. Disk is cheap at $0.0701/GiB-month, but only for written bytes. Forks share CoW blocks and start near zero.
8. **Credits, not invoices.** When the balance runs out, auto top-up in $20 steps keeps machines alive. With auto top-up off, what happens at zero balance is undocumented.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 machine-hours), 30% CPU utilisation, 50 GiB of snapshots retained, 100 GiB egress.
Assumptions:
- The shape is 4 vCPU / 16 GiB (self-serve) with 8 GiB resident. RAM is billed on resident memory, so the 16 GiB provisioned does not matter.
- Active vCPU is taken as CPU utilisation: 4 × 0.3 × 0.047 = $0.0564/h. RAM: 8 × 0.014 = $0.112/h. Hourly rate = **$0.1684/h**.
- The 50 GiB of retained state is billed as written disk on hibernated machines: 50 × $0.0701 = **$3.50**. Named-snapshot storage price is unknown.
- Egress: **unknown (null)**. Totals below exclude it.
- Idle hours per machine: 730 − 176 = 554 h/month.
| Regime | Computation | Monthly (USD) |
|---|---|---|
| A. Running, then hibernate / stop when idle (recommended) | 8,800 × 0.1684 = 1,481.92 + 3.50 disk | **$1,485.42** + egress |
| A′. Same, resident RAM only 4 GiB (sensitivity) | 8,800 × (0.0564 + 0.056) = 989.12 + 3.50 | $992.62 |
| A″. Same, CPU-bound (100% active vCPU) | 8,800 × (0.188 + 0.112) = 2,640.00 + 3.50 | $2,643.50 |
| B. Running, then left alone until default auto-hibernate (4 h extra per workday, upper bound at the same rate) | 1,481.92 + 50 × 4 × 22 × 0.1684 = 740.96 + 3.50 | **≤ $2,226.38** |
| C. Running, then standby overnight and weekends | 1,481.92 + 50 × 554 × 8 × 0.014 = 3,102.40 + 3.50 | **$4,587.82** |
| D. Destroy after each session, keep 50 GiB as named snapshots | 1,481.92 + snapshot storage (unpublished) | $1,481.92 + null |
| E. Default shape 2 vCPU / 8 GiB (half the CPU ceiling) | 8,800 × (2 × 0.3 × 0.047 + 0.112) = 1,233.76 + 3.50 | $1,237.26 |
| F. EUR list, regime A | 8,800 × (4 × 0.3 × €0.039 + 8 × €0.012) = €1,256.64 + 50 × €0.0584 = €2.92 | **€1,259.56** (USD depends on FX) |
| G. Custom / volume | not published | null |
Free credit: −$30 once, in the first month only. Quota: 50 concurrent fits the lower documented limit (50 per org per region), and hibernated machines count toward it. In A, the 50 hibernated machines are the same 50, so it fits. In D, snapshots do not count as machines.
https://boxd.sh/pricing, https://boxd.sh/llms.txt, https://docs.boxd.sh/guides/resources, https://docs.boxd.sh/guides/regions,
https://docs.boxd.sh/how-it-works/suspend-resume, https://docs.boxd.sh/guides/snapshots, https://docs.boxd.sh/guides/checkpoints,
https://docs.boxd.sh/guides/disaster-recovery, https://docs.boxd.sh/guides/egress
