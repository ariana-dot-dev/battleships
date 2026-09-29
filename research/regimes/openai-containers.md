# OpenAI Containers — pricing regimes (2026-09-28)
Added by the missing-providers audit (code-interpreter preset).
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Container session | Code Interpreter / Hosted Shell | per minute, 5-min minimum (since 2026-06-02) | 1 GB $0.03, 4 GB $0.12, 16 GB $0.48, 64 GB $1.92 per 20 min | https://developers.openai.com/api/docs/pricing |
| Model tokens | always | per token | model-specific | https://developers.openai.com/api/docs/pricing |
## Gotchas
- A container expires after 20 min idle; reuse it to avoid paying a new 5-min minimum per call.
- Two parallel threads = two containers.
## Worked example
200k 1-minute calls in fresh 1 GB containers: 200k x 5 min x $0.0015 = $1,500; packed 50 calls per container (50 min each): 4,000 x 50 min x $0.0015 = $300.
Sources: https://developers.openai.com/api/docs/pricing, https://developers.openai.com/api/docs/guides/tools/code-interpreter