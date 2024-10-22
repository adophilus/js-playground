import { LibsqlDialect } from "@libsql/kysely-libsql";
import { FileMigrationProvider, Kysely, Migrator } from "kysely";
import fs from "node:fs/promises";
import path from "node:path";
import type { Database } from "./types";
import { config } from "../config";

export const db = new Kysely<Database>({
	dialect: new LibsqlDialect({
		url: config.database.url,
	}),
});

export namespace MigratorHandle {
	export const MIGRATION_FOLDER = path.join(
		__dirname,
		"..",
		"..",
		"./migrations",
	);

	export const migrator = new Migrator({
		db,
		provider: new FileMigrationProvider({
			fs,
			path,
			migrationFolder: MIGRATION_FOLDER,
		}),
	});
}
