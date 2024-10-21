import { Canvas, useImage, Image, center } from "@shopify/react-native-skia";
import { View } from "react-native";

export default function SkiaImageScreen() {
	const image = useImage(require("../assets/images/check-badge.png"));
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Canvas style={{ width: 300, height: 300 }}>
				<Image image={image} width={300} height={300} />
			</Canvas>
		</View>
	);
}
