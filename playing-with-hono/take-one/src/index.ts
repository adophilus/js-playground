import { Hono } from "hono";

export const app = new Hono()
	.get("/", (c) => {
		return c.text("Hello Hono!");
	})
	.post("/users", async (c) => {
		c.json({
			id: "1",
			username: "johndoe",
		});
	});

export type App = typeof app;
