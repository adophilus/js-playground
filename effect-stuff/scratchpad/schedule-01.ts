import { Effect, Cron, Schedule, Layer, Console } from "effect";

const action = Console.log("success");
const policy = Schedule.addDelay(Schedule.recurs(2), () => "1 second");

const program = Effect.gen(function*() {
  yield* Effect.repeat(action, policy);
  yield* Console.log("next line");
}).pipe();

Effect.runPromise(program);
