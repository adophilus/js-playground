/**
 * 01 — baseline: can the effect-4 AI stack talk to a non-Anthropic provider
 * through the Anthropic-compatible door? (z.ai GLM)
 */
import { Console, Effect } from "effect";
import { LanguageModel } from "effect/ai";
import { AnthropicLanguageModel } from "@effect/ai-anthropic";
import { Http, ZaiAnthropicCompat } from "./shared.ts";

const Glm47 = AnthropicLanguageModel.model("glm-4.7");

const program = Effect.gen(function*() {
  const response = yield* LanguageModel.generateText({
    prompt: "Generate a hilarious dad joke. Just the joke."
  });
  yield* Console.log("[model said]", response.text);
});

await Effect.runPromise(
  program.pipe(
    Effect.provide(Glm47),
    Effect.provide(ZaiAnthropicCompat),
    Effect.provide(Http)
  )
);
