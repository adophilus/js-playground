import { sql } from "sqlx-ts";
import { Client } from "pg";
import { env } from "bun";
import type { IGetUsersResult } from "./index.queries";

const client = new Client({
	connectionString: env.DATABASE_URL,
});

await client.connect();

const getUsersQuery = sql`
    -- @name: getUsers
    SELECT * FROM users
`;

const main = async () => {
	const result = await client.query(getUsersQuery);
	const rows = result.rows as unknown as IGetUsersResult[];
	console.log(rows[0].username);
};

main();
