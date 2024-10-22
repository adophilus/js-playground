import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../../../database'
import { TokenService } from '../../services/token'
import {
  decodeIdToken,
  generateCodeVerifier,
  generateState,
  type OAuth2Tokens,
} from 'arctic'
import { AuthService } from '../../../auth'
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from 'hono/cookie'

export default new Hono()
  .use(TokenService.routerDecorator)
  .post(
    '/sign-up',
    zValidator(
      'json',
      z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    ),
    async (c) => {
      const payload = c.req.valid('json')

      const existingUser = await db
        .selectFrom('users')
        .selectAll()
        .where(({ or, eb }) =>
          or([
            eb('username', '=', payload.username),
            eb('email', '=', payload.email),
          ]),
        )
        .executeTakeFirst()

      if (existingUser) {
        if (existingUser.email === payload.email) {
          return c.json({ message: 'Email already exists' }, 400)
        }

        return c.json({ message: 'Username already exists' }, 400)
      }

      const user = await db
        .insertInto('users')
        .values({
          ...payload,
          id: crypto.randomUUID(),
        })
        .returningAll()
        .executeTakeFirst()

      console.log(user)

      return c.json({
        message: 'Please check your email address for a verification code',
      })
    },
  )
  .post(
    '/sign-in',
    zValidator(
      'json',
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    ),
    async (c) => {
      const payload = c.req.valid('json')

      const user = await db
        .selectFrom('users')
        .selectAll()
        .where(({ or, eb }) =>
          or([
            eb('username', '=', payload.email),
            eb('email', '=', payload.email),
          ]),
        )
        .executeTakeFirstOrThrow()

      if (user.password !== payload.password)
        return c.json(
          { message: 'Invalid username/email or password combination' },
          400,
        )

      return c.json({
        message: 'Signin successful',
        token: await c.get('tokenService').generateAccessToken(user.id),
      })
    },
  )
  .get(
    '/sign-up/google',
    zValidator(
      'query',
      z.object({
        redirect_url: z.string().url(),
      }),
    ),
    (c) => {
      const payload = c.req.valid('query')
      const state = generateState()
      const codeVerifier = generateCodeVerifier()
      const url = AuthService.google.createAuthorizationURL(
        state,
        codeVerifier,
        ['openid', 'profile', 'email'],
      )

      setCookie(c, 'google_oauth_state', state, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 10,
        sameSite: 'lax',
      })

      setCookie(c, 'google_code_verifier', codeVerifier, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 10,
        sameSite: 'lax',
      })

      setCookie(c, 'app_redirect_url', payload.redirect_url, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 10,
        sameSite: 'lax',
      })

      return c.redirect(url.toString())
    },
  )
  .get(
    '/providers/google/callback',
    zValidator(
      'query',
      z.object({
        code: z.string(),
        state: z.string(),
      }),
    ),
    async (c) => {
      const { code, state } = c.req.valid('query')
      const storedState = getCookie(c, 'google_oauth_state')
      const codeVerifier = getCookie(c, 'google_code_verifier')
      const redirectUrl = getCookie(c, 'app_redirect_url')

      if (
        code == null ||
        state == null ||
        storedState == null ||
        codeVerifier == null ||
        redirectUrl == null
      ) {
        return c.json({ message: 'Invalid request' }, 400)
      }
      if (state !== storedState) {
        return c.json({ message: 'Invalid request' }, 400)
      }

      let tokens: OAuth2Tokens
      try {
        tokens = await AuthService.google.validateAuthorizationCode(
          code,
          codeVerifier,
        )
      } catch (e) {
        console.log(e)
        return c.json({ message: 'Invalid request' }, 400)
      }

      const decodedIdToken = decodeIdToken(tokens.idToken())
      const claimsParseResult = z
        .object({
          email: z.string().email(),
        })
        .safeParse(decodedIdToken)

      if (claimsParseResult.success === false) {
        console.log(claimsParseResult.error)
        return c.json({ message: 'Invalid request' }, 400)
      }

      const claims = claimsParseResult.data

      const existingUser = await db
        .selectFrom('users')
        .selectAll()
        .where('email', '=', claims.email)
        .executeTakeFirst()

      // TODO: handle situtation where the user tries to sign in with a google account that's not bound to any user

      let session: AuthService.Session
      const sessionToken = AuthService.generateSessionToken()

      if (existingUser) {
        session = await AuthService.createSession(sessionToken, existingUser.id)
      } else {
        const id = crypto.randomUUID()
        const user = await db
          .insertInto('users')
          .values({
            id,
            email: claims.email,
            username: id,
          })
          .returningAll()
          .executeTakeFirstOrThrow()
        session = await AuthService.createSession(sessionToken, user.id)
      }

      const url = new URL(redirectUrl)
      url.searchParams.set('session', session.id)

      console.log('redirecting to:', url.toString())

      return c.redirect(url.toString())

      // TODO: no need to set the session token
      // setCookie(c, 'session_token', session.id, {
      //   path: '/',
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   maxAge: 86400 * 30,
      //   sameSite: 'strict',
      // })
      // return c.redirect(url.toString())

      // return c.json({ message: url.toString() })

      // TODO: Replace this with your own DB query.
      //   const user = await createUser(googleUserId, username)
      //
      //   const sessionToken = generateSessionToken()
      //   const session = await createSession(sessionToken, user.id)
      //   setSessionTokenCookie(sessionToken, session.expiresAt)
      //   return new Response(null, {
      //     status: 302,
      //     headers: {
      //       Location: '/',
      //     },
      //   })
      // },
    },
  )
