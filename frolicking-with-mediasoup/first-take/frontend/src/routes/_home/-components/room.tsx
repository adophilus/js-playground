import { useRef, type FunctionComponent } from "react";
import type { Room } from "@backend/types";
import { CirclePlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "@frontend/components/button";
import { RoomClient } from "@frontend/lib/room";
import { Link } from "@tanstack/react-router";

const DeleteButton: FunctionComponent<{ room: Room }> = ({ room }) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const showConfirmDeleteDialog = () => {
		const dialog = dialogRef.current!;
		dialog.showModal();
	};

	const { mutate } = RoomClient.hooks.remove(room.id);

	const deleteRoom = () => {
		mutate(undefined, {
			onSuccess: () => {
				const dialog = dialogRef.current!;
				dialog.remove();
			},
		});
	};

	const cancelDialog = () => dialogRef.current?.close();

	return (
		<>
			<Button
				variant="destructive"
				onClick={showConfirmDeleteDialog}
				className="aspect-square flex justify-center items-center"
			>
				<Trash2Icon className="size-8" />
			</Button>
			<dialog ref={dialogRef}>
				<form action="dialog" className="p-5 rounded-md min-w-sm">
					<h2 className="text-xl py-4">Are you sure?</h2>
					<div className="min-w-sm pb-4">
						<div className="text-base font-Moderustic">
							Are you sure you want to delete this room?
						</div>
					</div>
					<footer className="py-5 border-t-[2px] border-t-slate-200 flex justify-end gap-4">
						<Button
							variant="primary"
							className="rounded-md text-lg"
							onClick={() => cancelDialog()}
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							className="rounded-md text-lg"
							onClick={() => deleteRoom()}
						>
							Delete
						</Button>
					</footer>
				</form>
			</dialog>
		</>
	);
};

export const RoomsList: FunctionComponent<{ rooms: Room[] }> = ({ rooms }) => (
	<div>
		{rooms.map((room) => (
			<div
				key={room.id}
				className="group relative overflow-hidden font-Rowdies text-2xl p-5 hover:bg-slate-300 duration-250 transition-colors cursor-pointer"
			>
				{room.id}
				<div className="translate-x-full transition-transform group-hover:translate-x-0 absolute overflow-hidden right-0 h-full flex top-0">
					<Link to="/rooms/$id" params={{ id: room.id }}>
						<Button
							variant="primary"
							className="aspect-square flex justify-center items-center h-full"
						>
							<CirclePlusIcon className="size-8" />
						</Button>
					</Link>
					<DeleteButton room={room} />
				</div>
			</div>
		))}
	</div>
);
