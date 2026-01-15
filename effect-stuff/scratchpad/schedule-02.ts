import { Array, Chunk, Duration, Effect, Schedule } from "effect";

const log = (
  schedule: Schedule.Schedule<unknown>,
  delay: Duration.DurationInput = 0,
): void => {
  const maxRecurs = 10; // Limit the number of executions
  const miniProgram = Effect.runSync(
    Schedule.run(
      Schedule.delays(Schedule.addDelay(schedule, () => delay)),
      Date.now(),
      Array.range(0, maxRecurs - 1),
    ),
  );
  const delays = Chunk.toArray(miniProgram);
  delays.forEach((duration, i) => {
    console.log(`#${i + 1}: ${Duration.toMillis(duration)}ms`);
  });
};

const schedule = Schedule.forever;

log(schedule);
