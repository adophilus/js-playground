import { View, Text, Animated } from "react-native";
import { Button } from "~/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function FadeAnimationScreen() {
	const [isToggled, setIsToggled] = useState(false);
	const fade = useRef(new Animated.Value(0));

	useEffect(() => {
		if (isToggled) {
			Animated.timing(fade.current, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(fade.current, {
				toValue: 0,
				duration: 1000,
				useNativeDriver: true,
			}).start();
		}
	}, [isToggled]);

	return (
		<View className="flex-1 justify-center items-center gap-6">
			<Animated.View
				className="bg-black w-24 aspect-square rounded-full"
				style={{ opacity: fade.current }}
			/>
			<Button
				onPress={() => {
					setIsToggled(!isToggled);
				}}
				className="bg-black"
			>
				<Text className="font-medium text-white">Toggle Fade</Text>
			</Button>
		</View>
	);
}
