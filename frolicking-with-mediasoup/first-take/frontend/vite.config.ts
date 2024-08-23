import { defineConfig } from "vite";
import { z } from "zod";

const env = z
	.object({
		BASE_URL: z.string(),
	})
	.parse(process.env);

export default defineConfig({
	server: {
		proxy: {
			"/api": env.BASE_URL,
		},
	},
});
