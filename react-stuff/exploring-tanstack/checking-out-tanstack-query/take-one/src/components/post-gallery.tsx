import type { FunctionComponent } from "react";
import type { TPost } from "../lib/types";
import { Post } from "./post";

export const PostGallery: FunctionComponent<{ posts: TPost[] }> = ({
	posts,
}) => (
	<div>
		{posts.map((post) => (
			<Post post={post} key={post.id} />
		))}
	</div>
);
