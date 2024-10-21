import * as React from "react";
import { View, Image } from "react-native";
import {
	Canvas,
	Circle,
	Group,
	Image as SKImage,
	useImage,
	ImageSVG,
	useSVG,
} from "@shopify/react-native-skia";
import { Image as ExpoImage } from "expo-image";
import { Asset, useAssets } from "expo-asset";

const GITHUB_AVATAR_URI =
	"https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

export default function Screen() {
	const [progress, setProgress] = React.useState(78);
	// console.log(require("../assets/images/check-badge-with-spotlight.png"));
	const [assets, error] = useAssets([
		require("~/assets/images/check-badge-with-spotlight.png"),
		require("~/assets/icons/check-badge-with-spotlight.svg"),
	]);
	console.log("assets:", assets);
	// console.log(assets);
	// console.info(assets);
	// console.warn(error);

	const imageSourceLocalUri = assets?.[0].localUri;
	const imageSvgSourceLocalUri = assets?.[1].localUri;

	const imageSourceUri = assets?.[0].uri;
	const imageSvgSourceUri = assets?.[1].uri;

	// const image = useImage(imageSourceLocalUri ?? "");
	// const svg = useSVG(imageSvgSourceLocalUri ?? "");

	const image = useImage(imageSourceUri ?? "");
	const svg = useSVG(imageSvgSourceUri ?? "");

	console.log("imageSourceUri:", imageSourceUri);
	console.log("imageSvgSourceUri:", imageSvgSourceUri);

	return svg && image && <ImageComponent image={image} svg={svg} />;
}

const ImageComponent: React.FunctionComponent<{ svg: any; image: any }> = ({
	image,
	svg,
}) => {
	const width = 256;
	const height = 256;
	const r = width * 0.33;

	return (
		<View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
			<View className="border border-blue-600">
				<Canvas style={{ width, height }}>
					<SKImage image={image} width={width} height={height} />
				</Canvas>
			</View>
			<View className="border border-red-600">
				<Canvas style={{ width, height }}>
					<ImageSVG svg={svg} width={width} height={height} />
				</Canvas>
			</View>
			<View className="border border-green-600">
				<ExpoImage
					source={
						Asset.fromModule(
							require("../assets/images/check-badge-with-spotlight.png"),
						).uri
					}
					style={{ width, height }}
				/>
			</View>
			{/*<Image
				source={Asset.fromModule(
					require("~/assets/images/check-badge-with-spotlight.png"),
				)}
				style={{ width, height }}
			/>*/}
			{/*
			{assets ? (
				<Image
					// source={require("../assets/images/check-badge-with-spotlight.png")}
					source={assets[0]}
					style={{ width, height }}
				/>
			) : null}
			*/}
		</View>
	);
};
