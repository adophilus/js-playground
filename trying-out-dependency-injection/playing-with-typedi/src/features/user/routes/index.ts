import { Hono } from "hono";
import { GetUserByIdRouter } from "./get-user-by-id";

export default new Hono().route("/", GetUserByIdRouter);
