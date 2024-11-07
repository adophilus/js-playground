import { env } from "./env";

export const config = {
	database: {
		url: env.DATABASE_URL,
	},
};
