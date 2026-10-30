/**
 * Terminal chat agent — effect/ai Chat + effect/Terminal REPL.
 *
 * Effect 4's interactive-CLI primitives used here:
 * - `Terminal` service (core, `effect/Terminal`): readLine (QuitError on
 *   Ctrl+C/D/Esc), display
 * - `NodeTerminal.layer` (@effect/platform-node): stdin/stdout backend
 * - `@effect/ai-openai-compat`: chat-completions provider — the door that works
 *   with z.ai / LiteLLM / OpenRouter / vLLM
 *
 * Run: pnpm agent   (or: node src/agent.ts)
 * Type questions; "exit"/"quit" or Ctrl+C/Ctrl+D to leave.
 */
import { Effect, Redacted, Stream } from "effect";
import { Chat } from "effect/ai";
import { Terminal } from "effect/Terminal";
import { OpenAiClient, OpenAiLanguageModel } from "@effect/ai-openai-compat";
import { NodeHttpClient, NodeTerminal } from "@effect/platform-node";

const apiKey = Redacted.make(process.env.Z_AI_API_KEY ?? "");

const Client = OpenAiClient.layer({
  apiKey,
  apiUrl: "https://api.z.ai/api/coding/paas/v4"
});

const Glm = OpenAiLanguageModel.model("glm-4.7");

const DIM = "\x1b[2m";
const RESET = "\x1b[22m";
const CYAN = "\x1b[36m";
const BOLD = "\x1b[1m";

const BANNER = `${CYAN}${BOLD}effect-agent${RESET}${CYAN} — glm-4.7 via z.ai (chat-completions). "exit" or Ctrl+D to quit.${RESET}`;

const program = Effect.gen(function*() {
  // NOTE: `import { Terminal }` binds the service TAG itself (not a namespace)
  const terminal = yield* Terminal;
  const chat = yield* Chat.fromPrompt([
    {
      role: "system",
      content:
        "You are a concise terminal assistant. Plain text only, no markdown code fences. Keep answers short unless asked to elaborate."
    }
  ]);

  yield* terminal.display(`${BANNER}\n`);

  while (true) {
    yield* terminal.display("\n> ");
    const line = (yield* terminal.readLine).trim();
    if (line === "") continue;
    if (line === "exit" || line === "quit") break;

    const parts = chat.streamText({ prompt: line });
    let thinking = false;
    yield* Stream.runForEach(parts, (part) =>
      Effect.sync(() => {
        switch (part.type) {
          case "text-delta": {
            if (thinking) {
              thinking = false;
              process.stdout.write(`${RESET}\n`);
            }
            process.stdout.write(part.delta);
            break;
          }
          case "reasoning-start": {
            thinking = true;
            process.stdout.write(`${DIM}thinking…`);
            break;
          }
        }
      })
    );
    yield* terminal.display("\n");
  }

  yield* terminal.display("bye 👋\n");
});

await program.pipe(
  Effect.provide(Glm),
  Effect.provide(Client),
  Effect.provide(NodeHttpClient.layerUndici),
  Effect.provide(NodeTerminal.layer),
  Effect.catchTag("QuitError", () => Effect.sync(() => process.stdout.write("\nbye 👋\n"))),
  Effect.runPromise
).catch((error) => {
  console.error("agent died:", error);
  process.exitCode = 1;
});
