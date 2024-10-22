const { mergeConfig } = require("@react-native/metro-config");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
	transformer: {
		babelTransformerPath: require.resolve(
			"react-native-svg-transformer/react-native",
		),
	},
	resolver: {
		assetExts: assetExts.filter((ext) => ext !== "svg"),
		sourceExts: [...sourceExts, "svg"],
	},
};

const nativewindConfig = withNativeWind(defaultConfig, {
	input: "./global.css",
});

module.exports = mergeConfig(nativewindConfig, config);
