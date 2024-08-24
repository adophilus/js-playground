import type { InferSelectModel } from "drizzle-orm";
import type { roomsTable } from "./lib/database";

export type Room = InferSelectModel<typeof roomsTable>;
