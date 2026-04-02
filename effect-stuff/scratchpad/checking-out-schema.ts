import { Schema, Either, ParseResult } from "effect";
import { normalizeEmail } from "email-normalizer";
import { parsePhoneNumberWithError } from "libphonenumber-js";
import { getUnixTime, isValid } from "date-fns";
import normalizeUrl from "normalize-url";
import { isWebUri } from "valid-url";

console.log(normalizeUrl("invalid-url"));

const Timestamp = Schema.transformOrFail(
	Schema.Int.pipe(Schema.positive()),
	Schema.Int.pipe(Schema.positive()),
	{
		decode: (input, _options, ast) =>
			ParseResult.try({
				try: () => {
					if (!isValid(input)) throw new Error("Invalid timestamp");

					return input;
				},
				catch: (error) =>
					new ParseResult.Type(
						ast,
						input,
						error instanceof Error
							? error.message
							: "Failed to decode timestamp",
					),
			}),
		encode: (input, _options, ast) =>
			ParseResult.try({
				try: () => input,
				catch: (error) =>
					new ParseResult.Type(
						ast,
						input,
						error instanceof Error
							? error.message
							: "Failed to encode timestamp",
					),
			}),
	},
).annotations({
	examples: [1762761939],
});

const TimestampFromString = Schema.String.pipe(
	Schema.compose(Schema.NumberFromString),
	Schema.compose(Timestamp),
).annotations({
	examples: [1762761939],
});

const TimestampString = TimestampFromString.pipe(
	Schema.compose(
		Schema.transform(Schema.Number, Schema.String, {
			decode: (input) => input.toString(),
			encode: (input) => Number(input),
		}),
	),
).annotations({
	examples: ["1762761939"],
});

const PhoneNumber = Schema.transformOrFail(Schema.String, Schema.String, {
	decode: (input, _options, ast) =>
		ParseResult.try({
			try: () => parsePhoneNumberWithError(input, "NG").format("E.164"),
			catch: () => new ParseResult.Type(ast, input, "Invalid phone number"),
		}),
	encode: (input, _options, ast) =>
		ParseResult.try({
			try: () => input,
			catch: () => new ParseResult.Type(ast, input, "Invalid phone number"),
		}),
});

const Email = Schema.transformOrFail(Schema.String, Schema.String, {
	decode: (input, _options, ast) =>
		ParseResult.try({
			try: () => normalizeEmail({ email: input }),
			catch: (error) =>
				new ParseResult.Type(
					ast,
					input,
					error instanceof Error ? error.message : "Invalid email address",
				),
		}),
	encode: (input, _options, ast) =>
		ParseResult.try({
			try: () => input,
			catch: (error) =>
				new ParseResult.Type(
					ast,
					input,
					error instanceof Error ? error.message : "Failed to encode email",
				),
		}),
});

const User = Schema.Struct({
	name: Schema.String,
	email: Email,
	phoneNumber: PhoneNumber,
	createdAt: TimestampFromString,
});

const x = Schema.decodeEither(User)({
	name: "Adophilus",
	email: " ADOPHILUS+testing@mysite.com ",
	phoneNumber: "07016719765",
	createdAt: getUnixTime(new Date()).toString(),
});

if (Either.isRight(x)) {
	console.log(x.right);
	console.log(
		Schema.decodeUnknownSync(Email)(" ADOPHILUS+testing@mysite.com "),
	);
} else {
	console.warn(x.left.message);
}
