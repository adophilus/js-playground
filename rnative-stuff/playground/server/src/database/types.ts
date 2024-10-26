import type { ColumnType } from 'kysely'

type UsersTable = {
  id: string
  email: string
  username: string
  created_at: ColumnType<number, never, never>
  updated_at: ColumnType<number | null, number | undefined, number>
}

type AuthTable = {
  id: string
  user_id: string
  created_at: ColumnType<number, never, never>
  updated_at: ColumnType<number | null, number | undefined, number>
} & (
  | {
      method: 'password'
      metadata: {
        hash: string
      }
    }
  | {
      method: 'google'
      metadata: string
    }
)

type SessionsTable = {
  id: string
  user_id: string
  expires_at: number
  created_at: ColumnType<number, never, never>
  updated_at: ColumnType<number | null, number | undefined, number>
}

export type Database = {
  users: UsersTable
  auth: AuthTable
  sessions: SessionsTable
}
