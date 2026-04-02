import { type Plugin, tool } from "@opencode-ai/plugin";

export const TimestampTool: Plugin = async () => {
	return {
		tool: {
			timestamp: tool({
				description: "Get the current timestamp",
				args: {},
				execute: async (args, context) => {
					return Math.round(Date.now() / 1000).toString();
				},
			}),
		},
	};
};
