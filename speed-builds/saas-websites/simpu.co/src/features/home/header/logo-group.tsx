import * as stylex from "@stylexjs/stylex";
import { Links } from "./links";

export const LogoGroup = () => (
	<div {...stylex.props(styles.container)}>
		<div>
			<img
				src="/images/simpu-logo.svg"
				alt="logo"
				{...stylex.props(styles.logo)}
			/>
		</div>
		<Links />
	</div>
);

const styles = stylex.create({
	container: { display: "flex", gap: "10rem", alignItems: "center" },
	logo: { height: "1.5rem", width: "auto" },
});
