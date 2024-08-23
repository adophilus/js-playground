import { defineConfig } from "vite";
import { z } from "zod";
import { resolve } from "node:path";
import solid from "vite-plugin-solid";

const env = z
	.object({
		BASE_URL: z.string(),
	})
	.parse(process.env);

export default defineConfig({
	plugins: [solid()],
	resolve: {
		alias: {
			"@frontend": resolve(__dirname, "./src"),
		},
	},
	server: {
		proxy: {
			"/api": env.BASE_URL,
		},
	},
});
