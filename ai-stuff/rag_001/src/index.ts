import ollama from "ollama";
import { db, type Database } from "./utils/database";
import { input } from "@inquirer/prompts";
import { sql } from "kysely";

while (true) {
	const userInput = await input({
		message: "USER:",
		theme: { prefix: "🧑‍💻" },
	});

	console.log({ userInput })

	const userInputEmbedding = await ollama.embeddings({
		model: "nomic-embed-text",
		prompt: userInput,
	});

	console.log({ userInputEmbedding })

	const serializedUserInputEmbedding = JSON.stringify(
		userInputEmbedding.embedding,
	);
	console.log({ serializedUserInputEmbedding })

	const results = await sql<Database["knowledgebase"]>`
		SELECT * FROM vec_knowledgebase
		LEFT JOIN knowledgebase ON vec_knowledgebase.id = knowledgebase.id
		WHERE vec_knowledgebase.question_embedding MATCH ${serializedUserInputEmbedding} AND k = 3`.execute(
		db,
	);

	console.log({ results })

	const serializedResults = results.rows
		.map((row) => `QUESTION: ${row.question}\nANSWER: ${row.answer}\n`)
		.join("\n");

	console.log({ serializedResults })

	process.stdout.write("🤖 ASSISTANT: ");
	const response = await ollama
		.chat({
			model: "phi3:mini",
			messages: [
				{
					role: "system",
					// content: `The user has asked for a question. Pretend that you are a viscious pirate that only speaks in piratic gibberish. Using the following context, answer the users question: ${serializedResults}`,
					content: `
						You are AI assistant that only speaks in olden day english.
						Using the following question and answer sequences, determine the appropriate answer to use to respond to the user's question.

						- Do not show the user the questions and answers
						- Only answer their questions based on the following information

						Here's the question and answer sequences:
						\`\`\`
						${serializedResults}
						\`\`\`
					`,
				},
				{ role: "user", content: userInput },
			],
			stream: true,
		})
		.then(async (stream) => {
			for await (const chunk of stream) {
				process.stdout.write(chunk.message.content);
			}
		})
		.finally(() => process.stdout.write("\n"));
}
