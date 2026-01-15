import { subtle } from "node:crypto";

async function generateAndExportKeyAsJwk() {
	const { privateKey } = (await subtle.generateKey({ name: "Ed25519" }, true, [
		"sign",
		"verify",
	])) as CryptoKeyPair;

	const exportedPrivateKey = await subtle.exportKey("jwk", privateKey);
	return JSON.stringify(exportedPrivateKey);
}

console.log(await generateAndExportKeyAsJwk());
console.log(await generateAndExportKeyAsJwk());
