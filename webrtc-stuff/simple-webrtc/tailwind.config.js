/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#8EF9F3",
				background: "#171738",
			},
		},
	},
	plugins: [],
};
