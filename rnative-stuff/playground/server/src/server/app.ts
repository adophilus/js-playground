import { Hono, type MiddlewareHandler } from 'hono'
import { logger } from 'hono/logger'
import { router as apiRouter } from './routes'
import { secureHeaders } from 'hono/secure-headers'

export const app = new Hono()
  .use(logger())
  .use(secureHeaders())
  .route('/api', apiRouter)
