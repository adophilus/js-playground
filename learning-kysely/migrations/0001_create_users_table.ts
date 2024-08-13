import type { Kysely } from "kysely";

export const up = async (db: Kysely<any>) => {
	await db.schema
		.createTable("users")
		.addColumn("id", "varchar", (col) => col.primaryKey().notNull())
		.addColumn("username", "varchar", (col) => col.notNull().unique())
		.execute();
};

export const down = async (db: Kysely<any>) => {
	await db.schema.dropTable("users").execute();
};
