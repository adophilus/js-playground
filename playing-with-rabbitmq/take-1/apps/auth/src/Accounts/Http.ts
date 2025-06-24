import { HttpApiBuilder } from '@effect/platform'
import { Effect, Layer, Option, pipe } from 'effect'
import { Accounts } from './Accounts'
import { Authentication } from './Api'
import { UsersRepo } from './UsersRepo'
import { accessTokenFromRedacted } from '../Domain/AccessToken'
import { policyUse, Unauthorized, withSystemActor } from '../Domain/Policy'
import { CurrentUser, UserId, UserNotFound } from '../Domain/User'
import { Api } from '../Api'
import { AccountsPolicy } from './Policy'

export const AuthenticationLive = Layer.effect(
  Authentication,
  Effect.gen(function* () {
    const userRepo = yield* UsersRepo

    return Authentication.of({
      cookie: (token) =>
        userRepo.findByAccessToken(accessTokenFromRedacted(token)).pipe(
          Effect.flatMap(
            Option.match({
              onSome: Effect.succeed,
              onNone: () =>
                new Unauthorized({
                  action: 'read',
                  actorId: UserId.make(-1),
                  entity: 'User'
                })
            })
          ),
          Effect.withSpan('Authentication.cookie')
        )
    })
  })
).pipe(Layer.provide(UsersRepo.Default))

export const HttpAccountsLive = HttpApiBuilder.group(
  Api,
  'accounts',
  (handlers) =>
    Effect.gen(function* () {
      const accounts = yield* Accounts
      const policy = yield* AccountsPolicy

      return handlers
        .handle('createUser', ({ payload }) =>
          accounts.createUser(payload).pipe(
            withSystemActor,
            Effect.tap((user) =>
              HttpApiBuilder.securitySetCookie(
                Authentication.security.cookie,
                user.accessToken
              )
            )
          )
        )
        .handle('getUser', ({ path }) =>
          pipe(
            accounts.findUserById(path.id),
            Effect.flatMap(
              Option.match({
                onSome: Effect.succeed,
                onNone: () => new UserNotFound({ id: path.id })
              })
            ),
            policyUse(policy.canRead(path.id))
          )
        )
        .handle('getUserMe', () =>
          CurrentUser.pipe(
            Effect.flatMap(accounts.embellishUser),
            withSystemActor
          )
        )
        .handle('updateUser', ({ path, payload }) =>
          pipe(
            accounts.updateUser(path.id, payload),
            policyUse(policy.canUpdate(path.id))
          )
        )
    })
).pipe(
  Layer.provide([Accounts.Default, AuthenticationLive, AccountsPolicy.Default])
)
