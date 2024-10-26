import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { Input } from '~/components/ui/input'
import {
  GoogleIcon,
  LogoIcon,
  AppleIcon,
  WalletConnectIcon,
} from '~/components/icons'
import { useAppKit } from '@reown/appkit-wagmi-react-native'
import { env } from '~/env'
import { Link, useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { credentials } from '~/lib/credentials'
import { $api } from '~/lib/api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import Toast from 'react-native-toast-message'
import { CheckCircleIcon, Loader2Icon } from 'lucide-react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { cn } from '~/lib/utils'

const signInSchema = z
  .object({
    email: z
      .string({ required_error: 'Invalid email address' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ required_error: 'Password must be at least 8 characters' })
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirm_password: z.string({ message: 'Passwords do not match' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

type SignInSchema = z.infer<typeof signInSchema>

export default function SignInPage() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: env.NODE_ENV === 'development' ? credentials : {},
  })

  const { mutate: signIn, status } = $api.useMutation(
    'post',
    '/api/auth/sign-in',
  )

  const router = useRouter()

  const onSubmit = (data: SignInSchema) => {
    signIn(
      { body: data },
      {
        onSuccess: () => {
          router.navigate('/(onboarding)/welcome')
        },
        onError: (err) => {
          Toast.show({
            type: 'error',
            text1: 'An error occurred!',
            text2: err.message,
          })
        },
      },
    )
  }

  const { open } = useAppKit()

  const continueWithGoogle = async () => {
    const redirectUrl = Linking.createURL('/sign-in/callback')
    const url = new URL(env.API_URL)
    url.pathname = '/api/auth/sign-in/google'
    url.searchParams.append('redirect_url', redirectUrl)
    await WebBrowser.openAuthSessionAsync(url.toString(), redirectUrl)
  }

  const isLoading = form.formState.isSubmitting || status === 'pending'
  const hasSubmitted = status === 'success'

  return (
    <ScrollView className="p-6 gap-2" contentContainerClassName="flex-1">
      <Form {...form}>
        <View className="flex-1 justify-between">
          <View className="flex-1 gap-8">
            <View className="flex flex-col gap-8">
              {/*<View className="flex items-stretch">
							<LogoIcon />
						</View>*/}
              <View className="flex flex-col gap-3">
                <View>
                  <View>
                    <Text className="text-4xl font-bold">Sign in to your</Text>
                  </View>
                  <View>
                    <Text className="text-4xl font-bold">Account</Text>
                  </View>
                </View>
                <Text className="text-gray-600">
                  Enter your email and password to log in{' '}
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
                          <FormLabel className="text-gray-600">Email</FormLabel>
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
                    name="password"
                    render={({ field }) => (
                      <FormItem className="gap-1">
                        <FormControl className="flex flex-col gap-1">
                          <FormLabel className="text-gray-600">
                            Password
                          </FormLabel>
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
                  <View>
                    <Link
                      href="/(auth)/forgot-password"
                      className="text-right font-semibold text-[#4D81E7]"
                    >
                      Forgot Password?
                    </Link>
                  </View>
                </View>
              </View>
              <View className="flex flex-col gap-6">
                <Button
                  className={cn(
                    'py-4 h-auto native:h-auto rounded-2xl',
                    hasSubmitted ? 'bg-emerald-600' : 'bg-[#1D61E7]',
                  )}
                  size={'lg'}
                  variant={'default'}
                  disabled={hasSubmitted || isLoading}
                  onPress={form.handleSubmit(onSubmit)}
                >
                  {hasSubmitted ? (
                    <CheckCircleIcon
                      stroke="white"
                      size={24}
                      className="animate-wiggle"
                    />
                  ) : isLoading ? (
                    <View className="animate-spin">
                      <Loader2Icon
                        stroke="white"
                        size={24}
                        className="animate-wiggle"
                      />
                    </View>
                  ) : (
                    <Text>Log In</Text>
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
                      onPress={continueWithGoogle}
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
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="flex justify-center flex-row gap-1">
            <Text className="text-center text-gray-600 font-medium">
              Don't have an account?
            </Text>
            <Link
              href="/(auth)/sign-up"
              className="text-[#1D61E7] text-center font-semibold"
            >
              Sign up
            </Link>
          </View>
        </View>
      </Form>
    </ScrollView>
  )
}
