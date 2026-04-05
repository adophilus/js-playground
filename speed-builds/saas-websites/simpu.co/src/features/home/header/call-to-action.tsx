import { Button } from "#/components/button";
import * as stylex from "@stylexjs/stylex";

export const CallToAction = () => (
	<div {...stylex.props(styles.container)}>
		<Button>Book a demo</Button>
	</div>
);

const styles = stylex.create({
	container: {
		display: { default: "none", "@media (min-width: 1024px)": "block" },
	},
});
