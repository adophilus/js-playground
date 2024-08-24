import { defineConfig } from "vite";
import { z } from "zod";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

const env = z
	.object({
		BASE_URL: z.string(),
	})
	.parse(process.env);

export default defineConfig({
	plugins: [TanStackRouterVite(), react()],
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
