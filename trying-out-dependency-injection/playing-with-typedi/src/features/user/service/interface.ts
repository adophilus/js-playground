import type { UserRepository } from "../repository";
import type { User } from "../types";
import type { Result } from "true-myth";

type Error = "UNEXPECTED_ERROR";

abstract class UserService {
	protected declare userRepository: UserRepository;

	public abstract findById(id: string): Promise<Result<User | null, Error>>;
}

const USER_SERVICE_KEY = "USER_SERVICE";

export { USER_SERVICE_KEY, UserService };
