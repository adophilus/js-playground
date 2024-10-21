import {
	BlurMask,
	Canvas,
	Circle,
	Group,
	Oval,
	Paint,
	RadialGradient,
	Skia,
	SweepGradient,
	TileMode,
	vec,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

export default function HelloRNSkiaScreen() {
	const { width, height } = Dimensions.get("window");
	const colors = {
		darkBlue: "#0061ff",
		lightBlue: "#60efff",
		darkBackground: "#0e1c26",
	};
	const center = { x: width / 2, y: height / 2 };
	const radius = 20;
	const rct = {
		x: center.x - radius * 8,
		y: center.y - radius * 4,
		width: radius * 16,
		height: radius * 8,
	};

	return (
		<Canvas style={{ flex: 1, backgroundColor: colors.darkBackground }}>
			<Circle c={center} r={radius} color="lightblue">
				<RadialGradient
					c={{ x: center.x + 25, y: center.y }}
					r={radius}
					colors={[colors.lightBlue, colors.darkBlue]}
				/>
				<BlurMask blur={5} style="inner" />
			</Circle>
			<Group style="stroke" strokeWidth={14}>
				<SweepGradient
					c={center}
					colors={[colors.lightBlue, colors.darkBlue, colors.lightBlue]}
				/>
				<BlurMask blur={5} style="inner" />
				<Oval rect={rct} />
				<Group transform={[{ rotate: Math.PI / 3 }]} origin={center}>
					<Oval rect={rct} />
				</Group>
				<Group transform={[{ rotate: -Math.PI / 3 }]} origin={center}>
					<Oval rect={rct} />
				</Group>
			</Group>
		</Canvas>
	);
}
