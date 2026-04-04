import { LinkIcon, UsersIcon, ZapIcon } from "lucide-react";
import * as stylex from "@stylexjs/stylex";

const missions = [
	{
		icon: LinkIcon,
		title: "Seamless Connectivity",
		text: "We believe it's crucial for businesses to connect easily with their customers across every channel from a single interface.",
		backgroundColor: "rgb(0 101 235 / 0.2)",
	},
	{
		icon: ZapIcon,
		title: "Unified Operations",
		text: "Stop struggling with everyday customer interactions across multiple team inboxes. We bring all your conversations into one place.",
		backgroundColor: "rgb(204 90 247 / 0.2)",
	},
	{
		icon: UsersIcon,
		title: "Simple Collaboration",
		text: "Scale your support effortlessly by sharing inbox access with team members, making internal communication simpler than ever.",
		backgroundColor: "#E9F8F0",
	},
];

export const HomeMission = () => (
	<div {...stylex.props(styles.container)}>
		{missions.map((mission) => (
			<div key={mission.title} {...stylex.props(styles.missionContainer)}>
				<div
					{...stylex.props(
						styles.missionIconContainer(mission.backgroundColor),
					)}
				>
					<mission.icon />
				</div>
				<header {...stylex.props(styles.missionTitle)}>{mission.title}</header>
				<p {...stylex.props(styles.missionText)}>{mission.text}</p>
			</div>
		))}
	</div>
);

const styles = stylex.create({
	container: {
		display: "grid",
		gridTemplateColumns: {
			default: "1fr",
			"@media (min-width: 768px)": "repeat(auto-fit, minmax(300px, 1fr))",
		},
		padding: {
			default: "1.5rem",
			"@media (min-width: 1024px)": "3rem",
		},
		gap: "2rem",
	},
	missionContainer: {
		borderRadius: "0.5rem",
		backgroundColor: "rgb(248 248 250)",
		padding: { default: "1.5rem", "@media (min-width: 1024px)": "2rem" },
		display: "flex",
		flexDirection: "column",
	},
	missionIconContainer: (backgroundColor) => ({
		borderRadius: "0.5rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "fit-content",
		padding: "1rem",
		backgroundColor,
		marginBottom: "1.5rem",
	}),
	missionTitle: {
		fontSize: "1.25rem",
		fontWeight: 700,
		fontFamily: "Lato, sans-serif",
		marginBottom: "0.75rem",
	},
	missionText: {
		color: "rgb(77 77 77)",
		fontSize: "1.125rem",
		lineHeight: "1.6",
		fontFamily: "Lato, sans-serif",
		margin: 0,
	},
});
