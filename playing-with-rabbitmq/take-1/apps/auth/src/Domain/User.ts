import { HttpApiSchema } from '@effect/platform'
import { Model } from '@effect/sql'
import { Context, Schema } from 'effect'
import { AccessToken } from './AccessToken'
import { Account, AccountId } from './Account'
import { Email } from './Email'

export const UserId = Schema.Number.pipe(Schema.brand('User'))
export type UserId = typeof UserId.Type

export const UserIdFromString = Schema.NumberFromString.pipe(
  Schema.compose(UserId)
)

export class User extends Model.Class<User>('User')({
  id: Model.Generated(UserId),
  accountId: Model.GeneratedByApp(AccountId),
  email: Email,
  accessToken: Model.Sensitive(AccessToken),
  createdAt: Model.DateTimeInsert,
  updatedAt: Model.DateTimeUpdate
}) {}

export class UserWithSensitive extends Model.Class<UserWithSensitive>(
  'UserWithSensitive'
)({
  ...Model.fields(User),
  accessToken: AccessToken,
  account: Account
}) {}

export class CurrentUser extends Context.Tag('Domain/User/CurrentUser')<
  CurrentUser,
  User
>() {}

export class UserNotFound extends Schema.TaggedError<UserNotFound>()(
  'UserNotFound',
  { id: UserId },
  HttpApiSchema.annotations({ status: 404 })
) {}
