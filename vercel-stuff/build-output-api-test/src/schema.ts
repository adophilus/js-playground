import { z } from "@hono/zod-openapi";

export const GenericResponse = z.object({
	message: z.string(),
});
