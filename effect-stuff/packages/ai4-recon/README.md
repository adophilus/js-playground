# Effect-TS AI ecosystem recon — Oct 2026

Hands-on state check of the Effect AI stack as of `effect@4.1.0` (2026-10-29),
run against **z.ai GLM-4.7** (your `Z_AI_API_KEY`): the Anthropic-compatible
endpoint (`https://api.z.ai/api/anthropic`) and the OpenAI chat-completions
endpoint (`https://api.z.ai/api/coding/paas/v4`).

Run with `pnpm run 01` … `pnpm run 07` (plain `node` — Node 22 strips types).

## The landscape: two parallel lines

| | Effect 3 line (what this repo was on) | Effect 4 line (current) |
|---|---|---|
| core | `@effect/ai@0.37.x` (frozen, `prev` tag) | **`effect/ai` — AI core lives inside `effect` itself** |
| openai | `@effect/ai-openai@0.x` | `@effect/ai-openai@4.1.0` (Responses API only) |
| anthropic | `@effect/ai-anthropic@0.x` | `@effect/ai-anthropic@4.1.0` |
| **openai-compat** | — | **`@effect/ai-openai-compat@4.1.0` — speaks `/chat/completions`** |
| openrouter / cloudflare / typesafe | — | new 4.x provider packages |
| google | 0.x only | **no Effect 4 provider yet** |

Everything AI is still tagged `unstable`/`experimental`. No API-stability promises.

## Test matrix (all verified live)

| # | Script | Result |
|---|---|---|
| 01 | `LanguageModel.generateText` → z.ai anthropic-compat | ✅ works |
| 02 | `Chat` multi-turn + system prompt, history accumulates | ✅ works |
| 03 | `chat.streamText` token deltas | ✅ works |
| 04 | Tool calling + hand-rolled agent loop | ✅ works |
| 05 | `@effect/ai-openai` vs z.ai | ❌ 404 — posts `/responses`, z.ai only has `/chat/completions` |
| 06 | Provider swap (two GLM models, one program) via `Model.ProviderName` | ✅ works |
| 07 | `@effect/ai-openai-compat` vs z.ai coding endpoint | ✅ **works, zero patches** |

## Answers to the original complaints

1. **"Created a model object, couldn't interact with it"** — fixed. The 0.27+ rework
   (then folded into effect 4) gives you `Chat` (multi-turn, system prompts,
   persistence, export/import), `Prompt` (setSystem/appendSystem), `Toolkit`,
   streaming parts, typed tool results. Responses expose `.text`, `.reasoning`,
   `.toolCalls`, `.toolResults`, `.finishReason`, `.usage`.
2. **"Couldn't try other providers, even OpenAI-compatible ones"** — fixed, three doors:
   - `@effect/ai-anthropic` accepts `apiUrl` ("proxy or different API-compatible
     endpoint" per its own docs) — z.ai works, but note finding 3 below.
   - **`@effect/ai-openai-compat` is the official chat-completions provider** —
     worked against z.ai with zero patches. This is the door for LiteLLM/OpenRouter/vLLM.
   - `@effect/ai-openai` stays Responses-API-only; there is **no** chat-completions
     mode in it and no plan visible.

## Sharp edges found (live)

- **z.ai's anthropic-compat omits `usage.server_tool_use.web_fetch_requests`**
  which `@effect/ai-anthropic` schema-validates strictly → `AiError` on every
  response, and again on the final SSE event when streaming. `shared.ts` carries a
  `transformClient` patch (JSON + SSE line rewrite) that injects the key.
  Real Anthropic sends it; compat endpoints may not.
- **No built-in agent loop.** The framework resolves tool calls exactly once,
  appends results to `Chat` history, returns `finishReason: "tool-calls"` with
  empty text. Re-prompting until done is **your** job (see `04-tools.ts`).
- **Effect 4 API renames bite silently**: `NodeHttpClient.layer` → `layerUndici`
  (old name is `undefined`, and `Effect.provide(x, undefined)` dies with a cryptic
  `Cannot read properties of undefined (reading 'build')`). Platform moved into
  core too (`effect/http/...`, no more `@effect/platform` on the 4 line).
- **`chat.streamText` returns a Stream directly** — the doc example that `yield*`s
  it is stale; yielding it throws `is not iterable`.
- Version pairing matters: `@effect/ai-anthropic@4.1.0` peer-depends on
  `effect@^4.1.0` — installing it next to `effect@3.19` explodes on
  `effect/encoding/Sse` at import time.

## Also new in effect/ai core (4.x)

`Decision`/`DecisionModel` (classify/rate/probability primitives — a separate
abstraction from chat, with its own providers), `McpClient`/`McpProtocol`/`McpTest`
(MCP client+server in-core), tool-call validation modes, Anthropic human tool
approval, `Chat.Persistence` (makePersisted/getOrCreate, TTL).

## Verdict

The 2025-era friction is mostly gone on the effect-4 line: one core, typed
`Chat`/`LanguageModel`, and a real third-party provider story
(`-openai-compat`, `-openrouter`, `apiUrl` overrides). Remaining roughness:
everything is `unstable`, no Google provider on 4.x yet, no auto agent loop,
and compat endpoints can still trip strict response schemas (see the z.ai patch).
