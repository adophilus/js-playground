/**
 * 03 — streaming: token-level deltas through chat.streamText.
 */
import { Console, Effect } from "effect";
import { Stream } from "effect";
import { Chat } from "effect/ai";
import { AnthropicLanguageModel } from "@effect/ai-anthropic";
import { Http, ZaiAnthropicCompat } from "./shared.ts";

const Glm47 = AnthropicLanguageModel.model("glm-4.7");

const program = Effect.gen(function*() {
  const chat = yield* Chat.empty;
  // NOTE(effect-4): chat.streamText returns a Stream directly (doc example that
  // yields it is stale).
  const parts = chat.streamText({
    prompt: "Count from 1 to 10, comma separated, no other text."
  });

  let chars = 0;
  yield* Stream.runForEach(parts, (part) =>
    Effect.sync(() => {
      if (part.type === "text-delta") {
        chars += part.delta.length;
        process.stdout.write(part.delta);
      }
    })
  );
  yield* Console.log(`\n[streamed ${chars} chars]`);
});

await Effect.runPromise(
  program.pipe(
    Effect.provide(Glm47),
    Effect.provide(ZaiAnthropicCompat),
    Effect.provide(Http)
  )
);
