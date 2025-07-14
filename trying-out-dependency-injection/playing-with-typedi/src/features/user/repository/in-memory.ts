import { faker } from "@faker-js/faker";
import type { User } from "../types";
import { UserRepository } from "./interface";
import { ulid } from "ulidx";
import { Result } from "true-myth";

class InMemoryUserRespository implements UserRepository {
	private userStore: Record<string, User>;

	constructor() {
		const users = faker.helpers.multiple(
			(): User => {
				const firstName = faker.person.firstName();
				const lastName = faker.person.lastName();

				return {
					id: ulid(),
					name: faker.person.fullName({ firstName, lastName }),
					username: faker.internet.username({ firstName, lastName }),
					followers: faker.number.int({ min: 0, max: 1000 }),
					posts: faker.number.int({ min: 0, max: 1000 }),
				};
			},
			{ count: { min: 10, max: 100 } },
		);

		this.userStore = users.reduce(
			(acc, curr) => Object.assign(acc, { [curr.id]: curr }),
			{},
		);
	}

	public async findAll(): Promise<Result<User[], "UNEXPECTED_ERROR">> {
		const users = Object.values(this.userStore);
		return Result.ok(users);
	}

	public async findById(
		id: string,
	): Promise<Result<User | null, "UNEXPECTED_ERROR">> {
		const user = this.userStore[id];

		return Result.ok(user ?? null);
	}
}

export { InMemoryUserRespository };
