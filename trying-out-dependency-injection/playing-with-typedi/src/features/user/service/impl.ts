import type { User } from "../types";
import { UserService } from "./interface";
import { Result } from "true-myth";

class UserServiceImpl extends UserService {
	public findById(
		id: string,
	): Promise<Result<User | null, "UNEXPECTED_ERROR">> {
		return this.userRepository.findById(id);
	}
}

export { UserServiceImpl };
