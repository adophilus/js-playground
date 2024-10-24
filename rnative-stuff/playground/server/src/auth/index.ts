import { sha256 } from '@oslojs/crypto/sha2'
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding'
import { Result } from 'true-myth'
import { db } from '../database'
import type { Database } from '../database/types'
import type { Selectable } from 'kysely'
import { addDays, compareAsc, fromUnixTime, getUnixTime } from 'date-fns'
import { config } from '../config'
import { Google } from 'arctic'
import type { MiddlewareHandler } from 'hono/types'

export namespace AuthService {
  export type Session = Omit<
    Selectable<Database['sessions']>,
    'created_at' | 'updated_at'
  >

  export type User = Omit<
    Selectable<Database['users']>,
    'created_at' | 'updated_at'
  >

  export type SessionValidationResult = Result<
    { session: Session; user: User },
    'INVALID_SESSION'
  >

  export const generateSessionToken = (): string => {
    const bytes = new Uint8Array(20)
    crypto.getRandomValues(bytes)
    const token = encodeBase32LowerCaseNoPadding(bytes)
    return token
  }

  export const createSession = async (
    token: string,
    userId: string,
  ): Promise<Session> => {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    )
    const session: Session = {
      id: sessionId,
      user_id: userId,
      expires_at: getUnixTime(addDays(new Date(), 30).getTime()),
    }
    await db
      .insertInto('sessions')
      .values({
        id: session.id,
        user_id: session.user_id,
        expires_at: session.expires_at,
      })
      .execute()
    return session
  }

  export const validateSessionToken = async (
    token: string,
  ): Promise<SessionValidationResult> => {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    )
    const dbSession = await db
      .selectFrom('sessions')
      .innerJoin('users', 'users.id', 'sessions.user_id')
      .select([
        'sessions.id',
        'sessions.user_id',
        'sessions.expires_at',
        'users.email as user_email',
        'users.username as user_username',
      ])
      .where('sessions.id', '=', sessionId)
      .executeTakeFirst()

    if (dbSession == null) {
      return Result.err('INVALID_SESSION')
    }

    const session: Session = {
      id: dbSession.id,
      user_id: dbSession.user_id,
      expires_at: dbSession.expires_at,
    }

    const user: User = {
      id: session.user_id,
      email: dbSession.user_email,
      username: dbSession.user_username,
    }

    // Invalidate session if it has expired
    if (compareAsc(new Date(), fromUnixTime(session.expires_at)) === 1) {
      await invalidateSession(session.id)
      return Result.err('INVALID_SESSION')
    }

    // Update session expiration date if it's within 15 days of expiring
    if (compareAsc(new Date(), addDays(fromUnixTime(session.expires_at), 15))) {
      session.expires_at = getUnixTime(addDays(new Date(), 30))
      await db
        .updateTable('sessions')
        .set({
          expires_at: session.expires_at,
        })
        .execute()
    }

    return Result.ok({ session, user })
  }

  export const invalidateSession = async (sessionId: string): Promise<void> => {
    await db.deleteFrom('sessions').where('id', '=', sessionId).execute()
  }

  const url = new URL(config.app.public.baseUrl)
  url.pathname = '/api/auth/providers/google/callback'
  export const google = new Google(
    config.auth.providers.google.clientId,
    config.auth.providers.google.clientSecret,
    url.toString(),
  )

  export const middleware: MiddlewareHandler<{
    Variables: { user: User; session: Session }
  }> = async (c, next) => {
    const header = c.req.header('authorization')
    if (!header) return c.json({ message: 'Unauthorized' }, 401)

    const token = header.replace('Bearer ', '')
    const validationResult = await validateSessionToken(token)
    if (validationResult.isErr) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { user, session } = validationResult.value

    c.set('user', user)
    c.set('session', session)

    return next()
  }
}
