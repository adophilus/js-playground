import type { FunctionComponent } from "react";
import type { TItem } from "../types";
import * as stylex from "@stylexjs/stylex";

export const Item: FunctionComponent<{ item: TItem; onClose?: () => void }> = ({
	item,
	onClose,
}) => (
	<details {...stylex.props(styles.container)}>
		<summary {...stylex.props(styles.subMenuTrigger)}>{item.label}</summary>
		<div>
			<ul {...stylex.props(styles.subItemContainer)}>
				{item.items.map((item) => (
					<li key={item.label}>
						<a href={item.link}>
							<button
								{...stylex.props(styles.subItemButton)}
								type="button"
								onClick={onClose}
							>
								{item.label}
							</button>
						</a>
					</li>
				))}
			</ul>
		</div>
	</details>
);

const styles = stylex.create({
	container: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
	},
	subMenuTrigger: {
		listStyle: "none",
		width: "100%",
		textAlign: "left",
		paddingBlock: "0.5rem",
		paddingInline: "0.75rem",
		borderRadius: "0.375rem",
		fontWeight: 600,
		fontFamily: "Lato",
		lineHeight: "1.75rem",
		":hover": {
			backgroundColor: "rgb(249 250 251)",
			cursor: "pointer",
		},
	},
	subItemContainer: {
		marginLeft: "1rem",
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
	},
	subItemButton: {
		paddingBlock: "0.5rem",
		paddingInline: "0.75rem",
		borderRadius: "0.375rem",
		fontWeight: 600,
		fontFamily: "Lato",
		lineHeight: "1.75rem",
		width: "100%",
		textAlign: "start",
		":hover": {
			backgroundColor: "rgb(249 250 251)",
			cursor: "pointer",
		},
	},
});
