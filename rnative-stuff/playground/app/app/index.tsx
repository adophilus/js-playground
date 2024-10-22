import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function IndexScreen() {
	return <Redirect href="/(auth)/sign-up" />;
	// return <Redirect href="/(dashboard)/bills" />;
	return (
		<View className="flex-1 gap-4 justify-center">
			<Link
				className="font-medium text-xl text-center text-[#4D81E7]"
				href="/(auth)/sign-up"
			>
				Sign up
			</Link>
			<Link
				className="font-medium text-xl text-center text-[#4D81E7]"
				href="/(auth)/sign-in"
			>
				Sign in
			</Link>
			<Link
				className="font-medium text-xl text-center text-[#4D81E7]"
				href="/(onboarding)/welcome"
			>
				Welcome
			</Link>
			<Link
				className="font-medium text-xl text-center text-[#4D81E7]"
				href="/(dashboard)"
			>
				Dashboard
			</Link>
			<Link
				className="font-medium text-xl text-center text-[#4D81E7]"
				href="/(dashboard)/feed"
			>
				Feed (Dashboard)
			</Link>
			<Link
				className="font-medium text-xl text-center text-[#4D81E7]"
				href="/(dashboard)/feed/single"
			>
				Single Feed (Dashboard)
			</Link>
			<Link
				className="font-medium text-xl text-center text-[#4D81E7]"
				href="/(dashboard)/bills"
			>
				Bills (Dashboard)
			</Link>
			<Link
				className="font-medium text-xl text-center text-[#4D81E7]"
				href="/(dashboard)/surprise"
			>
				???
			</Link>
		</View>
	);
}
