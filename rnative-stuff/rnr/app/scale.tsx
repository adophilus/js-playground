import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import { cn } from "~/lib/utils";

export default function ScaleAnimationScreen() {
	const [isToggled, setIsToggled] = useState(false);

	return (
		<View className="flex-1 justify-center items-center">
			<Pressable onPress={() => setIsToggled((x) => !x)}>
				<View
					className={cn(
						"bg-black transition-[width] duration-1000 aspect-square rounded-full flex items-center justify-center",
						isToggled ? "w-[1000]" : "w-[75]",
					)}
				>
					<Text
						className={cn(
							"text-white text-4xl font-bold duration-1000 transition-all",
							isToggled
								? "opacity-100 translate-y-0 delay-1000"
								: "opacity-0 -translate-y-24 delay-0",
						)}
					>
						Looking good 😎
					</Text>
				</View>
			</Pressable>
		</View>
	);
}
