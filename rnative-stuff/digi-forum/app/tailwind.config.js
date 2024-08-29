module.exports = {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./contstants/**/*.{js,jsx,ts,tsx}",
		"./hooks/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				brandDark: "#202433",
				brandDarkSecondary: "#252D3A",
				brandDarkThird: "#272D43",
				brandDarkFourth: "#33394F",

				brandPrimary: "#FC728B",
				brandSecondary: "#F4C395",
				brandAdditional001: "#A296BD",

				neutralWhite: "#FFFFFF",
				neutralBrown: "#8D8080",
				neutralGray: "#999999",
				neutralGray20: "#DDD8D8",

				light100: "#D1CAFF",
				light200: "#FFCACA",
				light300: "#CAECFF",
			},
			fontSize: {
				brandHeading: "32px",
			},
		},
	},
	plugins: [],
};
