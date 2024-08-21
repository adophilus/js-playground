import { randomUUID } from "node:crypto";
import { createRoute } from "honox/factory";
import { database } from "../../../lib/database";

export const POST = createRoute(async (c) => {
	const room = await database
		.insertInto("rooms")
		.values({
			id: randomUUID().toString(),
			participants: "[]",
		})
		.returningAll()
		.executeTakeFirstOrThrow();
	return room;
});
