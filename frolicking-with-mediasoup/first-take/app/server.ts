import { createApp } from "honox/server";
import { createNodeWebSocket } from "@hono/node-ws";
import { showRoutes } from "hono/dev";

const app = createApp();

showRoutes(app);

export default app;
