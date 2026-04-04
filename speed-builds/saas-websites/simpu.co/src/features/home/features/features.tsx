import { features } from "./data";
import { Feature } from "./feature";
import * as stylex from "@stylexjs/stylex";

export const HomeFeatures = () => (
	<div {...stylex.props(styles.container)}>
		{features.map((feature) => (
			<Feature key={feature.id} feature={feature} />
		))}
	</div>
);

const styles = stylex.create({
	container: {
		padding: {
			default: "1.5rem",
			"@media (min-width: 1024px)": "3rem",
		},
		display: "flex",
		flexDirection: "column",
		gap: "3rem",
	},
});
