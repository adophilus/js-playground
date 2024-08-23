import { RoomClient } from "@frontend/lib/room";
import { Media } from "@frontend/lib/media";
import { createQuery } from "@tanstack/solid-query";
import { Match, Switch } from "solid-js";

export const App = () => {
	const query = createQuery(() => ({
		queryKey: ["rooms", "get"],
		queryFn: () => RoomClient.list(),
	}));

	async () => {
		const rooms = await RoomClient.list();
		const stream = await Media.getStream();
	};

	return (
		<Switch>
			<Match when={query.isSuccess}>
				<video className="bg-black w-300 aspect-video rounded-md" />
			</Match>
		</Switch>
	);
};
