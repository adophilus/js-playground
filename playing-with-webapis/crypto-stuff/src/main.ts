import { subtle } from "node:crypto";

const key = await subtle.generateKey({ name: "Ed25519" }, true, [
	"sign",
	"verify",
]) as CryptoKeyPair;

const rawData = 'Hello, World!';
const encodedData = new TextEncoder().encode(rawData);

const signedData = await subtle.sign({ name: "Ed25519" }, key.privateKey, encodedData)
console.log(['0x', Array.from(new Uint8Array(signedData)).map(b => b.toString(16).padStart(2, '0')).join('')].join(''));

const verificationResult = await subtle.verify({ name: "Ed25519" }, key.publicKey, signedData, encodedData)
console.log('verificationResult:', verificationResult);

// const exportedPrivateKey = await subtle.exportKey("raw", key.privateKey);
// console.log(exportedPrivateKey);
