import { Hono } from "hono";
import Container from "typedi";
import { USER_SERVICE_KEY, UserService } from "../../service";

export default new Hono().get("/:id", async (c) => {
	const id = c.req.param("id");

	const userService = Container.get<UserService>(USER_SERVICE_KEY);

	const findUserByIdResult = await userService.findById(id);
	if (findUserByIdResult.isErr) {
		return c.json({ code: "UNEXPECTED_ERROR" }, 500);
	}

	const user = findUserByIdResult.value;

	if (!user) {
		return c.json({ code: "NOT_FOUND" }, 404);
	}

	return c.json({ code: "USER_FOUND", data: user });
});
