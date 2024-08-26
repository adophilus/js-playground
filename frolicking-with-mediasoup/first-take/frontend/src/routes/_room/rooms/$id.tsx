import { Media } from "@frontend/lib/media";
import { RoomClient } from "@frontend/lib/room";
import { createFileRoute } from "@tanstack/react-router";
import { type FunctionComponent, useEffect, useRef } from "react";

export const Route = createFileRoute("/_room/rooms/$id")({
	component: RoomPage,
});

function RoomPage() {
	const { id } = Route.useParams();
	const { mutate: requestStream } = Media.hooks.getStream();
	const { mutate: joinRoom } = RoomClient.hooks.join();
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		requestStream(undefined, {
			onSuccess: (stream) => {
				const video = videoRef.current!;
				video.srcObject = stream;

				joinRoom(
					{ id, stream },
					{
						onSuccess: (remoteStream) => {
							console.log("Remote stream:", remoteStream);
						},
					},
				);
			},
		});
	}, []);

	return (
		<video
			ref={videoRef}
			muted
			autoPlay
			className="w-[300px] object-cover aspect-video"
		/>
	);
}
