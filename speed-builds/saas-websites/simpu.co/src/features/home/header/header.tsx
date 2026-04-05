import { CallToAction } from "./call-to-action";
import { Container } from "./container";
import { LogoGroup } from "./logo-group";
import { Menu } from "./menu";

export const HomeHeader = () => (
	<Container>
		<LogoGroup />
		<CallToAction />
		<Menu />
	</Container>
);
