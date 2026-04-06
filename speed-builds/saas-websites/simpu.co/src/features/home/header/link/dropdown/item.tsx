import type { FunctionComponent } from "react";
import type { TSubItem } from "../../types";
import * as stylex from "@stylexjs/stylex";

export const DropdownItem: FunctionComponent<{ item: TSubItem }> = ({
	item,
}) => (
	<li {...stylex.props(styles.container)}>
		<a href={item.link} {...stylex.props(styles.link)}>
			<span {...stylex.props(styles.title)}>{item.label}</span>
			<span {...stylex.props(styles.description)}>{item.description}</span>
		</a>
	</li>
);

const styles = stylex.create({
	container: {},
	link: {
		display: "flex",
		flexDirection: "column",
		":hover": {
			backgroundColor: "rgb(243 244 246 / 1)",
		},
		paddingBlock: "0.25rem",
		paddingInline: "0.75rem",
		borderRadius: "0.375rem",
	},
	title: {
		fontSize: "1.125rem",
		lineHeight: "1.75rem",
		fontWeight: 600,
		fontFamily: "Lato",
		textWrap: "nowrap",
	},
	description: {
		fontSize: "0.75rem",
		lineHeight: "1rem",
		color: "rgb(77 77 77)",
		textWrap: "nowrap",
	},
});
