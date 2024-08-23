import { defineConfig } from "drizzle-kit";
import { config } from "./src/lib/config";

export default defineConfig({
	schema: "./lib/database/schema.ts",
	out: "./drizzle",
	dialect: "sqlite",
	dbCredentials: {
		url: config.database.url,
	},
});
