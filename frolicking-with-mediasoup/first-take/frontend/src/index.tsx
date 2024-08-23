import "./style.css";
import { render } from "solid-js/web";
import { App } from "./components/app";

import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: <explanation>
render(
	() => (
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	),
	document.querySelector("#app")!,
);
