import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { $api } from '~/lib/api'
import { AuthModule } from '~/lib/auth'

export default function SignInCallbackSreen() {
  const { session } = useLocalSearchParams<{ session: string }>()
  const router = useRouter()

  const { status, data, error } = $api.useQuery(
    'get',
    '/api/auth/profile',
    undefined,
    {
      retry: false,
    },
  )

  useEffect(() => {
    ;(async () => {
      if (status === 'success') {
        await AuthModule.authenticate(session, data)
        router.replace('/(dashboard)/')
      } else if (status === 'error') {
        router.replace({
          pathname: '/(auth)/sign-in',
          params: {
            error: error.message,
          },
        })
      }
    })()
  }, [status, session, data, error, router])

  return null
}
