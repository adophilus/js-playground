import { proxy, useSnapshot } from 'valtio'
import * as SecureStore from 'expo-secure-store'
import { z, type ZodError } from 'zod'
import { Result } from 'true-myth'

export namespace AuthModule {
  export type User = {
    id: string
    username: string
    email: string
  }

  export type Auth =
    | {
        status: 'loading' | 'unauthenticated'
        user: undefined
        session: undefined
      }
    | {
        status: 'authenticated'
        user: User
        session: string
      }

  const store = proxy<Auth>({
    status: 'loading',
    user: undefined,
    session: undefined,
  })

  /**
   * * Remember to increment this version number whenever you change the schema
   * of the persisted auth object.
   */
  const STORE_VERSION = 'v0.0.1'
  const deserializationSchema = z.object({
    version: z.literal(STORE_VERSION),
    user: z.object({
      id: z.string(),
      username: z.string(),
      email: z.string().email(),
    }),
    session: z.string(),
  })
  type DeserializedAuth = z.infer<typeof deserializationSchema>

  const deserialize = (
    serialized: string,
  ): Result<DeserializedAuth, ZodError<DeserializedAuth>> => {
    const parseResult = deserializationSchema.safeParse(JSON.parse(serialized))
    if (parseResult.success) return Result.ok(parseResult.data)
    return Result.err(parseResult.error)
  }

  const serialize = (auth: Omit<DeserializedAuth, 'version'>) =>
    JSON.stringify(Object.assign(auth, { version: STORE_VERSION }))

  export const userAuth = () => useSnapshot(store)

  export const restore = async () => {
    const persistedAuth = await SecureStore.getItemAsync('auth')
    if (!persistedAuth) return

    const result = deserialize(persistedAuth)
    if (result.isOk) {
      const { user, session } = result.value
      store.session = session
      store.user = user
      store.status = 'authenticated'
    }
  }

  export const authenticate = async (session: string, user: User) => {
    store.session = session
    store.user = user
    store.status = 'authenticated'
    await SecureStore.setItemAsync('auth', serialize({ user, session }))
  }

  export const useAuth = () => useSnapshot(store)
}
