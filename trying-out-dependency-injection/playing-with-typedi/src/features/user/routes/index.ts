import { Hono } from "hono";
import { GetUserByIdRoute } from "./get-user-by-id";
import { ListUsersRoute } from "./list-users";

export default new Hono()
	.route("/", GetUserByIdRoute)
	.route("/", ListUsersRoute);
