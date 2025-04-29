import {
	seq,
	RegexMatchers,
	kind,
	MatchersStream,
	FilterStream,
} from "mini-parse";
import { z } from "zod";

//       <command> <token address>                             <amount>
const sourceText = "/buy CjqxraDuTMEcfhdqY8qEaMY43icdBrkt3EXciNVpump 0.001";

type Kind = "command" | "address" | "amount" | "ws";
const matcher = new RegexMatchers<Kind>({
	command: /\/[a-zA-Z-_]+/,
	address: /[1-9A-HJ-NP-Za-km-z]{32,44}/,
	amount: /\d+\.?\d*/,
	ws: /\s+/,
});

const command = kind<Kind>("command");
const address = kind<Kind>("address");
const sol = kind<Kind>("amount");
const ws = kind<Kind>("ws");

const stream = new FilterStream(
	new MatchersStream(sourceText, matcher),
	(t) => t.kind !== "ws",
);

const parser = seq(command, address, sol);

const result = parser.parse({ stream });

if (!result) throw new Error("Invalid command");

const validator = z.object({
	command: z.string(),
	amount: z.coerce.number(),
	tokenAddress: z.string(),
});

const validated = validator.parse({
	command: result.value[0],
	tokenAddress: result.value[1],
	amount: result.value[2],
});

console.log(validated);
