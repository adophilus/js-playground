import React from "react";
import {
	Skia,
	drawAsImage,
	Group,
	Rect,
	Canvas,
	Atlas,
	rect,
} from "@shopify/react-native-skia";
import { SafeAreaView } from "react-native-safe-area-context";

const size = { width: 25, height: 11.25 };
const strokeWidth = 2;
const imageSize = {
	width: size.width + strokeWidth,
	height: size.height + strokeWidth,
};
const image = drawAsImage(
	<Group>
		<Rect
			rect={rect(strokeWidth / 2, strokeWidth / 2, size.width, size.height)}
			color="cyan"
		/>
		<Rect
			rect={rect(strokeWidth / 2, strokeWidth / 2, size.width, size.height)}
			color="blue"
			style="stroke"
			strokeWidth={strokeWidth}
		/>
	</Group>,
	imageSize,
);

const ImageWithAtlas = () => {
	// Create 350 sprites (350 Rectangles)
	const numberOfBoxes = 350;
	const sprites = new Array(numberOfBoxes)
		.fill(0)
		.map(() => rect(0, 0, imageSize.width, imageSize.height));

	// Create transformation rules for each sprites
	const pos = { x: 190, y: 258 };
	const width = 400;

	const transforms = new Array(numberOfBoxes).fill(0).map((_, i) => {
		const tx = 5 + ((i * size.width) % width);
		const ty = 25 + Math.floor(i / (width / size.width)) * size.width;
		const r = Math.atan2(pos.y - ty, pos.x - tx);
		return Skia.RSXform(Math.cos(r), Math.sin(r), tx, ty);
	});

	// Finally create & return the Atlas component to render 350 sprites
	return (
		<Canvas
			style={{
				width: "100%",
				height: "100%",
			}}
		>
			<Atlas image={image} sprites={sprites} transforms={transforms} />
		</Canvas>
	);
};

export default function IndexScreen() {
	return (
		<SafeAreaView>
			<ImageWithAtlas />
		</SafeAreaView>
	);
}
