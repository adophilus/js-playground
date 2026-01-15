import {
	QueryErrorResetBoundary,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { getPosts } from "./lib/api";
import { Suspense } from "react";
import { Loader } from "./components/loader";
import { PostGallery } from "./components/post-gallery";
import { ErrorBoundary } from "react-error-boundary";
import { PostGalleryErrorFallback } from "./components/post-gallery-error-fallback";

const DynamicPostGallery = () => {
	const query = useSuspenseQuery({
		queryKey: ["posts"],
		queryFn: getPosts,
	});

	const posts = query.data;

	return <PostGallery posts={posts} />;
};

export const App = () => {
	return (
		<Suspense fallback={<Loader />}>
			<QueryErrorResetBoundary>
				{({ reset }) => (
					<ErrorBoundary
						fallbackRender={({ resetErrorBoundary }) => (
							<PostGalleryErrorFallback reset={resetErrorBoundary} />
						)}
						onReset={reset}
					>
						<DynamicPostGallery />
					</ErrorBoundary>
				)}
			</QueryErrorResetBoundary>
		</Suspense>
	);
};
