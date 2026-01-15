import type { TPost } from "./types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let counter = 0;

export const getPosts = async (): Promise<TPost[]> => {
	await sleep(5000);

	const result = await fetch("https://jsonplaceholder.typicode.com/posts");
	const json = await result.json();

	if (counter % 3 === 0) {
		counter++;
		throw new Error("Failed to fetch posts!");
	}
	else {
		counter++;
	}

	return json;
};
