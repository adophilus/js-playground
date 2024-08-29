import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/form";
import { useForm } from "react-hook-form";
import { Text, View, TextInput } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";

const schema = z.object({
	email: z.string().email(),
	password: z.string(),
});

type Schema = z.infer<typeof schema>;

export default function LoginScreen() {
	const form = useForm<Schema>({ resolver: zodResolver(schema) });

	return (
		<View className="bg-brandDark px-[40px]">
			<View className="flex flex-col gap-[10px]">
				<Text className="text-neutralWhite text-brandHeading">Login</Text>
				<Text className="text-neutralGray">
					You can login with your registered account or quick login with your
					Google account.
				</Text>
			</View>
			<View>or</View>
			<Form {...form}>
				<FormField
					control={form.control}
					name="email"
					render={() => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={() => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<View>Forgot password</View>
				<View>Remeber me</View>
				<View>Login</View>
				<View>Don't have an account? Create one</View>
			</Form>
		</View>
	);
}
