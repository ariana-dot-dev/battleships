# Hyperbeam — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Base | Connected participants | Participant-minutes | $0.007/minute; 10,000 monthly free | https://hyperbeam.com/ |
| Graduated volume | Total monthly participant-minutes crosses threshold | Discount only minutes within each band | 60 k 5%; 300 k 10%; 600 k 15%; 3 m 25%; 6 m 35%; 12 m 45% | https://hyperbeam.com/ |
| Enterprise | High-volume/custom sessions | Quote | Calculator offers sales at $1,000 bill or 25 participants | https://hyperbeam.com/ |
| Pay as you go | Account plan | Monthly fee / commitment | $0; concurrency unpublished/custom; 10,000 free participant-minutes/month = $70 base-rate equivalent. Shared allowance; never subtract again as free.monthly_credit. | https://hyperbeam.com/ |
## Gotchas
- Calculator counts all participants, not just participants after the first. One browser watched by three people can incur three participant streams. Headless use with zero watchers has no verified tariff.
- Embedded save states, multi-user control and WebGL are documented; no separate storage/proxy/CAPTCHA tariff found. Machine resource guarantees are unpublished.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Assume exactly one continuously connected participant per computer. 8,800 h=528,000 participant-minutes. Base after 10,000 free: $3,626; subtract 240,000×.007×5%=$84 and 228,000×.007×10%=$159.60: **$3,382.40** native streaming subtotal. It triggers the sales suggestion, not a forced published enterprise plan. Fifty simultaneous VM availability, 4/8 hardware, snapshots and egress are not verified. Two watchers change this bill; 30% CPU does not.
## Sources
- https://hyperbeam.com/
- https://docs.hyperbeam.com/llms-full.txt
- https://next.hyperbeam.com/