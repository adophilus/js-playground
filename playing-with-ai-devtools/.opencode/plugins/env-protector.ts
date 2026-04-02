import type { Plugin } from "@opencode-ai/plugin";
import { basename } from "node:path";

export const EnvProtectorPlugin: Plugin = async ({ client, project }) => {
	return {
		"tool.execute.before": async (input, output) => {
			await client.app.log({
				body: {
					service: "env-protector",
					level: "info",
					message: input.tool + JSON.stringify(output),
				},
			});

			if (input.tool === "read" && basename(output.args.filePath) === ".env")
				// output.abort = "Cannot read .env files for security reasons";
				throw new Error("Reading `.env*` is blocked to prevent secret leaks.");
		},
	};
};
