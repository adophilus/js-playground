import { Effect, pipe } from 'effect'
import { User } from '../Domain/User'
import { makeTestLayer } from '../lib/Layer'
import { SqlLive } from '../Sql'
import { Model, SqlClient, SqlSchema } from '@effect/sql'
import { AccessToken } from '../Domain/AccessToken'

export class UsersRepo extends Effect.Service<UsersRepo>()(
  'Accounts/UsersRepo',
  {
    effect: Effect.gen(function* () {
      const sql = yield* SqlClient.SqlClient
      const repo = yield* Model.makeRepository(User, {
        tableName: 'users',
        spanPrefix: 'UsersRepo',
        idColumn: 'id'
      })

      const findByAccessTokenSchema = SqlSchema.findOne({
        Request: AccessToken,
        Result: User,
        execute: (key) => sql`SELECT * FROM users WHERE accessToken = ${key}`
      })

      const findByAccessToken = (token: AccessToken) =>
        pipe(
          findByAccessTokenSchema(token),
          Effect.orDie,
          Effect.withSpan('UsersRepo.findByAccessToken')
        )

      return { ...repo, findByAccessToken } as const
    }),
    dependencies: [SqlLive]
  }
) {
  static Test = makeTestLayer(UsersRepo)({})
}
