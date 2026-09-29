# Koyeb: pricing regimes (as of 2026-09-28)
Koyeb Sandboxes (public preview since 2025-11-19) are Koyeb services running on Koyeb Instances: Cloud Hypervisor microVMs on bare metal. They are billed **per second on a fixed instance type**, plus a monthly plan subscription whose fee only partly returns as included usage. Koyeb was acquired by Mistral AI (announced 2026-02-17). Since about 2026-02-26 new users must subscribe to Pro/Scale/Enterprise, because the free Starter plan was removed.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Standard instances | All regions (fra, was, sin, tyo, par, sfo preview, aws-us-east-1 on Scale). AMD EPYC Genoa, NVMe | Per second on the instance while running. RAM is fixed at **1 GB/vCPU** (nano to 2xlarge) | nano 0.25/0.25 $0.0036/h · micro $0.0072 · small 1/1 $0.0144 · medium 2/2 $0.0288 · large 4/4 $0.0576 · **xlarge 8/8 $0.1152** · 2xlarge 16/16 $0.2304 · 3xlarge 24/32 $0.4608 · 4xlarge 32/64 $0.9216 · 5xlarge 40/128 $1.8432 | https://www.koyeb.com/pricing (Standard tab), https://www.koyeb.com/docs/reference/instances |
| 2 | **Eco instances** | Only was / fra / sin. Older AMD EPYC Milan, "half the cores" of the same-priced standard type, small disk (max 20 GB). **No volumes** | Per second. Same $/h ladder as standard, but **2 GB/vCPU** | eNano 0.1/0.25 $0.0022 · eMicro 0.25/0.5 $0.0036 · eSmall 0.5/1 $0.0072 · eMedium 1/2 $0.0144 · eLarge 2/4 $0.0288 · **eXLarge 4/8 $0.0576** · e2XLarge 8/16 $0.1152 | https://www.koyeb.com/pricing (Eco tab), https://www.koyeb.com/blog/new-eco-instances-the-most-affordable-way-to-deploy-apps-globally |
| 3 | GPU instances | GPU sandboxes supported ("CPU and GPU instances"). Plan GPU concurrency: Pro 20, Scale 40 | Per second, **bundled** vCPU/RAM/disk per GPU | RTX-4000-SFF-ADA 0.50 (6 vCPU/44 GB) · L4 0.70 (6/32) · RTX-A6000 0.75 · L40S 1.20 (15/64) · A100 1.60 (15/180) · A100 SXM 2.15 · RTX PRO 6000 2.20 · H100 2.50 · H200 3.00 · B200 5.50. Multi-GPU linear (8x H100 $20, 8x H200 $24, 8x A100 SXM $17.20). Tenstorrent N300s on request | https://www.koyeb.com/pricing (GPU tab) |
| 4 | Pro plan | Entry paid plan (required for new signups) | $29/month fee with **$10 included compute** (not a full credit) | 10 users, 100 services, CPU concurrency 100, GPU 20, 1 TB bandwidth, 5 builds. Light sleep window 5 min-3 h, deep sleep 5 min-6 h | https://www.koyeb.com/pricing, /docs/faqs/pricing, /docs/run-and-scale/scale-to-zero |
| 5 | Scale plan | Needs more than 100 services/instances, AWS regions, SLA | $299/month with **$100 included** | 50 users, 1,000 services, CPU concurrency 1,000, GPU 40, 99.9% SLA. Sleep windows up to 6 h light / 12 h deep | same |
| 6 | Enterprise | Sales | "Starting at $1,000/mo", $500 included usage | Custom CPU/RAM/GPU, 50 regions, BYOC, dedicated racks, SSO, ISO27001/SOC2, 99.99% SLA | https://www.koyeb.com/pricing |
| 7 | Starter (legacy) | Accounts created before about 2026-02-26 only | Pay-as-you-go, no fee, no included usage | Light sleep fixed 5 min, deep sleep ≤ 1 h 05 | https://www.koyeb.com/blog/koyeb-is-joining-mistral-ai-to-build-the-future-of-ai-infrastructure, https://github.com/robhunter/agentdeals/issues/2180 |
| 8 | Savings plans / long-term reservations | Contact sales | Committed capacity | "**up to 50% off** the on-demand price" | https://www.koyeb.com/pricing |
| 9 | Running, idle before sleep | Between the last request and the idle period expiring | Full instance rate | Minimum idle period 5 min (all plans) | /docs/run-and-scale/scale-to-zero |
| 10 | **Light Sleep** (snapshot-based, ~200 ms wake) | Scale-to-zero, first stage | **Free during public preview.** "Once it is Generally Available, there will be a cost associated" (amount unpublished) | $0 now, null later | /docs/run-and-scale/scale-to-zero |
| 11 | Deep Sleep (VM discarded, 1-5 s cold start) | After the deep-sleep window | No compute billed ("No charges for paused Services") | $0 | same; /docs/faqs/pricing |
| 12 | Auto-delete | `delete_after_delay` (60 s-24 h after create), `delete_after_inactivity_delay` (≤ 12 h after scale-to-zero) | Stops all billing | n/a | /docs/sandboxes/sandbox-lifecycle |
| 13 | Instance disk | Local NVMe SSD included in the instance price, ephemeral | Included | 20 GB (eXLarge) / 80 GB (xlarge) | pricing tabs |
| 14 | Volumes (preview) | was/fra only, 1-10 GB, single-instance services, **not on eco** | Price not published (the pricing page lists "NVMe Volumes and Snapshots" as a Pro feature) | null | /docs/reference/volumes |
| 15 | Volume snapshots (preview) | Volumes only. There is **no sandbox snapshot API** | "Free during the public preview". A search-engine snippet claims 10 GB free then $0.08/GB-month, but no official page confirms it | $0 now; $0.08 unverified | https://www.koyeb.com/blog/snapshots-create-a-point-in-time-copy-of-your-high-performance-volumes |
| 16 | Egress | Outbound to the internet | Pricing page: **1 TB/month included** (Pro and Scale), then $0.02/GB US/EU, $0.04/GB Asia. The older FAQ says 100 GB free then $0.04 | $0.02 / $0.04 | https://www.koyeb.com/pricing, /docs/faqs/pricing |
| 17 | Custom domains | Beyond 100 (Pro) / 500 (Scale) | "not charged yet, but will be" | $0.20/month each | /docs/faqs/pricing |
| 18 | Free instance | One per org: 0.1 vCPU/512 MB, fra/was | Free, sleeps after 1 h. Not a sandbox size. It is unclear whether it survives on paid plans only | $0 | /docs/reference/instances |
| 19 | Startup program | Application | Credits | up to $30k | https://www.koyeb.com/pricing |
## Gotchas
1. **The plan fee is mostly not credit.** Pro's $29 returns only $10 of usage, and Scale's $299 only $100, so there is a $19 and a $199 dead-weight floor. Since Feb 2026 new users can't use Starter, so the floor is unavoidable.
2. **Eco vs standard at the same price.** eXLarge (4 vCPU/8 GB, $0.0576/h) matches 4/8 exactly. On standard, 8 GB of RAM forces xlarge (8 vCPU/8 GB) at **twice** the price.
   - Eco uses older Milan CPUs and has a 20 GB disk max.
   - Eco exists only in was/fra/sin, and volumes can't attach to it.
   - Whether sandboxes may use eco types is **not documented**.
3. **Light Sleep is free only "during public preview"** and will be charged at GA (rate unknown). Keeping sandboxes warm will get more expensive.
4. **"CPU concurrency" of 100 (Pro) is ambiguous.** It could count instances or vCPUs. If it means vCPUs, 50 × 4-vCPU sandboxes need Scale. Every sandbox is also a *service*, capped at 100 (Pro) / 1,000 (Scale).
5. **No sandbox snapshots or forks.** State survives only in (preview, 10 GB max, non-eco) volumes. The 50 GiB snapshot requirement can't really be met.
6. **CPU is not fully dedicated.** Per the docs, "at least 0.25 dedicated vCPU per GB memory, burstable to all cores". A standard 4 vCPU/4 GB large is guaranteed only 1 vCPU.
7. **Bandwidth rules conflict.** The pricing page says 1 TB included then $0.02/GB. The FAQ says 100 GB then $0.04.
8. "Billing is rounded up to the nearest unit" (FAQ): the unit is not defined.
9. Mistral acquisition: the roadmap is tilting to inference/enterprise. Sandboxes are still "public preview".
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU util, 50 GiB snapshots retained, 100 GiB egress.
Assumptions:
- Sandboxes scale to zero outside hours (deep sleep = $0).
- 100 GiB egress is inside the 1 TB allowance.
- Snapshots: none available for sandboxes, so $0 (the unverified $0.08 rate would add (50−10) × 0.08 = $3.20).
| Regime | Compute | Idle tail (5 min/session) | Plan fee − included | Egress | **Monthly total** |
|---|---|---|---|---|---|
| Eco eXLarge (4/8), Pro | 8,800 × 0.0576 = $506.88 | 91.7 h × 0.0576 = $5.28 | 29 − 10 = $19 | $0 | **$531.16** |
| Eco eXLarge, Scale (if "CPU concurrency" counts vCPU) | $506.88 | $5.28 | 299 − 100 = $199 | $0 | **$711.16** |
| Standard xlarge (8/8, nearest fit), Pro | 8,800 × 0.1152 = $1,013.76 | $10.56 | $19 | $0 | **$1,043.32** |
| Standard large (4/4): does **not** meet 8 GiB | $506.88 | $5.28 | $19 | $0 | $531.16 (under-sized) |
| Starter legacy (old accounts), eco | $506.88 | $5.28 | $0 | $0 | **$512.16** |
| Never sleeping (730 h), eco, Pro | 50 × 730 × 0.0576 = $2,102.40 | n/a | $19 | $0 | **$2,121.40** |
| Savings plan, best case 50% off, eco, Pro | $253.44 | $2.64 | $19 | $0 | **≈ $275.08** (sales; "up to") |
| Enterprise | from $1,000/mo with $500 included | | | | **≥ $1,012.16** ($1,000 + usage above $500; eco rates, before negotiation) |
- The 30% utilisation changes nothing, because billing is on the instance.
- Light Sleep is free today. If it gets a GA price, idle-warm time will cost extra.
Sources: https://www.koyeb.com/pricing (Standard/Eco/GPU tabs rendered on the boat VM 2026-09-28) · https://www.koyeb.com/docs/reference/instances · https://www.koyeb.com/docs/faqs/pricing · https://www.koyeb.com/docs/run-and-scale/scale-to-zero · https://www.koyeb.com/docs/sandboxes · https://www.koyeb.com/docs/sandboxes/sandbox-lifecycle · https://www.koyeb.com/docs/reference/volumes · https://www.koyeb.com/docs/reference/snapshots · https://www.koyeb.com/blog/koyeb-sandboxes-fast-scalable-fully-isolated-environments-for-ai-agents · https://www.koyeb.com/blog/new-eco-instances-the-most-affordable-way-to-deploy-apps-globally · https://www.koyeb.com/blog/snapshots-create-a-point-in-time-copy-of-your-high-performance-volumes · https://www.koyeb.com/blog/koyeb-is-joining-mistral-ai-to-build-the-future-of-ai-infrastructure · https://github.com/robhunter/agentdeals/issues/2180