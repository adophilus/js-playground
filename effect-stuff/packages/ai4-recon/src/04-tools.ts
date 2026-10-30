/**
 * 04 — tool calling: define a tool, hand the model a toolkit, run the
 * agent loop by hand. NOTE(effect-4): there is NO built-in tool loop — the
 * framework resolves tool calls once, appends toolResults to the Chat history,
 * and it's on you to generate again until finishReason !== "tool-calls".
 */
import { Console, Effect, Schema } from "effect";
import { Tool, Toolkit } from "effect/ai";
import { Chat } from "effect/ai";
import { AnthropicLanguageModel } from "@effect/ai-anthropic";
import { Http, ZaiAnthropicCompat } from "./shared.ts";

const GetWeather = Tool.make("get_weather", {
  description: "Get the current weather for a city",
  parameters: Schema.Struct({ city: Schema.String }),
  success: Schema.Struct({
    temperature: Schema.Number,
    condition: Schema.String
  })
});

const toolkit = Toolkit.make(GetWeather);

const Glm47 = AnthropicLanguageModel.model("glm-4.7");

const program = Effect.gen(function*() {
  const chat = yield* Chat.empty;
  let response = yield* chat.generateText({
    prompt: "What's the weather in Osaka right now? Use the tool.",
    toolkit
  });
  let rounds = 1;
  // hand-rolled agent loop: re-prompt while the model wants tools
  while (response.finishReason === "tool-calls" && rounds < 5) {
    rounds++;
    response = yield* chat.generateText({ prompt: "Continue." });
  }
  yield* Console.log(`[rounds] ${rounds}`);
  yield* Console.log("[final text]", response.text);
});

await Effect.runPromise(
  program.pipe(
    Effect.provide(toolkit.toLayer({
      get_weather: ({ city }) =>
        Effect.succeed({ temperature: 21, condition: `sunny in ${city}` })
    })),
    Effect.provide(Glm47),
    Effect.provide(ZaiAnthropicCompat),
    Effect.provide(Http)
  )
);
