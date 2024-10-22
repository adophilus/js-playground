import { run } from "kysely-migration-cli";
import { db } from "../src/database";
import { MigratorHandle } from "../src";

run(db, MigratorHandle.migrator);
