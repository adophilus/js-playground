import { ChevronDownIcon } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import type { Item } from "../types";
import type { FunctionComponent } from "react";
import { Dropdown } from "./dropdown";
import { vars as dropdownVars } from "./dropdown/variables.stylex";

export const Link: FunctionComponent<{ item: Item }> = ({ item }) => (
	<div {...stylex.props(styles.container)}>
		<button type="button" {...stylex.props(styles.button)}>
			{item.label} <ChevronDownIcon width={20} height={20} />
		</button>
		<Dropdown item={item} />
	</div>
);

const styles = stylex.create({
	container: {
		position: "relative",
		[dropdownVars.display]: {
			default: "none",
			":hover": "flex",
		},
	},
	button: {
		display: "flex",
		alignItems: "center",
		gap: "0.25rem",
		color: "rgb(77 77 77)",
		fontFamily: "Lato",
		":hover": {
			cursor: "pointer",
			color: "rgb(77 77 77 / 0.8)",
		},
	},
});
