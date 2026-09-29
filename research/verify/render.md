# Verify: render (2026-09-28, independent verifier)
Sources re-fetched live: render.com/pricing (static HTML, full compute tables + comparison table), render.com/docs/sandboxes.
| Item | Result | Note |
|---|---|---|
| Hobby $0, Pro $25, Scale $499 /mo + compute; Enterprise custom | confirmed | pricing |
| Hobby 25 services, 1 seat; Pro/Scale unlimited seats and services | confirmed | pricing |
| Bandwidth 5 GB / 25 GB / 1 TB then $0.15/GB | confirmed | pricing |
| Service compute: 0.5c-512mb $7, 1c-2g $25, 2c-4g $85, 2c-8g $135, 2c-16g $200, 4c-8g $175, 4c-16g $225, 4c-32g $350, 8c-16g $300, 8c-32g $450, 8c-64g $1,000, 12c-24g $450, 12c-48g $800, 12c-96g $1,500 | confirmed | pricing |
| Billing prorated to the second; fee waived with no services/activity | confirmed | pricing FAQ |
| Cron per-minute prices (0.5c $0.00016 ... 4c-8g $0.00405 ... 8c-64g $0.02315) | confirmed | pricing; x60 matches the card |
| Workflows flex $0.20/CPU-h + $0.05/GB-h (up to 1 CPU / 4 GB); fixed $0.40/$0.70/$1.00/$1.50/$2.50 | confirmed | pricing |
| Concurrent task runs 20 / 50 / 100, +$10/mo per 50; task plans "Up to Pro" on Hobby | confirmed | pricing |
| Persistent disk $0.25/GB-mo | confirmed | pricing |
| Dedicated IPs $100/mo per IP set; PrivateLink $30/mo (3 links) + $0.03/GB | confirmed | pricing |
| Pipeline 500 / 1K / 5K min then $5/1K; performance $25/1K | confirmed | pricing |
| Custom domains 2 / 15 / 25 included, then $0.25/mo | confirmed | pricing (card says Hobby 2 / Pro 15, correct) |
| HIPAA premium 20% | confirmed, with wording nuance | pricing table says "20% compute premium"; the card/regime (from the HIPAA doc) say "all usage". Knob applies it to compute rate only, which matches the pricing-page wording |
| Startup credits up to $100K, migration up to $10K | confirmed | pricing |
| Sandboxes early access, request access, "discuss production use with your Render contact" | confirmed | docs/sandboxes |
| EA limits 2 CPU / 4 GB / 10 GB, 100 concurrent, 100 req/min, 1 group, 24 h, Oregon only; fs/runtime snapshots expire after 3 days | confirmed | docs/sandboxes |
| Sandbox price | unverifiable | no price anywhere (hour null, flags beta+sales, correct) |
| Free instance 750 h / 15-min spin-down | not re-checked | docs/free cited |
breakdown line still shows the account-default egress figure ($14.25 vs the $11.25 actually charged). This is a display
Corrections: none.