# Amika — regimes (2026-11-08)
YC: Fall 2025; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/amika
Infra to build your own software factory
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand (hosted) | Public listed mode | resource, per second; CPU alloc, memory alloc | $0.05292/vCPU-h + $0.01701/GiB-h memory + $0.0001134/GiB-h storage; multiplier 1 | https://www.amika.dev/pricing |
| Free | Plan limits apply | No fee; one-time credit | fee=0; $50 credit per organization to start; up to 3 active users; up to 10 concurrent service-account sandboxes | https://www.amika.dev/pricing |
| Team | Plan limits apply | Per active user | $30/mo per active user; 10 concurrent service-account sandboxes included, then $2/mo each | https://www.amika.dev/pricing |
| Enterprise | Plan limits apply | Custom | committed volume pricing; SSO, SCIM, audit logs; GPUs and custom sizes | https://www.amika.dev/pricing |
| Own machines | Any plan | Not metered | hours on your own machines are never charged | https://www.amika.dev/pricing |
| Snapshots / GiB-month | Lifecycle/scope must be checked | Native | not published | https://www.amika.dev/pricing |
| Egress / GiB | Lifecycle/scope must be checked | Native | not published | https://www.amika.dev/pricing |
| IPv4 / month | Lifecycle/scope must be checked | Native | not published | https://www.amika.dev/pricing |
## Verified billing facts and gotchas
1. BYO LLM keys; no token markup. Allocated-vs-utilized CPU wording not specified: conservatively model allocated.
2. Pricing example: "A standard sandbox with 2 vCPU, 4 GiB of memory, and 10 GiB of storage costs about $0.18 per hour."
3. Only running service-account sandboxes count toward concurrency; paused, stopped and people-started sandboxes do not.
4. Persistent rigs keep their filesystem across stop and start. Whether storage is billed while stopped is not published.
5. No beta, early-access or waitlist wording on the pricing page or homepage (2026-11-08).
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**.
Hourly rate: 4×$0.05292 + 8×$0.01701 = $0.34776. Compute: 8,800×$0.34776 = $3,060.29.
Team, one active user: $30 + 40 extra slots × $2 = $110. Total ≈ $3,170.29 − $50 one-time credit, before storage, unknown egress and LLM spend.
## Sources and coverage
- https://www.ycombinator.com/companies/amika
- https://www.amika.dev/pricing
- https://docs.amika.dev
- https://docs.amika.dev/guides/what-is-a-rig.md
- https://www.amika.dev/
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Downloaded docs do not imply every feature was verified; unsupported assertions remain null.
