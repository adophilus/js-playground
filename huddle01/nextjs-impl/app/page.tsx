"use client";

import { Button } from "@chakra-ui/react";
import { createRoom } from "./_components/actions";
import { useState } from "react";
import { Link } from "@chakra-ui/next-js";

export default function Home() {
	const [roomId, setRoomId] = useState<string | null>(null);

	return (
		<div>
			<Button
				onClick={async () => {
					const roomId = await createRoom(new FormData());
					setRoomId(roomId);
				}}
			>
				Create Room
			</Button>
			{roomId && (
				<div>
					<p>Room ID: {roomId}</p>
					<Link href={`/rooms/${roomId}`}>Join Room</Link>
				</div>
			)}
		</div>
	);
}
