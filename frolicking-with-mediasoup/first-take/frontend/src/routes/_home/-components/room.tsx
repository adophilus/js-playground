import type { FunctionComponent } from "react";
import type { Room } from "@backend/types";

export const RoomsList: FunctionComponent<{ rooms: Room[] }> = ({ rooms }) => (
	<div>
		{rooms.map((room) => (
			<button key={room.id} type="button" className="font-Rowdies text-2xl p-5">
				{room.id}
			</button>
		))}
	</div>
);
