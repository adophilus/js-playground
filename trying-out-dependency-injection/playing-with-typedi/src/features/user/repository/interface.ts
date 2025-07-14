import type { User } from "../types";
import type { Result } from "true-myth";

type Error = "UNEXPECTED_ERROR";

abstract class UserRepository {
	public abstract findAll(): Promise<Result<User[], Error>>;
	public abstract findById(id: string): Promise<Result<User | null, Error>>;
}

export { UserRepository };
