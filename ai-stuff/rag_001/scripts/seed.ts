import { db } from "@/utils/database";
import { ulid } from "ulidx";
import { sql } from "kysely";
import ollama from "ollama";

const rows = [
	{
		id: ulid(),
		question: "What is my name?",
		answer:
			"My name is Lawrence and an builder who want to use tech to change the world.",
	},
	{
		id: ulid(),
		question: "What are 3 fun facts about yourself?",
		answer:
			"I like learning, connecting with others and I'm really interested in building products.",
	},
	{
		id: ulid(),
		question: "Why do you like AI?",
		answer:
			"I like AI cos the potential for AI just keeps growing and I think it's really interesting.",
	},
];

console.log("⚙️ Checking if the db has already been seeded");

const existingKnowledgebase = await db
	.selectFrom("knowledgebase")
	.select("id")
	.execute();
if (existingKnowledgebase.length > 0) {
	throw new Error("Knowledgebase already exists");
}

console.log("⚙️ Seeding the db");

console.log("⚙️ Creating embeddings");

await db.transaction().execute(async (db) => {
	await db.insertInto("knowledgebase").values(rows).execute();

	for (const row of rows) {
		const questionEmbeddings = await ollama.embeddings({
			model: "nomic-embed-text",
			prompt: row.question,
		});
		const answerEmbeddings = await ollama.embeddings({
			model: "nomic-embed-text",
			prompt: row.answer,
		});

		const serializedQuestionEmbeddings = JSON.stringify(
			questionEmbeddings.embedding,
		);
		const serializedAnswerEmbeddings = JSON.stringify(
			answerEmbeddings.embedding,
		);

		await sql`
			INSERT INTO vec_knowledgebase(id, question_embedding, answer_embedding)
			VALUES (
				${row.id},
				${serializedQuestionEmbeddings},
				${serializedQuestionEmbeddings}
			)
		`.execute(db);
	}

	console.log("✅ All done");
});
