import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { $api } from '~/lib/api'
import { AuthModule } from '~/lib/auth'

export default function SignUpCallbackSreen() {
  const { session } = useLocalSearchParams<{ session: string }>()
  const router = useRouter()

  const { status, data, error } = $api.useQuery(
    'get',
    '/api/auth/profile',
    {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    },
    {
      retry: false,
    },
  )

  useEffect(() => {
    ;(async () => {
      console.log(status, data, error)
      if (status === 'success') {
        await AuthModule.authenticate(session, data)
        router.replace('/(onboarding)/welcome')
      } else if (status === 'error') {
        router.replace({
          pathname: '/(auth)/sign-up',
          params: {
            error: error.message,
          },
        })
      }
    })()
  }, [status, session, data, error, router])

  return null
}
