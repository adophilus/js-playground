import type { User } from "../types";
import type { Result } from "true-myth";

type Error = "UNEXPECTED_ERROR";

abstract class UserRepository {
	public abstract findById(id: string): Promise<Result<User | null, Error>>;
}

const USER_REPOSITORY_KEY = "USER_REPOSITORY";

export { UserRepository, USER_REPOSITORY_KEY };
