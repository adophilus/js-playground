import { Hono } from "hono";
import { logger } from "hono/logger";
import { FeatureRouter } from "./features";
import "./bootstrap";

export const createApp = () =>
	new Hono()
		.use(logger())
		.route("/", FeatureRouter)
		.onError((err, c) => {
			console.error(err);
			return c.json({ code: "UNEXPECTED_ERROR" }, 500);
		})
		.notFound((c) => c.json({ code: "NOT_FOUND" }, 404));

export type App = ReturnType<typeof createApp>;
