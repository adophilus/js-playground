import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { env } from "@frontend/lib/env";
import { queryClient } from "@frontend/lib/backend";

export const Route = createRootRoute({
	component: () => (
		<QueryClientProvider client={queryClient}>
			<Outlet />
			<Devtools />
			<Toaster
				toastOptions={{
					unstyled: true,
					className: "text-Rowdies",
				}}
			/>
		</QueryClientProvider>
	),
});

function Devtools() {
	if (env.MODE !== "development") return null;

	return (
		<>
			<TanStackRouterDevtools initialIsOpen={false} />
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	);
}
