import { z } from 'zod'

const env = z
  .object({
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
    PORT:
      process.env.NODE_ENV === 'development'
        ? z.coerce.number().min(0).max(65535)
        : z.literal(0).default(0),
    AUTH_JWT_SECRET: z.string().min(32),
    AUTH_GOOGLE_CLIENT_ID: z.string(),
    AUTH_GOOGLE_CLIENT_SECRET: z.string(),
    APP_PUBLIC_BASE_URL: z.string().url(),
  })
  .parse(process.env)

export const config = {
  database: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  app: {
    port: env.PORT,
    public: { baseUrl: env.APP_PUBLIC_BASE_URL },
  },
  auth: {
    providers: {
      jwt: { secret: env.AUTH_JWT_SECRET },
      google: {
        clientId: env.AUTH_GOOGLE_CLIENT_ID,
        clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
      },
    },
  },
}
