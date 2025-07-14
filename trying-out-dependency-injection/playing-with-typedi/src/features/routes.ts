import { Hono } from "hono";
import { UserRouter } from "./user";

export default new Hono().route("/users", UserRouter);
