import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'text', (col) => col.primaryKey().unique().notNull())
    .addColumn('email', 'text', (col) => col.unique().notNull())
    .addColumn('username', 'text', (col) => col.unique().notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn('updated_at', 'timestamp')
    .execute()

  await db.schema
    .createTable('auth')
    .addColumn('id', 'text', (col) => col.primaryKey().unique().notNull())
    .addColumn('user_id', 'text', (col) => col.notNull())
    .addColumn('method', 'text', (col) => col.notNull())
    .addColumn('metadata', 'json', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn('updated_at', 'timestamp')
    .execute()

  await db.schema
    .createTable('sessions')
    .addColumn('id', 'text', (col) => col.primaryKey().unique().notNull())
    .addColumn('user_id', 'text', (col) => col.notNull())
    .addColumn('expires_at', 'timestamp', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn('updated_at', 'timestamp')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('sessions').execute()
  await db.schema.dropTable('auth').execute()
  await db.schema.dropTable('users').execute()
}
