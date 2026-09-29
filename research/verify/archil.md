# Verify: archil (2026-09-28)
Sources re-fetched: https://archil.com/pricing (full text), https://docs.archil.com/llms-full.txt (sandboxes intro, firewall,
metering, billing, serverless execution, overview).
| Item | Result |
|---|---|
| Developer $0/mo: 10 GB perf storage then $0.30/GB-mo; 30 sandbox-min then $0.27/h; up to 5 file systems; no card | confirmed |
| Team $500/mo: 1 TB then $0.20/GB-mo; 1,000 min then $0.18/h; unlimited FS; orgs; BAA & DPA | confirmed |
| Team fee is not usage credit (fee_is_credit false) | confirmed (page lists allowances, no credit wording) |
| Enterprise custom: volume pricing, BYOC/on-prem, 24/7, SSO & SCIM, SLA | confirmed; >50 TB volume discounts confirmed |
| "Sandboxes are 2 vCPU · 4 GB RAM" (only priced size) | confirmed |
| Archive $0.025/GB-mo; out-of-region FS egress $0.05/GB; no IOPS/per-volume/minimum fees; prices for AWS us-east-1, "other regions vary" | confirmed |
| Docs billing page still says flat $0.20/GiB-mo and "no egress fees" (conflict) | confirmed |
| API accepts 1-32 vCPU, 0.25-64 GiB, x86-64 | confirmed |
| Developer plan denies all sandbox egress; persists after upgrade until policy replaced | confirmed |
| Preview, may be pre-empted; host failure loses memory state | confirmed |
| Pause "stop the sandbox from incurring charges, keeping running application state" (snapshot "mem") | confirmed |
| maxTtlSeconds 60-86,400 default 86,400; idleTtl default 0 (off); updating resets the deadline | confirmed |
| "For every 1 TB in Active Data, you receive 1,000 minutes of free sandbox compute"; serverless exec 1,000 min/TB, 100 ms minimum | confirmed; stacking with Team's allowance unverifiable |
| Regions us-east-1, us-west-2, eu-west-1 (features.regions us, eu) | confirmed |
| SOC 2 certified, HIPAA/GDPR compliant | confirmed |
| included_usd 0.135 (Dev) / 3.00 (Team) = included minutes x rate | confirmed arithmetic |
| Engine read: requires_plan string per mode is wrapped into a list by engine.js, so each size is only priced on its own plan; Developer (fee 0) is a genuine ongoing tier, not trial_only | confirmed as intended; note the engine will pick Developer (cheapest) even though it cannot reach the internet (caveat present, not modelable) |
| ComputeSDK perf numbers | unverifiable this pass (fetch blocked by a session limit) |
No corrections needed.