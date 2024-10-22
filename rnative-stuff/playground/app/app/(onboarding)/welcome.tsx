import { Text, View } from "react-native";
import { Button } from "~/components/ui/button";
import { useSpring, animated } from "@react-spring/native";
import { Link } from "expo-router";

export default function WelcomeScreen() {
	const fade = useSpring({
		config: {
			duration: 500,
		},
		delay: 2000,
		from: {
			opacity: 0,
		},
		to: {
			opacity: 1,
		},
	});

	return (
		<View className="flex-1 p-6 justify-between">
			<View className="flex-1 items-center justify-center gap-4">
				<Text className="text-center text-4xl font-bold">Welcome</Text>
			</View>
			<animated.View style={fade}>
				<Link asChild href="/(dashboard)">
					<Button
						className="bg-[#1D61E7] py-4 h-auto native:h-auto rounded-2xl flex flex-row gap-2"
						size={"lg"}
						variant={"default"}
					>
						<Text className="font-medium text-white text-lg">Continue</Text>
					</Button>
				</Link>
			</animated.View>
		</View>
	);
}
