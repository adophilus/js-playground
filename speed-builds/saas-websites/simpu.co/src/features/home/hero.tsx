import * as stylex from "@stylexjs/stylex";

export const HomeHero = () => (
	<div {...stylex.props(styles.container)}>
		<h1 {...stylex.props(styles.heroText)}>
			Grow your{" "}
			<span {...stylex.props(styles.heroTextHighlight)}>business</span>, one
			happy customer at a time.
		</h1>
		<p {...stylex.props(styles.backedByText)}>
			Backed by{" "}
			<img
				src="/images/techstars-logo.svg"
				alt="techstars"
				{...stylex.props(styles.backedByImage)}
			/>
		</p>
		<img src="/images/hero.png" alt="hero" {...stylex.props(styles.image)} />
		<div {...stylex.props(styles.gradientContainer)}>
			<div {...stylex.props(styles.gradient1)} />
			<div {...stylex.props(styles.gradient2)} />
		</div>
	</div>
);

const styles = stylex.create({
	container: {
		paddingInline: "2rem",
		paddingTop: "3.5rem",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		position: "relative",
		rowGap: "2.5rem",
	},
	heroText: {
		paddingTop: "1rem",
		maxWidth: '700px',
		fontSize: {
			default: "clamp(1.5rem, 2.25rem, 2.25rem)",
			"@media (min-width: 1024px)": "clamp(2.25rem, 3.75rem, 3.75rem)",
		},
		letterSpacing: "-0.025em",
		fontFamily: "Lato",
		fontWeight: 700,
		textAlign: "center",
		lineHeight: 1,
	},
	heroTextHighlight: { textDecoration: "underline" },
	backedByText: {
		display: "flex",
		alignItems: "center",
		gap: "0.25rem",
		textWrap: "nowrap",
		fontFamily: "Lato",
	},
	backedByImage: { height: "100%" },
	image: { maxWidth: "60%" },
	gradientContainer: {
		position: "absolute",
		bottom: 0,
		zIndex: -1,
		display: "flex",
		height: "50%",
		alignItems: "stretch",
		width: "100%",
	},
	gradient1: {
		width: "50%",
		backgroundImage:
			"linear-gradient(to top, rgb(0 101 235 / 0.5), rgb(0 101 235 / 0))",
	},
	gradient2: {
		width: "50%",
		backgroundImage:
			"linear-gradient(to top, rgb(204 90 247 / 0.5), rgb(204 90 247 / 0))",
	},
});
