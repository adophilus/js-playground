import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("knowledgebase")
		.addColumn("id", "text", (col) => col.primaryKey().notNull())
		.addColumn("question", "text", (col) => col.notNull())
		.addColumn("answer", "text", (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("knowledgebase").execute();
}
