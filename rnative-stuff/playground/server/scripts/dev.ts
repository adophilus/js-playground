import { app, config } from "../src";

export default {
	port: config.app.port,
	fetch: app.fetch,
};
