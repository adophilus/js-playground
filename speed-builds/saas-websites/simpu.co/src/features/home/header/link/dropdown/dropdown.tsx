import type { FunctionComponent } from "react";
import type { Item } from "../../types";
import * as stylex from "@stylexjs/stylex";
import { DropdownItem } from "./item";
import { vars } from "./variables.stylex";

export const Dropdown: FunctionComponent<{ item: Item }> = ({ item }) => (
	<ul
		{...stylex.props(
			styles.container,
			item.orientation === "vertical"
				? styles.orientationVertical
				: styles.orientationHorizontal,
		)}
	>
		{item.items.map((item) => (
			<DropdownItem item={item} key={item.link} />
		))}
	</ul>
);

const styles = stylex.create({
	container: {
		position: "absolute",
		zIndex: 10,
		backgroundColor: "rgb(255 255 255)",
		display: vars.display,
		rowGap: "1rem",
		columnGap: "2rem",
		padding: "1rem",
		borderRadius: "0.375rem",
		boxShadow:
			"0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
	},
	orientationVertical: {
		flexDirection: "column",
	},
	orientationHorizontal: {
		flexDirection: "row",
		flexBasis: "33%",
	},
});
