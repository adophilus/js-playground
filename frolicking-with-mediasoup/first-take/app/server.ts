import { createApp } from "honox/server";
import { showRoutes } from "hono/dev";
import { database } from "../lib/database/lib";

const app = createApp();

app.use(async (c, next) => {
	c.set("db", database);
	await next();
});

showRoutes(app);

export default app;
