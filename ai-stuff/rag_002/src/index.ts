import ollama from "ollama";
import { db, type Database } from "./utils/database";
import { input } from "@inquirer/prompts";
import { sql } from "kysely";

const MODEL = "phi3:mini";

while (true) {
	const userInput = await input({
		message: "USER:",
		theme: { prefix: "🧑‍💻" },
	});

	const rewritingResponse = await ollama.chat({
		model: MODEL,
		messages: [
			{
				role: "system",
				content:
					"You are an AI model who specializes in taking in user input and rewriting them into multiple questions that can easily be queried against a vector database.\n" +
					"You can only give JSON output in the form of an array of strings\n" +
					"You can only give a maximum of 3 rewrites per user question\n" +
					"You can only output the json array and nothing else",
			},
			{
				role: "user",
				content: userInput,
			},
		],
	});

	console.log(rewritingResponse.message);
	continue;

	const userInputEmbedding = await ollama.embeddings({
		model: "nomic-embed-text",
		prompt: userInput,
	});

	const serializedUserInputEmbedding = JSON.stringify(
		userInputEmbedding.embedding,
	);

	const results = await sql<Database["knowledgebase"]>`
		SELECT * FROM vec_knowledgebase
		LEFT JOIN knowledgebase ON vec_knowledgebase.id = knowledgebase.id
		WHERE vec_knowledgebase.question_embedding MATCH ${serializedUserInputEmbedding} AND k = 3`.execute(
		db,
	);

	const serializedResults = results.rows
		.map((row) => `QUESTION: ${row.question}\nANSWER: ${row.answer}\n`)
		.join("\n");

	process.stdout.write("🤖 ASSISTANT: ");
	const response = await ollama
		.chat({
			model: MODEL,
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
