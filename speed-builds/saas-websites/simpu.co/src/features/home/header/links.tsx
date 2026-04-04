import { items } from "./data";
import * as stylex from "@stylexjs/stylex";
import { Link } from "./link";

export const Links = () => (
	<div {...stylex.props(styles.container)}>
		{items.map((item) => (
			<Link key={item.label} item={item} />
		))}
	</div>
);

const styles = stylex.create({
	container: {
		display: { default: "none", "@media (min-width: 1024px)": "flex" },
		gap: "3rem",
	},
});
