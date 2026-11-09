# Kernel — pricing regimes
As of 2026-11-08. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Browser runtime | Active headless/headful/GPU | Per second | $0.0000166667 / $0.0001333336 / $0.0008000016 per second | https://kernel.sh/docs/info/pricing |
| Headless 2 / 4 GiB | `memory` set on create (since 2026-10-16) | Per second, derived from $0.0000166667/GB-second | $0.12 / $0.24 per hour (derived; the docs table lists only the 1 GB rate) | https://kernel.sh/docs/browsers/concurrency-and-limits |
| GPU large | `video_memory: 6GiB` on create; Start-Up+ | Per second | 2x the GPU rate = $5.76/hour; 8 vCPU / 12 GiB / 6 GiB video memory (default GPU: 4 vCPU / 6 GiB / 3 GiB) | https://kernel.sh/docs/browsers/gpu-acceleration |
| Standby | 5 seconds without CDP or live-view activity | No runtime charge | $0 but concurrency slot held | https://kernel.sh/docs/info/pricing |
| Pools | Idle prewarmed capacity | Free idle runtime/disk | Reserved pool size counts toward concurrency even unacquired | https://kernel.sh/docs/info/pricing |
| Proxy / stealth / CAPTCHA | Managed service | Included | $0 extra; proxy configuration plan-gated; datacenter proxies deprecated 2026-10-16 | https://kernel.sh/docs/info/pricing |
| App runtime | Serverless agent execution | Active code runtime | $0.24000048/hour plus browsers and LLMs | https://kernel.sh/docs/info/pricing |
| Free / Developer | Account plan | Monthly fee / commitment | $0; concurrency 5; 1-day replays, 3 auth connections and vaults. | https://www.onkernel.com/pricing |
| Hobbyist | Account plan | Monthly fee / commitment | $30; concurrency 10; 7-day replays; configured proxies, unlimited auth/vaults. | https://www.onkernel.com/pricing |
| Start-Up | Account plan | Monthly fee / commitment | $200; concurrency 150; GPU, regional browsers and BYO proxy; 30-day replays. App concurrency 50 org /20 per app. | https://www.onkernel.com/pricing |
| Enterprise | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; SSO, HIPAA BAA, dedicated support, ZDR, custom limits. | https://www.onkernel.com/pricing |
## Gotchas
- The homepage GB-second rate and docs preset rates agree: 1 GB headless, 8 GB headful. 16 GB is a documented headful option. Do not charge CPU+RAM again on top.
- Standby billing is based on browser activity, not CPU utilization. An open active live view/CDP workload may prevent savings. Pool and standby browsers continue consuming concurrency.
- Pool availability conflicts internally: feature table says all tiers; FAQ says Start-Up and Enterprise. Fifty-browser example already needs Start-Up.
- Idle pool disks are free, but snapshot_gib_month stays null because general snapshot storage is not priced. Browser profiles are not general disks.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser vCPU is not published for headless and headful browsers. GPU browsers publish 4 vCPU / 6 GiB (default) and 8 vCPU / 12 GiB (large). Memory is set on create and cannot change on a running browser.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
50 concurrency requires Start-Up. At 8,800 fully active hours: headless $200+max(0,528.001056−50)=**$678.001056**; 8 GiB headful **$4,374.008448**; GPU **$25,494.050688**. Managed proxies have no per-GB charge. These are native browser subtotals, not guaranteed 4-vCPU machines. If a measured fraction a enters paid active runtime, replace hours with 8,800 a; 30% CPU alone cannot set a. General 50 GiB snapshots are not priced.
## Sources
- https://www.onkernel.com/pricing
- https://docs.kernel.sh/llms-full.txt
- https://kernel.sh/docs/info/pricing
- https://kernel.sh/docs/browsers/standby
- https://kernel.sh/docs/browsers/headless
- https://kernel.sh/docs/browsers/viewport
- https://kernel.sh/docs/browsers/processes