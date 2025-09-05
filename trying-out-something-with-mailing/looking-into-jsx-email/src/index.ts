import nodemailer from "nodemailer";
import { env } from "./env";

const transporter = nodemailer.createTransport({
	url: env.MAIL_URL,
	headers: { "Content-Transfer-Encoding": "quoted-printable" },
});

transporter.on("error", (err) => {
	console.error("Nodemailer transporter error:", err);
});

const info = await transporter.sendMail({
	from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
	to: "bar@example.com, baz@example.com",
	subject: "Hello √",
	text: "Hello world?", // plain‑text body
	html: "<b>Hello world?</b>", // HTML body
});

console.log("Message sent:", info.messageId);
