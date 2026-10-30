/**
 * 07 — @effect/ai-openai-compat: the official third-party OpenAI-compatible
 * provider (Effect 4). Unlike @effect/ai-openai (Responses-API-only), this one
 * speaks /chat/completions — i.e. LiteLLM, z.ai, OpenRouter, vLLM territory.
 */
import { Console, Effect, Redacted } from "effect";
import { LanguageModel } from "effect/ai";
import { OpenAiClient, OpenAiLanguageModel } from "@effect/ai-openai-compat";
import { NodeHttpClient } from "@effect/platform-node";

const Client = OpenAiClient.layer({
  apiKey: Redacted.make(process.env.Z_AI_API_KEY ?? ""),
  apiUrl: "https://api.z.ai/api/coding/paas/v4"
});

const Glm47 = OpenAiLanguageModel.model("glm-4.7");

const program = Effect.gen(function*() {
  const response = yield* LanguageModel.generateText({
    prompt: "Reply with exactly: chat-completions door works"
  });
  yield* Console.log("[compat said]", response.text);
});

await Effect.runPromise(
  program.pipe(
    Effect.provide(Glm47),
    Effect.provide(Client),
    Effect.provide(NodeHttpClient.layerUndici)
  )
);
