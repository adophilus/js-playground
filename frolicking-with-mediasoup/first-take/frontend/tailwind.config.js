/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				Rowdies: "Rowdies, sans-serif",
				Moderustic: "Moderustic, sans-serif",
			},
			transitionProperty: {
				width: "width",
			},
		},
	},
	plugins: [],
};
