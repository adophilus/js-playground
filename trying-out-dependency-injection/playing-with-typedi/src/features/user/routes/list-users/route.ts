import { Hono } from "hono";
import { Container } from "@n8n/di";
import { UserService } from "../../service";

export default new Hono().get("/", async (c) => {
	const userService = Container.get(UserService);

	const findAllUsersResult = await userService.findAll();

	if (findAllUsersResult.isErr) {
		return c.json({ code: "UNEXPECTED_ERROR" }, 500);
	}

	const users = findAllUsersResult.value;

	return c.json({ code: "USERS_LIST", data: users });
});
