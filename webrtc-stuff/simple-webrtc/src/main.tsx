import "./styles/global.css";
import { createRoot } from "react-dom/client";
import { Meeting } from "@/components/meeting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { z } from "zod";

const queryClient = new QueryClient();
const App = () => {
	const searchParams = new URLSearchParams(window.location.search);
	const actor = z.enum(["host", "guest"]).parse(searchParams.get("actor"));

	return (
		<QueryClientProvider client={queryClient}>
			<Meeting actor={actor} />
		</QueryClientProvider>
	);
};

// biome-ignore lint/style/noNonNullAssertion: this is fine
createRoot(document.querySelector("#root")!).render(<App />);
