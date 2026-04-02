import { Button } from "#/components/button";

const features = [
	{
		id: "sms",
		highlight: "text marketing made simpu",
		title: "Text your Customers Anytime, Anywhere!",
		description:
			"Send promotional offers, reminders, and OTPs directly to your customers phones.",
		imageUrl: "/images/features/feature-sms.png",
	},
	{
		id: "inbox",
		highlight: "inbox made simpu",
		title: "One Inbox for All Channels.",
		description:
			"Keep all your customer interactions—whether email, chat, or social media—in one place. ",
		imageUrl: "/images/features/feature-inbox.png",
	},
	{
		id: "email",
		highlight: "email marketing made simpu",
		title: "Send Emails That Don't End Up in Spam!",
		description:
			"Design beautiful emails that get opened, clicked, and loved. No monthly subscription fee, pay for what you use!",
		imageUrl: "/images/features/feature-email.png",
	},
];

export const HomeFeatures = () => (
	<div>
		{features.map((feature) => (
			<div key={feature.id} id={feature.id}>
				<div>
					<hgroup>
						<p>{feature.highlight}</p>
						<header>{feature.title}</header>
					</hgroup>
					<p>{feature.description}</p>
					<div>
						<Button>Get started</Button>
					</div>
				</div>
				<div>
					<img src={feature.imageUrl} alt={feature.id} />
				</div>
			</div>
		))}
	</div>
);
