# Google Colab — billing regimes
As of 2026-09-28. Prices are USD unless explicitly labelled otherwise. Source type: official published list/promo or unknown, never a fabricated quote.
Notebook execution backend discovered inDatalayer code-sandboxes; not a provisioned general-purpose sandbox API. Free/Pro/Pro+ hardware capacity andcomputeunit economics are not arbitrary4/8 VM-hours.
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| Free notebook | Interactive quota | Free access is capacity-limited, not guaranteed50way hosting. | https://developers.google.com/colab |
| Pro/Pro+ | Notebook subscriptions | Computeunits, variablehardware; dollar-rate conversion not established. | https://developers.google.com/colab |
## Gotchas
- Notebook execution backend discovered inDatalayer code-sandboxes; not a provisioned general-purpose sandbox API. Free/Pro/Pro+ hardware capacity andcomputeunit economics are not arbitrary4/8 VM-hours.
- Not fully priceable in ENGINE_CARD: unknown USD resource rates or machine shape. Null is not zero; do not rank as a free provider.
- Features set to null were not verified. No sandbox was purchased or tested; feature/performance statements are documentation claims. Null maximums are unknown unless a cited note explicitly states unlimited.
- A complete monthly bill requires known snapshot/egress/plan limits; do not silently treat missing ancillary charges as free.
## Worked workload
4 vCPU / 8 GiB; 50 simultaneous instances × 8 h/day × 22 days = **8,800 instance-hours**, **35,200 vCPU-hours**, **70,400 GiB-hours**. At 30% observed CPU:10,560 active-vCPU-hours only where the meter actually uses utilization. Assume one start/instance/day:1,100starts. Retain50GiB snapshots for a month;100GiB outbound. Active disk capacity was not specified.
No guaranteed50concurrent4/8runtimes or50GiBVM snapshots. Notebook service quotas/acceptable-use andhardware variability prevent a valid machinebill. Do not rank free quota aszero-cost cloudVMS.
## Sources
- https://developers.google.com/colab
- https://github.com/datalayer/code-sandboxes/tree/d9c39925d87447dab5f3f7f1bdf9451ec4ebca2a/code_sandboxes/sandboxes/google_colab