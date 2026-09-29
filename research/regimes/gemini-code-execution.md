# Gemini API code execution — pricing regimes (2026-09-28)
Added by the missing-providers audit (code-interpreter preset).
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Built-in tool | code_execution tool enabled | model tokens only | $0 tool fee; 30 s max runtime | https://ai.google.dev/gemini-api/docs/code-execution |
## Gotchas
- The bill is model tokens; code and execution output count as tokens.
## Worked example
Compute $0; tokens per model tariff (not estimated here).
Sources: https://ai.google.dev/gemini-api/docs/code-execution, https://ai.google.dev/gemini-api/docs/pricing