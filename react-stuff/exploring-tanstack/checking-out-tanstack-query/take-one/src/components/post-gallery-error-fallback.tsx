import type { FunctionComponent } from "react";

export const PostGalleryErrorFallback: FunctionComponent<{
	reset: () => void;
}> = ({ reset }) => (
	<div>
		<h2>Sorry an error occurred</h2>
		<button onClick={reset}>Click here to retry</button>
	</div>
);
