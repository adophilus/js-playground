import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function IndexScreen() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				gap: 4,
			}}
		>
			<Link href="/hello-rn-skia" style={styles.link}>
				Hello RN Skia
			</Link>
			<Link href="/blog-post" style={styles.link}>
				Blog post
			</Link>
			<Link href="/regular-image" style={styles.link}>
				Regular image
			</Link>
			<Link href="/skia-image" style={styles.link}>
				Skia image
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	link: {
		color: "#0061ff",
		fontWeight: "600",
		fontSize: 24,
	},
});
