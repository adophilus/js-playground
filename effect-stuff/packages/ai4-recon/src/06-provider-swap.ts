/**
 * 06 — provider swap: one program, two model ids, zero program changes.
 * Model.ProviderName proves which provider served the request at runtime.
 */
import { Console, Effect } from "effect";
import { LanguageModel, Model } from "effect/ai";
import { AnthropicLanguageModel } from "@effect/ai-anthropic";
import { Http, ZaiAnthropicCompat } from "./shared.ts";

const Glm47 = AnthropicLanguageModel.model("glm-4.7");
const Glm46 = AnthropicLanguageModel.model("glm-4.6");

const program = Effect.gen(function*() {
  const provider = yield* Model.ProviderName;
  const response = yield* LanguageModel.generateText({
    prompt: "Reply with exactly: ok"
  });
  yield* Console.log(`[${provider}] ->`, response.text);
});

await Effect.runPromise(
  program.pipe(
    Effect.provide(Glm47),
    Effect.provide(ZaiAnthropicCompat),
    Effect.provide(Http)
  )
);

await Effect.runPromise(
  program.pipe(
    Effect.provide(Glm46),
    Effect.provide(ZaiAnthropicCompat),
    Effect.provide(Http)
  )
);
