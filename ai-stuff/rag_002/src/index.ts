import ollama from "ollama";
import { db, type Database } from "./utils/database";
import { input } from "@inquirer/prompts";
import { sql } from "kysely";
import { z } from "zod";

const MODEL = "llama3.2:1b";

type QueryEmbedding = {
	query: string;
	embedding: number[];
};

const queryToQueryEmbedding = async (
	query: string,
): Promise<QueryEmbedding> => {
	const { embedding } = await ollama.embeddings({
		model: "nomic-embed-text",
		prompt: query,
	});

	return {
		query,
		embedding,
	};
};

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
					"You can only output the json array and nothing else\n" +
					"Here's some examples of questions with their JSON responses:\n" +
					"1. User: What is the capital of France?\n" +
					'   Response: ["What is the capital city of France?", "Which city is the capital of France?", "France\'s capital city is?"]\n' +
					"2. User: How does photosynthesis work?\n" +
					'   Response: ["What is the process of photosynthesis?", "How does the process of photosynthesis happen?", "Explain how photosynthesis works."]\n' +
					"3. User: Who wrote 'To Kill a Mockingbird'?\n" +
					"   Response: [\"Who is the author of 'To Kill a Mockingbird'?\", \"Who wrote the novel 'To Kill a Mockingbird'?\", \"Who is credited with writing 'To Kill a Mockingbird'?\"]\n" +
					"4. User: What are the symptoms of diabetes?\n" +
					'   Response: ["What symptoms are associated with diabetes?", "What are common signs of diabetes?", "Describe symptoms of diabetes."]\n' +
					"5. User: Explain quantum computing.\n" +
					'   Response: ["What is quantum computing?", "Describe quantum computing.", "How does quantum computing work?"]\n' +
					"6. User: What are the benefits of a balanced diet?\n" +
					'   Response: ["Why is a balanced diet important?", "What are the positive effects of a balanced diet?", "How does a balanced diet benefit health?"]\n' +
					"7. User: Where is Mount Everest located?\n" +
					'   Response: ["In which country is Mount Everest located?", "Where can Mount Everest be found?", "Which region has Mount Everest?"]\n' +
					"8. User: What causes climate change?\n" +
					'   Response: ["What factors contribute to climate change?", "How does climate change occur?", "What are the causes behind climate change?"]\n' +
					"9. User: How do I learn Python programming?\n" +
					'   Response: ["What is the best way to learn Python programming?", "How can I start learning Python?", "How to learn Python programming effectively?"]\n' +
					"10. User: What is the population of Japan?\n" +
					'   Response: ["How many people live in Japan?", "What is Japan\'s population size?", "What is the current population of Japan?"]\n' +
					"11. User: Describe the lifecycle of a butterfly.\n" +
					'   Response: ["What are the stages in a butterfly\'s lifecycle?", "How does a butterfly\'s lifecycle progress?", "Explain the lifecycle of a butterfly."]\n',
			},
			{
				role: "user",
				content: userInput,
			},
		],
	});

	const stringJsonOfQueries = rewritingResponse.message.content
		.replace("```\n", "")
		.replace("\n```", "");

	console.log("DEBUG:", { stringJsonOfQueries });
	const jsonArrayOfQueries = z
		.array(z.string())
		.parse(JSON.parse(stringJsonOfQueries));

	const rewrittenQueryEmbeddings = await Promise.all(
		jsonArrayOfQueries.map(queryToQueryEmbedding),
	);

	const results = await Promise.all(
		rewrittenQueryEmbeddings.map(async ({ query, embedding }) => {
			const { rows } = await sql<Database["knowledgebase"]>`
				SELECT
					knowledgebase.id,
					knowledgebase.question,
					knowledgebase.answer
				FROM vec_knowledgebase
				LEFT JOIN knowledgebase ON vec_knowledgebase.id = knowledgebase.id
				WHERE vec_knowledgebase.question_embedding
				MATCH ${JSON.stringify(embedding)}
				AND k = 3
			`.execute(db);

			return {
				query,
				database_rows: rows,
			};
		}),
	);

	const serializedResults = results
		.map((result) => {
			const serializedQuery = `USER QUERY: ${result.query}\n`;
			const serializedDatabaseRows = result.database_rows
				.map((row) => [
					`DATABASE QUESTION: ${row.question}`,
					`DATABASE ANSWER: ${row.answer}\n`,
				])
				.join("\n");
			const serializedResult = serializedQuery + serializedDatabaseRows;
			return serializedResult;
		})
		.join("\n");

	process.stdout.write("🤖 ASSISTANT: ");
	await ollama
		.chat({
			model: MODEL,
			messages: [
				{
					role: "system",
					content:
						// biome-ignore lint/style/useTemplate: <explanation>
						"You are an AI assistant responsible for selecting the most relevant and accurate answer to respond to the user's question. Use the provided question and answer sequences to guide your response.\n\n" +
						"Instructions:\n" +
						"- Analyze each question and answer sequence carefully.\n" +
						"- Select the answer that most directly addresses the user's question.\n" +
						"- If multiple answers are relevant, synthesize them into a single, concise response.\n" +
						"- Do not include any information that is not contained in the provided sequences.\n" +
						"- Do not show the question and answer sequences to the user.\n\n" +
						"Here are the question and answer sequences:\n" +
						"```\n" +
						`${serializedResults}\n` +
						"```\n",
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
