import { MenuIcon, XIcon } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import "./menu.css";
import { useRef } from "react";
import { Items } from "./items";
import { Button } from "#/components/button";

export const Menu = () => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const openMenu = () => dialogRef.current?.showModal();
	const closeMenu = () => dialogRef.current?.close();

	return (
		<div {...stylex.props(styles.container)}>
			<button
				{...stylex.props(styles.triggerButton)}
				type="button"
				onClick={openMenu}
			>
				<MenuIcon />
			</button>
			<dialog {...stylex.props(styles.dialog)} ref={dialogRef}>
				<div {...stylex.props(styles.innerContainer)}>
					<button
						{...stylex.props(styles.closeButton)}
						type="button"
						onClick={closeMenu}
					>
						<XIcon />
					</button>
					<Items onClose={closeMenu} />
					<div {...stylex.props(styles.ctaContainer)}>
						<Button>Book a demo</Button>
					</div>
				</div>
			</dialog>
		</div>
	);
};

const styles = stylex.create({
	container: {
		display: {
			default: "block",
			"@media (min-width: 1024px)": "none",
		},
	},
	innerContainer: {
		padding: "1.5rem",
		paddingInline: {
			"@media(min-width: 1024px)": "3rem",
		},
		display: "flex",
		alignItems: "flex-start",
		flexDirection: "column",
	},
	triggerButton: {
		":hover": { cursor: "pointer" },
	},
	closeButton: {
		alignSelf: "flex-end",
	},
	dialog: {
		margin: 0,
		maxWidth: "none",
		maxHeight: "none",
		width: "100%",
		height: "100%",
		opacity: 0,
		transform: "translateX(100%)",
		transitionProperty: "transform, opacity, display, overlay",
		transitionDuration: "350ms",
		transitionBehavior: "allow-discrete",
		":open": {
			opacity: 1,
			transform: "translateX(0)",
		},
	},
	ctaContainer: {
		paddingBlock: "1.5rem",
		borderTopWidth: "1px",
		borderTopColor: "rgb(107 114 128 / 0.1)",
		alignSelf: "stretch",
		display: "flex",
		flexDirection: "column",
	},
});
