import { Context, Effect, Fiber, Layer, Logger, Queue, Schedule } from "effect";

type TransactionHistoryGenerationJob = {
  type: "TRANSACTION_HISTORY_GENERATION";
  email: string;
};

type EmailJob = {
  type: "EMAIL";
  email: string;
  subject: string;
  body: string;
};

type OtpJob = {
  type: "OTP";
  phoneNumber: string;
};

type Job = TransactionHistoryGenerationJob | EmailJob | OtpJob;

const JOB_TYPES: Job["type"][] = [
  "TRANSACTION_HISTORY_GENERATION",
  "EMAIL",
  "OTP",
];

class JobQueue extends Context.Tag("JobQueue")<JobQueue, Queue.Queue<Job>>() { }

const JobQueueLayer = Layer.effect(JobQueue, Queue.bounded<Job>(100));

const producer = Effect.gen(function*() {
  const jobQueue = yield* JobQueue;
  const boundedRandomNumber = Math.floor(
    Math.random() * (JOB_TYPES.length - 1),
  );
  const jobType = JOB_TYPES[boundedRandomNumber];
  let job: Job;

  switch (jobType) {
    case "TRANSACTION_HISTORY_GENERATION": {
      job = {
        type: jobType,
        email: "uchenna19of@gmail.com",
      };
      break;
    }
    case "EMAIL": {
      job = {
        type: jobType,
        email: "uchenna19of@gmail.com",
        subject: "Test email",
        body: "This is a test email",
      };
      break;
    }
    case "OTP": {
      job = {
        type: jobType,
        phoneNumber: "+2347016719765",
      };
      break;
    }
  }

  yield* Effect.log("Producer:", job);
  yield* jobQueue.offer(job);
});

const consumer = Effect.gen(function*() {
  const jobQueue = yield* JobQueue;

  const job = yield* jobQueue.take;

  yield* Effect.log("Consumer:", job);
});

const DependenciesLayer = Layer.merge(JobQueueLayer, Logger.pretty);

const program = Effect.gen(function*() {
  const producerFiber = yield* Effect.fork(
    producer.pipe(
      Effect.schedule(
        Schedule.addDelay(Schedule.repeatForever, () => "500 milli"),
      ),
    ),
  );

  const consumerFiber = yield* Effect.fork(
    consumer.pipe(
      Effect.schedule(
        Schedule.addDelay(Schedule.repeatForever, () => "2 second"),
      ),
    ),
  );

  yield* Fiber.joinAll([producerFiber, consumerFiber]);
}).pipe(Effect.provide(DependenciesLayer));

Effect.runPromise(program);
