import { SqlClient } from '@effect/sql'
import { Effect, Layer, Option, pipe } from 'effect'
import { AccountsRepo } from './AccountsRepo'
import { UsersRepo } from './UsersRepo'
import { Ulid } from '../Ulid'
import {
  User,
  type UserId,
  UserNotFound,
  UserWithSensitive
} from '../Domain/User'
import { Account } from '../Domain/Account'
import { type AccessToken, accessTokenFromString } from '../Domain/AccessToken'
import { policyRequire } from '../Domain/Policy'
import { SqlLive, SqlTest } from '../Sql'

export class Accounts extends Effect.Service<Accounts>()('Accounts', {
  effect: Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient
    const accountRepo = yield* AccountsRepo
    const userRepo = yield* UsersRepo
    const ulid = yield* Ulid

    const createUser = (user: typeof User.jsonCreate.Type) =>
      accountRepo.insert(Account.insert.make({})).pipe(
        Effect.tap((account) => Effect.annotateCurrentSpan('account', account)),
        Effect.bindTo('account'),
        Effect.bind('accessToken', () =>
          ulid.generate.pipe(Effect.map(accessTokenFromString))
        ),
        Effect.bind('user', ({ accessToken, account }) =>
          userRepo.insert(
            User.insert.make({
              ...user,
              accountId: account.id,
              accessToken
            })
          )
        ),
        Effect.map(
          ({ account, user }) =>
            new UserWithSensitive({
              ...user,
              account
            })
        ),
        sql.withTransaction,
        Effect.orDie,
        Effect.withSpan('Accounts.createUser', { attributes: { user } }),
        policyRequire('User', 'create')
      )

    const updateUser = (
      id: UserId,
      user: Partial<typeof User.jsonUpdate.Type>
    ) =>
      userRepo.findById(id).pipe(
        Effect.flatMap(
          Option.match({
            onNone: () => new UserNotFound({ id }),
            onSome: Effect.succeed
          })
        ),
        Effect.andThen((previous) =>
          userRepo.update({
            ...previous,
            ...user,
            id,
            updatedAt: undefined
          })
        ),
        sql.withTransaction,
        Effect.catchTag('SqlError', (err) => Effect.die(err)),
        Effect.withSpan('Accounts.updateUser', { attributes: { id, user } }),
        policyRequire('User', 'update')
      )

    const findUserByAccessToken = (apiKey: AccessToken) =>
      pipe(
        userRepo.findByAccessToken(apiKey),
        Effect.withSpan('Accounts.findUserByAccessToken'),
        policyRequire('User', 'read')
      )

    const findUserById = (id: UserId) =>
      pipe(
        userRepo.findById(id),
        Effect.withSpan('Accounts.findById'),
        policyRequire('User', 'read')
      )

    const embellishUser = (user: User) =>
      pipe(
        accountRepo.findById(user.accountId),
        Effect.flatten,
        Effect.map((account) => new UserWithSensitive({ ...user, account })),
        Effect.orDie,
        Effect.withSpan('Accounts.embellishUser', {
          attributes: { id: user.id }
        }),
        policyRequire('User', 'readSensitive')
      )

    return {
      createUser,
      updateUser,
      findUserByAccessToken,
      findUserById,
      embellishUser
    } as const
  }),
  dependencies: [SqlLive, AccountsRepo.Default, UsersRepo.Default, Ulid.Default]
}) {
  static Test = this.DefaultWithoutDependencies.pipe(
    Layer.provide(SqlTest),
    Layer.provideMerge(Ulid.Test)
  )
}
