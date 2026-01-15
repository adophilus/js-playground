import { webcrypto } from "node:crypto";

const rawKey1 = {
	crv: "Ed25519",
	d: "FnTDjiiwcoVKCaGzKkZMpcYNzNFMmzWbZOhnxrBd4lo",
	ext: true,
	key_ops: ["sign"],
	kty: "OKP",
	x: "NzVEM9lUR3KS6r2QpGmWkDVgH8AeemLZD7Bl15dCpDs",
};
const rawKey2 = {
	crv: "Ed25519",
	d: "2M10eXqGbSKAuDQs4GbLTsCmf7PI5WYCeNPKib0PvQk",
	ext: true,
	key_ops: ["sign"],
	kty: "OKP",
	x: "PcHS0vmTSjCTQNZbZ6GTto4gB7eamJnhSn4MqrdGfe0",
};

const key1 = await webcrypto.subtle.importKey(
	"jwk",
	rawKey1,
	{ name: "Ed25519" },
	true,
	["sign", "verify"],
);
const key2 = await webcrypto.subtle.importKey(
	"jwk",
	rawKey2,
	{ name: "Ed25519" },
	true,
	["sign", "verify"],
);
