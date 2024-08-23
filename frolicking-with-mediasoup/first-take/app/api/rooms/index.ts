import { randomUUID } from "node:crypto";
import { database, roomsTable } from "@/lib/database";

export const POST = async () => {
	const [room] = await database
		.insert(roomsTable)
		.values({
			id: randomUUID().toString(),
			participants: "[]",
		})
		.returning();
	return room;
};
