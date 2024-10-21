import { useEffect, useRef } from "react";
import { View, Animated, Text } from "react-native";

const startAnimation = (animation: Animated.CompositeAnimation) =>
	new Promise<Animated.EndResult>((res) => animation.start(res));

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function TranslateAnimation() {
	const scaleAnimation = useRef(new Animated.Value(1));
	const textOpacityAnimation = useRef(new Animated.Value(0));
	const textTranslationAnimation = useRef(new Animated.Value(-36));

	const beginAnimation = async () => {
		await sleep(2000); // sleeping so we can get the timing right
		console.log("started animation");
		for (let i = 0; i < 3; i++) {
			await startAnimation(
				Animated.timing(scaleAnimation.current, {
					toValue: 1.5,
					duration: 500,
					useNativeDriver: true,
				}),
			);
			console.log("    finished first animation");
			await startAnimation(
				Animated.timing(scaleAnimation.current, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true,
				}),
			);
			console.log("    finished second animation");
			console.log(`finished animation loop ${i}`);
		}

		await startAnimation(
			Animated.timing(scaleAnimation.current, {
				toValue: 50,
				duration: 2000,
				useNativeDriver: true,
			}),
		);

		await Promise.all([
			startAnimation(
				Animated.timing(textOpacityAnimation.current, {
					toValue: 1,
					duration: 350,
					useNativeDriver: true,
				}),
			),
			startAnimation(
				Animated.timing(textTranslationAnimation.current, {
					toValue: 0,
					duration: 350,
					useNativeDriver: true,
				}),
			),
		]);
	};

	useEffect(() => {
		beginAnimation();
	}, []);

	return (
		<View className="flex-1">
			<View className="-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-10">
				<Animated.View
					style={{
						transform: [{ translateY: textTranslationAnimation.current }],
						opacity: textOpacityAnimation.current,
					}}
				>
					<Text className="text-white font-semibold text-5xl text-center">
						Now you're
					</Text>
					<Text className="text-white font-semibold text-5xl text-center">
						talkin' 😎
					</Text>
				</Animated.View>
			</View>
			<View className="rounded-full bottom-0 absolute translate-y-1/2 -translate-x-1/2 left-1/2">
				<Animated.View
					style={{
						backgroundColor: "black",
						width: 96,
						aspectRatio: "1/1",
						borderRadius: 96,
						transform: [{ scale: scaleAnimation.current }],
					}}
				/>
			</View>
		</View>
	);
}
