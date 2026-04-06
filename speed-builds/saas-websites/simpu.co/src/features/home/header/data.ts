import type { TItem } from "./types";

export const items: TItem[] = [
	{
		label: "Products",
		orientation: "vertical",
		items: [
			{
				label: "Inbox",
				description: "Collaborate on conversations in a view",
				link: "#inbox",
			},
			{
				label: "SMS Marketing",
				description: "Send SMS broadcasts at scale",
				link: "#sms",
			},
			{
				label: "Email Marketing",
				description: "Build personalized email campaigns",
				link: "#email",
			},
		],
	},
	{
		label: "Resources",
		orientation: "horizontal",
		items: [
			{
				label: "Blog",
				description: "All the best tips and resources",
				link: "/blog",
			},
			{
				label: "Help center",
				description: "Find answers to your questions",
				link: "/help-center",
			},
			{
				label: "API docs",
				description: "Integrate with Simpu easily",
				link: "/api",
			},
		],
	},
];
