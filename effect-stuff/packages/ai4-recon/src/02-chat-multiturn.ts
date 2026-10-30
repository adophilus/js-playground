/**
 * 02 — is the model object interactable? Multi-turn chat with a system prompt;
 * history should accumulate inside one Chat service.
 */
import { Console, Effect } from "effect";
import { Chat } from "effect/ai";
import { AnthropicLanguageModel } from "@effect/ai-anthropic";
import { Http, ZaiAnthropicCompat } from "./shared.ts";

const Glm47 = AnthropicLanguageModel.model("glm-4.7");

const program = Effect.gen(function*() {
  const chat = yield* Chat.fromPrompt([
    { role: "system", content: "You are a laconic pirate. Reply in at most one sentence." }
  ]);

  const a = yield* chat.generateText({ prompt: "What is Effect-TS?" });
  yield* Console.log("[turn 1]", a.text);

  const b = yield* chat.generateText({ prompt: "Now say that again, but as a haiku." });
  yield* Console.log("[turn 2]", b.text);

  const history = yield* chat.exportJson;
  const parsed: any = JSON.parse(history);
  const count = parsed?.content?.length ?? parsed?.messages?.length ?? 0;
  yield* Console.log("[history entries]", count);
});

await Effect.runPromise(
  program.pipe(
    Effect.provide(Glm47),
    Effect.provide(ZaiAnthropicCompat),
    Effect.provide(Http)
  )
);
