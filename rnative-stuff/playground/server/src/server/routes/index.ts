import { Hono } from 'hono'
import { router as authRouter } from './auth'

export const router = new Hono()
  .route('/auth', authRouter)
  .get('/', (c) => c.json({ message: 'Welcome to my playground API!' }))
