import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await sql`
		CREATE VIRTUAL TABLE vec_knowledgebase USING vec0(
  			id TEXT PRIMARY KEY NOT NULL,
  			question_embedding FLOAT[768],
  			answer_embedding FLOAT[768],
		)
	`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
	await sql`DROP TABLE vec_knowledgebase`.execute(db);
}
