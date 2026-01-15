import { Context, Effect, Layer } from "effect";

class Auth extends Context.Tag("Auth")<Auth, {}>() { }
class Referral extends Context.Tag("Referral")<Referral, {}>() { }
class User extends Context.Tag("User")<User, {}>() { }

const AuthLive = Layer.succeed(Auth, {});
const ReferralLive = Layer.succeed(Referral, {});
const UserLive = Layer.effect(
  User,
  Effect.gen(function*() {
    yield* Auth;
    yield* Referral;

    return {};
  }),
);

const AppLive = UserLive.pipe(Layer.provide([AuthLive, ReferralLive]));
