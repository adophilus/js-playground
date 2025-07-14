import type { UserRepository } from "../repository";
import type { User } from "../types";
import { UserService } from "./interface";
import { Result } from "true-myth";

class UserServiceImpl implements UserService {
	constructor(private userRepository: UserRepository) {}

	public findAll(): Promise<Result<User[], "UNEXPECTED_ERROR">> {
		return this.userRepository.findAll();
	}

	public findById(
		id: string,
	): Promise<Result<User | null, "UNEXPECTED_ERROR">> {
		return this.userRepository.findById(id);
	}
}

export { UserServiceImpl };
