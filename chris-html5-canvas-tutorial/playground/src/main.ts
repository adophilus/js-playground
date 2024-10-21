import "@unocss/reset/tailwind.css";
import "./styles.css";

const projects = [
	{
		label: "Canvas",
		href: "/001_canvas/index.html",
	},
	{
		label: "Drawing",
		href: "/002_drawing/index.html",
	},
	{
		label: "Animations",
		href: "/003_animations/index.html",
	},
	{
		label: "Events",
		href: "/004_events/index.html",
	},
];

document.addEventListener("DOMContentLoaded", () => {
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const placeholder = document.querySelector<HTMLDivElement>(
		"#projects-placeholder",
	)!;

	for (const project of projects) {
		const link = document.createElement("a");
		link.href = project.href;
		link.textContent = project.label;

		placeholder.appendChild(link);
	}
});
