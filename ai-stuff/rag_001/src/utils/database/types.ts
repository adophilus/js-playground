import type { Generated } from "kysely";

type ConversationsTable = {
	id: string;
	prompt: string;
	response: string;
	timestamp: Generated<Date>;
};

type KnowledgebaseTable = {
	id: string;
	question: string;
	answer: string;
};

export type Database = {
	conversations: ConversationsTable;
	knowledgebase: KnowledgebaseTable;
};
