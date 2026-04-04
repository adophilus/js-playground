import { ArrowUpRightIcon } from "lucide-react";
import { forwardRef, type ComponentProps } from "react";
import * as stylex from "@stylexjs/stylex";

export const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
	({ children, ...props }, ref) => (
		<button type="button" {...stylex.props(styles.button)} {...props} ref={ref}>
			{children} <ArrowUpRightIcon width={20} height={20} />
		</button>
	),
);

export const styles = stylex.create({
	button: {
		backgroundColor: "rgb(0 101 235)",
		color: "rgb(255 255 255)",
		fontFamily: "Lato",
		fontWeight: 600,
		paddingInline: "1.5rem",
		paddingBlock: "0.5rem",
		display: "flex",
		alignItems: 'center',
		gap: "0.5rem",
		borderRadius: "0.375rem",
		fontSize: "0.875rem",
		":hover": {
			backgroundColor: "rgb(0 101 235 / 0.9)",
			cursor: "pointer",
		},
	},
});
