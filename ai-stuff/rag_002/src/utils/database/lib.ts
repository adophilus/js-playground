import { Kysely } from "kysely";
import type { Database } from "./types";
import { config } from "../config";
import { BunSqliteDialect } from "kysely-bun-sqlite";
import sqlite from "bun:sqlite";
import * as sqliteVec from "sqlite-vec";

const conn = new sqlite(config.database.url);

sqliteVec.load(conn);

const dialect = new BunSqliteDialect({
	database: conn,
});

export const db = new Kysely<Database>({
	dialect,
});
