import * as jose from "jose";
import { config } from "../../config";
import type { MiddlewareHandler } from "hono";

export namespace TokenService {
	const ALGORITHM = "HS256";
	const SECRET = new TextEncoder().encode(config.auth.providers.jwt.secret);
	const DURATION = "1 week";

	export const generateAccessToken = (userId: string) =>
		new jose.SignJWT({ userId })
			.setExpirationTime(DURATION)
			.setProtectedHeader({ alg: ALGORITHM })
			.sign(SECRET);

	export const routerDecorator: MiddlewareHandler<{
		Variables: {
			tokenService: typeof TokenService;
		};
	}> = (c, next) => {
		c.set("tokenService", TokenService);
		return next();
	};
}
