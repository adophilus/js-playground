import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";
import { SignJWT } from "jose";

// or stateful token
const generateOpaqueToken = (): string => {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
};

const secret = new TextEncoder().encode("SUPER-SECURE-SECRET");

// or stateless token
const generateTransparentToken = async (): Promise<string> => {
	const userData = {
		email: "user@mail.com",
		passwordHash:
			"$2a$10$eOVNeBH7hN7gJhGjPXKtmu0TWmGgDwpd1fnY4l/Stk8mH6TH8JXOK",
		twoFactorAuth: false,
	};

	return new SignJWT(userData)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setIssuer("urn:test.org")
		.sign(secret);
};

const opaqueToken = generateOpaqueToken();
const transparentToken = await generateTransparentToken();

console.log("Opaque token:", opaqueToken);
console.log("Transparent token:", transparentToken);
