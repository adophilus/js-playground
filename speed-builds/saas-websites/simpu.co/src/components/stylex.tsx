import { useEffect } from "react";

export const StyleXLink = () => {
	useEffect(() => {
		if (import.meta.env.DEV) {
			import("virtual:stylex:runtime");
		}
	}, []);
	return <link rel="stylesheet" href="/virtual:stylex.css" />;
};
