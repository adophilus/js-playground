import { DevTools } from "@effect/experimental";
import { NodeRuntime } from "@effect/platform-node";
import { Console, Effect } from "effect";

const someComputationTask = Console.log(
	"Calculated the answer to life, the universe, and everything",
).pipe(Effect.delay(2000), Effect.withSpan("someComputationTask"));

const program = someComputationTask.pipe(Effect.forever);

const DevToolsLive = DevTools.layer();

program.pipe(Effect.provide(DevToolsLive), NodeRuntime.runMain);
