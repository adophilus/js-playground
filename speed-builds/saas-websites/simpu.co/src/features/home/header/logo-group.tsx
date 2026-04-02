import { ChevronDownIcon } from "lucide-react";
import { items } from "./data";
import * as stylex from "@stylexjs/stylex";

export const LogoGroup = () => (
	<div {...stylex.props(styles.container)}>
		<div>
			<img src="/images/simpu-logo.svg" alt="logo" />
		</div>
		<div {...stylex.props(styles.linksContainer)}>
			{items.map((item) => (
				<div key={item.label}>
					<button type="button" {...stylex.props(styles.linkButton)}>
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
			))}
		</div>
	</div>
);

const styles = stylex.create({
	container: { display: "flex", gap: "10rem" },
	linksContainer: {
		display: "flex",
		gap: "3rem",
	},
	linkButton: {
		display: "flex",
		gap: "0.25rem",
	},
});
