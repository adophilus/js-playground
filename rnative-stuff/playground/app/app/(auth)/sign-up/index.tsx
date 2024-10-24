import Toast from 'react-native-toast-message'
import { View, ScrollView } from 'react-native'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { Input } from '~/components/ui/input'
import { GoogleIcon, AppleIcon, WalletConnectIcon } from '~/components/icons'
import { useAppKit } from '@reown/appkit-wagmi-react-native'
import { env } from '~/env'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { CheckCircleIcon, CircleXIcon, Loader2Icon } from 'lucide-react-native'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { $api } from '~/lib/api'
import { credentials } from '~/lib/credentials'
import { cn } from '~/lib/utils'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { useEffect } from 'react'

const signUpSchema = z
  .object({
    email: z
      .string({ required_error: 'Invalid email address' })
      .email({ message: 'Invalid email address' }),
    username: z
      .string({
        message: 'Please supply a username',
        required_error: 'Please supply a username',
      })
      .min(3, { message: 'Username must be at least 3 letters' }),
    password: z
      .string({ required_error: 'Password must be at least 8 characters' })
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirm_password: z.string({ message: 'Passwords do not match' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

type SignUpSchema = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const { error } = useLocalSearchParams<{ error?: string }>()
  useEffect(() => {
    if (error)
      Toast.show({
        type: 'error',
        text1: 'An error occurred!',
        text2: error,
      })
  }, [error])

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: env.NODE_ENV === 'development' ? credentials : {},
  })

  const {
    mutate: signUp,
    status,
    reset,
  } = $api.useMutation('post', '/api/auth/sign-up')

  const { open } = useAppKit()
  const router = useRouter()

  const onSubmit = async (data: SignUpSchema) => {
    signUp(
      { body: data },
      {
        onSuccess: () => {
          router.navigate('/(onboarding)/welcome')
        },
        onError: (err) => {
          setTimeout(() => reset(), 3000)
          Toast.show({
            type: 'error',
            text1: 'An error occurred!',
            text2: err.message,
          })
        },
      },
    )
  }

  const signInWithGoogle = async () => {
    const redirectUrl = Linking.createURL('/sign-up/callback')
    const url = new URL(env.API_URL)
    url.pathname = '/api/auth/sign-up/google'
    url.searchParams.append('redirect_url', redirectUrl)
    await WebBrowser.openAuthSessionAsync(url.toString())
  }

  const isSubmitting = status === 'pending'
  const hasSubmitted = status === 'success'
  const hasSubmissionError = status === 'error'

  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="p-6">
        <Form {...form}>
          <View className="flex-1 justify-between gap-6">
            <View className="flex-1 gap-8">
              <View className="flex flex-col gap-8">
                {/*<View className="flex items-stretch">
									<LogoIcon />
								</View>*/}
                <View className="flex flex-col gap-3">
                  <View>
                    <View>
                      <Text className="text-4xl font-bold">Sign up</Text>
                    </View>
                  </View>
                  <Text className="text-gray-600">
                    Create an account to continue
                  </Text>
                </View>
              </View>
              <View className="flex flex-col gap-6">
                <View className="flex flex-col gap-6">
                  <View className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="gap-1">
                          <FormControl className="flex flex-col gap-1">
                            <FormLabel className="text-gray-600">
                              Email
                            </FormLabel>
                            <Input
                              className="rounded-2xl shadow-lg h-auto native:h-auto py-3 px-4"
                              placeholder="john.doe@mail.com"
                              aria-labelledby="inputLabel"
                              aria-errormessage="inputError"
                              autoCapitalize="none"
                              onChangeText={field.onChange}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="gap-1">
                          <FormControl className="flex flex-col gap-1">
                            <FormLabel className="text-gray-600">
                              Username
                            </FormLabel>
                            <Input
                              className="rounded-2xl shadow-lg h-auto native:h-auto py-3 px-4"
                              placeholder="john.doe"
                              aria-labelledby="inputLabel"
                              aria-errormessage="inputError"
                              autoCapitalize="none"
                              onChangeText={field.onChange}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="gap-1">
                          <FormControl className="flex flex-col gap-1">
                            <Text className="text-gray-600">Password</Text>
                            <Input
                              className="rounded-2xl shadow-lg h-auto native:h-auto py-3 px-4"
                              placeholder="********"
                              aria-labelledby="inputLabel"
                              aria-errormessage="inputError"
                              autoCapitalize="none"
                              secureTextEntry={true}
                              onChangeText={field.onChange}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <FormItem className="gap-1">
                          <FormControl className="flex flex-col gap-1">
                            <Text className="text-gray-600">
                              Confirm Password
                            </Text>
                            <Input
                              className="rounded-2xl shadow-lg h-auto native:h-auto py-3 px-4"
                              placeholder="********"
                              aria-labelledby="inputLabel"
                              aria-errormessage="inputError"
                              autoCapitalize="none"
                              secureTextEntry={true}
                              onChangeText={field.onChange}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </View>
                </View>
                <View className="flex flex-col gap-6">
                  <Button
                    className={cn(
                      'bg-[#1D61E7] py-4 h-auto native:h-auto rounded-2xl',
                      hasSubmitted && 'bg-green-500',
                      hasSubmissionError && 'bg-red-500',
                    )}
                    size={'lg'}
                    variant={'default'}
                    disabled={
                      isSubmitting || hasSubmitted || hasSubmissionError
                    }
                    onPress={form.handleSubmit(onSubmit)}
                  >
                    {hasSubmitted ? (
                      <CheckCircleIcon stroke="white" size={24} />
                    ) : hasSubmissionError ? (
                      <CircleXIcon stroke="white" size={24} />
                    ) : isSubmitting ? (
                      <View className="animate-spin">
                        <Loader2Icon stroke="white" size={24} />
                      </View>
                    ) : (
                      <Text>Register</Text>
                    )}
                  </Button>
                  <View className="gap-4">
                    <View className="flex flex-row gap-4 items-center">
                      <Text className="bg-gray-300 grow h-[1]" />
                      <Text className="text-gray-600">or</Text>
                      <Text className="bg-gray-300 grow h-[1]" />
                    </View>
                    <View className="flex flex-col gap-4">
                      <Button
                        className="py-4 border border-gray-200 h-auto native:h-auto rounded-2xl flex flex-row gap-4 items-center"
                        size={'lg'}
                        variant={'ghost'}
                        onPress={signInWithGoogle}
                      >
                        <GoogleIcon width={16} height={16} />
                        <Text>Continue with Google</Text>
                      </Button>
                      <Button
                        className="py-4 border border-gray-200 h-auto native:h-auto rounded-2xl flex flex-row gap-4 items-center"
                        size={'lg'}
                        variant={'ghost'}
                        onPress={() => open()}
                      >
                        <AppleIcon width={16} height={16} />
                        <Text>Continue with Apple ID</Text>
                      </Button>
                      <Button
                        className="py-4 border border-gray-200 h-auto native:h-auto rounded-2xl flex flex-row gap-4 items-center"
                        size={'lg'}
                        variant={'ghost'}
                        onPress={() => open()}
                      >
                        <WalletConnectIcon width={16} height={16} />
                        <Text>Continue with WalletConnect</Text>
                        {/*<AppleIcon width={16} height={16} />
											<Text>Continue with Apple ID</Text>*/}
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex justify-center flex-row gap-1">
              <Text className="text-center text-gray-600 font-medium">
                Already have an account?
              </Text>
              <Link
                href="/(auth)/sign-in"
                className="text-[#1D61E7] text-center font-semibold"
              >
                Login
              </Link>
            </View>
          </View>
        </Form>
      </ScrollView>
    </View>
  )
}
