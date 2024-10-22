import {
	SafeAreaProvider,
	SafeAreaInsetsContext,
} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { type Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { WalletConnectProvider } from "./wallet";
import { QueryProvider } from "./query";

const LIGHT_THEME: Theme = {
	dark: false,
	colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
	dark: true,
	colors: NAV_THEME.dark,
};

//
// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export function Provider({ children }: { children: React.ReactNode }) {
	const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
	const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

	React.useEffect(() => {
		(async () => {
			// const theme = await AsyncStorage.getItem("theme");
			// if (Platform.OS === "web") {
			// 	// Adds the background color to the html element to prevent white background on overscroll.
			// 	document.documentElement.classList.add("bg-background");
			// }
			// if (!theme) {
			// 	AsyncStorage.setItem("theme", colorScheme);
			// 	setIsColorSchemeLoaded(true);
			// 	return;
			// }
			// const colorTheme = theme === "dark" ? "dark" : "light";
			// if (colorTheme !== colorScheme) {
			// 	setColorScheme(colorTheme);
			// 	setAndroidNavigationBar(colorTheme);
			// 	setIsColorSchemeLoaded(true);
			// 	return;
			// }
			// setAndroidNavigationBar(colorTheme);
			// setIsColorSchemeLoaded(true);
		})().finally(() => {
			SplashScreen.hideAsync();
		});
	}, []);

	// if (!isColorSchemeLoaded) {
	// 	return null;
	// }

	return (
		<SafeAreaProvider>
			<SafeAreaInsetsContext.Consumer>
				{(insets) => (
					<ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
						<View
							style={{
								paddingTop: insets?.top,
								paddingBottom: insets?.bottom,
								paddingLeft: insets?.left,
								paddingRight: insets?.right,
							}}
							className="flex-1"
						>
							<QueryProvider>
								<WalletConnectProvider>{children}</WalletConnectProvider>
							</QueryProvider>
						</View>
					</ThemeProvider>
				)}
			</SafeAreaInsetsContext.Consumer>
		</SafeAreaProvider>
	);
}
