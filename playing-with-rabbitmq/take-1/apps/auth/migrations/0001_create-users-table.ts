import { Effect } from 'effect'
import { SqlClient } from '@effect/sql'

export default Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient

  yield* sql.onDialectOrElse({
    mssql: sql``,
    orElse: () => sql`
        CREATE TABLE accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
        )
    `
  })

  yield* sql.onDialectOrElse({
    mssql: sql``,
    orElse: () => sql`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            accountId INTEGER NOT NULL,
            email TEXT UNIQUE NOT NULL,
            accessToken VARCHAR(255) UNIQUE NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            FOREIGN KEY (accountId) REFERENCES accounts(id)
        )
    `
  })
})
