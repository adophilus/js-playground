import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
	server: {
		MAIL_URL: z.string().url(),
	},
	clientPrefix: "",
	client: {},
	runtimeEnv: process.env,
});
