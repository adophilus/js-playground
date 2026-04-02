import { Layer, Effect, Console, Config } from "effect";
import { LanguageModel } from "@effect/ai";
import { OpenAiClient, OpenAiLanguageModel } from "@effect/ai-openai";
import { NodeHttpClient } from "@effect/platform-node";

const Client = OpenAiClient.layerConfig({
  apiKey: Config.redacted("OPENAI_API_KEY"),
  // apiUrl: Config.succeed("https://api.z.ai/api/coding/paas/v4/")
  // apiUrl: Config.succeed("http://localhost:8081/api/coding/paas/v4/")
  apiUrl: Config.succeed("http://localhost:4000"),
});

const ClientWithHttp = Layer.provide(Client, NodeHttpClient.layer);

const Glm47 = OpenAiLanguageModel.model("glm-4.7");

const generateDadJoke = () =>
  LanguageModel.generateText({
    prompt: "Generate a hilarious dad joke",
  });

Effect.gen(function*() {
  const joke = yield* generateDadJoke();
  yield* Console.debug(joke);
}).pipe(
  Effect.provide(Glm47),
  Effect.provide(ClientWithHttp),
  Effect.runPromise,
);
