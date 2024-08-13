import { database, migrator } from "./lib.ts";

const main = async () => {
	console.log("Migration result:", await migrator.migrateToLatest());

	const users = await database
		.selectFrom("users")
		.selectAll()
		.where("username", "=", "user")
		.execute();

	console.log(users);
};

main();
