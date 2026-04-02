import { ChevronDownIcon } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import type { Item } from "./types";
import type { FunctionComponent } from "react";

export const Link: FunctionComponent<{ item: Item }> = ({ item }) => (
	<div>
		<button type="button" {...stylex.props(styles.button)}>
			{item.label} <ChevronDownIcon />
		</button>
		<div>
			{item.items.map((item) => (
				<a href={item.link} key={item.link}>
					<span>{item.label}</span>
					<span>{item.description}</span>
				</a>
			))}
		</div>
	</div>
);

const styles = stylex.create({
	button: {
		display: "flex",
		gap: "0.25rem",
	},
});
