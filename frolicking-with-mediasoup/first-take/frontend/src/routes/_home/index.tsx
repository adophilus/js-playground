import { RoomClient } from "@frontend/lib/room";
import { Media } from "@frontend/lib/media";
import { RoomsList } from "./-components/room";
import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "./-components/topbar";

export const Route = createFileRoute("/_home/")({
	component: HomePage,
});

const NoRoomAvailable = () => (
	<div className="text-3xl text-slate-600 font-Rowdies py-4 text-center">
		No rooms available!
	</div>
);

function HomePage() {
	const { data, status } = RoomClient.hooks.list();

	async () => {
		const stream = await Media.getStream();
	};

	return (
		<>
			<Topbar />
			{status === "pending" ? (
				<NoRoomAvailable />
			) : status === "error" ? null : data.length > 0 ? (
				<RoomsList rooms={data} />
			) : (
				<NoRoomAvailable />
			)}
		</>
	);
}
