import { Redacted, Schema } from 'effect'

export const AccessTokenString = Schema.String.pipe(Schema.brand('AccessToken'))

export const AccessToken = Schema.Redacted(AccessTokenString)

export type AccessToken = typeof AccessToken.Type

export const accessTokenFromString = (token: string) =>
  Redacted.make(AccessTokenString.make(token))

export const accessTokenFromRedacted = (token: Redacted.Redacted) =>
  token as AccessToken
