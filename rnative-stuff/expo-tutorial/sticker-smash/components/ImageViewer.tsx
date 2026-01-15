import { Image } from "expo-image";
import { ImageSourcePropType, StyleSheet } from "react-native";

export type ImageViewerProps = {
	imgSource: ImageSourcePropType;
};

export default function ImageViewer({ imgSource }: ImageViewerProps) {
	return <Image source={imgSource} style={styles.image} />;
}

const styles = StyleSheet.create({
	image: {
		width: 320,
		height: 330,
		borderRadius: 18,
	},
});
