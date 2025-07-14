import { faker } from "@faker-js/faker";
import type { User } from "../types";
import { UserRepository } from "./interface";
import { ulid } from "ulidx";
import { Result } from "true-myth";

class InMemoryUserRespository extends UserRepository {
	private userStore: Record<string, User>;

	constructor() {
		super();

		const users = faker.helpers.multiple(
			(): User => ({
				id: ulid(),
				name: faker.person.fullName(),
				username: faker.internet.username(),
				followers: faker.number.int({ min: 0, max: 1000 }),
				posts: faker.number.int({ min: 0, max: 1000 }),
			}),
			{ count: { min: 10, max: 100 } },
		);

		this.userStore = users.reduce(
			(acc, curr) => Object.assign(acc, { [curr.id]: curr }),
			{},
		);
	}
	public async findById(
		id: string,
	): Promise<Result<User | null, "UNEXPECTED_ERROR">> {
		const user = this.userStore[id];

		return Result.ok(user ?? null);
	}
}

export { InMemoryUserRespository };
