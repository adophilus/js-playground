import { z } from "zod";

export const env = z
	.object({
		API_URL: z.string().url(),
		NODE_ENV: z.enum(["development", "production"]),
		AUTH_ANDROID_CLIENT_ID: z.string(),
		AUTH_WEB_CLIENT_ID: z.string(),
	})
	.parse({
		API_URL: process.env.EXPO_PUBLIC_API_URL,
		AUTH_ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_AUTH_ANDROID_CLIENT_ID,
		AUTH_WEB_CLIENT_ID: process.env.EXPO_PUBLIC_AUTH_WEB_CLIENT_ID,
		NODE_ENV: process.env.NODE_ENV,
	});
