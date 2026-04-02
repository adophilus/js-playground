import { HomeFeatures } from "#/features/home/features";
import { HomeFooter } from "#/features/home/footer";
import { HomeHeader } from "#/features/home/header";
import { HomeHero } from "#/features/home/hero";
import { HomeMission } from "#/features/home/mission";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: IndexPage });

function IndexPage() {
	return (
		<>
			<HomeHeader />
			<HomeHero />
			<HomeFeatures />
			<HomeMission />
			<HomeFooter />
		</>
	);
}
