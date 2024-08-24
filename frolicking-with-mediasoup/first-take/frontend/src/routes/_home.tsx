import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_home")({
	component: HomeLayout,
});

function HomeLayout() {
	return (
		<div className="container mx-auto border-x-[5px] border-x-slate-400 h-full">
			<Outlet />
		</div>
	);
}
