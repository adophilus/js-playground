// import { Canvas, ImageSVG, Skia, useSVG } from "@shopify/react-native-skia";

// const svg = Skia.SVG.MakeFromString(`
// <svg viewBox="0 0 2222 2222" fill="none" xmlns="http://www.w3.org/2000/svg">
// <g filter="url(#filter0_f_3_18)">
// <circle cx="1111" cy="1111" r="511" fill="#FFDF00"/>
// </g>
// <g filter="url(#filter1_di_3_18)">
// <path d="M1446.43 965.208C1447.4 957.891 1447.9 950.575 1447.9 943.3C1447.9 843.263 1357.79 762.99 1257.79 776.572C1228.65 724.724 1173.15 691 1111.5 691C1049.85 691 994.349 724.724 965.208 776.572C865.003 762.99 775.1 843.263 775.1 943.3C775.1 950.575 775.605 957.891 776.572 965.208C724.724 994.391 691 1049.9 691 1111.5C691 1173.1 724.724 1228.61 776.572 1257.79C775.602 1265.05 775.11 1272.37 775.1 1279.7C775.1 1379.74 865.003 1459.8 965.208 1446.43C994.349 1498.28 1049.85 1532 1111.5 1532C1173.15 1532 1228.65 1498.28 1257.79 1446.43C1357.79 1459.8 1447.9 1379.74 1447.9 1279.7C1447.9 1272.43 1447.4 1265.11 1446.43 1257.79C1498.28 1228.61 1532 1173.1 1532 1111.5C1532 1049.9 1498.28 994.391 1446.43 965.208Z" fill="white"/>
// </g>
// <path d="M1376.83 995.367C1377.6 989.567 1378 983.767 1378 978C1378 898.7 1306.57 835.067 1227.3 845.833C1204.2 804.733 1160.2 778 1111.33 778C1062.47 778 1018.47 804.733 995.367 845.833C915.933 835.067 844.667 898.7 844.667 978C844.667 983.767 845.067 989.567 845.833 995.367C804.733 1018.5 778 1062.5 778 1111.33C778 1160.17 804.733 1204.17 845.833 1227.3C845.064 1233.06 844.675 1238.86 844.667 1244.67C844.667 1323.97 915.933 1387.43 995.367 1376.83C1018.47 1417.93 1062.47 1444.67 1111.33 1444.67C1160.2 1444.67 1204.2 1417.93 1227.3 1376.83C1306.57 1387.43 1378 1323.97 1378 1244.67C1378 1238.9 1377.6 1233.1 1376.83 1227.3C1417.93 1204.17 1444.67 1160.17 1444.67 1111.33C1444.67 1062.5 1417.93 1018.5 1376.83 995.367ZM1076.5 1258.53L954.267 1134.73L1001.73 1087.93L1076.97 1164.13L1221.2 1021L1268.13 1068.33L1076.5 1258.53Z" fill="#1D61E7"/>
// <defs>
// <filter id="filter0_f_3_18" x="0" y="0" width="2222" height="2222" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
// <feGaussianBlur stdDeviation="300" result="effect1_foregroundBlur_3_18"/>
// </filter>
// <filter id="filter1_di_3_18" x="687" y="691" width="849" height="849" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
// <feOffset dy="4"/>
// <feGaussianBlur stdDeviation="2"/>
// <feComposite in2="hardAlpha" operator="out"/>
// <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
// <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_18"/>
// <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_18" result="shape"/>
// <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
// <feOffset dy="4"/>
// <feGaussianBlur stdDeviation="2"/>
// <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
// <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
// <feBlend mode="normal" in2="shape" result="effect2_innerShadow_3_18"/>
// </filter>
// </defs>
// </svg>
// `);

// export function CheckBadgeIcon() {
// 	// const svg = useSVG(require("../../assets/tiger.svg"));
// 	return (
// 		<Canvas style={{ flex: 1 }}>
// 			<ImageSVG svg={svg} width={300} height={300} />
// 		</Canvas>
// 	);
// }

export function CheckBadgeIcon() {
	const svg = useSVG(
		"https://upload.wikimedia.org/wikipedia/commons/f/fd/Ghostscript_Tiger.svg",
	);
	return (
		<Canvas style={{ backgroundColor: "red", flex: 1 }}>
			{svg && <ImageSVG svg={svg} width={256} height={256} />}
		</Canvas>
	);
}

// export { default as CheckBadgeIcon } from "~/assets/icons/check-badge-with-spotlight-icon.svg";
//
// import { forwardRef, type FunctionComponent } from "react";
// import { Image as ExpoImage } from "expo-image";
// import { Image, View, StyleSheet } from "react-native";
// import ReactNativeLogoImage from "../../assets/images/react-native-logo.png";
//
// // type ImageProps = React.ElementRef<
// // 	typeof Image & Partial<{ className: string }>
// // >;
// // export const CheckBadgeIcon = forwardRef<ImageProps, ImageProps>(
// // 	(props, ref) => (
// // 		<Image
// // 			source={require("../../assets/images/check-badge.png")}
// // 			className="bg-red-400"
// // 			ref={ref}
// // 			{...props}
// // 		/>
// // 	),
// // );
// //
//
// type ImageProps = Partial<{ className: string }>;
//
// export const CheckBadgeImage: FunctionComponent<ImageProps> = (props) => {
// 	return (
// 		// <Image
// 		// 	source={require("~/assets/images/check-badge.png")}
// 		// 	// className="bg-red-400 size-[100]"
// 		// 	style={{
// 		// 		width: 100,
// 		// 		height: 100,
// 		// 		resizeMode: "contain",
// 		// 		backgroundColor: "red",
// 		// 	}}
// 		// />
// 		<Image
// 			source={require("~/assets/images/react-native-logo.png")}
// 			// source={{
// 			// 	uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
// 			// }}
// 			// source={"../../assets/images/react-native-logo.png"}
// 			// source={require("~/assets/images/react-native-logo.png")}
// 			// source={require("~/assets/images/check-badge.png")}
// 			// contentFit="contain"
// 			// className="bg-red-400 size-[100]"
// 			onError={(err) => console.log(err)}
// 			resizeMode="cover"
// 			onLoad={(e) => {
// 				console.log(e.nativeEvent.source.width, e.nativeEvent.source.height);
// 				// e.nativeEvent.source.;
// 			}}
// 			width={100}
// 			height={100}
// 			style={{
// 				height: 200,
// 				width: 200,
// 			}}
// 		/>
// 	);
// };
//
// export const CheckBadgeExpoImage: FunctionComponent<ImageProps> = (props) => {
// 	return (
// 		<ExpoImage
// 			source={require("~/assets/images/hill.webp")}
// 			// source={require("~/assets/images/check-badge-with-spotlight-icon.webp")}
// 			contentFit="contain"
// 			style={{
// 				flex: 1,
// 				height: 200,
// 				width: 200,
// 			}}
// 		/>
// 	);
// };
//
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// 	image: {
// 		flex: 1,
// 		width: "100%",
// 		backgroundColor: "#0553",
// 	},
// });
//
