import { app } from "@backend/index";
import { serve } from "@hono/node-server";
import { config } from "@backend/lib/config";
import { logger } from "@backend/lib/logger";

serve(
	{
		fetch: app.fetch,
		port: config.app.port,
	},
	(info) => {
		logger.info(`App runninng on port ${info.port}`);
	},
);
