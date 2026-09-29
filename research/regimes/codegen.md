# Codegen: current product/pricing ambiguity
As of 2026-09-28. Category: `agent-platform`. USD list prices unless explicitly labelled otherwise.
| Regime | When / unit | Price | Source |
|---|---|---|---|
| Hosted Codegen agents | Agent runs with repositories/integrations | Current public subscription/credit/compute tariff null | [Docs](https://docs.codegen.com/introduction/overview), [FAQ](https://docs.codegen.com/introduction/faq) |
| Enterprise / on-prem | Contract and customer infrastructure | null; no public compute-size/rate quote established | [On-prem deployment](https://docs.codegen.com/settings/on-prem-deployment) |
| Former public pricing URL | Current webpage no longer a pricing table | Not a verifiable price | [codegen.com/pricing](https://codegen.com/pricing) |
## Findings / gotchas
The fetched pricing URL instead presents a developer-tool directory and says Codegen joined ClickUp. The documentation index still exposes agent/API/SDK/settings pages, but no current billing page; attempted `/pricing.md` and `/settings/billing.md` return 404. Existing docs do not prove a live self-serve SKU is currently available. Do not carry historical "$150/month", credit allowances or supposed free compute forward from comparison articles.
Unit conversion, CPU/RAM/disk, simultaneous runs, task lifetime, bundled token allowance, overage and pause billing all remain **null**. BYOK/on-prem, if contracted, shift inference/infrastructure spending rather than make it disappear.
## Worked examples
Neither one developer nor 50 concurrent 4/8 workers × 176 hours can receive a sourced bill from public evidence. Quote needs platform minimum, inference ownership, VM profile, billed runtime, concurrency, retention and egress. Normalized hourly compute and standard 50-GiB snapshot/100-GiB egress example remain null. Regime-only and explicitly unrankable—not zero-priced and not presumed discontinued.