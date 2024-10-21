import { Image, View } from "react-native";

export default function ReglarImageScreen() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Image
				source={require("../assets/images/check-badge.png")}
				style={{ width: 300, height: 300 }}
			/>
		</View>
	);
}
