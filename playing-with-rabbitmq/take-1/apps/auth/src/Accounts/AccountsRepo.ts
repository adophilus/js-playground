import { Model } from '@effect/sql'
import { Effect } from 'effect'
import { Account } from '../Domain/Account'
import { makeTestLayer } from '../lib/Layer'
import { SqlLive } from '../Sql'

export const make = Model.makeRepository(Account, {
  tableName: 'accounts',
  spanPrefix: 'AccountsRepo',
  idColumn: 'id'
})

export class AccountsRepo extends Effect.Service<AccountsRepo>()(
  'Accounts/AccountsRepo',
  {
    effect: Model.makeRepository(Account, {
      tableName: 'accounts',
      spanPrefix: 'AccountsRepo',
      idColumn: 'id'
    }),
    dependencies: [SqlLive]
  }
) {
  static Test = makeTestLayer(AccountsRepo)({})
}
