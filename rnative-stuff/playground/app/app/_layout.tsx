import "~/global.css";
import "react-native-reanimated";
import "react-native-gesture-handler";

import { SplashScreen, Stack } from "expo-router";
import * as React from "react";
import { PortalHost } from "@rn-primitives/portal";
import { Provider } from "./components/provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	return (
		<>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Provider>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="(auth)" />
						<Stack.Screen name="(onboarding)" />
						<Stack.Screen name="(dashboard)" />
					</Stack>
					<PortalHost />
				</Provider>
			</GestureHandlerRootView>
			<Toast />
		</>
	);
}
