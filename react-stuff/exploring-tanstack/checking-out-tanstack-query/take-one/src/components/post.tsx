import type { FunctionComponent } from "react";
import type { TPost } from "../lib/types";

export const Post: FunctionComponent<{ post: TPost }> = ({ post }) => (
	<div>
		<h2>{post.title}</h2>
		<p>By {post.userId}</p>
	</div>
);
