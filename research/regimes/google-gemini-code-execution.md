# Gemini API code execution (not Agent Engine)
As of 2026-09-28. Category: `agent-platform`. USD list prices unless explicitly labelled otherwise.
| Regime | When / unit | Price | Compute / caps | Source |
|---|---|---|---|---|
| Gemini API built-in code execution | Model-generated code within response | No extra tool-enablement fee; normal model token charges | Python, fixed libraries; no custom library installs; environment max runtime 30 seconds; CPU/RAM/disk null | [Code execution](https://ai.google.dev/gemini-api/docs/code-execution) |
| Model inference | Input/output and tool-generated content | Model-specific; not a VM tariff | Generated code and execution results affect billed tokens | [API pricing](https://ai.google.dev/gemini-api/docs/pricing) |
## Gotchas
This is not a free 24/7 VM. Model/request limits apply. The guide's discussion of intermediate input versus output token attribution is not wholly consistent across sections; use actual returned usage and the selected model's tariff. Do not assume only final natural-language text is charged. Tool compute dimensions, independent tool concurrency quota, durable snapshots and egress tariff are null. Vertex/Agent Platform Code Execution has a distinct resource meter; do not substitute this zero add-on price there.
## Examples
One supported short calculation incurs $0 extra code-execution fee **plus model tokens**, not a zero total bill. The standard 8,800-hour 4/8 workload is unsupported as stated (30-second environment maximum, unspecified hardware). Fragmenting it into API calls is not an equivalent machine or a known bill; model tokens/request rates must be supplied. Hence regime-only, normalized hourly rate null.