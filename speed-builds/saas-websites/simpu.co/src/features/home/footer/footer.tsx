import { SimpuLogo } from "#/components/icons";
import { Links } from "./links";
import { Socials } from "./socials";
import * as stylex from "@stylexjs/stylex";

export const HomeFooter = () => (
	<div {...stylex.props(styles.container)}>
		<div {...stylex.props(styles.logoAndSocials)}>
			<SimpuLogo color="white" />
			<Socials />
		</div>
		<Links />
		<div {...stylex.props(styles.bottomSection)}>
			<p {...stylex.props(styles.copyright)}>
				© 2026. All rights reserved. Simpu Inc.
			</p>
			<p {...stylex.props(styles.privacy)}>
				<a href="/privacy">Privacy</a>
			</p>
		</div>
	</div>
);

const styles = stylex.create({
	container: {
		backgroundColor: "rgb(0 0 0)",
		paddingTop: {
			default: "3rem",
			"@media (min-width: 1024px)": "6rem",
		},
		paddingBottom: "2.5rem",
		paddingInline: {
			default: "1.5rem",
			"@media (min-width: 1024px)": "3rem",
		},
	},
	logoAndSocials: {
		display: "flex",
		gap: "1.25rem",
		flexDirection: {
			default: "column",
			"@media (min-width: 1024px)": "row",
		},
		justifyContent: "space-between",
	},
	bottomSection: {
		marginTop: {
			default: "1rem",
			"@media (min-width: 1024px)": "6rem",
		},
		paddingTop: {
			default: "1.25rem",
			"@media (min-width: 1024px)": "2.5rem",
		},
		borderColor: "rgb(77 77 77)",
		borderTopWidth: "1px",
		borderStyle: "solid",
		display: "flex",
		flexDirection: {
			default: "column",
			"@media (min-width: 1024px)": "row",
		},
		gap: "1.25rem",
		justifyContent: "space-between",
	},
	copyright: {
		color: "rgb(255 255 255)",
		fontSize: {
			"@media (min-width: 1024px)": "0.875rem",
		},
		fontFamily: "Lato",
	},
	privacy: {
		color: "rgb(255 255 255 / 0.8)",
		fontSize: {
			"@media (min-width: 1024px)": "0.875rem",
		},
		fontFamily: "Lato",
		":hover": {
			color: "rgb(255 255 255)",
		},
	},
});
