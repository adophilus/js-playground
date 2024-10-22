import { useLocalSearchParams } from 'expo-router'

export default function SignInCallbackSreen() {
  const { session } = useLocalSearchParams<{ session: string }>()
  console.log('Sign in callback screen')
  console.log(session)
  return null
}
