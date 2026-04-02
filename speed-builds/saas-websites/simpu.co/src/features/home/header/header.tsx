import { CallToAction } from "./call-to-action";
import { Container } from "./container";
import { LogoGroup } from "./logo-group";

export const HomeHeader = () => (
	<Container>
		<LogoGroup />
		<CallToAction />
	</Container>
);
