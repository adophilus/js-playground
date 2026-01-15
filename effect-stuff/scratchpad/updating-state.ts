import {
  Console,
  Context,
  Duration,
  Effect,
  Layer,
  Ref,
  Schedule,
  Schema,
} from "effect";

class AuthenticatedAuthStoreSchema extends Schema.Class<AuthenticatedAuthStoreSchema>(
  "AuthenticatedSchema",
)({
  status: Schema.Literal("authenticated"),
  token: Schema.String,
}) { }

class UnauthenticatedAuthStoreSchema extends Schema.Class<UnauthenticatedAuthStoreSchema>(
  "UnauthenticatedSchema",
)({
  status: Schema.Literal("unauthenticated"),
}) { }

class AuthStoreSchema extends Schema.Union(
  AuthenticatedAuthStoreSchema,
  UnauthenticatedAuthStoreSchema,
) { }

class AuthStore extends Context.Tag("AuthStore")<
  AuthStore,
  Ref.Ref<typeof AuthStoreSchema.Type>
>() { }

const AuthStoreLive = Layer.effect(
  AuthStore,
  Effect.gen(function*() {
    const data = yield* Schema.decodeUnknown(AuthStoreSchema)({
      status: "unauthenticated",
    });

    const ref = yield* Ref.make(data);

    return ref;
  }),
);

const fiber = Effect.gen(function*() {
  let authStore = yield* AuthStore;

  yield* Ref.update(authStore, () => ({
    status: "authenticated" as const,
    token: "Bearer 123",
  }));

  yield* Console.log("updated auth store");
  const newAuthStore = yield* AuthStore;
  yield* Console.log("new auth store:", yield* newAuthStore.get);
});

const displayAuthStore = Effect.gen(function*() {
  const authStore = yield* AuthStore;

  const authStoreValue = yield* authStore.get;

  yield* Console.log("current auth store value:", authStoreValue);
});

Effect.gen(function*() {
  yield* Effect.fork(
    Effect.repeat(
      displayAuthStore,
      Schedule.recurs(3).pipe(Schedule.addDelay(() => Duration.millis(5000))),
    ),
  );

  yield* Effect.fork(fiber);

  yield* Effect.delay(Console.log("done"), Duration.millis(15000));
}).pipe(Effect.provide(AuthStoreLive), Effect.runPromise);
