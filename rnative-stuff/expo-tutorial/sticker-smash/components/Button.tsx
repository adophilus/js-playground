import { Text, Pressable, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export type ButtonProps = {
	label: string;
	theme?: "primary";
	onPress?: () => void;
};

export default function Button({ label, theme, onPress }: ButtonProps) {
	return (
		<View
			style={[
				styles.buttonContainer,
				theme === "primary" && stylesPrimary.buttonContainer,
			]}
		>
			<Pressable
				style={[styles.button, theme === "primary" && stylesPrimary.button]}
				onPress={onPress}
			>
				{theme === "primary" && (
					<FontAwesome name="picture-o" size={24} color="black" />
				)}
				<Text
					style={[
						styles.buttonLabel,
						theme === "primary" && stylesPrimary.buttonLabel,
					]}
				>
					{label}
				</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: 320,
		height: 68,
		marginHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
		padding: 3,
	},
	button: {
		borderRadius: 10,
		width: "100%",
		height: "100%",
		justifyContent: "center",
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
	},
	buttonLabel: {
		fontSize: 16,
		color: "#ffffff",
	},
});

const stylesPrimary = StyleSheet.create({
	buttonContainer: {
		borderWidth: 4,
		borderColor: "#ffd33d",
		borderRadius: 18,
	},
	button: {
		backgroundColor: "#eaeaea",
	},
	buttonLabel: {
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "#000000",
	},
});
