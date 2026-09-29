# Alibaba Cloud AgentBay — International AgentBay sandbox sessions
As of 2026-09-28. International USD list prices effective May 18 2026; do not substitute mainland CNY prices. Authoritative FAQ says running undeleted sessions incur CPU/RAM charges while idle. Built-in model Credits separate from infrastructure.
## Regimes
| Regime | When it applies | How billed / numbers | Source |
|---|---|---|---|
| CPU | Native product usage | 0.027 USD/core-hour, per second; allocated running time. | [Primary pricing](https://www.alibabacloud.com/help/en/agentbay/product-overview/agentbay-billing-instructions) |
| Memory | Native product usage | 0.0113 USD/GB-hour, per second; running allocation. | [Primary pricing](https://www.alibabacloud.com/help/en/agentbay/product-overview/agentbay-billing-instructions) |
| Context storage | Native product usage | 0.000045 USD/GiB-hour after 100 GiB Basic or 1 TiB paid plan allowance; minimum MiB. | [Primary pricing](https://www.alibabacloud.com/help/en/agentbay/product-overview/agentbay-billing-instructions) |
| Premium bandwidth | Native product usage | 0.123 USD/GB INBOUND; separate from basic 10 Mbps. | [Primary pricing](https://www.alibabacloud.com/help/en/agentbay/product-overview/agentbay-billing-instructions) |
| Model Credits | Native product usage | 0.0267 USD/Credit; Browser Use 16.8 input/134.4 output Credits per million tokens; Mobile Use 11.2/89.6. | [Primary pricing](https://www.alibabacloud.com/help/en/agentbay/product-overview/agentbay-billing-instructions) |
| Ultra concurrency scale-out | Native product usage | 1.50 USD/additional concurrent slot/month above 200. | [Primary pricing](https://www.alibabacloud.com/help/en/agentbay/product-overview/agentbay-billing-instructions) |
| Basic | Account plan | $0/month; 100 GiB Context/replay storage,10 Mbps basic bandwidth; compute extra. | [Primary pricing](https://www.alibabacloud.com/help/en/agentbay/product-overview/agentbay-billing-instructions) |
| Pro | Account plan | $149/month; 1 TiB Context/replay storage; custom images;10 Mbps basic bandwidth; compute extra. | [Primary pricing](https://www.alibabacloud.com/help/en/agentbay/product-overview/agentbay-billing-instructions) |
| Ultra | Account plan | $225/month; 1 TiB Context/replay storage; expand concurrency above 200 at 1.50 USD/slot/month; compute extra. | [Primary pricing](https://www.alibabacloud.com/help/en/agentbay/product-overview/agentbay-billing-instructions) |
## Gotchas
- CPU and RAM actual usage time wording does not mean CPU utilization: FAQ explicitly charges running idle sessions.
- Premium bandwidth$0.123/GB is **inbound**, not generic outbound egress; do not swap directions.
- Included 100 GiB/1 TiB storage is Context and recordings, not root disk or guaranteed full VM snapshot retention.
- Eight-hour sessions and region/image capacity not confirmed by pricing page alone.
- Credits 0.0267 USD/unit meter LLM tokens only; subscription fees are not converted into compute credits.
- SDK source is open, not proof of self-hostable hosted runtime.
- Original public product launch date unverified here; public 2026 pricing update and SDK establish presence, not founding.
## Required worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU, 50 GiB retained snapshots and 100 GiB egress.
50 concurrency requires Pro 149 USD/month rather than Basic 10 limit. Known compute `8,800×(4×.027+8×.0113)`=**$1,745.92**, plus Pro fee=**$1,894.92**. CPU 30% does not discount idle allocation. If 50 GiB are Context data, they fit 1 TiB allowance; this does not establish 50 GiB VM snapshot support.100 GiB outbound egress is not priced by the premium INBOUND meter. Eight-hour session eligibility and full total remain unconfirmed.
## Feature evidence
- https://www.alibabacloud.com/help/en/agentbay/product-overview/agentbay-pricing-adjustment-announcement
- https://www.alibabacloud.com/help/en/agentbay/product-overview/what-is-eds-agentbay
- https://github.com/aliyun/wuying-agentbay-sdk
- https://www.alibabacloud.com/help/en/agentbay/agentbay-codespace
- https://www.alibabacloud.com/help/en/agentbay/computeruse
- https://www.alibabacloud.com/help/en/agentbay/agentbay-mobile-use