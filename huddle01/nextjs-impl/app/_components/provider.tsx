"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { HuddleClient, HuddleProvider } from "@huddle01/react";
import type { ReactNode } from "react";

const huddleClient = new HuddleClient({
	projectId: process.env.NEXT_PUBLIC_HUDDLE01_PROJECT_ID!,
});

export default function Provider({ children }: { children: ReactNode }) {
	return (
		<HuddleProvider client={huddleClient}>
			<ChakraProvider>{children}</ChakraProvider>
		</HuddleProvider>
	);
}
