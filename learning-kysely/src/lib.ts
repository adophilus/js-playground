import type { DatabaseTables } from "./types.ts";
import { FileMigrationProvider, Kysely, Migrator, SqliteDialect } from "kysely";
import sqlite from "better-sqlite3";
import fs from "node:fs/promises";
import path from "node:path";

const dialect = new SqliteDialect({ database: sqlite() });

export const database = new Kysely<DatabaseTables>({
	dialect,
});

export const migrator = new Migrator({
	db: database,
	provider: new FileMigrationProvider({
		fs,
		migrationFolder:
			"/home/adophilus/.projects/personal/js-playground/learning-kysely/migrations",
		path,
	}),
});
