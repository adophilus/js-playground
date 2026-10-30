/**
 * 05 — the "OpenAI-compatible" trap: @effect/ai-openai speaks ONLY the
 * Responses API (/responses). z.ai's coding endpoint (and LiteLLM, OpenRouter
 * classic, vLLM...) only implement /chat/completions. Expect a 404-shaped
 * AiError — this is the interop wall, reproduced on the latest 4.1.0.
 */
import { Console, Effect, Redacted } from "effect";
import { LanguageModel } from "effect/ai";
import { OpenAiClient, OpenAiLanguageModel } from "@effect/ai-openai";
import { NodeHttpClient } from "@effect/platform-node";

const Client = OpenAiClient.layer({
  apiKey: Redacted.make(process.env.Z_AI_API_KEY ?? ""),
  // z.ai coding endpoint is OpenAI chat/completions-compatible, not Responses-compatible
  apiUrl: "https://api.z.ai/api/coding/paas/v4"
});

const Glm47 = OpenAiLanguageModel.model("glm-4.7");

const program = Effect.gen(function*() {
  const response = yield* LanguageModel.generateText({ prompt: "hi" });
  yield* Console.log("[unexpected success]", response.text);
});

const outcome = await Effect.runPromiseExit(
  program.pipe(
    Effect.provide(Glm47),
    Effect.provide(Client),
    Effect.provide(NodeHttpClient.layerUndici)
  )
);

if (outcome._tag === "Failure") {
  const cause: any = outcome.cause;
  const err = cause.failures?.[0]?.error ?? cause.defects?.[0] ?? cause.error;
  Console.error(`[as expected] OpenAiClient vs z.ai fails: ${err?.constructor?.name ?? "Error"} — ${String(err?.message ?? JSON.stringify(cause)).slice(0, 300)}`).pipe(Effect.runSync);
} else {
  Console.log("[surprise] it worked?!", outcome.value).pipe(Effect.runSync);
}
