import type { FunctionComponent } from "react";
import { items } from "../data";
import { Item } from "./item";
import * as stylex from "@stylexjs/stylex";

export const Items: FunctionComponent<{ onClose?: () => void }> = ({
	onClose,
}) => (
	<ul {...stylex.props(styles.container)}>
		{items.map((item) => (
			<li key={item.label}>
				<Item item={item} onClose={onClose} />
			</li>
		))}
	</ul>
);

const styles = stylex.create({
	container: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
		alignSelf: "stretch",
		alignItems: "stretch",
		marginBlock: "0.5rem",
	},
});
