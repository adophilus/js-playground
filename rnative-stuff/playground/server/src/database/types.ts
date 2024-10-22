import type { ColumnType } from 'kysely'

type UsersTable = {
  id: string
  email: string
  username: string
  created_at: ColumnType<Date, never, never>
  updated_at?: ColumnType<Date | null, Date, Date>
}

type AuthTable = {
  id: string
  user_id: string
  created_at: ColumnType<Date, never, never>
  updated_at: ColumnType<Date | null, Date, Date>
} & (
  | {
      method: 'password'
      metadata: {
        hash: string
      }
    }
  | {
      method: 'google'
      metadata: object
    }
)

type SessionsTable = {
  id: string
  user_id: string
  expires_at: Date
  created_at: ColumnType<Date, never, never>
  updated_at?: ColumnType<Date | null, Date, Date>
}

export type Database = {
  users: UsersTable
  auth: AuthTable
  sessions: SessionsTable
}
