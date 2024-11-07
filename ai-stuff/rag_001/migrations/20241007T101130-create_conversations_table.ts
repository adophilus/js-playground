import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	const query = db.schema
		.createTable("conversations")
		.addColumn("id", "text", (col) => col.primaryKey().notNull())
		.addColumn("prompt", "text", (col) => col.notNull())
		.addColumn("response", "text", (col) => col.notNull())
		.addColumn("timestamp", "timestamp", (col) =>
			col.defaultTo(sql`CURRENT_TIMESTAMP`),
		)
		.compile();
	await sql.raw(query.sql).execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("conversations").execute();
}
