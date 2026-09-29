# Verify: arker (2026-09-28)
Sources re-fetched: https://arker.ai/docs/pricing.md, https://arker.ai/pricing (307 -> /console/pricing, login), https://arker.ai/docs/api/pools.md,
https://arker.ai/docs/api/policies.md, https://arker.ai/docs/deployment.md, https://arker.ai/docs/regions.md, https://arker.ai/docs/changelog.md.
| Item | Result |
|---|---|
| No public rate card; arker.ai/pricing redirects to login-gated console | confirmed (HTTP 307 Location /console/pricing) |
| Planning table AWS US 1 mo $137,047 / $271,572; 12 mo $110,259 / $218,488; 24 mo $105,756 / $209,565; 36 mo $70,504 / $139,710 | confirmed |
| Derived hours 0.187736 / 0.372016; 0.151040 / 0.299299; 0.144871 / 0.287075; 0.096581 / 0.191384 (÷1,000 ÷730) and month_caps | confirmed arithmetic |
| Shapes small 2/8/32, large 4/16/32; prices exclude persistent storage and taxes | confirmed |
| Discounts 0/19.55/22.83/48.56% AWS, 0/3/5/7.69% Hetzner, 0/10/20/30% Scaleway; D(x) polynomials | confirmed |
| EU rows "proposed prices, not currently published offers": Hetzner $22,074 / $51,556 (36 mo $20,376 / $47,591), Scaleway $22,603 / $45,205 (36 mo $15,822 / $31,644) | confirmed; derived hours 0.030238 / 0.070625, 0.030963 / 0.061925 confirmed |
| Hetzner markup 30% -> 20%, Scaleway 50% -> ~24% | confirmed |
| "Charge for run time, not machine time"; suspend policy while outbound pending / between inbound | confirmed (pricing.md, policies.md) |
| Pools: private access for partnered background-agent companies, min 30 days, billed on next invoice, cannot be deleted, normal rates after ends_at; example 32 vCPU / 64 GiB / 256 GiB 30 d = 142,800 cents | confirmed |
| No free tier | confirmed (deployment.md) |
| GPUs A100 40/80, H100, H200 in arker us-west; A100-80 in gcp us-central1; graviton (arm64) regions; EU regions arker eu-central, aws eu-north-1 | confirmed (regions.md) |
| Fractional vGPU from 0.125 | unverifiable this pass (not in pages re-fetched) |
| Changelog Sep 2026 pools + eu-north-1, Aug queueing, Jul egress/scaling policies | confirmed |
| Egress, IPv4, GPU, storage prices | confirmed unpublished (null) |
| Engine: commit modes requires_always_on + sales; EU modes beta+sales (opt-in only); sizes basis alloc | confirmed correct interpretation |
| Docs competitor row "Box by ASCII" = boat.dev ($0.036/h default) | noted; competitor claim, not used |
No corrections needed.