import { HttpApi, OpenApi } from '@effect/platform'
import { AccountsApi } from '../Accounts/Api'

export class Api extends HttpApi.empty
  .add(AccountsApi)
  .annotate(OpenApi.Title, 'Auth API') {}
