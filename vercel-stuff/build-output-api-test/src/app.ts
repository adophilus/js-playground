import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { GenericResponse } from "./schema";
import { apiReference } from "@scalar/hono-api-reference";
import { Hono } from "hono";

const routes = new OpenAPIHono()
	.openapi(
		createRoute({
			method: "get",
			path: "/",
			responses: {
				200: {
					content: {
						"application/json": {
							schema: GenericResponse,
						},
					},
					description: "Get the index route",
				},
			},
		}),
		(c) => c.json({ message: "Welcome to the api up" }),
	)
	.openapi(
		createRoute({
			method: "get",
			path: "/greet/:name",
			request: {
				params: z.object({
					name: z.string(),
				}),
			},
			responses: {
				200: {
					content: {
						"application/json": {
							schema: GenericResponse,
						},
					},
					description: "Get a greeting message",
				},
			},
		}),
		(c) => c.json({ message: `Greetings ${c.req.param("name")}` }),
	);

const openapi = new OpenAPIHono()
	.route("/api", routes)
	.doc("/api/doc.json", {
		openapi: "3.0.0",
		info: {
			version: "1.0.0",
			title: "Vercel Build Output API Test",
		},
	})
	.get(
		"/api/doc",
		apiReference({
			spec: {
				url: "/doc.json",
			},
		}),
	);

export const app = new Hono()
	.get("/", (c) => c.html(`<!DOCTYPE html><html><head><meta name="cryptomus" content="343c728e" /></head><body></body></html>`))
	.route("/api", openapi)
