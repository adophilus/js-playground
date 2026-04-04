import type { FunctionComponent, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

export const Container: FunctionComponent<{ children: ReactNode }> = ({
	children,
}) => <nav {...stylex.props(styles.container)}>{children}</nav>;

const styles = stylex.create({
	container: {
		padding: "1.5rem",
		paddingInline: {
			"@media(min-width: 1024px)": "3rem",
		},
		display: "flex",
		justifyContent: 'space-between',
	},
});
